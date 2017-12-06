namespace :deploy do
  namespace :cascade do
    desc "Deploy cascade-assets to Cascade"
    task all: :environment do
      Rake::Task[:build].invoke
      Rake::Task['deploy:cascade:asset_block'].invoke
      Rake::Task['deploy:cascade:asset_files'].invoke
    end

    desc "Update remote asset block xml"
    task asset_block: :environment do
      puts "Updating remote asset block xml"
      local_asset_block = IO.read(local_asset_block_path)
      CascadeAssetsClient.write_asset_block(local_asset_block)
    end

    desc "Upload compiled assets to remote"
    task asset_files: :environment do
      puts "Uploading compiled assets to remote"
      CascadeAssetsClient.delete_assets
      CascadeAssetsClient.upload_assets
    end
  end
end

def local_compiled_assets_path(sub_path="")
  Rails.root.join("public","_assets", sub_path)
end

def local_asset_block_path
  env = Rails.env == 'development' ? 'staging' : Rails.env
  Rails.root.join('dist', env, 'cascade-assets.xml')
end
