#
# This class mimics the Cascade Velocity XPathTool. See Hannon Hill docs for more information:
# - http://www.hannonhill.com/kb/Script-Formats/
#
module Cascade
  class XPathTool
    def self.selectSingleNode(node, xpath)
        # Mirrors Cascade Velocity helper: $_XPathTool.selectSingleNode(node, xpath).
        # Returns Nokogiri Node element mimicking Cacade JDOM element.

        # Special case which returns node, which should be the data definition XML document.
        return node if xpath == "//system-page[@current]"

        xpath = format('//%s', xpath) unless xpath.start_with?('/')
        node.at_xpath(xpath)
    end

    def self.selectNodes(node, identifier)
      # Mirrors Cascade Velocity helper: $_XPathTool.selectNodes(node, xpath). But only supports
      # a single identifier at present, not an xpath because Cascade xpaths are paths of
      # identifiers whereas Nokogiri and the rest of world expects node names.
      # See http://www.hannonhill.com/kb/Script-Formats/#xpath-tool
      # Returns Nokogiri NodeSet array.
      xpath = format('*[@identifier="%s"]', identifier)
      node.xpath(xpath)
    end
  end
end