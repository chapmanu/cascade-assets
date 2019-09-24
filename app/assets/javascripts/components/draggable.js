$(function () {
  if ($('.draggable').length) {
    // draggable
    var draggable = $('.draggable'); //element 

    draggable.on('mousedown', function (e) {
      var dr = $(this).addClass("drag").css("cursor", "move");
      height = dr.outerHeight();
      width = dr.outerWidth();
      max_left = dr.parent().offset().left + dr.parent().width() - dr.width();
      max_top = dr.parent().offset().top + dr.parent().height() - dr.height();
      min_left = dr.parent().offset().left;
      min_top = dr.parent().offset().top;

      ypos = dr.offset().top + height - e.pageY,
        xpos = dr.offset().left + width - e.pageX;
      $(document.body).on('mousemove', function (e) {
        var itop = e.pageY + ypos - height;
        var ileft = e.pageX + xpos - width;

        if (dr.hasClass("drag")) {
          if (itop <= min_top) {
            itop = min_top;
          }
          if (ileft <= min_left) {
            ileft = min_left;
          }
          if (itop >= max_top) {
            itop = max_top;
          }
          if (ileft >= max_left) {
            ileft = max_left;
          }
          dr.offset({
            top: itop,
            left: ileft
          });
        }
      }).on('mouseup', function (e) {
        dr.removeClass("drag");
      });
    });
    // dismiss
    $("span.fa-times").click(function () {
      $('.focuspoint-wrapper').hide()
    });
    $(document).keyup(function (e) {
      // esc
      if (e.which == 27) {
        $('.focuspoint-wrapper').hide()
      }
    })
  }
});
