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

    # This will be implemented in story: https://trello.com/c/tG7s7cCf
    # For now just upload a test img to demonstrate functionality
    desc "Upload compiled assets to remote"
    task asset_files: :environment do
      puts "Uploading compiled assets to remote"
      local_asset = IO.read(local_compiled_assets_path('test-img-asset.jpg'))
      CascadeAssetsClient.write_asset_file(local_asset, 'test-img-asset.jpg')
    end
  end
end

def local_compiled_assets_path(sub_path="")
  Rails.root.join("public","_assets", sub_path)
end

def local_asset_block_path
  Rails.root.join('dist', Rails.env, 'cascade-assets.xml')
end
