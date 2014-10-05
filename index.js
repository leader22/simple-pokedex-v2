// use this require func
global.appRequire = function(name) {
    return require(__dirname + '/' + name);
}

// pass boot port
var Conf = appRequire('server/conf');

var port = Conf.defaultPort;
process.argv.slice(1).forEach(function(arg) {
    if (/-p=/.test(arg)) {
        port = _getPortNoByPortOpt(arg);
    }
});

console.log('App started on port:', port);
appRequire('server/main')(port);

function _getPortNoByPortOpt(portOpt) {
    portOpt = portOpt.split('=');
    var port = portOpt[1] || '';
    return port || Conf.defaultPort;
}
