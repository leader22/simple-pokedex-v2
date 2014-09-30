var http = require('http');
var fs   = require('fs');

var from = (process.argv[2]|0) || 1,
    to   = (process.argv[3]|0) || 718;

// var id = (process.argv[2]|0) || 1;
// _getMonsterJson(id);

for (var i = from, l = to; from <= to; from++) {
    _getMonsterJson(from);
}

function _getMonsterJson(id) {
    var URL = 'http://pokeapi.co/api/v1/pokemon/%s/';
    var resBody = '', resObj;

    URL = URL.replace('%s', id);
    console.log('Fetch: ', URL);

    http.get(URL, function(res) {
        res.setEncoding('utf8');

        res.on('data', function(chunk){
            resBody += chunk;
        });

        res.on('end', function(){
            console.log('Fetched');
            resObj = _fixData(resBody);
            _writeFile(id, resObj);
        });
    });
}

function _fixData(obj) {
    try {
        obj = JSON.parse(obj);
    } catch(e) {
        console.log(e);
        throw new Error('Invalid response!');
    }

    var name  = obj.name.toLowerCase();
    var moves = obj.moves.map(function(move) {
        move['name'] = move['name'].toLowerCase();
        delete move['resource_uri'];
        return move;
    });

    return {
        key:   name,
        moves: moves
    };
}

function _writeFile(fname, obj) {
    if (typeof obj === 'object') {
        obj = JSON.stringify(obj, null, 4);
    }
    if (typeof obj !== 'string') {
        throw new Error('Cant write file! obj was not a string.');
    }

    obj = 'module.exports = ' + obj + ';';

    var fpath = './fetch/'+fname+'.js';
    fs.writeFile(fpath, obj, function() { console.log('Write:', fpath); });
}
