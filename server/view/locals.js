module.exports = (function() {
    'use strict';

    var Util = appRequire('shared/util');

    return {
        copyright: function() {
            var y = new Date().getFullYear();
            return '&copy; ' + y;
        }
    };
}());
