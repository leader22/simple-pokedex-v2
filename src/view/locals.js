module.exports = (function() {
    'use strict';

    var path = require('path');

    var Util = require(path.join(__dirname, '../util'));

    return {
        lang: function() { return Util.getJpOrEnByCtx(this); }
        // lang: Util.getJpOrEnByCtx
    };
}());
