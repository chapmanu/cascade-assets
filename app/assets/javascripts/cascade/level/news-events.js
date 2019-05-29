$(function () {
  //used with News/Events widget in 2 and 3 Column Modular templates
  //
  // Make it work with old code.
  var pad2 = utils.pad2;

  // Convert feed category element to date object.
  // The newsfeed wants a datestamp that it can display in the feed. The feed provides one
  // as a category element. The problem is that sometimes category is a string with timestamp
  // value and sometimes an array where one of items is timestamp value. For more info, see
  // https://github.com/chapmanu/cascade-assets/issues/160
  var categoryToDatestamp = function (category) {
    // Sample category datestamp: "2017/03/06 (Mon)"
    var datestamp = null;

    // Type checking.
    var categoryIsArray = category instanceof Array;
    var categoryIsString = typeof (category) === 'string';

    // Convert to date object. If value is not in expected format, it will result in
    // invalid date object.
    if (categoryIsString) {
      var dateStr = category.substring(0, 10);
      datestamp = new Date(dateStr);
    } else if (categoryIsArray) {
      // In the samples I looked at in production, the timestamp was always the first
      // element of the array. If not, will produce an invalid date object which
      // will be caught as invalid below.
      var dateStr = category[0].substring(0, 10);
      datestamp = new Date(dateStr);
    } else {
      console.warn('Feed did not provide category as string or array as expected.');
      return null;
    }

    // Make sure we got a valid date object: https://stackoverflow.com/a/1353711/6763239
    var datestampIsValid = !(isNaN(datestamp.getTime()));
    if (datestampIsValid) {
      return datestamp;
    } else {
      return null;
    }
  };
  
  /* Populate news from Wordpress RSS feed (converted to JSON with YQL)
  ------------------------------------------------------------------------------------------------*/
  if ($(".news-events-widget.news").length) {
    //default is NewsAndStories:
    var newsFeedUrl = "https://www.chapman.edu/getFeed.ashx?name=newsNewsAndStories",
      newsYqlUrl = function () {
        return ("https://social04.chapman.edu:4040/data?url=" + newsFeedUrl)
      },
      newsFeedOptions = $(".newsFeed").text();

    // TODO: It probably would have been much cleaner to put all these switched vars
    // here and below into a JS object keyed to the newsFeedOptions value.
    switch (newsFeedOptions) {
      case "Admissions":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsAdmissions";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/cu-students");
        break;
      case "ASBE":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsBusiness";
        $(".news-events-widget  .allNews").attr("href", "http://blogs.chapman.edu/business");
        break;
      case "Commencement":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsCommencement";
        $(".news-events-widget  .allNews").attr("href", "http://blogs.chapman.edu/commencement");
        break;
      case "COPA":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsCOPA";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/copa");
        break;
      case "Crean":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsCrean";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/crean");
        break;
      case "Dodge":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsDodge";
        $(".news-events-widget  .allNews").attr("href", "http://blogs.chapman.edu/dodge");
        break;
      case "Education":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsEducation";
        $(".news-events-widget  .allNews").attr("href", "http://blogs.chapman.edu/education");
        break;
      case "Information Systems":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsIST";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/information-systems");
        break;
      case "Law":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsLaw";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/law");
        break;
      case "Pharmacy":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsPharmacy";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/pharmacy");
        break;
      case "Schmid":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsSCHMID";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/scst");
        break;
      case "SOC":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsSOC";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/communication");
        break;
      case "Students":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsStudents";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/students");
        break;
      case "Thompson Policy Institute":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsThompsonInstitute";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/tpi/");
        break;
      case "Wilkinson":
        newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsWilkinson";
        $(".news-events-widget .allNews").attr("href", "http://blogs.chapman.edu/wilkinson");
        break;
      default:
        $(".news-events-widget .allNews").attr("href", "https://news.chapman.edu");
        break;
    }

    $(".news-events-widget .news .loading").siblings(".story").css("visibility", "hidden");

    var updateNewsWidget = function(data) {
      var newsData = data[0];
      if (newsData) {
        $(".news-events-widget .newsEvents").each(function () {
          $(this).find(".news .story").each(function (i) {
            var $this = $(this);
            if (newsData.item[i].pubDate) {
              //Month
              $this.find(".date .month").html(newsData.item[i].pubDate[0].split(' ')[2].toUpperCase());
              //Day
              $this.find(".date .day").html(pad2(parseInt((newsData.item[i].pubDate[0].split(' ')[1]), 10)));
              //Year
              $this.find(".date .year").html(newsData.item[i].pubDate[0].split(' ')[3]);
            }
            //Title
            $this.find(".title>a").html(newsData.item[i].title[0]);
            //Links
            $this.find(".title>a, .readMore").each(function () {
              $(this).attr('href', newsData.item[i].link[0]);
            });
            
            //Show News
            $(".news-events-widget.news .loading").hide().siblings(".story").css("visibility", "visible");
            $(".news-events-widget.news .story").css("visibility", "visible");
            
          });
        });
      } else {
        $(".news-events-widget.news").html("<p>Oops, <a href='" + newsFeedUrl + "'>" + newsFeedUrl + "</a> appears to be unresponsive or is not returning anything to display at the moment.</p>");
      }
    }

    $.getJSON(newsYqlUrl(), function (data) {
      updateNewsWidget(data);
    }).done( function(data) {
      updateNewsWidget(data);
    }).fail( function(data) {
      $(".news").html("<p>There are no news articles found or the news feed is temporarily down.</p>");
    })
  }

  /* Populate events from RSS feeds (converted to JSON with YQL)
  ------------------------------------------------------------------------------------------------ */
  if ($(".news-events-widget.events").length) {
    //sample: eventsFeedUrl = "https://25livepub.collegenet.com/calendars/calendar.7285.rss",
    var eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=events",
      eventsYqlUrl = function () {
        return ("https://social04.chapman.edu:4040/data?url=" + eventsFeedUrl)
      },
      eventsFeedOptions = $(".eventsFeed").text();

    $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/");

    switch (eventsFeedOptions) {
      case "ASBE":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventBusiness";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=11,73,29,92,31,163,10");
        break;
      case "CDC":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventCDC";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=14");
        break;
      case "COPA":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventCOPA";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=21,56,105,75,89");
        break;
      case "CREAN":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventCREAN";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=44,108,103,155,152,27,37,114,38");
        break;
      case "DANCE":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventDANCE";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=105");
        break;
      case "DODGE":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventDODGE";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=23");
        break;
      case "Education":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventEducation";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=61,20");
        break;
      case "Information Systems":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventIST";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=133");
        break;
      case "LAW":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventLAW";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=28");
        break;
      case "MUSIC":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventMUSIC";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=56,89");
        break;
      case "PHARMACY":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventPHARMACY";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=141");
        break;
      case "SCHMID":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventSCHMID";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=36,101,120,22,123,129,112");
        break;
      case "SOC":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventSOC";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=146");
        break;
      case "STUDENTS":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventSTUDENTS";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=53,135,58,70,137,49,99,88,131,14,144,50,126,64,74,71,102,142,41,153,116,15,94,164,19,26,34,30,114,38,117");
        break;
      case "THEATRE":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventTHEATRE";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=75");
        break;
      case "Thompson Policy Institute":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventTHOMPSONPOLICY";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=191");
        break;
      case "WILKINSON":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventWILKINSON";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=84,115,60,86,146,87,134,115,128,160,110,82,132,45,43,40");
        break;
      case "ESI":
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventESI";
        $(".news-events-widget .allEvents").attr("href", "https://events.chapman.edu/?group_id=83");
        break;
      default:
        eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=events";
        break;
    }

    var updateEventsWidget = function(data) {
      var eventsData = data[0];
      if (eventsData) {
        $(".news-events-widget.newsEvents").each(function () {
          $(this).find(".events .story").each(function (i) {
            var $this = $(this);
            var rssitem;
            var maxloop;
            if (typeof eventsData.item.length == 'undefined') {
              rssitem = eventsData.item;
              maxloop = 0;
            } else {
              rssitem = eventsData.item[i];
              maxloop = eventsData.item.length;
            }

            if (rssitem) {
              // Title
              $this.find(".news-events-widget .title>a").html(rssitem.title[0]);

              // Links
              $this.find(".news-events-widget .title>a, .readMore").each(function () {
                $(this).attr('href', rssitem.link[0]);
              });

              // Datestamp: pubdate sometimes contained original but not current
              // event date; use category field instead (has yyyy/mm/dd format)
              var datestamp = categoryToDatestamp(rssitem.category[0]);
              if (datestamp) {
                var shortMonthName = utils.toShortMonthName(datestamp.getMonth() + 1);
                $this.find(".date .month").html(shortMonthName);
                $this.find(".date .day").html(pad2(datestamp.getDate()));
                $this.find(".date .year").html(datestamp.getFullYear());
              } else {
                console.warn('Feed did not provide valid datestamp.');
              }
            } else {
              $(this).hide();
            }

            //Show Events
            $(".news-events-widget .events .loading").hide().siblings(".story").css("visibility", "visible");
            $(".news-events-widget .events .story").css("visibility", "visible");

            if (maxloop == i) {
              return false;
            }
          });
        });
      } else {
        $(".news-events-widget .events").html("<p>There are no events found (or <a href='" + eventsFeedUrl + "'>" + eventsFeedUrl + "</a> is temporarily down).</p>");
        //$(".events").html("<p>No events found at this time.</p>");
      }
    }

    $(".events .loading").siblings(".story").css("visibility", "hidden");
    $.getJSON(eventsYqlUrl(), function(data) {
      updateEventsWidget(data);
    }).done( function(data) {
      updateEventsWidget(data);
    }).fail( function(data) {
      $(".events").html("<p>There are no events found or the events feed is temporarily down).</p>");
    });
  }

  /* Switch news events tabs
  ------------------------------------------------------------------------------------------------*/

  $(".newsEventsNav li").click(function () {
    var $this = $(this),
      i = $this.index();
    $this.addClass("active").siblings().removeClass("active");
    $this.parent(".newsEventsNav").siblings(".newsEventsContent").children("li:eq(" + i + ")").addClass("active").siblings().removeClass("active");
    $ellipsis = $(".ellipsis");
    if ($ellipsis) $ellipsis.ellipsis();
  });

  $(".newsEventsNav li").keydown(function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      var $this = $(this),
        i = $this.index();
      $this.addClass("active").siblings().removeClass("active");
      $this.parent(".newsEventsNav").siblings(".newsEventsContent").children("li:eq(" + i + ")").addClass("active").siblings().removeClass("active");
      $ellipsis = $(".ellipsis");
      if ($ellipsis) $ellipsis.ellipsis();
      return false
    }
    return true
  });

  $(".tabNav li").click(function () {
    var $this = $(this),
      i = $this.index();
    $this.addClass("active").siblings().removeClass("active");
    $this.parent(".tabNav").siblings(".tabContent").children("li:eq(" + i + ")").addClass("active").siblings().removeClass("active");
    $ellipsis = $(".ellipsis");
    if ($ellipsis) $ellipsis.ellipsis();
  });

  // Apply user selected options
  (function () {
    var newsEventsOptions = [$(".newsEventsOptions").html(), $(".leftColumnNewsEventsOptions").html()],
      $featureTab = [$(".main .newsEventsNav li:first-child"), $(".leftNav .newsEventsNav li:first-child")],
      $newsTab = [$(".main .newsEventsNav li:nth-child(2)"), $(".leftNav .newsEventsNav li:nth-child(2)")],
      $eventsTab = [$(".main .newsEventsNav li:nth-child(3)"), $(".leftNav .newsEventsNav li:nth-child(3)")],
      $featureContent = [$(".main .featured"), $(".leftNav .featured")],
      $newsContent = [$(".main .news"), $(".leftNav .news")],
      $eventsContent = [$(".main .events"), $(".leftNav .events")],
      $newsEvents = [$(".main .newsEvents"), $(".leftNav .newsEvents")];

    for (var i = 0; i < newsEventsOptions.length; i++) {
      switch (newsEventsOptions[i]) {
        case "Featured - News - Events (Featured active)":
          break;
        case "Featured - News - Events (News active)":
          $featureTab[i].removeClass("active");
          $newsTab[i].addClass("active");
          $newsContent[i].parent("li").addClass("active");
          $featureContent[i].parent("li").removeClass("active");
          break;
        case "Featured - News - Events (Events active)":
          $featureTab[i].removeClass("active");
          $eventsTab[i].addClass("active");
          $eventsContent[i].parent("li").addClass("active");
          $featureContent[i].parent("li").removeClass("active");
          break;
        case "Featured - News (Featured active)":
          $eventsTab[i].hide();
          break;
        case "Featured - News (News active)":
          $featureTab[i].removeClass("active");
          $newsTab[i].addClass("active");
          $eventsTab[i].hide();
          $newsContent[i].parent("li").addClass("active");
          $featureContent[i].parent("li").removeClass("active");
          break;
        case "Featured - Events (Featured active)":
          $newsTab[i].hide();
          break;
        case "Featured - Events (Events active)":
          $featureTab[i].removeClass("active");
          $eventsTab[i].addClass("active");
          $newsTab[i].hide();
          $eventsContent[i].parent("li").addClass("active");
          $featureContent[i].parent("li").removeClass("active");
          break;
        case "News - Events (News active)":
          $featureTab[i].hide();
          $newsTab[i].addClass("active");
          $newsContent[i].parent("li").addClass("active");
          $featureContent[i].parent("li").removeClass("active");
          break;
        case "News - Events (Events active)":
          $featureTab[i].hide();
          $eventsTab[i].addClass("active");
          $eventsContent[i].parent("li").addClass("active");
          $featureContent[i].parent("li").removeClass("active");
          break;
        case "Featured Only":
          $newsTab[i].hide();
          $eventsTab[i].hide();
          break;
        case "News Only":
          $featureTab[i].hide();
          $eventsTab[i].hide();
          $newsTab[i].addClass("active");
          $newsContent[i].parent("li").addClass("active");
          $featureContent[i].parent("li").removeClass("active");
          break;
        case "Events Only":
          $featureTab[i].hide();
          $newsTab[i].hide();
          $eventsTab[i].addClass("active");
          $eventsContent[i].parent("li").addClass("active");
          $featureContent[i].parent("li").removeClass("active");
          break;
        case "Do Not Show":
          $newsEvents[i].hide();
          break;
        default:
          break;
      }
    }
  })();

  // Show today label if appropriate
  var todayLabel = function () {
    var today = new Date(),
      tomorrow = new Date(),
      month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "DEC"];
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today
    $(".newsEvents .date").each(function (index) {
      if (today.getFullYear() === parseInt($(this).children(".year").html(), 10)) {
        if (month[today.getMonth()].toUpperCase() === $(this).children(".month").html()) {
          if (today.getDate() === parseInt($(this).children(".day").html(), 10)) {
            $(this).siblings(".todayTomorrow").children(".today").css("display", "inline");
          }
        }
      }
    });

    // Tomorrow
    $(".newsEvents .date").each(function (index) {
      if (tomorrow.getFullYear() === parseInt($(this).children(".year").html(), 10)) {
        if (month[tomorrow.getMonth()].toUpperCase() === $(this).children(".month").html()) {
          if (tomorrow.getDate() === parseInt($(this).children(".day").html(), 10)) {
            $(this).siblings(".todayTomorrow").children(".tomorrow").css("display", "inline");
          }
        }
      }
    });
  };

  $(".events .copy").each(function (index) {
    $(this).html($(this).text());
  });

  $ellipsis = $(".ellipsis");
  if ($ellipsis) $ellipsis.ellipsis();

});
