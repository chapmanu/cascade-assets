// uninav accessibility
$(function () {
  hideCurrentDropdownWhenLoseFocus();
  closePrevDropdownWhenFocusChanges();
  toggleAriaExpandVal();
  handleEscapeKeypress();
  gs__setSearchResultsZIndex();
});

function closePrevDropdownWhenFocusChanges() {
  $(".uninav__dropdown--parent").on("click keypress", function (e) {
    $(".uninav__dropdown--parent")
      .not(this)
      .each(function () {
        $(this).attr("aria-expanded", "false");
      });
  });
}

function handleEscapeKeypress() {
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      $(".uninav__dropdown--parent").attr("aria-expanded", "false");
      $(".js-close-off-canvas-nav").click();
    }
  };
}

function toggleAriaExpandVal() {
  $("#uninav li").on("click keypress", function (e) {
    if (a11yClick(event) === true) {
      var menuItem = $(e.currentTarget);
      if (menuItem.attr("aria-expanded") === "true") {
        $(this).attr("aria-expanded", "false");
      } else {
        $(this).attr("aria-expanded", "true");
      }
    }
  });
}

function hideCurrentDropdownWhenLoseFocus() {
  $(".uninav__dropdown--child li:last-of-type").on("keydown blur", function (e) {
    // SHIFT TAB KEY COMBO
    if (e.shiftKey && e.keyCode === 9) {
      $(dropdownParent).attr("aria-expanded", "false");
      //     return false;
    } else if (e.keyCode === 9) {
      // TAB KEY PRESS
      var dropdownParent = $(this).closest(".uninav__dropdown--parent");
      $(dropdownParent).attr("aria-expanded", "false");
      // return false;
    } else if (e.type == "blur") {
      $(dropdownParent).attr("aria-expanded", "false");
    }
  });
  $(".uninav__dropdown--child li:first-child").on("keydown blur", function (e) {
    // SHIFT TAB KEY COMBO
    var dropdownParent = $(this).closest(".uninav__dropdown--parent");
    if (e.shiftKey && e.keyCode === 9) {
      $(dropdownParent).attr("aria-expanded", "false");
      //     return false;
    }
  });
  // handle clicking outside of dropdown item
  $(document).on("click keydown blur focusOut", function (e) {
    if ($(e.target).closest(".uninav__dropdown--parent").length === 0) {
      $(".uninav__dropdown--parent").attr("aria-expanded", "false");
    }
  });
}

function collapseAriaWhenClickOutside() {
  $(document).mouseup(function (e) {
    var container = $(".uninav__dropdown--parent");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.hide();
    }
  });
}

function a11yClick(event) {
  if (event.type === "click") {
    return true;
  } else if (event.type === "keypress") {
    var code = event.charCode || event.keyCode;
    if (code === 32 || code === 13) {
      return true;
    }
  } else {
    return false;
  }
}
// end uninav accessibility
// off-canvas overlay - add to main content when expanded
$(function () {
  var sectionMenuButton = $("#section-menu-hamburger-icon");
  $("#umbrella-nav-button-toggle, .uninav__hamburger-menu").on(
    "click",
    function () {
      $("html, #main").addClass("off-canvas__blur");
    }
  );
  $(".js-close-off-canvas-nav").on("click", function () {
    $("html, #main").removeClass("off-canvas__blur");
  });
});
// gs = Google Search
// replace Google Custom Search default placeholder
window.onload = gs__customPlaceholder;

function gs__customPlaceholder() {
  document.getElementById("gsc-i-id1").setAttribute("placeholder", "Search...");
  document.getElementById("gsc-i-id1").style.opacity = "1";
}
// TODO: iOS style frosted/blurred background. CSS filter: blur(2px) performance is terrible
$(window).load(function () {
  if ($('table.gstl_50').length) {
    $('table.gstl_50:not([role])').attr('role', 'presentation');
    $("#gsc-i-id1").on("input focus click", function () {
      gs__blurBg();
      // Google Search Table - add aria role
      $('table.gstl_50:not([role])').attr('role', 'presentation');
    });
  }
});
$(window).on("load resize", function (e) {
  gs__mobileReveal();
});

function gs__mobileReveal() {
  var searchInputDesktop = $(".uninav__search-input--desktop");
  var searchButtonMobile = $("#uninav__search-button--mobile");
  $(searchButtonMobile).click(function () {
    $(this).addClass('uninav__hidden');
    $('#uninav').addClass('utility-only');
    $('.uninav__logo, .uninav__hamburger-menu').addClass('logo--underneath');

    $('.uninav__cta--wrapper').css('z-index', '-999');
    $('.uninav__cta--wrapper').css('position', 'absolute');
    $('.uninav__cta--wrapper').css('opacity', '0');
    // $('.uninav__logo--secondary').hide();
    $('.uninav__cta--wrapper').addClass('cta--underneath');

    $(searchInputDesktop).addClass('uninav__reveal').addClass('slide-left');
    $("#gsc-i-id1").focus();
    $('.gsst_a').show()

    $('#gs_st50, .gsc-results-close-btn').click(function () {
      $('#uninav').removeClass('utility-only');
      $(searchInputDesktop).removeClass('uninav__reveal');
      $('.uninav__logo, .uninav__hamburger-menu').removeClass('logo--underneath');
      // $('.uninav__cta').show();
      $('.uninav__cta--wrapper').removeClass('cta--underneath');

      // $('.uninav__logo--secondary').show();
      $('.uninav__cta--wrapper').css('z-index', 'initial');
      $('.uninav__cta--wrapper').css('position', 'initial');
      $('.uninav__cta--wrapper').css('opacity', 'initial');


      $(searchButtonMobile).removeClass('uninav__hidden');

      $(searchInputDesktop).removeClass('uninav__reveal');
      $(searchButtonMobile).removeClass('uninav__hidden');
      $(searchInputDesktop).find('input').val('');
    });
  });
}

function gs__setSearchResultsZIndex() {
  $(".gssb_c[style]").css("z-index", "999999999999999999999999999999");
}

function gs__blurBg() {
  $(".gsc-completion-container").css("background", "transparent");
  $(".gsc-completion-container").css(
    "background-color",
    "rgba(255, 255, 255, 0.98)"
  );
}
