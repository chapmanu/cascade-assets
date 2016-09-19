# This file is used by Rack-based servers to start the application.

# Make everything under this dir static for rapid dev of mergency static landing pages.
use Rack::Static, :urls => ["/interim-ad-landing-pages"]

require ::File.expand_path('../config/environment', __FILE__)
run Rails.application
