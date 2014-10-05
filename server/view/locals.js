module.exports = (function() {
    'use strict';

    return {
        copyright: function() {
            var y = new Date().getFullYear();
            return '&copy; ' + y;
        }
    };
}());
