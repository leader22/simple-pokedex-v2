module.exports = (function() {
    'use strict';

    var path = require('path');

    var Util = require(path.join(__dirname, 'util')),
        monsterData = require(path.join(__dirname, 'data/monster'));

    return {
        index: function *() {
            var lang = Util.getJpOrEnByCtx(this);
            yield this.render('index', {
                lang: lang,
                title: ''
            });
        },

        about: function *() {
            var lang = Util.getJpOrEnByCtx(this);
            yield this.render('about', {
                lang: lang,
                title: '',
                users: monsterData.monsters
            });
        }
    };
}());
