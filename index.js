global.appRequire = function(name) {
    return require(__dirname + '/' + name);
}

appRequire('app/main');