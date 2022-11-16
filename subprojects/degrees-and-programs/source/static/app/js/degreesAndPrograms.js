/*global window:false */
/*global $:false */
/*jslint plusplus: true */
var chapman = chapman || {};
(function ($, Modernizr, window, document) {
  "use strict";
  chapman.degreesAndPrograms = {
    init: function () {
      $(".degrees-and-programs").addClass("ready");
      this.bindUIEvents();
    },
    bindUIEvents: function () {
      $(".results-views li").on("click", function () {
        chapman.degreesAndPrograms.switchResultsView($(this));
      });
      // on mobile, when click .fa-question-circle, toggle #accelerated-tooltip--mobile
      $(".fa-question-circle").on("click", function () {
        $("#accelerated-tooltip--mobile").toggleClass("active");
      });

      $(".dap-results").on("click", ".active-content-toggle", function (event) {
        event.preventDefault();
        $(this).closest(".result").toggleClass("active");
        $(this).closest("article").siblings().removeClass("active");
        $(".program-info__close").on("click", function (event) {
          $(this).closest("article.active").removeClass("active");
        });
        $(".program-info__close").on("click keypress", function (event) {
          event.preventDefault();
          if (a11yClick(event) === true) {
            $(this).closest("article.active").removeClass("active");
          }
        });

        let programTitleHeight = $("article.active").find(".result-content .title").outerHeight();

        $("article.active").find(".active-content").addClass("triangle-offset");

        if (programTitleHeight <= 23) {
          $("article.active").find(".active-content").addClass("triangle-offset");
        } else if (programTitleHeight <= 43) {
          $("article.active").find(".active-content").addClass("triangle-offset--medium");
        } else if (programTitleHeight >= 44) {
          $("article.active").find(".active-content").addClass("triangle-offset--large");
        }

        function a11yClick(event) {
          if (event.type === "click") {
            return true;
          } else if (event.type === "keypress") {
            var code = event.charCode || event.keyCode;
            if (code === 32 || code === 13) {
              return true;
            }
          } else {
            return false;
          }
        }
      });
      $("#js-dap-undergraduate-interests .show-more a").on("click", function () {
        $("#js-dap-undergraduate-interests-list").addClass("show-all");
      });
    },
    switchResultsView: function (el) {
      var viewButton = el,
        newView = viewButton.data("view"),
        results = viewButton.closest(".dap-results");
      if (!viewButton.hasClass("active")) {
        viewButton.closest(".results-views").find("li").removeClass("active");
        viewButton.addClass("active");
        if (newView === "grid-view") {
          results.removeClass("list-view").addClass("grid-view");
        } else if (newView === "list-view") {
          results.removeClass("grid-view").addClass("list-view");
        }
      }
    },
  };
})(window.jQuery, window.Modernizr, window, window.document);
$(function () {
  "use strict";
  chapman.degreesAndPrograms.init();

  // function that adds .dark-mode to form when clicked
  $(".dark-mode__toggle").on("click", function () {
    $(this).find(".fas").toggleClass("fa-moon fa-sun");
    $("#js-dap-section-graduate").toggleClass("dark-mode");
  });
});
