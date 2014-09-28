module.exports = (function() {
    'use strict';

    var categoryData      = appRequire('app/data/category'),
        titleData         = appRequire('app/data/title'),
        monsterData       = appRequire('app/data/monster'),
        MonsterCollection = appRequire('app/collection/monster');

    var monsterCollection = new MonsterCollection(monsterData.monsters);

    return {
        index: function *() {
            var categories    = categoryData.categories;
            var categoriesArr = Object.keys(categories).map(function(category) {
                return categories[category];
            });

            yield this.render('index', {
                page:      'index',
                title:      titleData['index'],
                categories: categoriesArr
            });
        },

        about: function *() {
            yield this.render('about', {
                page:  'about',
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
                monsters = monsterCollection.getMegaMonsters();
            }
            else if (category) {
                title = titleData['categorisedList'].replace('%s', categories[category].label);
                monsters = monsterCollection.getCategorisedMonstersByCategory(category);
            }
            else {
                title = titleData['list'];
                monsters = monsterCollection.all();
            }

            yield this.render('list', {
                page:     'list',
                title:    title,
                monsters: monsters
            });
        },

        detail: function *() {
            var key = this.params.key;

            var monster = monsterCollection.getMonsterByKey(key);
            console.log(monster);

            yield this.render('detail', {
                page:    'detail',
                title:   titleData['detail'].replace('%s', monster.name),
                monster: monster
            });
        }
    };
}());
