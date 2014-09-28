module.exports = (function() {
    'use strict';

    var extend = require('extend'),
        _      = require('lodash');

    var Util     = appRequire('app/util'),
        typeData = appRequire('app/data/type'),
        langData = appRequire('app/data/lang/ja');

    var MonsterModel = function(monster, id) {
        this.attributes = {};
        this.initialize(monster, id);
    };

    MonsterModel.prototype = {
        constructor: MonsterModel,
        initialize: function(monster, id) {
            monster.id = id;

            monster.name = langData.name[monster.key];

            monster.type = monster.type.map(function(type) {
                return {
                    typeStr: langData.type[type],
                    type:    type
                };
            });

            monster.typeChart = monster.type.map(function(type) {
                return {
                    defense: typeData.defense[type.type]
                };
            });

            var defTypeCharts = _.pluck(monster.typeChart, 'defense');

            var efx200    = _.pluck(defTypeCharts, '200');
            var efx200All = _.union(efx200[0], efx200[1]);
            var efx50     = _.pluck(defTypeCharts, '50');
            var efx50All  = _.union(efx50[0], efx50[1]);
            var efx0      = _.pluck(defTypeCharts, '0');
            var efx0All   = _.union(efx0[0], efx0[1]);

            // 2タイプとも効果抜群なら4倍弱点
            var efx400Unq = _.intersection(efx200[0], efx200[1]);

            // 2倍以上の中から、4倍と無効を削ったのが真の2倍
            var efx200Unq = _.difference(efx200All, efx400Unq, efx0All);

            // 2タイプとも半減なら1/4
            var efx25Unq = _.intersection(efx50[0], efx50[1]);

            // 2倍以上に片方のタイプで半減できるやつがある
            efx200Unq = _.difference(efx200Unq, efx50All, efx25Unq);
            // その逆も然り
            var efx50Unq = _.difference(efx50All, efx25Unq, efx200All, efx0All);
            // ゴミをとる
            var efx0Unq = _.compact(efx0All);

            monster.typesChartStr = {
                efx400: efx400Unq,
                efx200: efx200Unq,
                efx50:  efx50Unq,
                efx25:  efx25Unq,
                efx0:   efx0Unq
            };
            for(let efx in monster.typesChartStr) {
                monster.typesChartStr[efx] = monster.typesChartStr[efx].map(function(type) {
                    return {
                        typeStr: langData.type[type],
                        type:    type
                    };
                });
            }

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

            var baseStats = monster.baseStats;

            var total = 0;
            for (let stat in baseStats) {
                total += baseStats[stat];
            }
            monster.baseStats.total = total;

            var baseStatsRatio = {};
            for (let stat in baseStats) {
                baseStatsRatio[stat] = Util.getBaseStatsRatio(baseStats[stat], stat === 'total');
            }
            monster.baseStatsRatio = baseStatsRatio;;

            monster.isMega = (monster.key.slice(0, 5) === 'mega-');

            monster.weightStr = Util.lbs2Kg(monster.weight) + 'kg';
            monster.heightStr = Util.ft2M(monster.height) + 'm';


            this.attributes = extend({}, monster);
        },

        get: function(prop) {
            if (!prop) { return this.attributes; }
            return this.attributes[prop] || undefined;
        }
    };

    return MonsterModel;


}());
