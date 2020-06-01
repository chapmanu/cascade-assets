$(window).load(function (callback) {
  if ($('noscript').length) {
    renameNoscript();
    addiFrameTitle();
    addAriaHiddenToNoScript();


    try {
    } catch (ignore) { }
  }
  renameTempscript();
  // setTimeout(function () {
  //   addAriaHiddenToNoScript();
  // }, 1000);

  function callIframe(url, callback) {
    $('iframe').attr('src', url);
    $('iframe').load(function () {
      renameNoscript(this);
    });
  }
});
function addAriaHiddenToNoScript() {
  console.log('adding aria-hidden')
  if ($('noscript:contains("googletagmanager")').length > 0) {
    $("noscript").attr("aria-hidden", "true");
  }
  else if ($('noscript:contains("facebook")').length > 0) {
    $("noscript").attr("aria-hidden", "true");
  }
}
function renameNoscript() {
  $('noscript').replaceWith('<tempscript>' + $('noscript').html() + '</tempscript>');
  addiFrameTitle();
  renameTempscript();
}
function renameTempscript() {
  $('tempscript').replaceWith('<noscript>' + $('tempscript').html() + '</noscript>');
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
addiFrameTitle();
