$(function () {
    if ($('video#homepage-masthead__video').length) {
        // fetchCuratorIOImages();
        getData();
        var vid = $("video#homepage-masthead__video");
        $('.homepage video').removeAttr('controls');
        $('.homepage-masthead__toggle-play-button').on('click keydown', function (event) {
            togglePlay();
        });
        ieObjectFitFallback();
    }
});

function fetchCuratorIOImages() {
    $.ajax({
        url: "https://api.curator.io/v1/feeds/ef183959-c3ad-4f2d-b90e-390c5d766fac/posts?api_key=11a4445f-6005-4040-9ff2-fd90d3aaa8a6",
        success: function (result) {
            $('.homepage-masthead__photos img').each(function (index, value) {
                console.log(`div${index}: ${this.id}`);
                $(this).attr('src', result.posts[index].image);
                $(this).attr('data-post', result.posts[index].id);
            });
        }
    });
    $('.homepage-masthead__photos img').addClass('fade-in');
}

function clickMastheadPhotos() {
    if (window.location.href.indexOf("#data-post") != -1) {
        var url = window.location.hash
        var pieces = url.split("/#data-post");

        var ID = window.location.hash.split('=')[1];

        var anchor = $('[data-post="' + ID + '"]')
        console.log('anchor ' + anchor)

        $('html,body').animate({ scrollTop: anchor.offset().top - 120 });
    }
}

function getData() {
    $.ajax({
        url: 'https://api.curator.io/v1/feeds/ef183959-c3ad-4f2d-b90e-390c5d766fac/posts?api_key=11a4445f-6005-4040-9ff2-fd90d3aaa8a6',
        type: 'GET',
        success: handleData,
        error: function (data, status, error) {
            console.log('%c ERROR: level/homepage-masthead.js - could not load curator.io images' + data.responseText.error, 'background: #222; color: #bada55');
            $('.homepage-masthead__photos img').addClass('fade-in');
        }
    })
}

function handleData(data) {
    $('.homepage-masthead__photos img').each(function (index, value) {
        $(this).attr('src', data.posts[index].image);
        $(this).parent('a').attr('href', 'https://www.chapman.edu/admission/social-media.aspx#data-post=' + data.posts[index].id);
        $(this).attr('data-post', data.posts[index].id);
    }).then(
        $('.homepage-masthead__photos img').addClass('fade-in'));
}
function togglePlay() {
    if ($('video#homepage-masthead__video').length) {
        var vid = $("video#homepage-masthead__video");
        if ($(vid).get(0).paused) {
            vid.removeClass('homepage-masthead__play-video--paused')
            $('#homepage-masthead__play-button').hide();
            $('#homepage-masthead__pause-button').show();
            $(vid).trigger('play');
        } else {
            vid.addClass('homepage-masthead__video--paused')
            $('#homepage-masthead__pause-button').hide();
            $('#homepage-masthead__play-button').show();
            $(vid).trigger('pause');
        }
    }
}

function ieObjectFitFallback() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (
        msie > 0 ||
        (!!navigator.userAgent.match(/Trident.*rv\:11\./) &&
            $(".homepage-masthead__photo-grid img").length)
    ) {
        $(".homepage-masthead__photo-grid img, .ie__homepage-masthead__photos img").each(function () {
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
        $('.ie__fallback-object-fit:first-of-type').css('height', '100%');
    }
}
// KEYS 🎹
function a11yClick(event) {
    if (event.type === 'click') {
        togglePlay();
        return true;
    } else if (event.type === 'keypress') {
        var code = event.charCode || event.keyCode;
        if ((code === 32) || (code === 13)) {
            togglePlay();
            return true;
        }
    } else {
        return false;
    }
}