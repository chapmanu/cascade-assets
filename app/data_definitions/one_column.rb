module DataDefinitions
  class OneColumn < DataDefinitions::Base
    # XML XPath Selectors
    XPATH = {
      masthead_type: '//group[@identifier="masthead"]/text[@identifier="mastheadType"]',
      primary_widget_image_with_text: '//group[@identifier="primaryContent"]' \
                                      '/group[@identifier="widget"]' \
                                      '/text[@identifier="widgetType"]'
    }.freeze

    # Preset Data Values
    DEFAULTS = {
      XPATH[:masthead_type] => 'Side panel hero'
    }.freeze

    # Class Methods
    def self.default
      one_column = DataDefinitions::OneColumn.new
      one_column.set_defaults
      one_column
    end
  end
end
