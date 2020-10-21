
export const anchorOffset = () => {
  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  $('a[href^="#"]').click(function() {
    const offset = getWidth() > 905 ? 131 : 71,
    scrollTime = 250;

    // Need both `html` and `body` for full browser support
    $("html, body").animate({
        scrollTop: $( $(this).attr("href") ).offset().top -  offset
    }, scrollTime);

    // Prevent the jump/flash
    return false;
  });
}
