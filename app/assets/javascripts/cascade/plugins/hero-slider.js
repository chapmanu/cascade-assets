jQuery(document).ready(function ($) {
	if ($('.cd-hero-slider').length) {
		var $slidesWrapper = $('.cd-hero-slider');
		clickPause();
		clickPlay();

		$('.cd-hero-pause').keypress(function (e) {
			if (e.which == 13) { //Enter key pressed
				$(this).trigger('click');
			}
		});

		$('.cd-hero-play').keypress(function (e) {
			if (e.which == 13) { //Enter key pressed
				$(this).trigger('click');
			}
		});
		function clickPause() {
			$('.cd-hero-pause').on('click', function (event) {
				setAutoPlayValues()
				$(this).hide();
				$('.cd-hero-play').show();
				$('.brochure-masthead * ').filter('.autoplay').addClass('masthead-paused').removeClass('.autoplay');
				autoPlayDelay = 9999999999;
				resetAutoplay();

				pauseVideos();
			});
		}

		function pauseVideos() {
			if ($('video').length) {
				var vid = $("video");
				$(vid).trigger('pause');
			}
		}

		function playVideos() {
			if ($('video').length) {
				var vid = $("video");
				$(vid).trigger('play');

			}
		}
		function clickPlay() {
			setAutoPlayValues();
			$('.cd-hero-play').on('click keydown', function (event) {
				$(this).hide();
				$('.cd-hero-pause').show();

				removePausedMashteadClass();

				playVideos();
			});
		}

		//autoplay slider
		function setAutoPlayValues() {
			if ($($slidesWrapper).hasClass('masthead-paused')) {
				var autoPlayDelay = 9999999999;
				setAutoplay($slidesWrapper, slidesNumber, autoPlayDelay);
			} else {
				var autoPlayDelay = 10000;
				setAutoplay($slidesWrapper, slidesNumber, autoPlayDelay);
			}
		}
		//check if a .cd-hero-slider exists in the DOM 
		if ($slidesWrapper.length > 0) {
			var $primaryNav = $('.cd-primary-nav'),
				$sliderNav = $('.cd-slider-nav'),
				$navigationMarker = $('.cd-marker'),
				$prevSlideButton = $('.cd-arrow-left'),
				$nextSlideButton = $('.cd-arrow-right'),
				slidesNumber = $slidesWrapper.children('li').length,
				visibleSlidePosition = 0,
				autoPlayId,
				autoPlayDelay = 5000;
			if (slidesNumber <= 1) {
				$prevSlideButton.css('display', 'none');
				$nextSlideButton.css('display', 'none');
				$sliderNav.css('display', 'none');
			}
			//upload videos (if not on mobile devices)
			uploadVideo($slidesWrapper);
			//on mobile - open/close primary navigation clicking/tapping the menu icon
			$primaryNav.on('click', function (event) {
				if ($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
			});
			//change visible slide
			$prevSlideButton.on('click', function (event) {
				event.preventDefault();
				var activePosition = $slidesWrapper.find('li.selected').index();
				var selectedPosition = (activePosition == 0) ? slidesNumber - 1 : activePosition - 1;
				slideSelection(activePosition, selectedPosition);
				resetAutoplay(selectedPosition);

				if ($('.masthead-paused').length) {
					// clickPause();
					pauseVideos();
				}

			});
			$nextSlideButton.on('click', function (event) {
				event.preventDefault();
				var activePosition = $slidesWrapper.find('li.selected').index();
				var selectedPosition = (activePosition + 1) == slidesNumber ? 0 : activePosition + 1;
				slideSelection(activePosition, selectedPosition);
				resetAutoplay(selectedPosition);

				if ($('.masthead-paused').length) {
					// clickPause();
					pauseVideos();
				}


			});
			$sliderNav.on('click', 'li', function (event) {
				event.preventDefault();
				var selectedItem = $(this);
				if (!selectedItem.hasClass('selected')) {
					// if it's not already selected
					var selectedPosition = selectedItem.index(),
						activePosition = $slidesWrapper.find('li.selected').index();
					slideSelection(activePosition, selectedPosition);
					resetAutoplay(selectedPosition);
				}
			});
		}
		function slideSelection(active, selected) {
			if (active < selected) {
				nextSlide($slidesWrapper.find('.selected'), $slidesWrapper, $sliderNav, selected);
			} else {
				prevSlide($slidesWrapper.find('.selected'), $slidesWrapper, $sliderNav, selected);
			}
		}
		function resetAutoplay(selected) {
			//this is used for the autoplay
			visibleSlidePosition = selected;
			updateSliderNavigation($sliderNav, selected);
			updateNavigationMarker($navigationMarker, selected + 1);
			//reset autoplay
			setAutoplay($slidesWrapper, slidesNumber, autoPlayDelay);
		}
		function nextSlide(visibleSlide, container, pagination, n) {
			visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				visibleSlide.removeClass('is-moving');
			});
			container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
			checkVideo(visibleSlide, container, n);
		}
		function prevSlide(visibleSlide, container, pagination, n) {
			visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				visibleSlide.removeClass('is-moving');
			});
			container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
			checkVideo(visibleSlide, container, n);
		}
		function updateSliderNavigation(pagination, n) {
			var navigationDot = pagination.find('.selected');
			navigationDot.removeClass('selected');
			pagination.find('li').eq(n).addClass('selected');
		}
		function setAutoplay(wrapper, length, delay) {
			if (wrapper.hasClass('autoplay')) {
				clearInterval(autoPlayId);
				autoPlayId = window.setInterval(function () {
					autoplaySlider(length)
				}, delay);
			}
		}
		function autoplaySlider(length) {
			if (visibleSlidePosition < length - 1) {
				nextSlide($slidesWrapper.find('.selected'), $slidesWrapper, $sliderNav, visibleSlidePosition + 1);
				visibleSlidePosition += 1;
			} else {
				prevSlide($slidesWrapper.find('.selected'), $slidesWrapper, $sliderNav, 0);
				visibleSlidePosition = 0;
			}
			updateNavigationMarker($navigationMarker, visibleSlidePosition + 1);
			updateSliderNavigation($sliderNav, visibleSlidePosition);
		}
		function uploadVideo(container) {
			container.find('.cd-bg-video-wrapper').each(function () {
				var videoWrapper = $(this);
				if (videoWrapper.is(':visible')) {
					// if visible - we are not on a mobile device 
					var videoUrl = videoWrapper.data('video'),
						video = $('<video loop><source src="' + videoUrl + '.mp4" type="video/mp4" /><source src="' + videoUrl + '.webm" type="video/webm" /></video>');
					video.appendTo(videoWrapper);
					// play video if first slide
					if (videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();
				}
			});
		}
		function checkVideo(hiddenSlide, container, n) {
			//check if a video outside the viewport is playing - if yes, pause it
			var hiddenVideo = hiddenSlide.find('video');
			if (hiddenVideo.length > 0) hiddenVideo.get(0).pause();
			//check if the select slide contains a video element - if yes, play the video
			var visibleVideo = container.children('li').eq(n).find('video');
			if (visibleVideo.length > 0) visibleVideo.get(0).play();
		}
		function updateNavigationMarker(marker, n) {
			marker.removeClassPrefix('item').addClass('item-' + n);
		}
		$.fn.removeClassPrefix = function (prefix) {
			//remove all classes starting with 'prefix'
			this.each(function (i, el) {
				var classes = el.className.split(" ").filter(function (c) {
					return c.lastIndexOf(prefix, 0) !== 0;
				});
				el.className = $.trim(classes.join(" "));
			});
			return this;
		};
	}
});


function removePausedMashteadClass() {

	if ($('.cd-hero-slider').hasClass('masthead-paused')) {
		$('.cd-hero-slider').addClass('autoplay').removeClass('masthead-paused')

	}

}