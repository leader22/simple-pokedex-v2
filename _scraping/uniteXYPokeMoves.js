var fs = require('fs');
var all = require('./all');

var start = 650, end = 721;

for (; start <= end; start++) {
    var move = require('./XYmoves/' + start);
    all[start] = move;
}

var out = 'module.exports = ' + JSON.stringify(all, null, 4) + ';';

fs.writeFile('out.js', out);
