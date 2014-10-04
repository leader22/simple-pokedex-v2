/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {;(function(global) {
	    'use strict';

	    var Controller = __webpack_require__(1);
	    var Dispatcher = __webpack_require__(2);

	    new Dispatcher({ controller: Controller })
	        .add('/detail', ['detail'])
	        .start();

	}(this.self || global));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = (function(global) {
	    'use strict';

	    var doc = global.document;

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

	    return C;

	}(this.self || global));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ }
/******/ ])