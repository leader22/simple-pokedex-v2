module.exports = (function(global) {
    'use strict';

    var Const = require('../const');
    var Dom   = require('../lib/dom');

    var DetailView = function() { this.initialize(); };
    DetailView.prototype = {
        constructor: DetailView,
        ui: {
            backBtn:      '#js-back-btn',
            tabSelector: '.js-tab-selector',
            tabWrap:     '.js-tab-wrap'
        },
        initialize: function() {
            for (var selector in this.ui) {
                this.ui[selector] = Dom.get(this.ui[selector]);
            }

            var that = this;
            [].forEach.call(this.ui.tabSelector, function(elm) {
                elm.addEventListener('click', function(ev) {
                    that._resetAllTabWrap();
                    var idx = ev.currentTarget.getAttribute('data-index');
                    Dom.show(that.ui.tabWrap[idx]);
                    that.ui.tabSelector[idx].classList.add(Const.CLASS.IS_SELECTED);
                });
            });

            return this;
        },

        start: function() {
            this._resetAllTabWrap();
            this.ui.tabWrap[0].style.display = 'block';
            this.ui.tabSelector[0].classList.add(Const.CLASS.IS_SELECTED);

            this.ui.backBtn.addEventListener('click', function() {
                history.back();
            }, false);
        },

        _resetAllTabWrap: function() {
            var that = this;
            [].forEach.call(this.ui.tabWrap, function(elm, idx) {
                elm.style.display = 'none';
                that.ui.tabSelector[idx].classList.remove(Const.CLASS.IS_SELECTED);
            });
        }
    };

    return DetailView;


}(this.self || global));
