module.exports = (function() {
    'use strict';

    return {
        getJpOrEnByCtx: function(ctx) {
            var acceptLang = ctx.request.header['accept-language'];
            if (!acceptLang) { return 'ja'; }

            var lang = acceptLang.split(',')[0];
            return (lang === 'ja') ? 'ja' : 'en';
        },
        lbs2Kg: function(lbs) {
            return ((+lbs) * 0.4536).toFixed(1);
        },
        ft2M: function(ft) {
            var splt = ft.split('′'),
            strFt = (splt[0]|0) + '.' + (splt[1].split('″')[0]);
            return ((+strFt) * 0.3048).toFixed(1);
        },
        getBaseStatsRatio: function(stat, isTotal) {
            var MAX_STAT = 255, MAX_ALL_STAT = 780;

            var maxStat = (isTotal) ? MAX_ALL_STAT : MAX_STAT;
            return ((stat / maxStat) * 100).toFixed(1);
        }
    };

}());
