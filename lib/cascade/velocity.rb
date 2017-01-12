#
# This class mimics, or parodies, the helpers and functions provided by Velocity in
# Cascade. Perhaps in the future, it could be replaced by a full-fledged Velocity
# templating DSL (like Slim).
#
module Cascade
  class Velocity
    # This method is syntactic pap. It doesn't do anything functional except mimic the VTL import
    # method in a view context. Macros should be added to macros.rb.
    # Usage: Cascade::Velocity.import('/_cascade/formats/helpers.velocity')
    def self.import(path)
        path
    end

    # More syntactic pap. It mimics the VTL set method in a view context.
    # Usage:
    def self.set(var)
        var
    end

    # Simple proof-of-concept method.
    # Usage: <%= Cascade::Velocity.output('<h3>Primary Content Here</h3>') %>
    def self.output(html)
        html.html_safe
    end
  end
end
