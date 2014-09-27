module.exports = (function() {
    'use strict';

    var monsterData = appRequire('app/data/monster'),
        typeData    = appRequire('app/data/type'),
        langData    = appRequire('app/data/lang/ja');

    // そのまえにModel用意するか考える
    // Collectionとして使うとこではModel情報いらんけど、どうするか
    var MonsterCollection = function() {
        this.monsters = monsterData.monsters.map(function(monster) {
            monster.typeChart = monster.type.map(function(type) {
                return {
                    defense: typeData.defense[type]
                };
            });

            monster.name = langData.name[monster._key];

            if (monster.abilities.normal.length) {
                monster.abilities.normal = monster.abilities.normal.map(function(ability) {
                    return langData.ability[ability];
                });
            }
            if (monster.abilities.hidden.length) {
                monster.abilities.hidden = monster.abilities.hidden.map(function(ability) {
                    return langData.ability[ability];
                });
            }

            return monster;
        });
    };

    MonsterCollection.prototype = {
        constructor: MonsterCollection,
        all: function() {
            return this.monsters;
        }
    };

    return MonsterCollection;
}());
