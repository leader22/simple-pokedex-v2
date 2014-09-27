module.exports = (function() {
    'use strict';

    // これしかなかったらUtilは消す
    var Util = appRequire('app/util');

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
