source 'https://rubygems.org'


gem 'autoprefixer-rails', '~> 6.4'
gem 'awesome_print'
gem 'foreman'
gem 'nokogiri'
gem 'render_anywhere', require: false
gem 'rubyzip'
gem 'tzinfo-data'
gem 'json'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 6.0.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 4.2'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 5.0.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

gem 'httparty'
# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Rails 4 ignores assets.digest = false. This makes non-digested assets possible. For
# Omninav build tasks.
gem "non-stupid-digest-assets", group: :development

# Access an IRB console on exception pages or by using <%= console %> in views
gem 'web-console', '~> 2.0', group: :development
# gem 'font-awesome-rails', '~> 4.7', '>= 4.7.0.2'

# gem 'activemodel', '~> 4.2', '>= 4.2.6'

gem 'webpacker', '~> 5.x'

# Test-Only Gems
group :test do
  # Rubocop static code analyzer: https://github.com/bbatsov/rubocop
  gem 'rubocop'

  # Feature-testing with Capybara and Selenium
  # gem "minitest-rails-capybara"
  gem 'selenium-webdriver'

  # PhantomJS webdriver for Capybara: https://github.com/teampoltergeist/poltergeist
  # Requires phantomjs installed: brew install phantomjs
  gem 'poltergeist'

  # Stub or block HTTP requests in tests: https://github.com/bblimke/webmock
  gem 'webmock'
end

# Gems for Development and Test
group :development, :test do
  require 'em/pure_ruby'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  
  gem 'guard-livereload', '~> 2.4', require: false
end
