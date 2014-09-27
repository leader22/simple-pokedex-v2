module.exports = (function() {
    'use strict';

    return {
        getJpOrEnByCtx: function(ctx) {
            var acceptLang = ctx.request.header['accept-language'];
            if (!acceptLang) { return 'ja'; }

            var lang = acceptLang.split(',')[0];
            return (lang === 'ja') ? 'ja' : 'en';
        }
    };

}());
