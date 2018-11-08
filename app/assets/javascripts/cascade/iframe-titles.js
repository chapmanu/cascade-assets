function renameNoscript() {
  $('noscript').replaceWith('<tempscript>' + $('noscript').html() + '</tempscript>')
  //console.log('rename noscript to tempscript');
}
function renameTempscript() {
  //console.log('renaming tempscript back to noscript');
  $('tempscript').replaceWith('<noscript>' + $('tempscript').html() + '</noscript>')
}

function addiFrameTitle() {
  var attr = $(this).attr('title');
  var noTitle = $('iframe').not('[title]');
  $("iframe").each(function () {
    $(noTitle).attr('title', 'Embedded content from external source');
    renameTempscript();
  });

}
renameNoscript();
//console.log('renameNoscript 1');
//debugger
addiFrameTitle();
//console.log('addiFrameTitle 2');
//debugger
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
$(window).load(function (callback) {
  ////debugger
  renameNoscript();
  addiFrameTitle();
  $("iframe").iready(function (callback) {
    renameNoscript();
    ////debugger
    addiFrameTitle();
    ////debugger
    renameTempscript();
  });
  try {
  } catch (ignore) { }
});
renameTempscript();
