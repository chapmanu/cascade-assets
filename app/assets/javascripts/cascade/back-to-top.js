// Floating back-to-top button
$(function() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // If Internet Explorer, return version number
    console.log(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
  } // If another browser, return 0
  else {
    if ($("#back2top").length) {
      var didScroll;
      var lastScrollTop = 0;
      var delta = 5;
      var topFloat = $("#back2top").outerHeight();
      $(window).scroll(function(event) {
        didScroll = true;
      });
      setInterval(function() {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 250);
      // Hide on load
      $("#back2top").hide();
      if ($(window).scrollTop() === 0) {
        $("#back2top").hide();
      }

      function hasScrolled() {
        var st = $(this).scrollTop();
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) return;
        if (st > lastScrollTop && st > topFloat) {
          // Scroll Down
          $("#back2top").fadeIn(500);
        } else {
          // Scroll Up
          if (
            st + $(window).height() < $(document).height() ||
            $(window).scrollTop() === 0
          ) {
            $("#back2top").fadeOut(500);
          }
        }
        lastScrollTop = st;
      }
    }
    // Shimmer
    $(".circle-bg").hover(
      function() {
        $("span.fa-chevron-up").addClass("shimmer");
      },
      function() {
        $("span.fa-chevron-up").removeClass("shimmer");
      }
    );
    $("#back2top").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0
        },
        500
      );
    });
  }
});
