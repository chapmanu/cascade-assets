//For any issues please contact SMC Tech at smctech@chapman.edu

jQuery(document).ready(function ($) {
  $.getJSON(
    "https://web.chapman.edu/cuindex/api/index?t=" + new Date(),
    function (data) {
      var items = {};
      $.each(data, function (i, vals) {
        items[i] = vals;
      });

      //Any element with [data-cuindexcode] attribute will have contents replaced with data from API call
      //Example: <span data-cuindexcode="CUCA100">Loading...</span>
      $("[data-cuindexcode]").each(function () {
        indexCode = $(this).data("cuindexcode");
        indexData = [];

        if (indexCode == "CUCA100") {
          indexData = items[0];
        } else if (indexCode == "CUCA100NTR") {
          indexData = items[1];
        } else if (indexCode == "CUCA100TR") {
          indexData = items[2];
        } else if (indexCode == "CUOC25") {
          indexData = items[3];
        } else if (indexCode == "CUOC25NTR") {
          indexData = items[4];
        } else if (indexCode == "CUOC25TR") {
          indexData = items[5];
        } else {
          indexData = items[0];
        }

        if (indexCode == "date") {
          $(this).html("as of " + indexData.dateOfIndex.split("T")[0]);
        } else if (indexData.indexValue) {
          $(this).html(indexData.indexValue.toFixed(2));
          // console.log("Index Value: " + indexData.indexValue);
        } else {
          console.log("Problem loading index data.");
        }
      });
    }
  );

  //Controls index ticket on https://www.chapman.edu/business/index.aspx
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
