require 'savon'

module CascadeAssetsClient
  CASCADE_ASSET_OPERATION_WSDL = (CASCADE_CONFIG['asset_operation_endpoint'] + "?wsdl").freeze
  @client = Savon.client(wsdl: CASCADE_ASSET_OPERATION_WSDL)

  module_function

  def request(operation, message)
    @client.call(operation, message: message)
    rescue Savon::Error => error
      msg = "Cascade web service responded with %s: %s"
      Rails.logger.error format(msg, error.http.code, error.message)
      nil
  end

  def read_asset_block(block_path)
    asset_identifier = {
      path: {
        path: block_path,
        siteName: CASCADE_CONFIG['site_name']
      },
      type: "block"
    }

    message = {authentication: deploy_credentials, identifier: asset_identifier}
    request(:read, message)
  end

  def write_asset_block(local_block)
    # First get a reference to the remote asset block, and then update the xml with the local block
    read_response = read_asset_block(CASCADE_CONFIG['asset_block_path'])
    return unless read_response && read_response.body[:read_response][:read_return][:success]
    xml_block = read_response.body[:read_response][:read_return][:asset][:xml_block]
    xml_block[:xml] = local_block

    # IMPORTANT: In the AssetOperation schema, the xmlBlock type has a sequence tag, so values MUST be in the correct order for the request to be valid (Ugh SOAP...)
    # Savon ignores this ordering when it returns the response, so for now we need to rebuild the request hash from the response putting values
    # in the order defined in the WSDL.
    # There is an open issue for this: https://github.com/savonrb/savon/issues/592
    asset = {
      xmlBlock: {
        id: xml_block[:id],
        name: xml_block[:name],
        parentFolderId: xml_block[:parent_folder_id],
        siteName: xml_block[:site_name],
        xml: xml_block[:xml]
      }
    }

    message = {authentication: deploy_credentials, asset: asset}
    request(:edit, message)
  end

  # Currently there is no way to upload asset files without duplicating the ones
  # that already exist (see https://help.hannonhill.com/hc/en-us/requests/4460)
  # So instead, delete all assets files before recreating them in the upload method
  def delete_assets
    batch_request = {
      authentication: deploy_credentials,
      operation: [
        {
          delete: {
            identifier: {
              path: {
                path: CASCADE_CONFIG['asset_path'],
                siteName: CASCADE_CONFIG['site_name']
              },
              type: "folder"
            }
          },
        },
        create: folder_asset(CASCADE_CONFIG['asset_path'])
      ]
    }

    request(:batch, batch_request)
  end

  def upload_assets
    local_assets, operations = [], []

    Dir.chdir(local_asset_path) do
      local_assets = Dir.glob("**/*", File::FNM_DOTMATCH).reject{|asset| File.basename(asset) == "." || File.basename(asset) == ".."}
    end

    local_assets.each do |path|
      remote_path, local_path = remote_asset_path(path), local_asset_path(path)
      asset = File.directory?(local_path) ? folder_asset(remote_path) : file_asset(remote_path, IO.read(local_path))
      operations.push(
        {create: asset},
        {publish: publish_information(remote_path)}
      )
    end

    batch_request = {
      authentication: deploy_credentials,
      operation: operations
    }

    response = request(:batch, batch_request)
  end

  def publish_information(remote_path)
    type = File.directory?(remote_path) ? 'folder' : 'file'

    {
      publishInformation: {
        identifier: {
          path: {
            path: remote_path,
            siteName: CASCADE_CONFIG['site_name']
          },
          type: type
        }
      }
    }
  end

  def file_asset(remote_path, data)
    encoded_data = Base64.encode64(data)

    {
      asset: {
        file: {
          name: File.basename(remote_path),
          parentFolderPath: parent_dir_path(remote_path),
          siteName: CASCADE_CONFIG['site_name'],
          metadataSetPath: '/Default',
          shouldBePublished: 'true',
          shouldBeIndexed: 'false',
          data: encoded_data,
          rewriteLinks: 'false',
          maintainAbsoluteLinks: 'false'
        }
      }
    }
  end

  def folder_asset(remote_path)
    {
      asset: {
        folder: {
          name: File.basename(remote_path),
          parentFolderPath: parent_dir_path(remote_path),
          siteName: CASCADE_CONFIG['site_name'],
          metadataSetPath: '/Website Folder'
        }
      }
    }
  end

  def parent_dir_path(rel_path)
    child_path = Pathname.new(rel_path)
    child_path.parent.to_s == '.' ? '' : child_path.parent.to_s
  end

  def local_asset_path(rel_path = '')
    Rails.root.join('public', '_assets', rel_path)
  end

  def remote_asset_path(rel_path = '')
    File.join(CASCADE_CONFIG['asset_path'], rel_path)
  end

  def deploy_credentials
    {
      password: CASCADE_CONFIG['deploy_password'],
      username: CASCADE_CONFIG['deploy_username']
    }
  end
end
