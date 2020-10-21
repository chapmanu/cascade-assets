// $(function () {
//   var byTheNumberscounted = {};

//   checkDisplay();

//   $(window).on('resize scroll',
//     function () {
//       checkDisplay();
//     });

//   function checkDisplay() {

//     $('.counter').each(function(idx) {
//       var $this = $(this),
//           countTo = $this.attr('data-count');
      
//       if( $this.isOnScreen() && !byTheNumberscounted['counter' + idx] ) {
//         byTheNumberscounted['counter' + idx] = true;

//         if (isNaN(countTo)) {
//           $this.text(countTo);
//           return;
//         }

//         $({ countNum: $this.text() }).animate({
//           countNum: countTo
//         },
//         {
//           duration: 2500,
//           easing:'linear',
//           step: function() {
//             $this.text(Math.floor(this.countNum));
//           },
//           complete: function() {
//             $this.text(this.countNum);
//           }
//         });  
//       }
//     });
//   }
// });

