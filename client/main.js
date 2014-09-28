;(function(global) {
    'use strict';

    var doc = global.document;

    var route = location.pathname.split('/')[1];

    var C = {
        detail: function() {
            var backBtn = doc.getElementById('js-back-btn');

            backBtn.addEventListener('click', function() {
                history.back();
            }, false);
        }
    };

    C[route] && C[route]();
}(this.self || global));
