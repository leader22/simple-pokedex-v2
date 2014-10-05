var fs = require('fs');
var all = require('../server/data/move');

var start = 650, end = 721;

for (; start <= end; start++) {
    var move = require('./XYmoves/' + start);
    move.other = [];
    all[start] = move;
}

var out = 'module.exports = ' + JSON.stringify(all, null, 4) + ';';

fs.writeFile('../server/data/move.js', out);
