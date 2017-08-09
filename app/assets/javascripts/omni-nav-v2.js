var OmniNav2 = (function() {


  var $container, $utility_nav, $primary_nav;

  var initialize = function(container, utility_nav, primary_nav) {
    $container = container;
    $utility_nav = utility_nav;
    $primary_nav = primary_nav;
    $('.utility-nav-trigger').on('click', onUtilityNavClick);
    $utility_nav.find('li.utility-has-dropdown').on('click', onUtilityNavDropdownClick);
    $utility_nav.find('input:text').on('input', onSearchInput);
    $primary_nav.find('input:text').on('input', onSearchInput); 
  }

  var onUtilityNavClick = function() {
    $('.primary-nav-action').toggleClass("utility-open");

    if($(window).width() >= 768 ){
      $utility_nav.toggleClass('utility-nav-open');
      $('html.omni-nav-v2').toggleClass('utility-nav-open');  
      $primary_nav.removeClass('search-open');    
    } else {
      $utility_nav.removeClass('utility-nav-open');
      $('html.omni-nav-v2').removeClass('utility-nav-open'); 
      $primary_nav.toggleClass('search-open');
    }

    var primary_nav_classes = document.getElementById('primary-nav').classList;

    // jQuery < 3.0 doesn't support toggleClass for SVGs
    // toggle open iff one of the search bars is open
    if(primary_nav_classes.contains("search-open") || $utility_nav.hasClass('utility-nav-open')) {
      $('.icon-open-search').attr("class", "icon-open-search hide");
      $('.icon-close-search').attr("class", "icon-close-search");
    } else {
      $('.icon-open-search').attr("class", "icon-open-search");
      $('.icon-close-search').attr("class", "icon-close-search hide");
    }
  };

  var onUtilityNavDropdownClick = function(e) {
    e.stopPropagation();
    $(this).siblings('.utility-has-dropdown').removeClass('dropdown-open');
    $(this).toggleClass('dropdown-open');
    $(document).on("click", onDocumentClick);
  };

  var onDocumentClick = function() {
    $('li.utility-has-dropdown').removeClass('dropdown-open');
    $(document).off("click", onDocumentClick);
  };

  var onSearchInput = function() {
    $('.search-icon').addClass('hide');
    $(document).on("click", function() {
      // resets search input box when user clicks outside
      $utility_nav.find('input:text').val("");
      $primary_nav.find('input:text').val("");
      $('.search-icon').removeClass('hide');
    });
  };

  return {
    init: initialize
  };
})();

var OffCanvasNav = (function() {

  var initialize = function() {
    syncLinkWidths();

    $('#js-off-canvas-trigger, #js-close-off-canvas-nav, #js-off-canvas-overlay').on('click', function(event) {
      event.preventDefault();
      $('#js-off-canvas-nav-container').toggleClass('open');
      $('#js-off-canvas-overlay').toggleClass('active');
      $('body').toggleClass('no-scroll');
    });

    $('#js-off-canvas-nav-container .toggle').on('click', function() {
      $(this).parent().toggleClass('open'); // Targets li
      $(this).parent().find('ul').slideToggle();
    });

    $(window).on('resize', function() {
      syncLinkWidths();
    });
  };

  var syncLinkWidths = function() {
    var width = $('#js-off-canvas-nav > ul').width();
    $('#js-off-canvas-nav > ul > li > a').css('width', width);
  };

  return {
    init: initialize
  };
})();


$(document).ready(function () {
  var container = $('#omni-nav-v2');
  var utility_nav = container.find('.utility-nav');
  var primary_nav = container.find('#primary-nav');

  OmniNav2.init(container, utility_nav, primary_nav);
  OffCanvasNav.init();
});