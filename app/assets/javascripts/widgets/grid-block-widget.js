$(function () {
  debugging();
  refreshCSS();
  refreshJS();
  ieObjectFitFallback();
  gridBlockWidget();
  $("#clone").trigger("click");
  // $("#random-images").trigger("click");
  gridBlockCarousel();

  setInterval(function () {
    // refreshCSS();
    // refreshJS();
  }, 10000); // 60 seconds
});

function gridBlockWidget() {
  if ($(".grid-block-widget").length) {
    $(".grid-block-widget__text").each(function () {
      var textHeight = $(this).height();
      $(this).attr("data-height", textHeight);
      $(this).addClass("grid-block-widget__text--truncated");

      $(this)
        .parent(".grid-block-widget")
        .addClass("grid-block-widget--text-overflow");
      if ($(this).attr("data-height") >= 150) {
        $(this).parent().find(".grid-block-widget__reveal--more").show();
      }
    });

    var buttonClickCounter = 0;

    $(".grid-block-widget__container").each(function () {
      // IDs are assigned via velocity format
      var currentWidgetContainer = $(this).attr("id");
      var loadMoreButtonButton = " + .grid-block-widget__button";
      var currentButton = "#" + currentWidgetContainer + loadMoreButtonButton;

      $(currentButton).on("click keydown", function (e) {
        if (accessibleClick(event)) {
          console.log("clicked");
          console.log("current widget container: #" + currentWidgetContainer);
          console.log("current widget button: " + currentButton);

          buttonClickCounter += 1;
          console.log("button click counter " + buttonClickCounter);

          var currentVisible = $("#" + currentWidgetContainer).find(
            ".grid-block-widget:visible"
          ).length;
          var currentHidden = $("#" + currentWidgetContainer).find(
            ".grid-block-widget:hidden"
          ).length;
          console.log("current hidden: " + currentHidden);
          var dataColumns = $("#" + currentWidgetContainer).data("columns");
          var numToReveal = $("#" + currentWidgetContainer).data("columns") * 3;
          console.log("numtoreveal: " + numToReveal);
          if (buttonClickCounter <= 1) {
            // $(this).parent().find(".grid-block-widget").nextAll().show();
            // $(this).parent().find(".grid-block-widget").slice(0, 6).show();
            console.log("parent: " + currentWidgetContainer);
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
      });
    });
    clickHandlers();
  }
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

function paginate() {
  // $(".grid-block-widget__button").on("click keydown", function (e) {
  //   if (accessibleClick(event)) {
  //     console.log("clicked");
  //     // $(this).parent().find(".grid-block-widget").nextAll().show();
  //     // $(this).parent().find(".grid-block-widget").slice(0, 6).show();
  //     console.log(
  //       "parent: " +
  //         $(currentWidgetContainer).find(".grid-block-widget__container")
  //     );
  //   }
  // });
}
function debugging() {
  // !!! THIS IS FOR TESTING ONLY - DO NOT MERGE THIS INTO DEV/PROD !!!
  // function clearCache() {
  //   //get the mins of the current time
  //   var mins = new Date().getMinutes();
  //   if (mins == "00") {
  //     window.location.reload(true);
  //   }
  //   console.log("clearing cache in:  " + mins);
  // }

  // setInterval(clearCache, 1000);
  // if (!$("html").hasClass("cleared-cache")) {
  //   $("html").addClass("cleared-cache");
  //   window.location.reload(true);
  // }

  $("head").append('<meta http-equiv="expires" content="timestamp">');
  $("#theme").append(
    '<div id="testing-tools"><a id="close-testing-tools">X</a><a id="clone" class="button button--red">Clone Grid Blocks</a><div id="grid-columns"><input type="range" id="columns" name="columns" min="2" max="6" value="3" step="1" /><label id="grid-col-val" for="columns">3 columns</label></div><p>Note: Column slider will not affect rotators</p><a id="content-editable" class="button button--red">Editable Text</a><a id="random-images" class="button button--red">Randomly Sized Images</a></div>'
  );

  $(document).on("input change", "#columns", function () {
    var numberOfColumns = $(this).val();
    $("#grid-col-val").html(numberOfColumns + " Columns");

    var gridBlockWidgetColumns = $("#columns").html($(this).val());
    var bodyStyles = window.getComputedStyle(document.body);
    var fooBar = bodyStyles.getPropertyValue("--gridBlockWidgetColumns"); //get
    document.body.style.setProperty(
      "--gridBlockWidgetColumns",
      gridBlockWidgetColumns
    ); //set

    $("#grid-col-val").text().split(" ")[0];

    var gridBlockWidgetColumns = $("#grid-col-val").text().split(" ")[0];
    var bodyStyles = window.getComputedStyle(document.body);
    var fooBar = bodyStyles.getPropertyValue("--gridBlockWidgetColumns"); //get
    document.body.style.setProperty(
      "--gridBlockWidgetColumns",
      gridBlockWidgetColumns
    ); //set

    $(".grid-block-widget__container")
      .removeClass(
        "grid-block-widget__container--2-col grid-block-widget__container--3-col grid-block-widget__container--4-col grid-block-widget__container--5-col grid-block-widget__container--6-col"
      )
      .addClass(
        "grid-block-widget__container--" + gridBlockWidgetColumns + "-col"
      );
    $(".grid-block-widget__container").each(function () {
      $(this).attr("data-columns", gridBlockWidgetColumns);
      console.log("gridBlockWidgetColumns " + gridBlockWidgetColumns);
    });

    // refreshCSS();
  });

  $("#clone").click(function () {
    console.log("cloning");
    $(".grid-block-widget__container").each(function () {
      // 	var parent_id = $(this)
      var dataColumns = $(this).data("columns");
      var numClone = 24;
      var $col = $(this).find("> .grid-block-widget");
      for (var i = 0; i < numClone; i++) {
        $col.clone().appendTo($(this));
      }
    });
    clickHandlers();
  });
  $("#content-editable").click(function () {
    console.log("editable content");
    $(
      ".section-intro, .grid-block-widget__title,  .grid-block-widget__text, .grid-block-widget__button"
    ).attr("contentEditable", true);
    clickHandlers();
  });
  $("#random-images").click(function () {
    console.log("editable content");
    $(".grid-block-widget__container img").each(function () {
      var width = Math.floor(Math.random() * 200) + 200;
      var height = Math.floor(Math.random() * 600) + 300;

      var widths = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1024, 1920];
      var width = widths[Math.floor(Math.random() * widths.length)];
      console.log("width " + width);

      var heights = [100, 300, 400, 500, 600, 700, 768, 800, 900, 1024, 1920];
      var height = heights[Math.floor(Math.random() * heights.length)];
      console.log("height " + height);

      $(this).attr(
        "src",
        " https://placedog.net/" + width + "/" + height + "?random"
      );
    });
    clickHandlers();
    // refreshCSS();
  });
  $("#close-testing-tools").click(function () {
    console.log("cloning");
    $("#testing-tools").hide();
    clickHandlers();
  });
}

function gridBlockCarousel() {
  $(".grid-block-widget__container--rotate").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
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

  $(".one-column .grid-block-widget__container--rotate").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
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
function refreshCSS() {
  console.log("hot swapping CSS");
  let links = document.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute("rel") == "stylesheet") {
      let href = links[i].getAttribute("href").split("?")[0];

      let newHref = href + "?version=" + new Date().getMilliseconds();

      links[i].setAttribute("href", newHref);
    }
  }
}

function refreshJS() {
  console.log("hot swapping JS");
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    var href = scripts[i].src.split("?")[0];
    var source = href + "?version=" + new Date().getMilliseconds();
    scripts[i].setAttribute("src", source);
  }
}

function ieObjectFitFallback() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    if ($(".grid-block-widget").length) {
      $(".grid-block-widget img").each(function () {
        console.log("detected ie -- changing object-fit to background images");

        var t = jQuery(this),
          s = "url(" + t.attr("src") + ")",
          p = t.parent(),
          parentClasses = t.attr("class"),
          d = jQuery(
            "<div class='ie__fallback--object-fit grid-block-widget__image'></div>"
          );
        console.log("parentClasses" + parentClasses);
        p.prepend(d);
        d.css({
          "min-height": "200px",
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": "50% 50%",
          "background-image": s,
        });
        d.attr("class", parentClasses);
        t.hide();
      });
    }
  }
}
