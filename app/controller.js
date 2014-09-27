module.exports = (function() {
    'use strict';

    var Util              = appRequire('app/util'),
        categoryData      = appRequire('app/data/category'),
        titleData         = appRequire('app/data/title'),
        monsterData       = appRequire('app/data/monster'),
        MonsterCollection = appRequire('app/collection/monster');

    var monsterCollection = new MonsterCollection();

    return {
        index: function *() {
            var categories    = categoryData.categories;
            var categoriesArr = Object.keys(categories).map(function(category) {
                return categories[category];
            });

            yield this.render('index', {
                title: titleData['index'],
                categories: categoriesArr
            });
        },

        about: function *() {
            yield this.render('about', {
                title: titleData['about']
            });
        },

        list: function *() {
            var category = this.params.ctg;
            var categories = categoryData.categories;

            var title,
                monsters;

            if (category === 'mega') {
                title = titleData['megaList'];
            }
            else if (category) {
                title = titleData['categorisedList'].replace('%s', categories[category].label);
            }
            else {
                title = titleData['list'];
            }

            yield this.render('list', {
                title:    title,
                monsters: monsterData.monsters
            });
        }
    };
}());
