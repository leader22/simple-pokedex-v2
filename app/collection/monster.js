module.exports = (function() {
    'use strict';

    var categoryData = appRequire('app/data/category');
    var MonsterModel = appRequire('app/model/monster');
    var categories   = categoryData.categories;

    var MonsterCollection = function(monsters) {
        this.initialize(monsters);
    };

    MonsterCollection.prototype = {
        constructor: MonsterCollection,
        initialize: function(monsters) {
            this.items = monsters.map(function(monster, id) {
                return new MonsterModel(monster, ++id);
            });
        },
        all: function() {
            return this.items.map(function(model) {
                return model.get();
            });
        },

        getCategorisedMonstersByCategory: function(category) {
            var categoryContents = categories[category].contents;

            return this.all()
                .filter(function(monster) {
                    var firstLetter = monster.name.charAt(0);
                    var isValidName = categoryContents.some(function(content) {
                        return content === firstLetter;
                    });
                    // メガシンカは特別なカテゴリがあるので省く
                    var isMega = monster.isMega;

                    return isValidName && !isMega;
                })
                // 50音順
                .sort(function(a, b){
                    return (a.name > b.name) ? 1 : -1;
                });
        },
        getMegaMonsters: function() {
            return this.all()
                .filter(function(monster) {
                    return monster.isMega;
                });
        }
    };

    return MonsterCollection;
}());
