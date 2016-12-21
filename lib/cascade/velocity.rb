#
# This class mimics, or parodies, the helpers and functions provided by Velocity in
# Cascade. Perhaps in the future, it could be replaced by a full-fledged Velocity
# templating DSL (like Slim).
#
module Cascade
  class Velocity
    # Simple proof-of-concept method.
    # Usage: <%= Cascade::Velocity.output('<h3>Primary Content Here</h3>') %>
    def self.output(html)
        html.html_safe
    end
  end
end
