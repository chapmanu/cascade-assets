function addEmptyAlt() {
  var missingAlt = $("img").not("[alt]");

  if ($(missingAlt.length)) {
    $(missingAlt).attr("alt", " ");
  }
}

$(window).on("load", function () {
  addEmptyAlt();
});
