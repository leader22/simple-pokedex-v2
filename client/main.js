;(function(global) {
    'use strict';

    var Controller = require('./controller');
    var Dispatcher = require('./lib/dispatcher');

    new Dispatcher({ controller: Controller })
        .add('/detail', ['detail'])
        .start();

}(this.self || global));
