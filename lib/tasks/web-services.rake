# https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
require 'json'
require 'httparty'
require 'nokogiri'
require 'open-uri'
require 'uri'
require 'yaml'
require 'fileutils'


# ---------------------------------------------------------------------------- #
#                            edit cascade-assets.xml                           #
# ---------------------------------------------------------------------------- #
# NOTE - the respective `cascade-assets.xml` file should exist before running `rake edit_cascade_assets` or it will fail. You can run `bin/build` (in build.rake) to handle creating the `cascade-assets-branch-name.xml` file. `bin/build` invokes this `edit_cascade_assets`

desc 'Updates dev Chapman.edu/_cascade/blocks/html/cascade-assets with dist/staging/cascade-assets.xml'
task edit_cascade_assets: :environment do

  FileUtils.mkdir('dist/_config') unless File.directory?('dist/_config')
  current_branch = `git rev-parse --abbrev-ref HEAD`.strip
  cascade_assets_block_name = 'cascade-assets-' + current_branch

  if(File.exist?('dist/_config/branch_settings.yml'))
    branch_settings = YAML.load_file('dist/_config/branch_settings.yml')
    p branch_settings.inspect
    last_used_branch =  branch_settings['branch']

    if last_used_branch != current_branch
      p
      p "   🎋 Current branch is different from existing branch in branch_settings.yml. Replacing existing dist/_config/branch_settings.yml with a new one!"
      p
      FileUtils.rm_rf('dist/_config/run_once.txt')
      FileUtils.rm_rf('dist/_config/branch_settings.yml')

      File.open("dist/_config/branch_settings.yml", 'a') do |file|
        file.puts "branch: #{current_branch}"
      end

    end
  end

  unless File.exist?("dist/_config/run_once.txt")
    p  cascade_assets_feature_branch_filename = 'cascade-assets-' + `git rev-parse --abbrev-ref HEAD`.strip

    p create_block("#{cascade_assets_block_name}", "Chapman.edu/_cascade/blocks/html", "dist/staging/cascade-assets.xml")

    p "creating new cascade-assets-block ( #{cascade_assets_feature_branch_filename} )!!"
    File.write("dist/_config/run_once.txt", "ran `create_block` , created #{cascade_assets_feature_branch_filename} on dev-Chapman.edu/_cascade/blocks/html !!")
  end

  edit_block(
    "Chapman.edu/_cascade/blocks/html/#{cascade_assets_block_name}",
    'dist/staging/cascade-assets.xml'
  )
  
  local_file = 'dist/staging/cascade-assets.xml'

  webpack_manifest = File.read("dist/staging/_assets/manifest.json")
  p webpack_manifest = JSON.parse(webpack_manifest)

  html = Nokogiri.HTML(URI.open(local_file, read_timeout: 300))
  p master_css = html.at('link[rel="stylesheet"]')['href']
  p webpack_manifest['application.css']
  p master_js = html.at('link[as="script"]')['href']
  p webpack_manifest['application.js']

  uri_css = URI.parse(master_css)
  uri_webpack_css = URI.parse(webpack_manifest['application.css'])
  p uri_css = File.basename(uri_css.path)
  p uri_webpack_css = File.basename(uri_webpack_css.path)

  uri_js = URI.parse("#{master_js}")
  uri_webpack_js = URI.parse(webpack_manifest['application.js'])
  p uri_js = File.basename(uri_js.path)
  p uri_webpack_js = File.basename(uri_webpack_js.path)

  p ("#{uri_css}" + 'Chapman.edu/_assets/' + "dist/development/_assets/#{uri_css}")

  p 
  p create_file("#{uri_css}", 'Chapman.edu/_assets/', "dist/staging/_assets/#{uri_css}")
  puts
  p create_file("#{uri_webpack_css}", 'Chapman.edu/_assets/', "dist/staging/_assets/#{uri_webpack_css}")
  puts
  p create_file("#{uri_js}", 'Chapman.edu/_assets/', "dist/staging/_assets/#{uri_js}")
  puts
  p create_file("#{uri_webpack_js}", 'Chapman.edu/_assets/', "dist/staging/_assets/#{uri_webpack_js}")

  p "publishing Chapman.edu/_assets/#{uri_css}"
  p
  publish_asset("file", "Chapman.edu/_assets/#{uri_css}")
  p
  p "publishing Chapman.edu/_assets/#{uri_webpack_css}"
  p
  publish_asset("file", "Chapman.edu/_assets/#{uri_webpack_css}")
  p
  p "publishing Chapman.edu/_assets/#{uri_js}"
  p
  publish_asset("file", "Chapman.edu/_assets/#{uri_js}")
  p
  p "publishing Chapman.edu/_assets/#{uri_webpack_js}"
  p
  publish_asset("file", "Chapman.edu/_assets/#{uri_webpack_js}")
  p

  # TODO - it would be useful to:
  # [ ] allow for an array of pages to publish
  # [ ] allow for a folder to be published

  unless File.exist?("dist/_config/branch_settings.yml")
    p
    p "     Done! Want to also automatically publish an associated page?"
    p
    p  "    ⚡️ If so enter the the asset path below WITHOUT https:// or .com"
    p "     eg Chapman.edu/test-section/nick-test/two-col"
    p "     🎹 Enter the asset path (or press enter to ignore): "
    
    page = STDIN.gets.chomp

    # Run web.services.thor task to publish the specified page.
    p `thor cascade:publish page #{page}`

    
    FileUtils.mkdir('dist/_config') unless File.directory?('dist/_config')

    # File.write("dist/staging/branch_settings.yml", "page_to_publish #{page}")
    File.open("dist/_config/branch_settings.yml", 'a') do |file|
      file.puts "page_to_publish: #{page}"
      file.puts "branch: #{current_branch}"
    end

    p "     👼 Cool. This page can be reconfigured in dist/_config/branch_settings.yml"

  else 

    branch_settings = YAML.load(File.read("dist/_config/branch_settings.yml"))
    page = branch_settings["page_to_publish"]
    p 
    p "🔮 Automatically publishing #{page}. This can be reconfigured in dist/staging/_config/branch_settings.yml"

    puts
    p `thor cascade:publish page #{page}`

  end

end


# ---------------------------------------------------------------------------- #
#                          Edit Widget - Funnels 1 Up                          #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/modular/widgets/Funnels 1up` with `.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Funnels_1up.vtl`'
task edit_widget_funnels_1_up: :environment do
  edit_format(
    '9cc4647fc0a81e4173d4458767e30a55',
    '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Funnels_1up.vtl'
  )
end


# ---------------------------------------------------------------------------- #
#                          Edit Widget - Funnels 2 Up                          #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/modular/widgets/Funnels 2up` with `.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Funnels_1up.vtl`'
task edit_widget_funnels_2_up: :environment do
  edit_format(
    '9cc46410c0a81e4173d44587bd75f3eb',
    '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Funnels_2up.vtl'
  )
end

# ---------------------------------------------------------------------------- #
#                           edit one-column data def                           #
# ---------------------------------------------------------------------------- #
desc 'Updates Dev-Chapman.edu Data Definitions:Modular/1 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/one_column.xml'
task edit_one_col_data_def: :environment do
  edit_data_def(
    '9ccd05f7c0a81e4173d445873ad3b5a6',
    'app/data_definitions/from_cascade/one_column.xml'
  )
end

# ---------------------------------------------------------------------------- #
#                             edit two-col data def                            #
# ---------------------------------------------------------------------------- #
desc 'Updates Dev-Chapman.edu Data Definitions:Modular/2 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/one_column.xml'
task edit_two_col_data_def: :environment do
  edit_data_def(
    '9ccd064ec0a81e4173d4458753f41e5a',
    'app/data_definitions/from_cascade/two_column.xml'
  )
end

# ---------------------------------------------------------------------------- #
#   edit format `Chapman.edu/_cascade/formats/modular/widgets/Text with CTA`   #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/modular/widgets/Photo Callout` with `.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Photo Callout.vtl`'
task edit_widget_photo_callout: :environment do
  edit_format(
    '80a1af4ec0a81e5f43ef9b37eed63738',
    '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Photo Callout.vtl'
  )
end


# ---------------------------------------------------------------------------- #
#   edit format `Chapman.edu/_cascade/formats/modular/widgets/Text with CTA`   #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/modular/widgets/Text with CTA` with `.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Text with CTA.vtl`'
task edit_widget_text_with_cta: :environment do
  edit_format(
    '61adcfeac0a81e4b05275461be912e1c',
    '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/text_with_cta.vtl'
  )
end

# ---------------------------------------------------------------------------- #
#                    edit two & three column primary content                   #
# ---------------------------------------------------------------------------- #

desc 'Updates Dev-Chapman.edu/_cascade/formats/modular/PrimaryContent with .cascade-code/Chapman.edu/_cascade/formats/modular/PrimaryContent.vtl'
task edit_primary_content_2_3_col: :environment do
  edit_format(
    '_cascade/formats/modular/PrimaryContent',
    '.cascade-code/Chapman.edu/_cascade/formats/modular/PrimaryContent.vtl'
  )
end

desc 'Updates Dev-Chapman.edu Data Definitions:Modular/3 Column (https://dev-cascade.chapman.edu/entity/open.act?id=c77aa6ffc04d744c4832d6753c63a730&type=structureddatadefinition&direct=true) 
with app/data_definitions/from_cascade/three_column.xml'
task edit_three_col_data_def: :environment do
  edit_data_def(
    '9ccd06a0c0a81e4173d44587d345268f',
    'app/data_definitions/from_cascade/three_column.xml'
  )
end

# ---------------------------------------------------------------------------- #
#                            edit shared image field                           #
# ---------------------------------------------------------------------------- #
desc 'Updates Shared Fields:image (https://dev-cascade.chapman.edu/entity/open.act?id=9cc8235cc0a81e4173d445879a2a5d7b&type=sharedfield) 
with app/data_definitions/from_cascade/Shared Fields/image.xml'
task edit_shared_field_image: :environment do
  edit_shared_field(
    '9cc8235cc0a81e4173d445879a2a5d7b',
    'app/data_definitions/from_cascade/Shared Fields/image.xml'
  )
end

# ---------------------------------------------------------------------------- #
#           BASE METHODS - The methods above inherit from these tasks          #
# ---------------------------------------------------------------------------- #

# ---------------------------------------------------------------------------- #
#      edit format `Chapman.edu/_cascade/formats/level/left_nav_drilldown`     #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/level/left_nav_drilldown.vtl` with `.cascade-code/Chapman.edu/_cascade/formats/level/left_nav_drilldown.vtl`'
task edit_left_nav_drilldown: :environment do
  edit_format(
    'Chapman.edu/_cascade/formats/level/left_nav_drilldown.vtl',
    '.cascade-code/Chapman.edu/_cascade/formats/level/left_nav_drilldown.vtl'
  )
end

# ---------------------------------------------------------------------------- #
#   edit format `Chapman.edu/_cascade/formats/helpers.velocity`   #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/helpers.velocity` with `.cascade-code/Chapman.edu/_cascade/formats/helpers.velocity`'
task edit_helpers_velocity: :environment do
  edit_format(
    'Chapman.edu/_cascade/formats/helpers.velocity',
    '.cascade-code/Chapman.edu/_cascade/formats/helpers.velocity'
  )
end

# ---------------------------------------------------------------------------- #
#   edit format `Chapman.edu/_cascade/formats/modular/widgets/Collapsibles`   #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/modular/widgets/Collapsibles` with `.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Collapsibles`'
task edit_collapsibles: :environment do
  edit_format(
    'Chapman.edu/_cascade/formats/modular/widgets/Collapsibles',
    '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Collapsibles.vtl'
  )
end

# ---------------------------------------------------------------------------- #
#                                  edit format                                 #
# ---------------------------------------------------------------------------- #
#      `Chapman.edu/_cascade/formats/modular/uninav/_offCanvas_main_menu`      #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/modular/uninav/_offCanvas_main_menu` with `.cascade-code/Chapman.edu/_cascade/formats/modular/uninav/_offCanvas_main_menu`'
task edit_offcanvas_main_menu: :environment do
  edit_format(
    'Chapman.edu/_cascade/formats/modular/uninav/_offCanvas_main_menu.vtl',
    '.cascade-code/Chapman.edu/_cascade/formats/modular/uninav/_offCanvas_main_menu.vtl'
  )
end


# ---------------------------------------------------------------------------- #
#   edit format `Chapman.edu/_cascade/formats/modular/uninav/left_nav_drilldown`   #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/level/left_nav_drilldown.vtl` with `.cascade-code/Chapman.edu/_cascade/formats/level/left_nav_drilldown.vtl`'
task edit_left_nav_drilldown: :environment do
  edit_format(
    'Chapman.edu/_cascade/formats/level/left_nav_drilldown.vtl',
    '.cascade-code/Chapman.edu/_cascade/formats/level/left_nav_drilldown.vtl'
  )
end

# ---------------------------------------------------------------------------- #
#   edit format `Chapman.edu/_cascade/formats/level/Breadcrumbs.vtl`   #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/level/Breadcrumbs.vtl` with `.cascade-code/Chapman.edu/_cascade/formats/level/Breadcrumbs.vtl`'
task edit_breadcrumbs: :environment do
  edit_format(
    'Chapman.edu/_cascade/formats/level/Breadcrumbs.vtl',
    '.cascade-code/Chapman.edu/_cascade/formats/level/Breadcrumbs.vtl'
  )
end

# ---------------------------------------------------------------------------- #
#   edit format `Chapman.edu/_cascade/formats/Homepage Current Hero panel`   #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/Homepage Current Hero panel` with `.cascade-code/Chapman.edu/_cascade/formats/Homepage_Current_Hero_panel`'
task edit_homepage_hero: :environment do
  edit_format(
    'Chapman.edu/_cascade/formats/Homepage%20Current%20Hero%20panel',
    '.cascade-code/Chapman.edu/_cascade/formats/Homepage_Current_Hero_panel.vtl'
  )
end

#                                 Publish Asset                                #
# ---------------------------------------------------------------------------- #
# USAGE: rake publish TYPE=page/ PATH=Chapman.edu/test-section/nick-test/test-publish
# 👹 note the trailing slash on the TYPE
task :publish do
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'publish/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  ENV['TYPE'] # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  ENV['PATH'] # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + ENV['TYPE'] + ENV['PATH'] + cascade_username +
      cascade_password
  p url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  p response.body
end

def birth(file)
  Time.at(`stat -f%B "#{file}"`.chomp.to_i)
end


# ---------------------------------------------------------------------------- #
#                                  Edit Format                                 #
# ---------------------------------------------------------------------------- #
def edit_format(asset_path, update_source)
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'read/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'format/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']
  p cascade_username
  p cascade_password
  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password
  #  p url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  #  p response.body
  response_xml = response['asset']['scriptFormat']['script']

  response_xml = response['asset']['scriptFormat']['xml']
  site_name = response['asset']['scriptFormat']['siteName']
  response_name = response['asset']['scriptFormat']['name']
  response_path = response['asset']['scriptFormat']['path']
  response_path_full = site_name + '/' + response_path

  parent_folder_id = response['asset']['scriptFormat']['parentFolderId']
  parent_folder_path = response['asset']['scriptFormat']['parentFolderPath']

  asset_id = response['asset']['scriptFormat']['id']

  backup_strategy(response_path_full, response, site_name)

  #  p response_xml
  update_source = "#{update_source}"
  data = File.read(update_source)
  response_body = data.gsub('"', "'")
  p data

  #  # Change URL for edit request
  url_post =
    base_url + 'edit/' + asset_type + asset_path + cascade_username +
      cascade_password
  p url_post
  p "📝 Replacing #{response_path} with #{update_source}"

  #  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆

  p HTTParty.post(
         url_post,
         body: {
           "asset": {
             "scriptFormat": {
               "script": data,
               "parentFolderId": parent_folder_id,
               "parentFolderPath": parent_folder_path,
               "path": asset_path,
               "siteId": '6fef14a3c04d744c610b81dac0a8d082',
               "siteName": 'Chapman.edu',
               "tags": [],
               "name": 'PrimaryContent',
               "id": asset_id
             }
           }
         }.to_json
       )

  p "🎉        View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
         asset_id
       }&type=#{asset_type}".chomp('/')
end

# ---------------------------------------------------------------------------- #
#                             Edit Data Definition                             #
# ---------------------------------------------------------------------------- #
def edit_data_def(asset_path, update_source)
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION - we'll first read to make a backup
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'read/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'structureddatadefinition/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but Cascade's naming scheme whitespace makes it annoying.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH
  p asset_path
  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password
  #  p url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  #  p response.body

  response_xml = response['asset']['dataDefinition']['xml']
  site_name = response['asset']['dataDefinition']['siteName']
  response_name = response['asset']['dataDefinition']['name']
  response_path = response['asset']['dataDefinition']['path']
  response_path_full = site_name + '/' + response_path

  parent_container_id = response['asset']['dataDefinition']['parentContainerId']
  asset_id = response['asset']['dataDefinition']['id']

  backup_strategy(response_path_full, response, site_name)

  p "📝 Replacing #{response_path_full} with #{update_source}"
  update_source = "#{update_source}"
  data = File.read(update_source)
  # p data
  response_body = data

  #  # Change URL for edit request
  url_post =
    base_url + 'edit/' + asset_type + asset_path + cascade_username +
      cascade_password

  #  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
  p HTTParty.post(
         url_post,
         body: {
           asset: {
             dataDefinition: {
               xml: data,
               path: asset_path,
               parentContainerId: parent_container_id,
               siteName: site_name,
               id: asset_id
             }
           }
         }.to_json
       )
  p "🎉        View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
         asset_id
       }&type=#{asset_type}".chomp('/')
end

# ---------------------------------------------------------------------------- #
#                                  Edit Block                                  #
# ---------------------------------------------------------------------------- #
def edit_block(asset_path, update_source)
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'read/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'block/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password

  p url

  response = HTTParty.get(url)
  p response.body

  p response_xml = response['asset']['xmlBlock']['xml']
  p asset_id = response['asset']['xmlBlock']['id']
  p site_name = response['asset']['xmlBlock']['siteName']
  p response_name = response['asset']['xmlBlock']['name']
  p response_path = response['asset']['xmlBlock']['path']
  p parent_folder_id = response['asset']['xmlBlock']['parentFolderId']

  response_path_full = site_name + '/' + response_path

  response_xml = response['asset']['xmlBlock']['xml']
  p response_xml

  backup_strategy(response_path_full, response, site_name)

  cascade_assets_changes = 'dist/staging/cascade-assets.xml'

  data = File.read(cascade_assets_changes)
  p data

  response_body = data

  url_post =
    base_url + 'edit/' + asset_type + asset_path + cascade_username +
      cascade_password

  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
  # HTTParty.post(url_post, body: { asset: { xmlBlock: { xml: data, path: "_cascade/blocks/html/0-write-test", parentFolderId: parent_folder_id, siteName: "Chapman.edu", id: "365ae5dec0a81e8a20b1d746fd3e0778" } } }.to_json)

  p HTTParty.post(
         url_post,
         body: {
           asset: {
             xmlBlock: {
               xml: data,
               path: asset_path,
               parentFolderId: parent_folder_id,
               siteName: site_name,
               id: asset_id
             }
           }
         }.to_json
       )
  p "🎉        View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
         asset_id
       }&type=#{asset_type}".chomp('/')
end

# ---------------------------------------------------------------------------- #
#                               Edit Shared Field                              #
# ---------------------------------------------------------------------------- #
def edit_shared_field(asset_path, update_source)
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'read/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'sharedfield/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password
  #  p url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  #  p response.body
  response_xml = response['asset']['sharedField']['script']

  response_xml = response['asset']['sharedField']['xml']
  site_name = response['asset']['sharedField']['siteName']
  response_name = response['asset']['sharedField']['name']
  response_path = response['asset']['sharedField']['path']

  response_path_full = site_name + '/' + response_path

  parent_folder_id = response['asset']['sharedField']['parentFolderId']
  parent_folder_path = response['asset']['sharedField']['parentFolderPath']
  parent_container_path = response['asset']['sharedField']['parentContainerPath']

  asset_id = response['asset']['sharedField']['id']

  backup_strategy(response_path_full, response, site_name)

  #  p response_xml
  update_source = "#{update_source}"
  data = File.read(update_source)
  response_body = data.gsub('"', "'")
  p data

  #  # Change URL for edit request
  url_post =
    base_url + 'edit/' + asset_type + asset_path + cascade_username +
      cascade_password
  p url_post
  p "📝 Replacing #{response_path} with #{update_source}"

  #  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆

  p HTTParty.post(
         url_post,
         body: {
           "asset": {
             "sharedField": {
               "xml": data,
               "parentFolderId": parent_folder_id,
               "parentFolderPath": parent_folder_path,
               "path": asset_path,
               "siteId": '6fef14a3c04d744c610b81dac0a8d082',
               "siteName": 'Chapman.edu',
               "id": asset_id,
               "parentContainerPath": parent_container_path,
             }
           }
         }.to_json
       )

    

  p "🎉        View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
         asset_id
       }&type=#{asset_type}".chomp('/')
end


# ---------------------------------------------------------------------------- #
#                                  Create File                                 #
# ---------------------------------------------------------------------------- #
# create file (such as master.css or master.js)
def create_file(file_name, asset_path, update_source)
  response_name = "#{response_name}"
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'create/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'file/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  update_source = "#{update_source}"

  data = File.read(update_source)
  p data

  response_body = data

  url_post =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password

  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
  # HTTParty.post(url_post, body: { asset: { xmlBlock: { xml: data, path: "_cascade/blocks/html/0-write-test", parentFolderId: parent_folder_id, siteName: "Chapman.edu", id: "365ae5dec0a81e8a20b1d746fd3e0778" } } }.to_json)

  p HTTParty.post(
         url_post,
         body: {
          "asset": {
            "file": {
              "text": data,
              "rewriteLinks": false,
              "maintainAbsoluteLinks": false,
              "shouldBePublished": true,
              "shouldBeIndexed": true,
              # "lastPublishedDate": "Jul 15, 2020, 12:56:28 AM",
              "lastPublishedBy": "cbryant",
              "expirationFolderRecycled": false,
              "metadataSetId": "6fef14a3c04d744c610b81da9d165a27",
              "metadataSetPath": "Default",
              "metadata": {},
              "reviewOnSchedule": false,
              "reviewEvery": 180,
              # "parentFolderId": "fd5121b0c04d744c42ab23aa0aba0ba8",
              "parentFolderPath": "_assets",
              # "lastModifiedDate": "Feb 26, 2019, 1:05:39 PM",
              # "lastModifiedBy": "mthomas",
              # "createdDate": "Feb 26, 2019, 1:05:39 PM",
              # "createdBy": "mthomas",
              # "path": "#{asset_path}#{file_name}",
              # "siteId": "6fef14a3c04d744c610b81dac0a8d082",
              "siteName": "Chapman.edu",
              "tags": [],
              "name": file_name,
              # "id": "2ba09c01c0a81e4b0015d01bfd25ea78"
            }
          },
          "success": true
        }.to_json
       )
  # p "🎉        View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
  #        asset_id
  #      }&type=#{asset_type}".chomp('/')
end

# ---------------------------------------------------------------------------- #
#                                 Create Block                                 #
# ---------------------------------------------------------------------------- #
def create_block(asset_name, parent_folder_path, update_source)
  asset_name = "#{asset_name}"

  p 
  p " in create_block "
  p 
  response_name = "#{response_name}"
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'create/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = 'block/' # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "#{parent_folder_path}" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  update_source = "#{update_source}"

  data = File.read(update_source)
  
  p data

  response_body = data

  p "asset_name #{asset_name}"
  p "asset_type #{asset_type}"
  p "asset_path #{parent_folder_path}"

  url_post =
    "#{base_url}create/#{asset_type}#{asset_path}/#{asset_name}#{cascade_username}#{cascade_password}"


  p "url_post #{url_post}"

  # 👹Editing assets unfortunately requires PATH, SITENAME, ID. This can be obtained by reading the asset's response.body 👆
  # HTTParty.post(url_post, body: { asset: { xmlBlock: { xml: data, path: "_cascade/blocks/html/0-write-test", parentFolderId: parent_folder_id, siteName: "Chapman.edu", id: "365ae5dec0a81e8a20b1d746fd3e0778" } } }.to_json)

  p HTTParty.post(
         url_post,
         body: {
  "asset": {
    "xmlBlock": {
      "xml": "#{data}",
      "expirationFolderRecycled": false,
      "metadataSetId": "6fef14a3c04d744c610b81da9d165a27",
      "metadataSetPath": "Default",
      "metadata": {
        "displayName": "",
        "title": "",
        "summary": "",
        "teaser": "",
        "keywords": "",
        "metaDescription": "",
        "author": ""
      },
      "reviewOnSchedule": false,
      "reviewEvery": 0,
      "parentFolderId": "8516f0a9c04d744c610b81da2d21be44",
      "parentFolderPath": "#{parent_folder_path}",
      "lastModifiedDate": "Oct 8, 2020 12:28:25 AM",
      "lastModifiedBy": "cbryant",
      "createdDate": "Apr 27, 2015 5:10:43 PM",
      "createdBy": "mthomas",
      "path": "_cascade/blocks/html/cascade-assets",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "#{asset_name}",
      "id": "fd5c8e3dc04d744c42ab23aad07d62a6"
    }
  },
  "success": true
}.to_json
       )
  # p "🎉        View changes at https://dev-cascade.chapman.edu/entity/open.act?id=#{
  #        asset_id
  #      }&type=#{asset_type}".chomp('/')
end

# ---------------------------------------------------------------------------- #
#                                 Local Backups                                #
# ---------------------------------------------------------------------------- #
def backup_strategy(response_path_full, response, site_name)
  backup_filename = response_path_full.gsub('/', '_').gsub('.', '_')
  asset_type = "#{asset_type}"
  site_name = "#{site_name}"

  backup_dir = "_backup/#{site_name}#{asset_type}/#{backup_filename}/"
  p "backup_dir: #{backup_dir}"
  p "👼 Backing up Cascade asset in #{backup_dir}"
  FileUtils.mkdir_p(backup_dir) unless File.directory?(backup_dir)
  time = Time.now

  backup_files_count =
    Dir[File.join(backup_dir, '**', '*')].count { |file| File.file?(file) }.to_i
  backup_files_max = 10
  backup_file_oldest =
    Dir[backup_dir + '*.bak'].sort_by { |f| File.ctime(f) }.last(1)[0]

  if backup_files_count <= backup_files_max
    File.write(
      backup_dir + backup_filename + '__' + time.strftime('%m-%d-%Y.%H.%M.%S') +
        '.bak',
      response['asset']
    )
  else
    p "🚨 Reached file backup limit ( #{backup_files_max} )"
    p "♻️  Overwriting oldest backup ( #{backup_file_oldest} )"
    File.write(backup_file_oldest, response['asset'])
    puts
  end
end

# ---------------------------------------------------------------------------- #
#                                 Publish Asset                                #
# ---------------------------------------------------------------------------- #
def publish_asset(asset_type, asset_path) 
  # * 1) BASE URL
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s

  # * 2) REST API ACTION
  # https://wimops.chapman.edu/wiki/WWW#Key_Links
  # https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
  rest_action = 'publish/'.to_s # ! KEEP TRAILING SLASH

  # * 3) ASSET TYPE
  # this is easy to find in cascade's edit/preview url.
  # ie https://dev-cascade.chapman.edu/entity/open.act?id=7f74b81ec04d744c7345a74906ded22a&type=page
  asset_type = "#{asset_type}/" # ! KEEP TRAILING SLASH

  # * 4) ASSET PATH OR ID
  # you can also use its path (ie "Chapman.edu/_cascade/formats/modular/widgets/1-column")... but.. whitespace.
  asset_path = "#{asset_path}" # ! NO TRAILING SLASH

  # * 5) SECRETS
  # set these in environment_variables.yml
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']

  # the constructed url should look something like:
  # https://dev-cascade.chapman.edu/api/v1/read/folder/Chapman.edu/_cascade/formats/modular/widgets/foldername?u=username&p=password

  url =
    base_url + rest_action + asset_type + asset_path + cascade_username +
      cascade_password
  p url

  # Inspect response for required details below 👇
  response = HTTParty.get(url)
  p response.body
end

# ---------------------------------------------------------------------------- #
#   edit format `Chapman.edu/_cascade/formats/level/Masthead`   #
# ---------------------------------------------------------------------------- #
desc 'Updates `Chapman.edu/_cascade/formats/level/Masthead` with `.cascade-code/Chapman.edu/_cascade/formats/level/Masthead.vtl`'
task edit_2_3_col_masthead: :environment do
  edit_format(
    'Chapman.edu/_cascade/formats/level/Masthead',
    '.cascade-code/Chapman.edu/_cascade/formats/level/Masthead.vtl'
  )
end