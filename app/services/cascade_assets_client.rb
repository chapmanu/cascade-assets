require 'savon'

module CascadeAssetsClient
  CASCADE_ASSET_OPERATION_WSDL = (Rails.application.secrets.cascade_asset_operation_endpoint + "?wsdl").freeze
  SITE_NAME = "Chapman.edu".freeze
  ASSETS_PATH = "_assets/".freeze
  ASSET_BLOCK_PATH = "_cascade/blocks/html/cascade-assets/".freeze

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
        siteName: SITE_NAME
      },
      type: "block"
    }

    message = {authentication: deploy_credentials, identifier: asset_identifier}
    request(:read, message)
  end

  def write_asset_block(local_block)
    # First get a reference to the remote asset block, and then update the xml with the local block
    read_response = read_asset_block(ASSET_BLOCK_PATH)
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

  def write_asset_file(local_asset, asset_name)
    encoded_image = Base64.encode64(local_asset)

    asset = {
      file: {
        name: asset_name,
        parentFolderPath: '_assets',
        siteName: SITE_NAME,
        metadataSetPath: '/Default',
        shouldBePublished: 'false',
        shouldBeIndexed: 'false',
        data: encoded_image,
        rewriteLinks: 'false',
        maintainAbsoluteLinks: 'false'
      }
    }

    message = {authentication: deploy_credentials, asset: asset}
    request(:create, message)
  end

  def deploy_credentials
    {
      password: Rails.application.secrets.cascade_password,
      username: Rails.application.secrets.cascade_username
    }
  end
end
