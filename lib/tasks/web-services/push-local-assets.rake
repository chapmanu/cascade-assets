desc 'Updates `Chapman.edu/_cascade/formats/modular/widgets/Collapsibles` with `.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Collapsibles`'
task push_noncompiled_assets: :environment do
 
    # local_file = 'dist/staging/cascade-assets.xml'
    # html = Nokogiri.HTML(URI.open(local_file, read_timeout: 300))
    # p master_css = html.at('link[rel="stylesheet"]')['href']

    # edit_file('96ab024cc0a81e8a57740fffa611a0af', '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl' )


  #   File.delete('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb') if File.exist?('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb')

  #   FileUtils.cp('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl', '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb')
  `rake assets:precompile`
  localhost_css_contents = Net::HTTP.get(URI.parse('http://localhost:3000/_assets/master.css'))

  localhost_js_contents = Net::HTTP.get(URI.parse('http://localhost:3000/_assets/master.js'))
  # # puts localhost_css_contents.gsub( /\/\*.+?\*\// , "")
  # puts localhost_css_contents

    
  # open('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb', 'a') do |f|
  #   f.puts "<![CDATA[#protect 
  #     <style> 
  #     #{localhost_css_contents.force_encoding('utf-8').gsub( /\/\*.+?\*\// , "")}  
  #      </style>  
  #      #protect]]> "
  # end
  
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']


  # Chapman.edu/_assets/master-ed688107f1e1b642819e7dfd607c5c005f895c3a0971cc13b6f249328e3bdf101.css
  
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s
  url_post =
  base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/grid-block.css' + cascade_username +
    cascade_password
p url_post

  p HTTParty.post(
       url_post,
       body: {
        "asset": {
          "file": {
            "text": "#{localhost_css_contents.force_encoding('utf-8')}",
            "data": [
              104,
              101,
              108,
              108,
              111
            ],
            "rewriteLinks": false,
      "maintainAbsoluteLinks": false,
      "shouldBePublished": true,
      "shouldBeIndexed": true,
      "lastPublishedDate": "Nov 5, 2020 9:16:49 AM",
      "lastPublishedBy": "cscddev01500",
      "expirationFolderRecycled": false,
      "metadataSetId": "6fef14a3c04d744c610b81da9d165a27",
      "metadataSetPath": "Default",
      "metadata": {},
      "reviewOnSchedule": false,
      "reviewEvery": 180,
      "parentFolderId": "7f4306c1c0a81e411677d28d4eb74357",
      "parentFolderPath": "test-section/nick-test",
      "lastModifiedDate": "Nov 5, 2020 9:16:44 AM",
      "lastModifiedBy": "cscddev01500",
      "createdDate": "Nov 4, 2020 8:29:51 PM",
      "createdBy": "nnadel",
      "path": "test-section/nick-test/grid-block.css",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "grid-block.css",
      "id": "96ab024cc0a81e8a57740fffa611a0af"
          }
        },
        "success": true
      }.to_json
     )

     publish_asset('file', '96ab024cc0a81e8a57740fffa611a0af')

    #  JAVASCRIPT
    base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/grid-block.js' + cascade_username +
    cascade_password
p url_post

  p HTTParty.post(
       url_post,
       body: {
        "asset": {
          "file": {
            "text": "#{localhost_js_contents.force_encoding('utf-8')}",
            "data": [
              104,
              101,
              108,
              108,
              111
            ],
            "rewriteLinks": false,
      "maintainAbsoluteLinks": false,
      "shouldBePublished": true,
      "shouldBeIndexed": true,
      "lastPublishedDate": "Nov 10, 2020 11:00:54 AM",
      "lastPublishedBy": "nnadel",
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
      "reviewEvery": 180,
      "parentFolderId": "7f4306c1c0a81e411677d28d4eb74357",
      "parentFolderPath": "test-section/nick-test",
      "lastModifiedDate": "Nov 10, 2020 11:05:30 AM",
      "lastModifiedBy": "nnadel",
      "createdDate": "Nov 10, 2020 11:00:31 AM",
      "createdBy": "nnadel",
      "path": "test-section/nick-test/grid-block.js",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "grid-block.js",
      "id": "b387eec9c0a81e8a57740fff3593b66c"
          }
        },
        "success": true
      }.to_json
     )

     publish_asset('file', 'b387eec9c0a81e8a57740fff3593b66c')
     p url_post
  # edit_format(
  #   '567ec178c0a81e8a1e5ac2884450d7c2',
  #   '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/Grid-Block-Widget.vtl.rb'
  # )

  
end