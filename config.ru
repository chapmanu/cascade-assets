# This file is used by Rack-based servers to start the application.

# Make everything under this dir static for rapid dev of emergency static ad landing pages.
use Rack::Static, :urls => ["/landing-pages"]

require ::File.expand_path('../config/environment', __FILE__)
run Rails.application
