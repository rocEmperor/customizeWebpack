/**
 * 定义的变量容器的作用
 * webpackJsonpCallback: Function --> 模块加载函数，加载的策略是：根据moduleid读取，优先读取缓存installedModules，
 *                                --> 读取失败则读取modules，获取返回值，然后进行缓存。
 * 
 * checkDeferredModules: Function --> 用于检查所有资源是否加载完毕，如果加载完毕，则调用__webpack_require__从入口文件开始eval执行
 * 
 * installedModules: Object --> 用于缓存已加载的模块，即module.exports。模块的加载规则，如果缓存中没有，则执行当前js资源，同时添加缓存，下次再
 *                          --> 引用此模块时，直接取缓存，js资源则不再执行，机制类似commonJs执行机制
 * 
 * installedChunks: Object --> 用于标记chunk文件是否已经被加载。
 * 
 * deferredModules: Array --> 用于储存构建的入口执行文件及公共依赖资源
 * 
 * __webpack_require__: Function --> 模块加载函数，加载的策略是：根据moduleid读取，优先读取缓存installedModules，读取失败则读取modules，
 *                               --> 获取返回值，然后进行缓存。
 * jsonpArray: Array
 * oldJsonpFunction: Function
 * parentJsonpFunction: Function
 * 
 * modules Object --> 模块本身是一个函数，modules用于存储模块函数数组。
 */
(function(modules) { // webpackBootstrap
    // install a JSONP callback for chunk loading
	function webpackJsonpCallback(data) {
 		var chunkIds = data[0];
 		var moreModules = data[1];
 		var executeModules = data[2];
 		// add "moreModules" to the modules object,
 		// then flag all "chunkIds" as loaded and fire callback
 		var moduleId, chunkId, i = 0, resolves = [];
 		for(;i < chunkIds.length; i++) {
			 chunkId = chunkIds[i];
 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
 				resolves.push(installedChunks[chunkId][0]);
 			}
 			installedChunks[chunkId] = 0;
 		}
 		for(moduleId in moreModules) {
 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
 				modules[moduleId] = moreModules[moduleId];
 			}
        }
 		if(parentJsonpFunction) parentJsonpFunction(data);
 		while(resolves.length) {
 			resolves.shift()();
 		}
 		// add entry modules from loaded chunk to deferred list
 		deferredModules.push.apply(deferredModules, executeModules || []);
 		// run deferred modules when all chunks ready
 		return checkDeferredModules();
	};
	function checkDeferredModules() {
		var result;
		for(var i = 0; i < deferredModules.length; i++) {
            var deferredModule = deferredModules[i];
			var fulfilled = true;
			for(var j = 1; j < deferredModule.length; j++) {
                var depId = deferredModule[j];
				if(installedChunks[depId] !== 0) {
                    fulfilled = false
                }
			}
			if(fulfilled) {
				deferredModules.splice(i--, 1);
				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
			}
		}
		return result;
	}
	// The module cache
	var installedModules = {};
	// object to store loaded and loading chunks
	// undefined = chunk not loaded, null = chunk preloaded/prefetched
	// Promise = chunk loading, 0 = chunk loaded
	var installedChunks = {
		"main": 0
	};
	var deferredModules = [];
	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
        }
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
        };
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}
	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;
	// expose the module cache
	__webpack_require__.c = installedModules;
	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};
	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};
	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	// __webpack_public_path__
	__webpack_require__.p = "";

	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
	jsonpArray.push = webpackJsonpCallback;
	jsonpArray = jsonpArray.slice();
	for(var i = 0; i < jsonpArray.length; i++) {
        webpackJsonpCallback(jsonpArray[i])
    };
	var parentJsonpFunction = oldJsonpFunction;
	// add entry module to deferred list
	deferredModules.push(["./src/index.js","vendor~main"]);
	// run deferred modules when ready
	return checkDeferredModules();
})({
    "./src/date.js": (function(module, exports) {
        eval("console.log(new Date().getTime());\n\n//# sourceURL=webpack:///./src/date.js?");
    }),
    "./src/index.js": (function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date */ \"./src/date.js\");\n/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_date__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nlet component = () => {\n  let element = document.createElement('div');\n  element.innerHTML = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(['Hello', 'webpack1kk11'], ' ');\n  return element;\n};\n\ndocument.body.appendChild(component());\n\n//# sourceURL=webpack:///./src/index.js?");
    })
});