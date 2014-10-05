module.exports = (function() {
    'use strict';

    var categoryData      = appRequire('server/data/category'),
        textData          = appRequire('server/data/text'),
        langData          = appRequire('server/data/lang/ja'),
        monsterData       = appRequire('server/data/monster'),
        MonsterCollection = appRequire('server/collection/monster');

    var monsterCollection = new MonsterCollection(monsterData.monsters),
        titleData         = textData.title,
        metaTags          = textData.metaTags,
        categories        = categoryData.categories;

    return {
        index: function *() {
            var categoriesArr = Object.keys(categories).map(function(category) {
                return categories[category];
            });

            yield this.render('index', {
                page:      'index',
                title:      titleData['index'],
                metaTags:   metaTags['index'],
                categories: categoriesArr
            });
        },

        about: function *() {
            yield this.render('about', {
                page:     'about',
                metaTags: metaTags['about'],
                title:    titleData['about']
            });
        },

        list: function *() {
            var category = this.params.ctg;

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
                metaTags: metaTags['list'],
                title:    title,
                monsters: monsters
            });
        },

        detail: function *() {
            var key = this.params.key;

            var monster = monsterCollection.getMonsterByKey(key);

            var description = metaTags['detail']['description'].replace('%s', monster.name),
                keywords    = [].slice.call(metaTags['detail']['keywords']);
            keywords.push(monster.name);
            keywords.push(key);

            // オブジェクトからひくと、並びが保証されないので配列
            var moveLearnTypesArr = [
                'level',
                'machine',
                'egg',
                'tutor',
                'other'
            ];

            yield this.render('detail', {
                page:     'detail',
                metaTags: {
                    description: description,
                    keywords:    keywords
                },
                title:    titleData['detail'].replace('%s', monster.name),
                monster:  monster,
                moveLearnTypesArr: moveLearnTypesArr,
                learnTypeStrMap: langData['moveLearnType']
            });
        },

        error: function *() {
            yield this.render('error', {
                page:     'error',
                metaTags: metaTags['error'],
                title:    titleData['error']
            });
        }
    };
}());
