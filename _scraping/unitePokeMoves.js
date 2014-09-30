var fs = require('fs');

var from = (process.argv[2]|0) || 1,
    to   = (process.argv[3]|0) || 718;
// var from = 1, to = 1;

var learnTypeStr = {
    'tutor':    'tutor',
    'machine':  'machine',
    'egg move': 'egg',
    'level up': 'level',
    'other':    'other'
};
var out = {}, json;

for (; from <= to; from++) {
    json = require('./fetch/' + from);
    var learnTypeMap = {
        'tutor':   [],
        'machine': [],
        'egg':     [],
        'level':   [],
        'other':   []
    };

    json.moves.forEach(function(move) {
        var type = move['learn_type'];
        delete move['learn_type'];

        if (type === 'level up') {
            learnTypeMap[learnTypeStr[type]].push(move);
        }
        else {
            learnTypeMap[learnTypeStr[type]].push(move.name);
        }
    });


    for (var type in learnTypeMap) {
        var moves = learnTypeMap[type];

        if (type === 'level') {
            moves = moves.sort(_sortByLv);
        }
        else {
            moves = moves.sort(_sortByName);
        }
    }

    out[json.key] = learnTypeMap;
}

_writeFile(out);


function _sortByLv(a, b) {
    return (a.level > b.level) ? 1 : -1;
}

function _sortByName(a, b) {
    return (a > b) ? 1 : -1;
}

function _writeFile(obj) {
    if (typeof obj === 'object') {
        obj = JSON.stringify(obj, null, 4);
    }
    if (typeof obj !== 'string') {
        throw new Error('Cant write file! obj was not a string.');
    }

    obj = 'module.exports = ' + obj + ';';

    var fpath = './out/moves.js';
    fs.writeFile(fpath, obj, function() { console.log('Write:', fpath); });
}
