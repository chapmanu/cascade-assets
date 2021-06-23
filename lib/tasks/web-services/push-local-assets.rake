desc 'updates specified file with http://localhost:3000/_assets/master.css and http://localhost:3000/_assets/master.js'
task push_noncompiled_assets: :environment do

<<<<<<< HEAD
=======
    # edit_file('96ab024cc0a81e8a57740fffa611a0af', '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/personnel-widget-Widget.vtl' )


  #   File.delete('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/personnel-widget-Widget.vtl.rb') if File.exist?('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/personnel-widget-Widget.vtl.rb')

  #   FileUtils.cp('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/personnel-widget-Widget.vtl', '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/personnel-widget-Widget.vtl.rb')
>>>>>>> personnel-widget
  `rake assets:precompile`
  localhost_css_contents = Net::HTTP.get(URI.parse('http://localhost:3000/_assets/master.css'))

  localhost_js_contents = Net::HTTP.get(URI.parse('http://localhost:3000/_assets/master.js'))

<<<<<<< HEAD
=======
    
  # open('.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/personnel-widget-Widget.vtl.rb', 'a') do |f|
  #   f.puts "<![CDATA[#protect 
  #     <style> 
  #     #{localhost_css_contents.force_encoding('utf-8').gsub( /\/\*.+?\*\// , "")}  
  #      </style>  
  #      #protect]]> "
  # end
  
>>>>>>> personnel-widget
  cascade_username = '?u=' + ENV['CASCADE_USERNAME']
  cascade_password = '&p=' + ENV['CASCADE_PASSWORD']
  
  base_url = 'https://dev-cascade.chapman.edu/api/v1/'.to_s
  url_post =
<<<<<<< HEAD
  base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/wavy-masthead.css' + cascade_username +
=======
  base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/personnel-widget.css' + cascade_username +
>>>>>>> personnel-widget
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
<<<<<<< HEAD
      "path": "test-section/nick-test/wavy-masthead.css",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "wavy-masthead.css",
      "id": "8b498875c0a81e8a65cef5df37acd4f1"
=======
      "path": "test-section/nick-test/personnel-widget.css",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "personnel-widget.css",
      "id": "eb4180eec0a81e8a3b000293d2e89273"
>>>>>>> personnel-widget
          }
        },
        "success": true
      }.to_json
     )

<<<<<<< HEAD
     publish_asset('file', '8b498875c0a81e8a65cef5df37acd4f1')

    #  JAVASCRIPT
    base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/wavy-masthead.js' + cascade_username +
=======
     publish_asset('file', 'eb4180eec0a81e8a3b000293d2e89273')

    #  JAVASCRIPT
    base_url + 'edit/' + 'file' + 'Chapman.edu/test-section/nick-test/personnel-widget.js' + cascade_username +
>>>>>>> personnel-widget
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
<<<<<<< HEAD
      "path": "test-section/nick-test/wavy-masthead.js",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "wavy-masthead.js",
      "id": "8b49e58bc0a81e8a65cef5dfa21a9270"
=======
      "path": "test-section/nick-test/personnel-widget.js",
      "siteId": "6fef14a3c04d744c610b81dac0a8d082",
      "siteName": "Chapman.edu",
      "tags": [],
      "name": "personnel-widget.js",
      "id": "eb41c165c0a81e8a3b00029326df982e"
>>>>>>> personnel-widget
          }
        },
        "success": true
      }.to_json
     )

<<<<<<< HEAD
     publish_asset('file', '8b49e58bc0a81e8a65cef5dfa21a9270')
    #  system("open ~/workspace/cascade-assets/dist/_config/index.html")
=======
     publish_asset('file', 'eb41c165c0a81e8a3b00029326df982e')
     p url_post
  # edit_format(
  #   '567ec178c0a81e8a1e5ac2884450d7c2',
  #   '.cascade-code/Chapman.edu/_cascade/formats/modular/widgets/personnel-widget-Widget.vtl.rb'
  # )
>>>>>>> personnel-widget

  
end