module DataDefinitions
  class TwoColumn < DataDefinitions::Base
    # XML XPath Selectors
    XPATH = {
      masthead_type: '//group[@identifier="masthead"]/text[@identifier="mastheadType"]',
      branded_header: '//group[@identifier="branded201611"]/text[@identifier="header"]',
      branded_image_path: '//group[@identifier="branded201611"]/asset[@identifier="image"]',
      branded_alt_text: '//group[@identifier="branded201611"]/text[@identifier="altText"]',
      v201611_header: '//group[@identifier="slider201611"]/text[@identifier="header"]'
    }.freeze

    # Preset Data Values
    DEFAULTS = {
      XPATH[:masthead_type] => 'Branded Masthead',
      XPATH[:branded_header] => 'A Brand New Branded Masthead',
      XPATH[:branded_image_path] => 'media/images/mastheads/dmac-masthead.jpg',
      XPATH[:branded_alt_text] => 'Branded - New alt text',
      XPATH[:v201611_header] => 'Campus Life at Chapman University'
    }.freeze

    # Preset data as hash representing Cascade XML data.
    CASCADE_DATA = {
      v201611: {
        slider: {
          header: 'Campus Life at Chapman University',
          slides: [
            {
              subTitle: '',
              altText: 'the altText is not the alt-right',
              photoBy: 'I.M. Photographer',
              image: {path: 'media/images/mastheads/slider-v201611.jpg'}
            },
            {
              subTitle: 'Optional text can go here',
              altText: 'image alt attribute here',
              photoBy: '',
              image: {path: 'media/images/mastheads/slider-v201611.jpg'}
            },
            {
              subTitle: 'Slider Slide \n #3 of 3',
              altText: 'image alt attribute here',
              photoBy: '',
              image: {path: 'media/images/mastheads/slider-v201611.jpg'}
            }
          ]
        }
      }
    }.freeze

    # Class Methods
    def self.default
      two_column = DataDefinitions::TwoColumn.new
      two_column.set_defaults
      two_column
    end
  end
end
