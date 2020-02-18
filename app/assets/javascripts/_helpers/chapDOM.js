var chapDOM = (function () {
  var validAttr = ['src', 'alt', 'href', 'data-cta-label', 'aria-label', 'style'];
  'use strict';
  /**
   * Create the constructor
   * @param {String} selector The selector to use
   */
  var Constructor = function (selector) {

    if (!selector) return;

    if (selector === 'document') {
      this.elems = [document];
    } else if (selector === 'window') {
      this.elems = [window];
    } else {
      this.elems = document.querySelectorAll(selector);
    }
  };

  /**
   * Run a callback on each item
   * @param  {Function} callback The callback function to run
   */
  Constructor.prototype.each = function (callback) {
    if (!callback || typeof callback !== 'function') return;
    for (var i = 0; i < this.elems.length; i++) {
      callback(this.elems[i], i);
    }

    return this;
  };

  /**
   * Add a class to elements
   * @param {String} className The class name
   */
  Constructor.prototype.addClass = function (className) {
    if (!this.elems.length) return;

    this.each(function (item) {
      item.classList.add(className);
    });

    return this;
  };

  /**
   * Change the html element attribute
   * @param {String} type The html attribute
   * @param {String} data Value to set the html attribute to
  Constructor.prototype.changeAttr = function (type, data) {
    if (!this.elems.length) return

    if (typeof data !== 'string' && !validAttr.includes(type)) return;

    if (this.elems.length > 1) {
      this.each(function (elem) {

        elem.setAttribute(type, data);
      });
      return this;
    }

    this.elems[0].setAttribute(type, data);

    return this;
  }
  /**
   * Change the html text
   * @param {String} text Value to set the inner html for the element to
   */
  Constructor.prototype.changeText = function (text) {
    if (!this.elems.length) return

    if (typeof text !== 'string') return;

    if (this.elems.length > 1) {
      this.each(function (elem) {
        elem.innerHTML = text;
      });
      return this;
    }

    this.elems[0].textContent = text;
    return this;
  }

  /**
   * Remove a class to elements
   * @param {String} className The class name

  Constructor.prototype.removeClass = function (className) {
    if (!this.elems.length) return;
    this.each(function (item) {
      item.classList.remove(className);
    });

    return this;
  };

  Constructor.prototype.hide = function () {
    if (!this.elems.length) return;

    if (this.elems.length > 1) {
      this.each(function (elem) {
        elem.style.display = 'none';
      });
      return this;
    }

    this.elems[0].style.display = 'none';
    return this;
  }

  /**
   * Instantiate a new constructor
   */
  var instantiate = function (selector) {
    return new Constructor(selector);
  };

  /**
   * Return the constructor instantiation
   */
  return instantiate;

})();