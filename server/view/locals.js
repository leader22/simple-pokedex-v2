module.exports = (function() {
    'use strict';

    var Util = appRequire('shared/util');

    // 毎リクエスト処理しなくていいやつらをキャッシュする
    return {
        lang: function() {
            return Util.getJpOrEnByCtx(this);
        },
        copyright: function() {
            var y = new Date().getFullYear();
            return '&copy; ' + y;
        }
    };
}());
