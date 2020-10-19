// The function actually applying the offset
// export const anchorOffset = () => {
//   function offsetAnchor() {
//     if (location.hash.length !== 0) {
//       console.log( window.scrollY)
//       // window.scrollTo(window.scrollX, window.scrollY + 120);
//       console.log( window.scrollY)

//     }
//   }

//   // Captures click events of all <a> elements with href starting with #
//   $(document).on('click', 'a[href^="#"]', function(event) {
//     // event.preventDefault()
//     // Click events are captured before hashchanges. Timeout
//     // causes offsetAnchor to be called after the page jump.
//     window.setTimeout(function() {
//       offsetAnchor();
//     }, 0);
//   });

//   // Set the offset when entering page with hash present in the url
//   window.setTimeout(offsetAnchor, 0);
// }

export const anchorOffset = () => {
  // Desired offset, in pixels
  var offset = 130;
  // Desired time to scroll, in milliseconds
  var scrollTime = 500;

  $('a[href^="#"]').click(function() {
    // Need both `html` and `body` for full browser support
    $("html, body").animate({
        scrollTop: $( $(this).attr("href") ).offset().top - offset 
    }, scrollTime);

    // Prevent the jump/flash
    return false;
  });
}