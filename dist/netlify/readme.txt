-Why?
    Previously, pushing requested changes to Cascade was a 15 minute process between bin/build,uploading the _assets.zip, publishing the extracted assets and pages, etc...
    
    The idea here is to use the provided Cascade-Assets.xml block once per story, and use the commandline to push changes. To start, this is only on dev-WWW, but we'd like to eventually use it on production. 
    
    -How?
        This relies on the following files:
            -config/environments/netlify.rb 
            -app/views/layouts/netlify.html.erb
            -lib/tasks/build.rake
            -dist/netlify
            -bin/build
    
        1) Netlify (https://app.netlify.com/sites/chapman/overview) automatically builds the changes in dist/netlify for each branch push.
        2) https://chapman.netlify.app/ is the base URL. Individual branches are available at https://branch-name--chapman.netlify.app/
        3) Development branch is set as Netlify's 'production' branch.
        
