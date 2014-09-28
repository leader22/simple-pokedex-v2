module.exports = (function() {
    'use strict';

    var extend = require('extend');

    var typeData    = appRequire('app/data/type'),
        langData    = appRequire('app/data/lang/ja');

    var MonsterModel = function(monster, id) {
        this.attributes = {};
        this.initialize(monster, id);
    };

    MonsterModel.prototype = {
        constructor: MonsterModel,
        initialize: function(monster, id) {
            monster.id = id;

            monster.name = langData.name[monster._key];

            monster.typeChart = monster.type.map(function(type) {
                return {
                    defense: typeData.defense[type]
                };
            });

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

            monster.isMega = (monster._key.slice(0, 5) === 'mega-');

            this.attributes = extend({}, monster);
        },

        get: function(prop) {
            if (!prop) { return this.attributes; }
            return this.attributes[prop] || undefined;
        }
    };

    return MonsterModel;
}());
