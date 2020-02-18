
var $buoop = {
  required: {
    i: 11,
    e: 15,
    f: 52,
    o: 44,
    s: 10.1,
    c: 57
  },
  insecure: true,
  api: 2019.10,
  url: "https://www.chapman.edu/upgrade-browser.aspx",
  shift_page_down: true,
  onshow: function () {
    var e = document.getElementsByTagName('b')[0];
    var d = document.createElement('strong');
    d.innerHTML = e.innerHTML;
    d.classList.add('buorg-mainmsg');

    e.parentNode.replaceChild(d, e);
  }
};

function $buo_f() {
  var e = document.createElement("script");
  e.src = "//browser-update.org/update.min.js";
  document.body.appendChild(e);
};
try {
  document.addEventListener("DOMContentLoaded", $buo_f, false)
} catch (e) {
  window.attachEvent("onload", $buo_f)
}