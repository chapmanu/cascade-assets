$(function () {
  if ($(".grid-block-widget").length) {
    console.log('hello?');
    removeEmptyPTagsinWYSIWYG();
    gridBlockWidget();
    calculateDataHeight();
    if (isIE()) {
      $(".grid-block-widget img").each(function () {
        var t = jQuery(this),
          s = "url(" + t.attr("src") + ")",
          p = t.parent(),
          parentClasses = t.attr("class"),
          d = jQuery(
            "<div class='ie__fallback--object-fit grid-block-widget__image'></div>"
          );
        p.prepend(d);
        d.css({
          "min-height": "200px",
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": "50% 50%",
          "background-image": s,
        });
        d.attr("class", parentClasses);
        // $(".grid-block-widget__title").css("max-width", "200px");
        t.remove();
      });
      $(".grid-block-widget__reveal--more").on("click keydown", function (e) {
        parent = $(this).parent();
        $(parent)
          .find(".grid-block-widget__text")
          .removeClass("grid-block-widget__text--truncated")
          .addClass("grid-block-widget__text--revealed");
        $(this).hide();
        $(parent).find(".grid-block-widget__reveal--less").show();
        $(parent)
          .find(".grid-block-widget__text")
          .attr("aria-expanded", "true");
      });
    }
  }
});

var accessibleClick = function (event) {
  var code = event.charCode || event.keyCode,
    type = event.type;

  if (type === "click") {
    return true;
  } else if (type === "keydown") {
    if (code === 32 || code === 13) {
      event.preventDefault();
      return true;
    }
  } else {
    return false;
  }
};

function removeEmptyPTagsinWYSIWYG() {
  // Ross requested this
  $(".grid-block-widget__text p").each(function () {
    var $this = $(this);
    $(this)
      .parent()
      .attr("data-js", "removed empty p tags via grid-block-widget.js");
    if ($this.html().replace(/\s|&nbsp;/g, "").length == 0) $this.remove();
  });
}
function calculateDataHeight() {
  // 2 & 3 COLUMN
  $(
    ".two-column-template .grid-block-widget__text, .three-column-template .grid-block-widget__text"
  ).each(function () {
    $(this).addClass("grid-block-widget__text--truncated");
    var scrollHeight = $(this)[0].scrollHeight;
    $(this).attr("data-scroll-height", scrollHeight);
    $(this)
      .parent(".grid-block-widget")
      .addClass("grid-block-widget--text-overflow");
    if ($(this).attr("data-scroll-height") >= 158) {
      $(this).parent().find(".grid-block-widget__reveal--more").show();
    } else {
      $(this).parent().find(".grid-block-widget__reveal--more").hide();
      $(this).removeClass("grid-block-widget__text--truncated");
    }
  });
  // ONE COLUMN
  $(".one-column .grid-block-widget__text").each(function () {
    $(this).addClass("grid-block-widget__text--truncated");
    var scrollHeight = $(this)[0].scrollHeight;
    $(this).attr("data-scroll-height", scrollHeight);
    $(this)
      .parent(".grid-block-widget")
      .addClass("grid-block-widget--text-overflow");
    if ($(this).attr("data-scroll-height") >= 158) {
      $(this).parent().find(".grid-block-widget__reveal--more").show();
    } else {
      $(this).parent().find(".grid-block-widget__reveal--more").hide();
      $(this).removeClass("grid-block-widget__text--truncated");
    }
  });
}

function gridBlockWidget() {
  var buttonClickCounter = 0;
  $(".grid-block-widget__container").each(function () {
    // IDs are assigned via velocity format
    var currentWidgetContainer = $(this).attr("id");
    var loadMoreButtonButton = " + .grid-block-widget__button";
    var currentButton = "#" + currentWidgetContainer + loadMoreButtonButton;
    var gridBlockWidgetColumns = $("#columns").html($(this).val());
    $(currentButton).on("click keydown", function (e) {
      if (accessibleClick(event)) {
        buttonClickCounter += 1;
        var currentVisible = $("#" + currentWidgetContainer).find(
          ".grid-block-widget:visible"
        ).length;
        var currentHidden = $("#" + currentWidgetContainer).find(
          ".grid-block-widget:hidden"
        ).length;
        var dataColumns = $("#" + currentWidgetContainer).data("columns");
        var numToReveal = $("#" + currentWidgetContainer).data("columns") * 3;
        $(".grid-block-widget__reveal--less").hide();
        if (buttonClickCounter <= 1) {
          $("#" + currentWidgetContainer)
            .find(".grid-block-widget")
            .slice(dataColumns, numToReveal)
            .show();
          $(currentButton).text("Show All");
        }
      }
      if (buttonClickCounter > 1) {
        $(currentButton).fadeOut();
        $("#" + currentWidgetContainer)
          .find(".grid-block-widget")
          .show();
      }
      calculateDataHeight();
    });
  });
  clickHandlers();
}

function clickHandlers() {
  $(".grid-block-widget__reveal--more").on("click keydown", function (e) {
    if (accessibleClick(event)) {
      parent = $(this).parent();
      $(parent)
        .find(".grid-block-widget__text")
        .removeClass("grid-block-widget__text--truncated")
        .addClass("grid-block-widget__text--revealed");
      $(this).hide();
      $(parent).find(".grid-block-widget__reveal--less").show();
      $(parent).find(".grid-block-widget__text").attr("aria-expanded", "true");
    }
  });
  $(".grid-block-widget__reveal--less").on("click keydown", function (e) {
    if (accessibleClick(event)) {
      parent = $(this).parent();
      $(parent)
        .find(".grid-block-widget__text")
        .addClass("grid-block-widget__text--truncated")
        .removeClass("grid-block-widget__text--revealed");
      $(this).hide();
      $(parent).find(".grid-block-widget__reveal--more").show();
      $(parent).find(".grid-block-widget__text").attr("aria-expanded", "false");
    }
  });
}

function gridBlockCarousel() {
  if ($(".grid-block-widget__container--rotate").length) {
    $(".grid-block-widget__container--rotate")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        // accessibility: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
      });
  }
}

function adjustCarouselButtonHeight() {
  $(".one-column .grid-block-widget__container--rotate").each(function () {
    var imgHeight = $(this).find(".grid-block-widget__image").height();
    var buttonHeight = imgHeight / 2;
    var slickButton = $(this)
      .find("button.slick-arrow")
      .css("top", buttonHeight);
  });
}

function ieObjectFitFallback() {
  $(".grid-block-widget img").each(function () {
    var t = jQuery(this),
      s = "url(" + t.attr("src") + ")",
      p = t.parent(),
      parentClasses = t.attr("class"),
      d = jQuery(
        "<div class='ie__fallback--object-fit grid-block-widget__image'></div>"
      );
    p.prepend(d);
    d.css({
      "min-height": "200px",
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%",
      "background-image": s,
    });
    d.attr("class", parentClasses);
    t.remove();
  });
}
$(window).load(function () {
  adjustCarouselButtonHeight();

  $("button.slick-arrow").on("click keydown", function (e) {
    if (accessibleClick(event)) {
      $(".grid-block-widget__reveal--less").trigger("click");
    }
  });
  $("button.slick-prev").on("keydown", function (e) {
    if (accessibleClick(event)) {
      $("button.slick-prev").trigger("click");
    }
  });
  $("button.slick-next").on("keydown", function (e) {
    if (accessibleClick(event)) {
      $("button.slick-next").trigger("click");
    }
  });
  gridBlockCarousel();
  normalizeHeights();
  calculateDataHeight();
});

function normalizeHeights() {
  $(".grid-block-widget__container").each(function () {
    // Get an array of all element heights
    var elementHeights = $(this)
      .find(".grid-block-widget__text")
      .map(function () {
        return $(this).height();
      })
      .get();
    // Math.max takes a variable number of arguments
    // `apply` is equivalent to passing each height as an argument
    var tallest = Math.max.apply(null, elementHeights);
    // Set each height to the max height
    // $(this).find(".grid-block-widget__text").css("min-height", tallest);
  });
  hidePaginationButton();
}

function hidePaginationButton() {
  $(".grid-block-widget__container").each(function () {
    var hidden = $(this).find(".grid-block-widget:hidden").length;
    var button = $(this).find(".grid-block-widget__button");
    var currentWidgetContainer = $(this).attr("id");
    var loadMoreButtonButton = " + .grid-block-widget__button";
    var currentButton = "#" + currentWidgetContainer + loadMoreButtonButton;
    if ($(this).find(".grid-block-widget:hidden").length <= 0) {
      $(currentButton).remove();
    }
  });
}
