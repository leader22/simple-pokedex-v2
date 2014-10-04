module.exports = (function(global) {
    'use strict';

    var DetailView = require('./view/detail');


    var C = {
        detail: function() {
            new DetailView().start();
        }
    };

    return C;

}(this.self || global));
