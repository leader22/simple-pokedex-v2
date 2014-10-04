module.exports = (function(global) {
    'use strict';

    var doc = global.document;

    var Dom = {
        get: function(selector) {
            var prefix = selector[0];

            if (prefix === '#') {
                return doc.getElementById(selector.substring(1, selector.length));
            }
            else if (prefix === '.') {
                return doc.getElementsByClassName(selector.substring(1, selector.length));
            }
            else {
                return doc.querySelectorAll(selector);
            }
        },

        hide: function(elm) {
            elm.style.display = 'none';
            return elm;
        },

        show: function(elm) {
            elm.style.display = 'block';
            return elm;
        }
    };

    return Dom;

}(this.self || global));
