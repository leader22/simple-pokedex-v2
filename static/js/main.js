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

	
	var Dispathcer = __webpack_require__(1);
	var Util       = __webpack_require__(2);

	console.log('WEBPACK', Dispathcer, Util);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function() {
	    'use strict';

	    var Dispatcher = function() {};

	    Dispatcher.prototype = {
	        constructor: Dispatcher
	    };

	    return Dispatcher;
	}());


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function() {
	    'use strict';

	    return {
	        getJpOrEnByCtx: function(ctx) {
	            var acceptLang = ctx.request.header['accept-language'];
	            if (!acceptLang) { return 'ja'; }

	            var lang = acceptLang.split(',')[0];
	            return (lang === 'ja') ? 'ja' : 'en';
	        },
	        lbs2Kg: function(lbs) {
	            return ((+lbs) * 0.4536).toFixed(1);
	        },
	        ft2M: function(ft) {
	            var splt = ft.split('′'),
	            strFt = (splt[0]|0) + '.' + (splt[1].split('″')[0]);
	            return ((+strFt) * 0.3048).toFixed(1);
	        },
	        getBaseStatsRatio: function(stat, isTotal) {
	            var MAX_STAT = 255, MAX_ALL_STAT = 780;

	            var maxStat = (isTotal) ? MAX_ALL_STAT : MAX_STAT;
	            return ((stat / maxStat) * 100).toFixed(1);
	        }
	    };

	}());


/***/ }
/******/ ])