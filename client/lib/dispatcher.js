module.exports = (function() {
    'use strict';

    var instance;
    var Dispatcher = function(options) {
        if (instance) { return instance; }
        options = options || {};

        this._controller = options.controller || null;
        this._routes = [];

        return (instance = this);
    };

    Dispatcher.prototype = {
        constructor: Dispatcher,
        add:         _add,
        start:       _start
    };

    function _add(route, funcNames) {
        funcNames = (typeof funcNames === 'string') ? [funcNames] : funcNames;

        var controller = this._controller,
            funcs = [];
        funcs = funcNames.map(function(name) {
            if (typeof name === 'function') {
                return name;
            }
            if (typeof name === 'string' && controller) {
                return controller[name];
            }
        });

        this._routes.push({
            routeRegexp: new RegExp(route),
            routeFuncs:  funcs
        });

        return this;
    }

    function _start() {
        var path = location.pathname;
        this._routes.forEach(function(route) {
            var match = route.routeRegexp.test(path);
            if (match) {
                route.routeFuncs.forEach(function(func) {
                    func();
                });
            }
        });

        return this;
    }

    return Dispatcher;
}());
