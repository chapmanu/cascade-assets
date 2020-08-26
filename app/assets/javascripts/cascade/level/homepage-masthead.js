$(function () {
    if ($('video#homepage-masthead__video').length) {
        fetchCuratorImages();
        var vid = $("video#homepage-masthead__video");
        $('.homepage video').removeAttr('controls');
        $('.homepage-masthead__toggle-play-button').on('click keydown', function (event) {
            togglePlay();
        });
        ieObjectFitFallback();
    }
});
function fetchCuratorImages() {
    $.ajax({
        url: 'https://api.curator.io/v1/feeds/c91835ec-e439-42c2-bd46-e5fb3899afe2/posts?api_key=11a4445f-6005-4040-9ff2-fd90d3aaa8a6',
        type: 'GET',
        success: manipulateCuratorImages,
        error: function (data, status, error) {
            console.log('%c ERROR: level/homepage-masthead.js - could not load curator.io images' + data.responseText.error, 'background: #222; color: #bada55');
            $('.homepage-masthead__photos picture').addClass('fade-in');
        }
    });
}

$(document).on('.homepage-masthead__photos img src', function () {
    console.log('src changed')
});

function manipulateCuratorImages(data) {
    $('.homepage-masthead__photos picture').each(function (index, value) {
        $(this).find('img').attr('src', data.posts[index].image);
        $(this).find('img').attr('data-post', data.posts[index].id);
    })
    $('.homepage-masthead__photos picture img').load(function () {
        var imageObj = $(this);
        if (!(imageObj.width() == 1 && imageObj.height() == 1)) {
            $(this).closest('picture').addClass('fade-in');
        }
    });
    $('img[alt=""]').each(function (index, value) {
        $(this).attr('alt', data.posts[index].text);
    })
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