$(function () {
  if ($('.testimonial-widget').length) {
    $('.testimonial-widget').slick({
      arrows: false,
      centerPadding: "0px",
      dots: false,
      slidesToShow: 1,
      infinite: true,
      variableWidth: false,
    });
    $('.testimonial-widget__button--left').click(function () {
      console.log('clicked')
      $(this).closest('.testimonial-widget').slick('slickPrev');
    });
    $('.testimonial-widget__button--right').click(function () {
      console.log('clicked')
      $(this).closest('.testimonial-widget').slick('slickNext');
    });
    // The plugin is not fully accessible (despite its claims) when there are links within a slide. Instead, it sets tabindex to -1 for slides not currently visible.  
    // On tab (within .testimonial-widget)
    $('.testimonial-widget').keyup(function (e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 9) {
        // Add tabindex 0 to a elements
        console.log('tab')
        $(".testimonial-widget a").each(function (i) {
          $(this).attr('tabindex', '0');
        });
      }
    });
  };
});