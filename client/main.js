;(function(global) {
    'use strict';

    var doc = global.document;
    var route = location.pathname.split('/')[1];

    var C = {
        detail: function() {
            var backBtn = doc.getElementById('js-back-btn');
            var tabSelector = doc.getElementsByClassName('js-tab-selector');
            var tabWrap     = doc.getElementsByClassName('js-tab-wrap');

            [].forEach.call(tabSelector, function(elm) {
                elm.addEventListener('click', function(ev) {
                    __resetAllTabWrap();
                    var idx = ev.currentTarget.getAttribute('data-index');
                    tabWrap[idx].style.display = 'block';
                    tabSelector[idx].classList.add('is-selected');
                });
            });

            __resetAllTabWrap();
            tabWrap[0].style.display = 'block';
            tabSelector[0].classList.add('is-selected');

            backBtn.addEventListener('click', function() {
                history.back();
            }, false);

            function __resetAllTabWrap() {
                [].forEach.call(tabWrap, function(elm, idx) {
                    elm.style.display = 'none';
                    tabSelector[idx].classList.remove('is-selected');
                });
            }
        }
    };

    route in C && C[route]();
}(this.self || global));
