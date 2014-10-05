var moveTables = $$('.dextable');
moveTables = [].slice.call(moveTables);
var levelMoves   = _getTable('LEVEL'),
    machineMoves = _getTable('MACHINE'),
    eggMoves     = _getTable('EGG'),
    tutorMoves   = _getTable('TUTOR');

levelMoves   = levelMoves ? _getLevelMoves(levelMoves.querySelectorAll('tr')) : [];
eggMoves     = eggMoves ? _getETMOMoves(eggMoves.querySelectorAll('.fooinfo > a')) : [];
machineMoves = machineMoves ? _getETMOMoves(machineMoves.querySelectorAll('.fooinfo > a')) : [];
tutorMoves   = tutorMoves ? _getETMOMoves(tutorMoves.querySelectorAll('.fooinfo > a')) : [];

var json = JSON.stringify({
    level: levelMoves,
    tutor: tutorMoves,
    machine: machineMoves,
    egg: eggMoves,
}, null, 4);


document.write('<pre>' + 'module.exports = ' + json + ';' + '</pre>');

function _getTable(type) {
    var CHK  = {
        LEVEL:   'X / Y Level Up',
        MACHINE: 'TM & HM Attacks',
        EGG:     'Egg Moves (Details)',
        TUTOR:   'Move Tutor Attacks'
    };
    return moveTables.filter(function(table) {
        var ext = table.querySelector('.fooevo');
        if (!ext) { return false; }
        return ext.textContent === CHK[type];
    })[0];
}

function _getLevelMoves(elms) {
    elms = [].slice.call(elms, 2);
    elms = elms.filter(function(e, i) { return i % 2 === 0; });
    return elms.map(function(elm) {
        var fooinfo = elm.querySelectorAll('.fooinfo');
        return {
            level: _getMoveLevel(fooinfo[0].textContent),
            name:  _getMoveText(fooinfo[1].textContent)
        };
    });
}

function _getETMOMoves(elms) {
    return [].map.call(elms, function(elm) { return _getMoveText(elm.textContent); });
}
function _getMoveLevel(txt) { return ((txt|0) === 0) ? '1' : txt; }
function _getMoveText(txt) { return txt.toLowerCase().replace(/\s/gm, '-'); }
