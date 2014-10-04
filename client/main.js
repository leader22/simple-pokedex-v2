;(function(global) {
    'use strict';

    var Controller = require('./controller');
    var Dispatcher = require('./dispatcher');

    new Dispatcher({ controller: Controller })
        .add('/detail', ['detail'])
        .start();

}(this.self || global));
