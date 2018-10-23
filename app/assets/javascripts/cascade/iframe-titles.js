// Add titles to untitled iFrames for Wave
(function ($, document, undefined) {
  $.fn["iready"] = function (callback) {
    var ifr = this.filter("iframe"),
      arg = arguments,
      src = this,
      clc = null, // collection
      lng = 5, // length of time to wait between intervals
      ivl = -1, // interval id
      chk = function (ifr) {
        try {
          var cnt = ifr.contents(),
            doc = cnt[0],
            src = ifr.attr("src"),
            url = doc.URL;
          switch (doc.readyState) {
            case "complete":
              if (!src || src === "about:blank") {
                // we don't care about empty iframes
                ifr.data("ready", "true");
              } else if (!url || url === "about:blank") {
                // empty document still needs loaded
                ifr.data("ready", undefined);
              } else {
                // not an empty iframe and not an empty src
                // should be loaded
                ifr.data("ready", true);
              }
              break;
            case "interactive":
              ifr.data("ready", "true");
              break;
            case "loading":
            default:
              // still loading
              break;
          }
        } catch (ignore) {
          // as far as we're concerned the iframe is ready
          // since we won't be able to access it cross domain
          ifr.data("ready", "true");
        }
        return ifr.data("ready") === "true";
      };
    if (ifr.length) {
      ifr.each(function () {
        if (!$(this).data("ready")) {
          // add to collection
          clc = (clc) ? clc.add($(this)) : $(this);
        }
      });
      if (clc) {
        ivl = setInterval(function () {
          var rd = true;
          clc.each(function () {
            if (!$(this).data("ready")) {
              if (!chk($(this))) {
                rd = false;
              }
            }
          });
          if (rd) {
            clearInterval(ivl);
            clc = null;
            callback.apply(src, arg);
          }
        }, lng);
      } else {
        clc = null;
        callback.apply(src, arg);
      }
    } else {
      clc = null;
      callback.apply(this, arguments);
    }
    return this;
  };
}(jQuery, document));
$(window).load(function () {

  var attr = $(this).attr('title');
  if (typeof attr !== typeof undefined && attr !== false) {
    $("iframe").on('load', function () {
      $('iframe').attr('title', 'Embedded content from external source');
    });
  }
  $("iframe").iready(function () {
    // 1. Replace <noscript></noscript> in order to edit contents
    $('noscript').replaceWith('<tempscript>' + $('noscript').html() + '</tempscript>')
    var ifr = $("#test");
    console.log("iready - Should now be ready.");
    try {
      console.log($("#iframe").contents()[0].readyState);
    } catch (ignore) {
      console.log("cross domain");
      // 2. If iFrame is missing title, add a generic one
      var attr = $(this).attr('title');
      if (typeof attr !== typeof undefined && attr !== false) {
        $("iframe").on('load', function () {
          $('iframe').attr('title', 'Embedded content from external source');
          $('tempscript').replaceWith('<noscript>' + $('tempscript').html() + '</noscript>')
          $("noscript").attr("aria-role", "presentation");

        });
      }
    }
  });
  try {
    console.log("Should not be ready: " + $("#iframe").contents()[0].readyState);
  } catch (ignore) { }
});


