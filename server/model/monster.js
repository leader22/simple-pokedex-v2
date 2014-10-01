module.exports = (function() {
    'use strict';

    var extend = require('extend'),
        _      = require('lodash');

    var Util     = appRequire('shared/util'),
        typeData = appRequire('server/data/type'),
        moveData = appRequire('server/data/move'),
        langData = appRequire('server/data/lang/ja');

    var MonsterModel = function(monster, id) {
        this.attributes = {};
        this.initialize(monster, id);
    };

    MonsterModel.prototype = {
        constructor: MonsterModel,
        initialize: function(data, id) {
            var monster = extend(true, {}, data);

            // 基本情報
            monster.id = id;
            monster.name = langData.name[monster.key];

            // タイプと相性
            monster.type         = monster.type.map(__extendTypeStr);
            monster.typeChartStr = __getDefTypeChartStr(monster.type);

            // 特性
            if (monster.abilities.normal.length) {
                monster.abilities.normal = monster.abilities.normal.map(__extendAbilityStr);
            }
            if (monster.abilities.hidden.length) {
                monster.abilities.hidden = monster.abilities.hidden.map(__extendAbilityStr);
            }

            // わざ
            var nationalId = monster.nationalPokedexNumber|0;
            monster.moves = moveData[nationalId]

            // 種族値
            var baseStats = monster.baseStats;
            monster.baseStats.total = __getTotalStats(baseStats);
            monster.baseStatsRatio = __getBaseStatsRatio(baseStats);

            // その他の情報
            monster.isMega    = monster.key.slice(0, 5) === 'mega-';
            monster.weightStr = Util.lbs2Kg(monster.weight) + 'kg';
            monster.heightStr = Util.ft2M(monster.height) + 'm';

            this.attributes = monster;
        },

        get: function(prop) {
            if (!prop) { return this.attributes; }
            return this.attributes[prop] || undefined;
        }
    };

    return MonsterModel;


    function __extendTypeStr(type) {
        return {
            typeStr: langData.type[type],
            type:    type
        };
    }

    function __extendAbilityStr(ability) {
        return langData.ability[ability];
    }

    function __getDefTypeChartStr(monsterType) {
        var defTypeChart = monsterType.map(function(type) {
            return typeData.defense[type.type];
        });

        var efx200    = _.pluck(defTypeChart, '200');
        var efx200All = _.union(efx200[0], efx200[1]);
        var efx50     = _.pluck(defTypeChart, '50');
        var efx50All  = _.union(efx50[0], efx50[1]);
        var efx0      = _.pluck(defTypeChart, '0');
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

        var typeChartStr = {
            efx400: efx400Unq,
            efx200: efx200Unq,
            efx50:  efx50Unq,
            efx25:  efx25Unq,
            efx0:   efx0Unq
        };
        for(let efx in typeChartStr) {
            typeChartStr[efx] = typeChartStr[efx].map(__extendTypeStr);
        }

        return typeChartStr;
    }

    function __getTotalStats(baseStats) {
        var total = 0;
        for (let stat in baseStats) {
            total += baseStats[stat];
        }

        return total;
    }

    function __getBaseStatsRatio(baseStats) {
        var baseStatsRatio = {};
        for (let stat in baseStats) {
            baseStatsRatio[stat] = Util.getBaseStatsRatio(baseStats[stat], stat === 'total');
        }

        return baseStatsRatio;
    }

}());
