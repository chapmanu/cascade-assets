require 'zip_file_generator'
require 'render_anywhere'
include RenderAnywhere
# rubocop:enable Metrics/BlockLength

desc "Build assets for deployment to Cascade."
task build: :environment do
  if Rails.env.development?
    puts "Please specify build environment"
    puts "Examples:"
    puts "  rake build RAILS_ENV=staging"
    puts "  rake build RAILS_ENV=production"
  else
    prep_dist
    zip rails_asset_path, dist_assets_path
    Rake::Task['changelog'].invoke
    File.write(dist_cascade_block_path, render(file: 'layouts/cascade-assets.xml', layout: false))
    unzip('dist/netlify/_assets.zip', 'dist/netlify/_assets')
  end
end

task do_precompile: :environment do
  Rake::Task['assets:clobber'].invoke
  Rake::Task['assets:precompile'].invoke
end

desc "Log Git Changes."
task :changelog do
  dist_folder = "./dist"

  git_log = './dist/changelog.log'
  current_branch = `git rev-parse --abbrev-ref HEAD`

  puts "👀👀👀 LOGGING CHANGES 👀👀👀"
  File.delete(git_log) if File.exist?(git_log)
  open(git_log, 'w') { |f|
    f.puts "--------------------------------------------------------------------------"
    f.puts "Comparing commits from current branch <![CDATA[#protect #{current_branch} #protect]]> to MASTER "
    f.puts "--------------------------------------------------------------------------"
    f.puts `git --no-pager diff --name-only FETCH_HEAD $(git merge-base FETCH_HEAD master)`
    f.puts "--------------------------------------------------------------------------"
    puts
    puts
    f.puts "Uncommitted local changes:"
    f.puts "--------------------------------------------------------------------------"
    f.puts `git status`
    }
end 

####################
# HELPER FUNCTIONS #
####################

def prep_dist
  FileUtils.mkdir('dist') unless File.directory?('dist')
  FileUtils.rm_rf dist_folder
  FileUtils.mkdir dist_folder
  prep_netlify
end

def prep_netlify
  File.write(netlify_erb, render(file: 'layouts/netlify.html.erb', layout: false))
  File.rename(netlify_erb, netlify_index)
  File.delete('dist/staging/index.html') if File.exist?('dist/staging/index.html')
  File.delete('dist/production/index.html') if File.exist?('dist/production/index.html')

  File.delete('dist/netlify/readme.txt') if File.exist?('dist/netlify/readme.txt')
  open('dist/netlify/readme.txt', 'w') { |f|
    f.puts "-Why?
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
        "    
    }
end

def netlify_erb
  Rails.root.join('dist', Rails.env, 'netlify.html.erb')
end

def netlify_index
  Rails.root.join('dist', Rails.env, 'index.html')
end

def netlify_move_index
  FileUtils.mv(netlify_index, 'dist/netlify/_assets/')
end

def rails_asset_path
  Rails.root.join('public', '_assets')
end

def dist_folder
  Rails.root.join('dist', Rails.env)
end

def dist_assets_path
  Rails.root.join('dist', Rails.env, '_assets.zip')
end

def dist_cascade_block_path
  Rails.root.join('dist', Rails.env, 'cascade-assets.xml')
end

def preload_js_link(*sources)
  options = sources.extract_options!.stringify_keys
  path_options = options.extract!('protocol').symbolize_keys

  sources.uniq.map { |source|
    tag_options = {
      "rel" => "script",
      "media" => "all",
      "href" => path_to_javascript(source, path_options)
    }.merge!(options)
    tag(:link, tag_options)
  }.join("\n").html_safe
end

def zip(input_folder, output_name)
  zf = ZipFileGenerator.new(input_folder, output_name)
  zf.write
end

def unzip(file, destination)
  FileUtils.mkdir_p(destination)

  Zip::File.open(file) do |zip_file|
    zip_file.each do |f|
      fpath = File.join(destination, f.name)
      FileUtils.mkdir_p(File.dirname(fpath))
      zip_file.extract(f, fpath) unless File.exist?(fpath)
    end
  end
end

task netlify: :environment do
  Rake::Task['assets:clobber'].invoke
  Rake::Task['assets:precompile'].invoke

  prep_dist
  zip rails_asset_path, dist_assets_path
  unzip('dist/netlify/_assets.zip', 'dist/netlify/_assets')
  prep_netlify

  # Rake::Task['changelog'].invoke
  # File.write(dist_cascade_block_path, render(file: 'layouts/cascade-assets.xml', layout: false))

  # `git add dist/netlify .`
  # `git commit -m 'rake netlify - add dist/netlify changes'`
  # `git push`

  puts "deploying assets to http://chapman.netlify.app"
end
