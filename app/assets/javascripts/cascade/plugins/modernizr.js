// BUILD: https://modernizr.com/download/?applicationcache-audio-backgroundsize-borderimage-borderradius-boxshadow-canvas-canvastext-cssanimations-csscolumns-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-flexbox-fontface-generatedcontent-geolocation-hashchange-history-hsla-indexeddb-inlinesvg-input-inputtypes-localstorage-multiplebgs-opacity-postmessage-rgba-sessionstorage-smil-svg-svgclippaths-textshadow-video-webgl-webp-websockets-websqldatabase-webworkers-addtest-domprefixes-hasevent-prefixed-prefixes-setclasses-shiv-testallprops-testprop-teststyles&q=webp

!(function (e, t, n) {
  function r(e, t) {
    return typeof e === t;
  }
  function a() {
    var e, t, n, a, o, i, s;
    for (var l in x)
      if (x.hasOwnProperty(l)) {
        if (
          ((e = []),
          (t = x[l]),
          t.name &&
            (e.push(t.name.toLowerCase()),
            t.options && t.options.aliases && t.options.aliases.length))
        )
          for (n = 0; n < t.options.aliases.length; n++)
            e.push(t.options.aliases[n].toLowerCase());
        for (a = r(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++)
          (i = e[o]),
            (s = i.split(".")),
            1 === s.length
              ? (Modernizr[s[0]] = a)
              : (!Modernizr[s[0]] ||
                  Modernizr[s[0]] instanceof Boolean ||
                  (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])),
                (Modernizr[s[0]][s[1]] = a)),
            w.push((a ? "" : "no-") + s.join("-"));
      }
  }
  function o(e) {
    var t = k.className,
      n = Modernizr._config.classPrefix || "";
    if ((_ && (t = t.baseVal), Modernizr._config.enableJSClass)) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(r, "$1" + n + "js$2");
    }
    Modernizr._config.enableClasses &&
      ((t += " " + n + e.join(" " + n)),
      _ ? (k.className.baseVal = t) : (k.className = t));
  }
  function i(e, t) {
    if ("object" == typeof e) for (var n in e) R(e, n) && i(n, e[n]);
    else {
      e = e.toLowerCase();
      var r = e.split("."),
        a = Modernizr[r[0]];
      if ((2 == r.length && (a = a[r[1]]), "undefined" != typeof a))
        return Modernizr;
      (t = "function" == typeof t ? t() : t),
        1 == r.length
          ? (Modernizr[r[0]] = t)
          : (!Modernizr[r[0]] ||
              Modernizr[r[0]] instanceof Boolean ||
              (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])),
            (Modernizr[r[0]][r[1]] = t)),
        o([(t && 0 != t ? "" : "no-") + r.join("-")]),
        Modernizr._trigger(e, t);
    }
    return Modernizr;
  }
  function s(e) {
    return e
      .replace(/([a-z])-([a-z])/g, function (e, t, n) {
        return t + n.toUpperCase();
      })
      .replace(/^-/, "");
  }
  function l() {
    return "function" != typeof t.createElement
      ? t.createElement(arguments[0])
      : _
      ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0])
      : t.createElement.apply(t, arguments);
  }
  function c(e, t) {
    return !!~("" + e).indexOf(t);
  }
  function d() {
    var e = t.body;
    return e || ((e = l(_ ? "svg" : "body")), (e.fake = !0)), e;
  }
  function u(e, n, r, a) {
    var o,
      i,
      s,
      c,
      u = "modernizr",
      f = l("div"),
      p = d();
    if (parseInt(r, 10))
      for (; r--; )
        (s = l("div")), (s.id = a ? a[r] : u + (r + 1)), f.appendChild(s);
    return (
      (o = l("style")),
      (o.type = "text/css"),
      (o.id = "s" + u),
      (p.fake ? p : f).appendChild(o),
      p.appendChild(f),
      o.styleSheet
        ? (o.styleSheet.cssText = e)
        : o.appendChild(t.createTextNode(e)),
      (f.id = u),
      p.fake &&
        ((p.style.background = ""),
        (p.style.overflow = "hidden"),
        (c = k.style.overflow),
        (k.style.overflow = "hidden"),
        k.appendChild(p)),
      (i = n(f, e)),
      p.fake
        ? (p.parentNode.removeChild(p), (k.style.overflow = c), k.offsetHeight)
        : f.parentNode.removeChild(f),
      !!i
    );
  }
  function f(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  function p(e, t, n) {
    var a;
    for (var o in e)
      if (e[o] in t)
        return n === !1
          ? e[o]
          : ((a = t[e[o]]), r(a, "function") ? f(a, n || t) : a);
    return !1;
  }
  function m(e) {
    return e
      .replace(/([A-Z])/g, function (e, t) {
        return "-" + t.toLowerCase();
      })
      .replace(/^ms-/, "-ms-");
  }
  function g(t, n, r) {
    var a;
    if ("getComputedStyle" in e) {
      a = getComputedStyle.call(e, t, n);
      var o = e.console;
      if (null !== a) r && (a = a.getPropertyValue(r));
      else if (o) {
        var i = o.error ? "error" : "log";
        o[i].call(
          o,
          "getComputedStyle returning null, its possible modernizr test results are inaccurate"
        );
      }
    } else a = !n && t.currentStyle && t.currentStyle[r];
    return a;
  }
  function h(t, r) {
    var a = t.length;
    if ("CSS" in e && "supports" in e.CSS) {
      for (; a--; ) if (e.CSS.supports(m(t[a]), r)) return !0;
      return !1;
    }
    if ("CSSSupportsRule" in e) {
      for (var o = []; a--; ) o.push("(" + m(t[a]) + ":" + r + ")");
      return (
        (o = o.join(" or ")),
        u(
          "@supports (" + o + ") { #modernizr { position: absolute; } }",
          function (e) {
            return "absolute" == g(e, null, "position");
          }
        )
      );
    }
    return n;
  }
  function v(e, t, a, o) {
    function i() {
      u && (delete F.style, delete F.modElem);
    }
    if (((o = r(o, "undefined") ? !1 : o), !r(a, "undefined"))) {
      var d = h(e, a);
      if (!r(d, "undefined")) return d;
    }
    for (
      var u, f, p, m, g, v = ["modernizr", "tspan", "samp"];
      !F.style && v.length;

    )
      (u = !0), (F.modElem = l(v.shift())), (F.style = F.modElem.style);
    for (p = e.length, f = 0; p > f; f++)
      if (
        ((m = e[f]),
        (g = F.style[m]),
        c(m, "-") && (m = s(m)),
        F.style[m] !== n)
      ) {
        if (o || r(a, "undefined")) return i(), "pfx" == t ? m : !0;
        try {
          F.style[m] = a;
        } catch (A) {}
        if (F.style[m] != g) return i(), "pfx" == t ? m : !0;
      }
    return i(), !1;
  }
  function A(e, t, n, a, o) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
      s = (e + " " + M.join(i + " ") + i).split(" ");
    return r(t, "string") || r(t, "undefined")
      ? v(s, t, a, o)
      : ((s = (e + " " + P.join(i + " ") + i).split(" ")), p(s, t, n));
  }
  function y(e, t) {
    var n = e.deleteDatabase(t);
    (n.onsuccess = function () {
      i("indexeddb.deletedatabase", !0);
    }),
      (n.onerror = function () {
        i("indexeddb.deletedatabase", !1);
      });
  }
  function b(e, t, r) {
    return A(e, n, n, t, r);
  }
  var w = [],
    x = [],
    T = {
      _version: "3.6.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (e, t) {
        var n = this;
        setTimeout(function () {
          t(n[e]);
        }, 0);
      },
      addTest: function (e, t, n) {
        x.push({ name: e, fn: t, options: n });
      },
      addAsyncTest: function (e) {
        x.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = T),
    (Modernizr = new Modernizr()),
    Modernizr.addTest("applicationcache", "applicationCache" in e),
    Modernizr.addTest("geolocation", "geolocation" in navigator),
    Modernizr.addTest("history", function () {
      var t = navigator.userAgent;
      return (-1 === t.indexOf("Android 2.") &&
        -1 === t.indexOf("Android 4.0")) ||
        -1 === t.indexOf("Mobile Safari") ||
        -1 !== t.indexOf("Chrome") ||
        -1 !== t.indexOf("Windows Phone") ||
        "file:" === location.protocol
        ? e.history && "pushState" in e.history
        : !1;
    }),
    Modernizr.addTest("postmessage", "postMessage" in e),
    Modernizr.addTest(
      "svg",
      !!t.createElementNS &&
        !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
    );
  var S = !1;
  try {
    S = "WebSocket" in e && 2 === e.WebSocket.CLOSING;
  } catch (C) {}
  Modernizr.addTest("websockets", S),
    Modernizr.addTest("localstorage", function () {
      var e = "modernizr";
      try {
        return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
      } catch (t) {
        return !1;
      }
    }),
    Modernizr.addTest("sessionstorage", function () {
      var e = "modernizr";
      try {
        return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0;
      } catch (t) {
        return !1;
      }
    }),
    Modernizr.addTest("websqldatabase", "openDatabase" in e),
    Modernizr.addTest("webworkers", "Worker" in e);
  var E = T._config.usePrefixes
    ? " -webkit- -moz- -o- -ms- ".split(" ")
    : ["", ""];
  T._prefixes = E;
  var k = t.documentElement,
    _ = "svg" === k.nodeName.toLowerCase();
  _ ||
    !(function (e, t) {
      function n(e, t) {
        var n = e.createElement("p"),
          r = e.getElementsByTagName("head")[0] || e.documentElement;
        return (
          (n.innerHTML = "x<style>" + t + "</style>"),
          r.insertBefore(n.lastChild, r.firstChild)
        );
      }
      function r() {
        var e = y.elements;
        return "string" == typeof e ? e.split(" ") : e;
      }
      function a(e, t) {
        var n = y.elements;
        "string" != typeof n && (n = n.join(" ")),
          "string" != typeof e && (e = e.join(" ")),
          (y.elements = n + " " + e),
          c(t);
      }
      function o(e) {
        var t = A[e[h]];
        return t || ((t = {}), v++, (e[h] = v), (A[v] = t)), t;
      }
      function i(e, n, r) {
        if ((n || (n = t), u)) return n.createElement(e);
        r || (r = o(n));
        var a;
        return (
          (a = r.cache[e]
            ? r.cache[e].cloneNode()
            : g.test(e)
            ? (r.cache[e] = r.createElem(e)).cloneNode()
            : r.createElem(e)),
          !a.canHaveChildren || m.test(e) || a.tagUrn
            ? a
            : r.frag.appendChild(a)
        );
      }
      function s(e, n) {
        if ((e || (e = t), u)) return e.createDocumentFragment();
        n = n || o(e);
        for (
          var a = n.frag.cloneNode(), i = 0, s = r(), l = s.length;
          l > i;
          i++
        )
          a.createElement(s[i]);
        return a;
      }
      function l(e, t) {
        t.cache ||
          ((t.cache = {}),
          (t.createElem = e.createElement),
          (t.createFrag = e.createDocumentFragment),
          (t.frag = t.createFrag())),
          (e.createElement = function (n) {
            return y.shivMethods ? i(n, e, t) : t.createElem(n);
          }),
          (e.createDocumentFragment = Function(
            "h,f",
            "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
              r()
                .join()
                .replace(/[\w\-:]+/g, function (e) {
                  return (
                    t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                  );
                }) +
              ");return n}"
          )(y, t.frag));
      }
      function c(e) {
        e || (e = t);
        var r = o(e);
        return (
          !y.shivCSS ||
            d ||
            r.hasCSS ||
            (r.hasCSS = !!n(
              e,
              "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}"
            )),
          u || l(e, r),
          e
        );
      }
      var d,
        u,
        f = "3.7.3",
        p = e.html5 || {},
        m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        g = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        h = "_html5shiv",
        v = 0,
        A = {};
      !(function () {
        try {
          var e = t.createElement("a");
          (e.innerHTML = "<xyz></xyz>"),
            (d = "hidden" in e),
            (u =
              1 == e.childNodes.length ||
              (function () {
                t.createElement("a");
                var e = t.createDocumentFragment();
                return (
                  "undefined" == typeof e.cloneNode ||
                  "undefined" == typeof e.createDocumentFragment ||
                  "undefined" == typeof e.createElement
                );
              })());
        } catch (n) {
          (d = !0), (u = !0);
        }
      })();
      var y = {
        elements:
          p.elements ||
          "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
        version: f,
        shivCSS: p.shivCSS !== !1,
        supportsUnknownElements: u,
        shivMethods: p.shivMethods !== !1,
        type: "default",
        shivDocument: c,
        createElement: i,
        createDocumentFragment: s,
        addElements: a,
      };
      (e.html5 = y),
        c(t),
        "object" == typeof module && module.exports && (module.exports = y);
    })("undefined" != typeof e ? e : this, t);
  var B = "Moz O ms Webkit",
    P = T._config.usePrefixes ? B.toLowerCase().split(" ") : [];
  T._domPrefixes = P;
  var R;
  !(function () {
    var e = {}.hasOwnProperty;
    R =
      r(e, "undefined") || r(e.call, "undefined")
        ? function (e, t) {
            return t in e && r(e.constructor.prototype[t], "undefined");
          }
        : function (t, n) {
            return e.call(t, n);
          };
  })(),
    (T._l = {}),
    (T.on = function (e, t) {
      this._l[e] || (this._l[e] = []),
        this._l[e].push(t),
        Modernizr.hasOwnProperty(e) &&
          setTimeout(function () {
            Modernizr._trigger(e, Modernizr[e]);
          }, 0);
    }),
    (T._trigger = function (e, t) {
      if (this._l[e]) {
        var n = this._l[e];
        setTimeout(function () {
          var e, r;
          for (e = 0; e < n.length; e++) (r = n[e])(t);
        }, 0),
          delete this._l[e];
      }
    }),
    Modernizr._q.push(function () {
      T.addTest = i;
    }),
    Modernizr.addAsyncTest(function () {
      function e(e, t, n) {
        function r(t) {
          var r = t && "load" === t.type ? 1 == a.width : !1,
            o = "webp" === e;
          i(e, o && r ? new Boolean(r) : r), n && n(t);
        }
        var a = new Image();
        (a.onerror = r), (a.onload = r), (a.src = t);
      }
      var t = [
          {
            uri:
              "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
            name: "webp",
          },
          {
            uri:
              "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
            name: "webp.alpha",
          },
          {
            uri:
              "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
            name: "webp.animation",
          },
          {
            uri:
              "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
            name: "webp.lossless",
          },
        ],
        n = t.shift();
      e(n.name, n.uri, function (n) {
        if (n && "load" === n.type)
          for (var r = 0; r < t.length; r++) e(t[r].name, t[r].uri);
      });
    });
  var N = (function () {
    function e(e, t) {
      var a;
      return e
        ? ((t && "string" != typeof t) || (t = l(t || "div")),
          (e = "on" + e),
          (a = e in t),
          !a &&
            r &&
            (t.setAttribute || (t = l("div")),
            t.setAttribute(e, ""),
            (a = "function" == typeof t[e]),
            t[e] !== n && (t[e] = n),
            t.removeAttribute(e)),
          a)
        : !1;
    }
    var r = !("onblur" in t.documentElement);
    return e;
  })();
  (T.hasEvent = N),
    Modernizr.addTest("hashchange", function () {
      return N("hashchange", e) === !1
        ? !1
        : t.documentMode === n || t.documentMode > 7;
    }),
    Modernizr.addTest("audio", function () {
      var e = l("audio"),
        t = !1;
      try {
        (t = !!e.canPlayType),
          t &&
            ((t = new Boolean(t)),
            (t.ogg = e
              .canPlayType('audio/ogg; codecs="vorbis"')
              .replace(/^no$/, "")),
            (t.mp3 = e
              .canPlayType('audio/mpeg; codecs="mp3"')
              .replace(/^no$/, "")),
            (t.opus =
              e.canPlayType('audio/ogg; codecs="opus"') ||
              e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, "")),
            (t.wav = e
              .canPlayType('audio/wav; codecs="1"')
              .replace(/^no$/, "")),
            (t.m4a = (
              e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")
            ).replace(/^no$/, "")));
      } catch (n) {}
      return t;
    }),
    Modernizr.addTest("canvas", function () {
      var e = l("canvas");
      return !(!e.getContext || !e.getContext("2d"));
    }),
    Modernizr.addTest("canvastext", function () {
      return Modernizr.canvas === !1
        ? !1
        : "function" == typeof l("canvas").getContext("2d").fillText;
    }),
    Modernizr.addTest("video", function () {
      var e = l("video"),
        t = !1;
      try {
        (t = !!e.canPlayType),
          t &&
            ((t = new Boolean(t)),
            (t.ogg = e
              .canPlayType('video/ogg; codecs="theora"')
              .replace(/^no$/, "")),
            (t.h264 = e
              .canPlayType('video/mp4; codecs="avc1.42E01E"')
              .replace(/^no$/, "")),
            (t.webm = e
              .canPlayType('video/webm; codecs="vp8, vorbis"')
              .replace(/^no$/, "")),
            (t.vp9 = e
              .canPlayType('video/webm; codecs="vp9"')
              .replace(/^no$/, "")),
            (t.hls = e
              .canPlayType('application/x-mpegURL; codecs="avc1.42E01E"')
              .replace(/^no$/, "")));
      } catch (n) {}
      return t;
    }),
    Modernizr.addTest("webgl", function () {
      var t = l("canvas"),
        n =
          "probablySupportsContext" in t
            ? "probablySupportsContext"
            : "supportsContext";
      return n in t
        ? t[n]("webgl") || t[n]("experimental-webgl")
        : "WebGLRenderingContext" in e;
    }),
    Modernizr.addTest("cssgradients", function () {
      for (
        var e,
          t = "background-image:",
          n = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
          r = "",
          a = 0,
          o = E.length - 1;
        o > a;
        a++
      )
        (e = 0 === a ? "to " : ""),
          (r += t + E[a] + "linear-gradient(" + e + "left top, #9f9, white);");
      Modernizr._config.usePrefixes && (r += t + "-webkit-" + n);
      var i = l("a"),
        s = i.style;
      return (s.cssText = r), ("" + s.backgroundImage).indexOf("gradient") > -1;
    }),
    Modernizr.addTest("multiplebgs", function () {
      var e = l("a").style;
      return (
        (e.cssText =
          "background:url(https://),url(https://),red url(https://)"),
        /(url\s*\(.*?){3}/.test(e.background)
      );
    }),
    Modernizr.addTest("opacity", function () {
      var e = l("a").style;
      return (e.cssText = E.join("opacity:.55;")), /^0.55$/.test(e.opacity);
    }),
    Modernizr.addTest("rgba", function () {
      var e = l("a").style;
      return (
        (e.cssText = "background-color:rgba(150,255,150,.5)"),
        ("" + e.backgroundColor).indexOf("rgba") > -1
      );
    }),
    Modernizr.addTest("inlinesvg", function () {
      var e = l("div");
      return (
        (e.innerHTML = "<svg/>"),
        "http://www.w3.org/2000/svg" ==
          ("undefined" != typeof SVGRect &&
            e.firstChild &&
            e.firstChild.namespaceURI)
      );
    });
  var U = l("input"),
    z = "autocomplete autofocus list placeholder max min multiple pattern required step".split(
      " "
    ),
    D = {};
  Modernizr.input = (function (t) {
    for (var n = 0, r = t.length; r > n; n++) D[t[n]] = !!(t[n] in U);
    return D.list && (D.list = !(!l("datalist") || !e.HTMLDataListElement)), D;
  })(z);
  var Q = "search tel url email datetime date month week time datetime-local number range color".split(
      " "
    ),
    $ = {};
  (Modernizr.inputtypes = (function (e) {
    for (var r, a, o, i = e.length, s = "1)", l = 0; i > l; l++)
      U.setAttribute("type", (r = e[l])),
        (o = "text" !== U.type && "style" in U),
        o &&
          ((U.value = s),
          (U.style.cssText = "position:absolute;visibility:hidden;"),
          /^range$/.test(r) && U.style.WebkitAppearance !== n
            ? (k.appendChild(U),
              (a = t.defaultView),
              (o =
                a.getComputedStyle &&
                "textfield" !== a.getComputedStyle(U, null).WebkitAppearance &&
                0 !== U.offsetHeight),
              k.removeChild(U))
            : /^(search|tel)$/.test(r) ||
              (o = /^(url|email)$/.test(r)
                ? U.checkValidity && U.checkValidity() === !1
                : U.value != s)),
        ($[e[l]] = !!o);
    return $;
  })(Q)),
    Modernizr.addTest("hsla", function () {
      var e = l("a").style;
      return (
        (e.cssText = "background-color:hsla(120,40%,100%,.5)"),
        c(e.backgroundColor, "rgba") || c(e.backgroundColor, "hsla")
      );
    });
  var O = "CSS" in e && "supports" in e.CSS,
    I = "supportsCSS" in e;
  Modernizr.addTest("supports", O || I);
  var L = {}.toString;
  Modernizr.addTest("svgclippaths", function () {
    return (
      !!t.createElementNS &&
      /SVGClipPath/.test(
        L.call(t.createElementNS("http://www.w3.org/2000/svg", "clipPath"))
      )
    );
  }),
    Modernizr.addTest("smil", function () {
      return (
        !!t.createElementNS &&
        /SVGAnimate/.test(
          L.call(t.createElementNS("http://www.w3.org/2000/svg", "animate"))
        )
      );
    });
  var M = T._config.usePrefixes ? B.split(" ") : [];
  T._cssomPrefixes = M;
  var j = function (t) {
    var r,
      a = E.length,
      o = e.CSSRule;
    if ("undefined" == typeof o) return n;
    if (!t) return !1;
    if (
      ((t = t.replace(/^@/, "")),
      (r = t.replace(/-/g, "_").toUpperCase() + "_RULE"),
      r in o)
    )
      return "@" + t;
    for (var i = 0; a > i; i++) {
      var s = E[i],
        l = s.toUpperCase() + "_" + r;
      if (l in o) return "@-" + s.toLowerCase() + "-" + t;
    }
    return !1;
  };
  T.atRule = j;
  var V = (T.testStyles = u),
    G = (function () {
      var e = navigator.userAgent,
        t = e.match(/w(eb)?osbrowser/gi),
        n =
          e.match(/windows phone/gi) &&
          e.match(/iemobile\/([0-9])+/gi) &&
          parseFloat(RegExp.$1) >= 9;
      return t || n;
    })();
  G
    ? Modernizr.addTest("fontface", !1)
    : V('@font-face {font-family:"font";src:url("https://")}', function (e, n) {
        var r = t.getElementById("smodernizr"),
          a = r.sheet || r.styleSheet,
          o = a
            ? a.cssRules && a.cssRules[0]
              ? a.cssRules[0].cssText
              : a.cssText || ""
            : "",
          i = /src/i.test(o) && 0 === o.indexOf(n.split(" ")[0]);
        Modernizr.addTest("fontface", i);
      }),
    V(
      '#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}',
      function (e) {
        Modernizr.addTest("generatedcontent", e.offsetHeight >= 6);
      }
    );
  var W = { elem: l("modernizr") };
  Modernizr._q.push(function () {
    delete W.elem;
  });
  var F = { style: W.elem.style };
  Modernizr._q.unshift(function () {
    delete F.style;
  });
  var J = (T.testProp = function (e, t, r) {
    return v([e], n, t, r);
  });
  Modernizr.addTest("textshadow", J("textShadow", "1px 1px")),
    (T.testAllProps = A);
  var q = (T.prefixed = function (e, t, n) {
    return 0 === e.indexOf("@")
      ? j(e)
      : (-1 != e.indexOf("-") && (e = s(e)), t ? A(e, t, n) : A(e, "pfx"));
  });
  Modernizr.addAsyncTest(function () {
    var t;
    try {
      t = q("indexedDB", e);
    } catch (n) {}
    if (t) {
      var r = "modernizr-" + Math.random(),
        a = t.open(r);
      (a.onerror = function () {
        a.error && "InvalidStateError" === a.error.name
          ? i("indexeddb", !1)
          : (i("indexeddb", !0), y(t, r));
      }),
        (a.onsuccess = function () {
          i("indexeddb", !0), y(t, r);
        });
    } else i("indexeddb", !1);
  }),
    (T.testAllProps = b),
    Modernizr.addTest("cssanimations", b("animationName", "a", !0)),
    Modernizr.addTest("backgroundsize", b("backgroundSize", "100%", !0)),
    Modernizr.addTest("borderimage", b("borderImage", "url() 1", !0)),
    Modernizr.addTest("borderradius", b("borderRadius", "0px", !0)),
    Modernizr.addTest("boxshadow", b("boxShadow", "1px 1px", !0)),
    (function () {
      Modernizr.addTest("csscolumns", function () {
        var e = !1,
          t = b("columnCount");
        try {
          (e = !!t), e && (e = new Boolean(e));
        } catch (n) {}
        return e;
      });
      for (
        var e,
          t,
          n = [
            "Width",
            "Span",
            "Fill",
            "Gap",
            "Rule",
            "RuleColor",
            "RuleStyle",
            "RuleWidth",
            "BreakBefore",
            "BreakAfter",
            "BreakInside",
          ],
          r = 0;
        r < n.length;
        r++
      )
        (e = n[r].toLowerCase()),
          (t = b("column" + n[r])),
          ("breakbefore" === e || "breakafter" === e || "breakinside" == e) &&
            (t = t || b(n[r])),
          Modernizr.addTest("csscolumns." + e, t);
    })(),
    Modernizr.addTest("flexbox", b("flexBasis", "1px", !0)),
    Modernizr.addTest("cssreflections", b("boxReflect", "above", !0)),
    Modernizr.addTest("csstransforms", function () {
      return (
        -1 === navigator.userAgent.indexOf("Android 2.") &&
        b("transform", "scale(1)", !0)
      );
    }),
    Modernizr.addTest("csstransforms3d", function () {
      return !!b("perspective", "1px", !0);
    }),
    Modernizr.addTest("csstransitions", b("transition", "all", !0)),
    a(),
    o(w),
    delete T.addTest,
    delete T.addAsyncTest;
  for (var H = 0; H < Modernizr._q.length; H++) Modernizr._q[H]();
  e.Modernizr = Modernizr;
})(window, document);
