$(document).ready(function () {
  if ($(".business-index-widget .index-slider")[0]) {
    var slider = $(".business-index-widget .index-slider").lightSlider({
      item: 2,
      slideMargin: 40,
      slideMove: 0,
      speed: 500,
      pause: 5000,
      auto: false,
      loop: false,
      keyPress: true,
      pauseOnHover: true,
      useCSS: true,
      enableTouch: false,
      enableDrag: false,
      prevHtml: "<i class='fas fa-chevron-left'></i>",
      nextHtml: "<i class='fas fa-chevron-right'></i>",
      freeMove: false,
      controls: true,
      responsive: [
        {
          breakpoint: 905,
          settings: {
            item: 1,
            slideMove: 1,
            slideMargin: 20,
            enableTouch: true,
            enableDrag: true,
            freeMove: true,
          },
        },
      ],
    });

    slider.goToSlide(0);
    slider.pause();
  }
});
