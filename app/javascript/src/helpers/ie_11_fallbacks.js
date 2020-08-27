export const ieFallbackObjectFit = (cssClass) => {
  $(document).ready(() => {
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      $(`img.${cssClass}__img`).each(function () {
        var t = $(this),
          s = "url(" + t.attr("src") + ")",
          p = t.parent(),
          d = $("<div class='ie__fallback--object-fit'></div>");
        t.hide();
        p.append(d);
        d.css({
          height: 150,
          "background-size": "cover",
          "background-repeat": "no-repeat",
          "background-position": "center",
          "background-image": s
        });
      });
    }
  });
}