module.exports = (function() {
    'use strict';

    var path = require('path');

    var Util         = require(path.join(__dirname, 'util')),
        categoryData = require(path.join(__dirname, 'data/category')),
        monsterData  = require(path.join(__dirname, 'data/monster'));

    return {
        index: function *() {

            var categories    = categoryData.categories;
            var categoriesArr = Object.keys(categories).map(function(category) {
                return categories[category];
            });

            yield this.render('index', {
                title: '',
                categories: categoriesArr
            });
        },

        about: function *() {
            yield this.render('about', {
                title: '',
                users: monsterData.monsters
            });
        }
    };
}());
