$(document).ready(function () {
  if ($(".image-slider")[0]) {
    var slider = $(".widget-slides").lightSlider({
      gallery: false,
      item: 1,
      slideMargin: 0,
      speed: 500,
      pause: 5000,
      auto: true,
      loop: true,
      keyPress: true,
      pauseOnHover: true,
      adaptiveHeight: true,
      useCSS: true,
      onSliderLoad: function () {
        $(".widget-slides").removeClass("cS-hidden");
      },
    });
    clickPause();
    clickPlay();
    fixActiveState();
    $(".image-slider-pause").keydown(function (e) {
      if (e.which == 13) {
        //Enter key pressed
        pause();
      }
    });
    $(".image-slider-play").keypress(function (e) {
      if (e.which == 13) {
        //Enter key pressed
        play();
      }
    });
    // IE Fallback for widget-slides img { object-fit: } CSS property
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      $("img").each(function () {
        var t = $(this),
          s = "url(" + t.attr("src") + ")",
          p = t.parent(),
          d = $("<div></div>");
        p.append(d);
        d.css({
          height: t.parent().css("height"),
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": "50% 20%",
          "background-image": s,
        });
        t.hide();
      });
    }

    function clickPause() {
      $(".image-slider-pause").on("click", function (event) {
        pause();
      });
    }

    function pause() {
      $(".image-slider-pause").hide();
      $(".image-slider-play").show();
      slider.pause();
    }

    function clickPlay() {
      $(".image-slider-play").on("click", function (event) {
        play();
      });
    }

    function play() {
      $(".image-slider-play").hide();
      $(".image-slider-pause").show();
      slider.play();
    }

    $(".image-slider-wrapper").each(function () {
      if ($(this).children(".item").length <= 0) {
        $(".image-slider-play-toggle").hide();
        $(".lSPager").hide();
      }
    });
  }
});
$(window).on("load", function () {
  if ($(".image-slider-play-toggle")[0]) {
    $(".image-slider-play-toggle").insertBefore("ul.lSpg li:first");
    fixActiveState();
  }
});

function fixActiveState() {
  // fix plugin's 'active' class inconsitency
  $(".lSPager li").on("click", function (event) {
    $(".lSPager *").removeClass("cu-active");
    $(".lSPager *").removeClass("active");
    $(this).find("a").addClass("cu-active");
    $(this).find("a").addClass("active");
    $(this).trigger("click");
  });
}
