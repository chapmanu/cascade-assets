$(document).ready(function () {
  if ($("#featured_newsroom_stories")[0]) {
    var cachedNewsroomFeed =
      "https://www.chapman.edu/getFeed.ashx?name=newsEditorsPicks";

    var $selectors = {
      featuredStory: {
        tag: new chapDOM(
          ".homepage #featured_newsroom_stories .maxWidth .announcement .tag"
        ),
        img: new chapDOM(
          ".homepage #featured_newsroom_stories .maxWidth .announcement img"
        ),
        h2Link: new chapDOM(
          ".homepage #featured_newsroom_stories .maxWidth .announcement h2 a"
        ),
        description: new chapDOM(
          ".homepage #featured_newsroom_stories .maxWidth .announcement #featured-description"
        ),
      },
      stories: (function () {
        var storySelectors = [];
        for (var i = 1; i <= 3; i++) {
          var selector = {
            main: new chapDOM(".homepage .third .story.story-" + i),
            tag: new chapDOM(".homepage .third .story.story-" + i + " a.tag"),
            permaLink: new chapDOM(
              ".homepage .third .story.story-" + i + " a.permalink"
            ),
            h2Title: new chapDOM(
              ".homepage .third .story.story-" + i + " a.permalink h2.title"
            ),
            bgImg: new chapDOM(
              ".homepage .third .story.story-" + i + " .story-bg"
            ),
            img: new chapDOM(".homepage .third .story.story-" + i + " img"),
          };
          storySelectors.push(selector);
        }
        return storySelectors;
      })(),
      style: {
        featured: new chapDOM(
          ".homepage .editors-picks.stories .maxWidth .announcement"
        ),
        stories: new chapDOM(
          ".homepage .editors-picks.stories .maxWidth .third"
        ),
        loadingIcon: new chapDOM(
          ".homepage .editors-picks.stories .maxWidth .lds-spinner"
        ),
      },
    };

    var xhrTimer = setTimeout(function () {
      if (xhr && xhr.readyState != 4) {
        xhr.abort();
      }
      clearLoader();
    }, 3000);

    function clearLoader() {
      $selectors.style.loadingIcon.hide();
      $selectors.style.featured.removeClass("news-loading");
      $selectors.style.featured.addClass("news-loaded");
      $selectors.style.stories.removeClass("news-loading");
      $selectors.style.stories.addClass("news-loaded");
    }

    function decodeEntities(encodedString) {
      var textArea = document.createElement("textarea");
      textArea.innerHTML = encodedString;

      return textArea.value;
    }

    function trimDescription(description, title) {
      var descriptionNoHTML = description.trim().replace(/(<([^>]+)>)/gi, ""),
        descriptionNoHTMLLength = descriptionNoHTML.length,
        titleLength = title.length;

      descriptionNoHTML = decodeEntities(descriptionNoHTML);

      if (descriptionNoHTMLLength > 505 && titleLength < 30) {
        descriptionNoHTML = descriptionNoHTML.substring(
          0,
          descriptionNoHTML.indexOf(" ", 500) < 0
            ? 501
            : descriptionNoHTML.indexOf(" ", 500)
        );
        descriptionNoHTML = descriptionNoHTML + "...";
        return descriptionNoHTML;
      }

      if (descriptionNoHTMLLength > 405 && titleLength < 60) {
        descriptionNoHTML = descriptionNoHTML.substring(
          0,
          descriptionNoHTML.indexOf(" ", 400) < 0
            ? 401
            : descriptionNoHTML.indexOf(" ", 400)
        );
        descriptionNoHTML = descriptionNoHTML + "...";
        return descriptionNoHTML;
      }

      if (descriptionNoHTMLLength > 205 && titleLength > 60) {
        descriptionNoHTML = descriptionNoHTML.substring(
          0,
          descriptionNoHTML.indexOf(" ", 200) < 0
            ? 201
            : descriptionNoHTML.indexOf(" ", 200)
        );
        descriptionNoHTML = descriptionNoHTML + "...";
        return descriptionNoHTML;
      }

      return descriptionNoHTML;
    }

    function updateWidgetStories(newsStories) {
      newsStories.forEach(function (story, idx) {
        if (idx === 0) {
          $selectors.featuredStory.tag.changeAttr(
            "href",
            story.primary_category_link
          );
          $selectors.featuredStory.tag.changeText(
            "#" + decodeEntities(story.primary_category)
          );
          $selectors.featuredStory.img.changeAttr("src", story.post_image);
          $selectors.featuredStory.img.changeAttr("alt", story.post_image_alt);
          $selectors.featuredStory.h2Link.changeAttr("href", story.post_url);
          $selectors.featuredStory.h2Link.changeAttr(
            "data-cta-label",
            story.post_title_excerpt || story.post_title
          );
          $selectors.featuredStory.h2Link.changeText(
            story.post_title_excerpt || story.post_title
          );
          $selectors.featuredStory.description.changeText(
            trimDescription(
              story.featured_description_excerpt || story.featured_description,
              story.post_title_excerpt || story.post_title
            )
          );

          $(".editors-picks.stories .announcement a.smc-cta").attr(
            "href",
            story.post_url
          );
          return;
        }

        $selectors.stories[idx - 1].tag.changeAttr(
          "href",
          story.primary_category_link
        );
        $selectors.stories[idx - 1].tag.changeText(
          "#" + decodeEntities(story.primary_category)
        );

        $selectors.stories[idx - 1].main.changeAttr(
          "aria-label",
          story.post_title_excerpt || story.post_title
        );
        $selectors.stories[idx - 1].permaLink.changeAttr(
          "href",
          story.post_url
        );
        $selectors.stories[idx - 1].permaLink.changeAttr(
          "data-cta-label",
          story.post_title_excerpt || story.post_title
        );
        $selectors.stories[idx - 1].h2Title.changeText(
          story.post_title_excerpt || story.post_title
        );
        $selectors.stories[idx - 1].bgImg.changeAttr(
          "style",
          "background-image:url(" + story.post_image + ")"
        );
        $selectors.stories[idx - 1].bgImg.changeAttr(
          "aria-label",
          story.post_image_alt
        );
        $selectors.stories[idx - 1].img.changeAttr("alt", story.post_image_alt);
        $selectors.stories[idx - 1].img.changeAttr("src", story.post_image);
      });
      clearTimeout(xhrTimer);
      clearLoader();
    }

    function clearImages() {
      $selectors.featuredStory.img.changeAttr("src", "");
      $selectors.stories.forEach(function (story) {
        story.bgImg.changeAttr("style", "");
        story.img.changeAttr("src", "");
      });
    }

    var xhr = $.get(cachedNewsroomFeed, function (data) {
      if (data.post_count != 4 && data.posts.length != 4) return;

      clearImages();
      updateWidgetStories(data.posts);
    });
  }
});
