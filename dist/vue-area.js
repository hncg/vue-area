(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["vueArea"] = factory();
    else
        root["vueArea"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;
/******/
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // identity function for calling harmony imports with the correct context
/******/    __webpack_require__.i = function(value) { return value; };
/******/
/******/    // define getter function for harmony exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, {
/******/                configurable: false,
/******/                enumerable: true,
/******/                get: getter
/******/            });
/******/        }
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "/";
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cityData = __webpack_require__(4);

exports.default = {
    data: function data() {
        return {
            show: this.propsShow,
            result: this.propsResult,
            target: '',
            provinceState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false
            },
            cityState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false
            },
            areaState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false
            },
            delta: 0,
            slideEls: null
        };
    },
    mounted: function mounted() {
        this.initData();
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
    },
    methods: {
        initData: function initData() {
            this.provinceState.data = _cityData.province;
            this.provinceState.selectedId = 110000; //北京市  省
            this.cityState.selectedId = 110100; //市辖区  市
            this.areaState.selectedId = 110101; //东城区  区
            this.filterCity();
            this.filterArea();
        },
        submit: function submit() {
            this.result = {
                'province': this.provinceState.data[this.provinceState.index],
                'city': this.cityState.data[this.cityState.index],
                'area': this.areaState.data[this.areaState.index]
            };
            this.show = false;
        },
        filterCity: function filterCity() {
            var _this = this;

            this.cityState.data = _cityData.city.filter(function (item, index) {
                return item.parentId === _this.provinceState.selectedId;
            });
            this.cityState.selectedId = this.cityState.data[0] && this.cityState.data[0].code;
            this.cityState.translateY = 0;
            this.cityState.index = 0;
        },
        filterArea: function filterArea() {
            var _this2 = this;

            this.areaState.data = _cityData.area.filter(function (item, index) {
                return item.parentId === _this2.cityState.selectedId;
            });
            this.areaState.selectedId = this.areaState.data[0] && this.areaState.data[0].code;
            this.areaState.translateY = 0;
            this.areaState.index = 0;
        },
        getSelectedData: function getSelectedData(index) {
            var target = this.target;
            var thisData = this[target + 'State'];
            thisData.selectedId = thisData.data[index].code;
            if (target === 'province') {
                this.filterCity();
                this.filterArea();
            }
            if (target === 'city') {
                this.filterArea();
            }
        },
        setPage: function setPage() {
            var target = this.target;
            var thisData = this[target + 'State'];
            var clientHeight = this.slideEls[0]['clientHeight'];
            var total = thisData.data.length;
            var goPage = Math.round((thisData.translateY / clientHeight).toFixed(1));
            if (goPage > 0) {
                goPage = 0;
            }
            goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1);
            var index = Math.abs(goPage);
            thisData.index = index;
            this.getSelectedData(index);
            thisData.translateY = goPage * clientHeight;
        },
        _getTouchPos: function _getTouchPos(e) {
            return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY'];
        },
        _getElem: function _getElem(e) {
            return Array.from(e.currentTarget.children).slice(3, -3);
        },
        _onTouchStart: function _onTouchStart(target, e) {
            var thisData = this[target + 'State'];
            this.target = target;
            this.slideEls = this._getElem(e);
            this.delta = 0;
            thisData.startPos = this._getTouchPos(e);
            thisData.startTranslateY = thisData.translateY;
            thisData.dragging = true;
            document.addEventListener('touchmove', this._onTouchMove, false);
            document.addEventListener('touchend', this._onTouchEnd, false);
            document.addEventListener('mousemove', this._onTouchMove, false);
            document.addEventListener('mouseup', this._onTouchEnd, false);
        },
        _onTouchMove: function _onTouchMove(e) {
            var target = this.target;
            var thisData = this[target + 'State'];
            this.delta = this._getTouchPos(e) - thisData.startPos;
            thisData.translateY = thisData.startTranslateY + this.delta;
            if (Math.abs(this.delta) > 0) {
                e.preventDefault();
            }
        },
        _onTouchEnd: function _onTouchEnd(e) {
            var target = this.target;
            var thisData = this[target + 'State'];
            thisData.dragging = false;
            this.setPage();
            document.removeEventListener('touchmove', this._onTouchMove);
            document.removeEventListener('touchend', this._onTouchEnd);
            document.removeEventListener('mousemove', this._onTouchMove);
            document.removeEventListener('mouseup', this._onTouchEnd);
        },
        _stopDef: function _stopDef(e) {
            e.preventDefault();
        }
    },
    watch: {
        propsShow: function propsShow(newVal) {
            this.show = newVal;
        },
        show: function show(newVal) {
            console.log(newVal);
            this.$emit('result', newVal, this.result);
        }
    },
    props: {
        'propsResult': {
            type: Object,
            default: null
        },
        'propsShow': {
            type: Boolean,
            default: false
        },
        'title': {
            type: String,
            default: '请选择'
        },
        'confirm': {
            type: String,
            default: '确定'
        },
        'cancel': {
            type: String,
            default: '取消'
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ProvCityBoxWarp"
  }, [_c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "ProvCityBoxBg",
    on: {
      "click": function($event) {
        _vm.show = false
      },
      "touchmove": _vm._stopDef,
      "mousewheel": _vm._stopDef
    }
  })]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "select"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "ProvCityBox",
    on: {
      "mousewheel": _vm._stopDef
    }
  }, [_c('div', {
    staticClass: "ProvCityHeader"
  }, [_c('div', {
    staticClass: "ProvCityHeaderCancle",
    on: {
      "click": function($event) {
        _vm.show = false
      }
    }
  }, [_vm._v(_vm._s(_vm.cancel))]), _vm._v("\n                    " + _vm._s(_vm.title) + "\n                    "), _c('div', {
    staticClass: "ProvCityHeaderConfirm",
    on: {
      "click": _vm.submit
    }
  }, [_vm._v(_vm._s(_vm.confirm))])]), _vm._v(" "), _c('div', {
    staticClass: "ProvCityContent"
  }, [_c('div', {
    staticClass: "ProvCityContentList"
  }, [_c('ul', {
    class: {
      'province_dragging': _vm.provinceState.dragging
    },
    style: ({
      'transform': 'translate3d(0,' + _vm.provinceState.translateY + 'px, 0)'
    }),
    attrs: {
      "ref:province-list": ""
    },
    on: {
      "touchstart": function($event) {
        _vm._onTouchStart('province', $event)
      },
      "mousedown": function($event) {
        _vm._onTouchStart('province', $event)
      }
    }
  }, [_c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _vm._l((_vm.provinceState.data), function(item, index) {
    return _c('li', {
      key: index,
      class: {
        'current': item.code === _vm.provinceState.selectedId,
          'node1': Math.abs(index - _vm.provinceState.index) == 1,
          'node2': Math.abs(index - _vm.provinceState.index) == 2,
          'node3': Math.abs(index - _vm.provinceState.index) >= 3
      }
    }, [_vm._v(_vm._s(item.name))])
  }), _vm._v(" "), _c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li')], 2)]), _vm._v(" "), _c('div', {
    staticClass: "ProvCityContentList"
  }, [_c('ul', {
    class: {
      'city_dragging': _vm.cityState.dragging
    },
    style: ({
      'transform': 'translate3d(0,' + _vm.cityState.translateY + 'px, 0)'
    }),
    attrs: {
      "ref:city-list": ""
    },
    on: {
      "touchstart": function($event) {
        _vm._onTouchStart('city', $event)
      },
      "mousedown": function($event) {
        _vm._onTouchStart('city', $event)
      }
    }
  }, [_c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _vm._l((_vm.cityState.data), function(item, index) {
    return _c('li', {
      key: index,
      class: {
        'current': item.code === _vm.cityState.selectedId,
          'node1': Math.abs(index - _vm.cityState.index) == 1,
          'node2': Math.abs(index - _vm.cityState.index) == 2,
          'node3': Math.abs(index - _vm.cityState.index) >= 3
      }
    }, [_vm._v(_vm._s(item.name))])
  }), _vm._v(" "), _c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li')], 2)]), _vm._v(" "), _c('div', {
    staticClass: "ProvCityContentList"
  }, [_c('ul', {
    class: {
      'area_dragging': _vm.areaState.dragging
    },
    style: ({
      'transform': 'translate3d(0,' + _vm.areaState.translateY + 'px, 0)'
    }),
    attrs: {
      "ref:area-list": ""
    },
    on: {
      "touchstart": function($event) {
        _vm._onTouchStart('area', $event)
      },
      "mousedown": function($event) {
        _vm._onTouchStart('area', $event)
      }
    }
  }, [_c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _vm._l((_vm.areaState.data), function(item, index) {
    return _c('li', {
      key: index,
      class: {
        'current': item.code === _vm.areaState.selectedId,
          'node1': Math.abs(index - _vm.areaState.index) == 1,
          'node2': Math.abs(index - _vm.areaState.index) == 2,
          'node3': Math.abs(index - _vm.areaState.index) >= 3
      }
    }, [_vm._v(_vm._s(item.name))])
  }), _vm._v(" "), _c('li'), _vm._v(" "), _c('li'), _vm._v(" "), _c('li')], 2)])]), _vm._v(" "), _c('hr', {
    staticClass: "ProvCitySelectedTop"
  }), _vm._v(" "), _c('hr', {
    staticClass: "ProvCitySelectedBottom"
  })])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-58282748", module.exports)
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(12)("256f1a04", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-58282748\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vue-area.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-58282748\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vue-area.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var province = exports.province = [{
    "code" : 110000,
    "name" : "北京市",
    "parentId" : 0
},{
    "code" : 120000,
    "name" : "天津市",
    "parentId" : 0
},{
    "code" : 130000,
    "name" : "河北省",
    "parentId" : 0
},{
    "code" : 140000,
    "name" : "山西省",
    "parentId" : 0
},{
    "code" : 150000,
    "name" : "内蒙古自治区",
    "parentId" : 0
},{
    "code" : 210000,
    "name" : "辽宁省",
    "parentId" : 0
},{
    "code" : 220000,
    "name" : "吉林省",
    "parentId" : 0
},{
    "code" : 230000,
    "name" : "黑龙江省",
    "parentId" : 0
},{
    "code" : 310000,
    "name" : "上海市",
    "parentId" : 0
},{
    "code" : 320000,
    "name" : "江苏省",
    "parentId" : 0
},{
    "code" : 330000,
    "name" : "浙江省",
    "parentId" : 0
},{
    "code" : 340000,
    "name" : "安徽省",
    "parentId" : 0
},{
    "code" : 350000,
    "name" : "福建省",
    "parentId" : 0
},{
    "code" : 360000,
    "name" : "江西省",
    "parentId" : 0
},{
    "code" : 370000,
    "name" : "山东省",
    "parentId" : 0
},{
    "code" : 410000,
    "name" : "河南省",
    "parentId" : 0
},{
    "code" : 420000,
    "name" : "湖北省",
    "parentId" : 0
},{
    "code" : 430000,
    "name" : "湖南省",
    "parentId" : 0
},{
    "code" : 440000,
    "name" : "广东省",
    "parentId" : 0
},{
    "code" : 450000,
    "name" : "广西壮族自治区",
    "parentId" : 0
},{
    "code" : 460000,
    "name" : "海南省",
    "parentId" : 0
},{
    "code" : 500000,
    "name" : "重庆市",
    "parentId" : 0
},{
    "code" : 510000,
    "name" : "四川省",
    "parentId" : 0
},{
    "code" : 520000,
    "name" : "贵州省",
    "parentId" : 0
},{
    "code" : 530000,
    "name" : "云南省",
    "parentId" : 0
},{
    "code" : 540000,
    "name" : "西藏自治区",
    "parentId" : 0
},{
    "code" : 610000,
    "name" : "陕西省",
    "parentId" : 0
},{
    "code" : 620000,
    "name" : "甘肃省",
    "parentId" : 0
},{
    "code" : 630000,
    "name" : "青海省",
    "parentId" : 0
},{
    "code" : 640000,
    "name" : "宁夏回族自治区",
    "parentId" : 0
},{
    "code" : 650000,
    "name" : "新疆维吾尔自治区",
    "parentId" : 0
},{
    "code" : 710000,
    "name" : "台湾",
    "parentId" : 0
},{
    "code" : 810000,
    "name" : "香港特别行政区",
    "parentId" : 0
},{
    "code" : 820000,
    "name" : "澳门特别行政区",
    "parentId" : 0
}];

var city = exports.city = [{
    "code" : 110101,
    "name" : "东城区",
    "parentId" : 110000
},{
    "code" : 110102,
    "name" : "西城区",
    "parentId" : 110000
},{
    "code" : 110105,
    "name" : "朝阳区",
    "parentId" : 110000
},{
    "code" : 110106,
    "name" : "丰台区",
    "parentId" : 110000
},{
    "code" : 110107,
    "name" : "石景山区",
    "parentId" : 110000
},{
    "code" : 110108,
    "name" : "海淀区",
    "parentId" : 110000
},{
    "code" : 110109,
    "name" : "门头沟区",
    "parentId" : 110000
},{
    "code" : 110111,
    "name" : "房山区",
    "parentId" : 110000
},{
    "code" : 110112,
    "name" : "通州区",
    "parentId" : 110000
},{
    "code" : 110113,
    "name" : "顺义区",
    "parentId" : 110000
},{
    "code" : 110114,
    "name" : "昌平区",
    "parentId" : 110000
},{
    "code" : 110115,
    "name" : "大兴区",
    "parentId" : 110000
},{
    "code" : 110116,
    "name" : "怀柔区",
    "parentId" : 110000
},{
    "code" : 110117,
    "name" : "平谷区",
    "parentId" : 110000
},{
    "code" : 110228,
    "name" : "密云县",
    "parentId" : 110000
},{
    "code" : 110229,
    "name" : "延庆县",
    "parentId" : 110000
},{
    "code" : 120101,
    "name" : "和平区",
    "parentId" : 120000
},{
    "code" : 120102,
    "name" : "河东区",
    "parentId" : 120000
},{
    "code" : 120103,
    "name" : "河西区",
    "parentId" : 120000
},{
    "code" : 120104,
    "name" : "南开区",
    "parentId" : 120000
},{
    "code" : 120105,
    "name" : "河北区",
    "parentId" : 120000
},{
    "code" : 120106,
    "name" : "红桥区",
    "parentId" : 120000
},{
    "code" : 120110,
    "name" : "东丽区",
    "parentId" : 120000
},{
    "code" : 120111,
    "name" : "西青区",
    "parentId" : 120000
},{
    "code" : 120112,
    "name" : "津南区",
    "parentId" : 120000
},{
    "code" : 120113,
    "name" : "北辰区",
    "parentId" : 120000
},{
    "code" : 120114,
    "name" : "武清区",
    "parentId" : 120000
},{
    "code" : 120115,
    "name" : "宝坻区",
    "parentId" : 120000
},{
    "code" : 120116,
    "name" : "滨海新区",
    "parentId" : 120000
},{
    "code" : 120221,
    "name" : "宁河县",
    "parentId" : 120000
},{
    "code" : 120223,
    "name" : "静海县",
    "parentId" : 120000
},{
    "code" : 120225,
    "name" : "蓟县",
    "parentId" : 120000
},{
    "code" : 130100,
    "name" : "石家庄市",
    "parentId" : 130000
},{
    "code" : 130200,
    "name" : "唐山市",
    "parentId" : 130000
},{
    "code" : 130300,
    "name" : "秦皇岛市",
    "parentId" : 130000
},{
    "code" : 130400,
    "name" : "邯郸市",
    "parentId" : 130000
},{
    "code" : 130500,
    "name" : "邢台市",
    "parentId" : 130000
},{
    "code" : 130600,
    "name" : "保定市",
    "parentId" : 130000
},{
    "code" : 130700,
    "name" : "张家口市",
    "parentId" : 130000
},{
    "code" : 130800,
    "name" : "承德市",
    "parentId" : 130000
},{
    "code" : 130900,
    "name" : "沧州市",
    "parentId" : 130000
},{
    "code" : 131000,
    "name" : "廊坊市",
    "parentId" : 130000
},{
    "code" : 131100,
    "name" : "衡水市",
    "parentId" : 130000
},{
    "code" : 140100,
    "name" : "太原市",
    "parentId" : 140000
},{
    "code" : 140200,
    "name" : "大同市",
    "parentId" : 140000
},{
    "code" : 140300,
    "name" : "阳泉市",
    "parentId" : 140000
},{
    "code" : 140400,
    "name" : "长治市",
    "parentId" : 140000
},{
    "code" : 140500,
    "name" : "晋城市",
    "parentId" : 140000
},{
    "code" : 140600,
    "name" : "朔州市",
    "parentId" : 140000
},{
    "code" : 140700,
    "name" : "晋中市",
    "parentId" : 140000
},{
    "code" : 140800,
    "name" : "运城市",
    "parentId" : 140000
},{
    "code" : 140900,
    "name" : "忻州市",
    "parentId" : 140000
},{
    "code" : 141000,
    "name" : "临汾市",
    "parentId" : 140000
},{
    "code" : 141100,
    "name" : "吕梁市",
    "parentId" : 140000
},{
    "code" : 150100,
    "name" : "呼和浩特市",
    "parentId" : 150000
},{
    "code" : 150200,
    "name" : "包头市",
    "parentId" : 150000
},{
    "code" : 150300,
    "name" : "乌海市",
    "parentId" : 150000
},{
    "code" : 150400,
    "name" : "赤峰市",
    "parentId" : 150000
},{
    "code" : 150500,
    "name" : "通辽市",
    "parentId" : 150000
},{
    "code" : 150600,
    "name" : "鄂尔多斯市",
    "parentId" : 150000
},{
    "code" : 150700,
    "name" : "呼伦贝尔市",
    "parentId" : 150000
},{
    "code" : 150800,
    "name" : "巴彦淖尔市",
    "parentId" : 150000
},{
    "code" : 150900,
    "name" : "乌兰察布市",
    "parentId" : 150000
},{
    "code" : 152200,
    "name" : "兴安盟",
    "parentId" : 150000
},{
    "code" : 152500,
    "name" : "锡林郭勒盟",
    "parentId" : 150000
},{
    "code" : 152900,
    "name" : "阿拉善盟",
    "parentId" : 150000
},{
    "code" : 210100,
    "name" : "沈阳市",
    "parentId" : 210000
},{
    "code" : 210200,
    "name" : "大连市",
    "parentId" : 210000
},{
    "code" : 210300,
    "name" : "鞍山市",
    "parentId" : 210000
},{
    "code" : 210400,
    "name" : "抚顺市",
    "parentId" : 210000
},{
    "code" : 210500,
    "name" : "本溪市",
    "parentId" : 210000
},{
    "code" : 210600,
    "name" : "丹东市",
    "parentId" : 210000
},{
    "code" : 210700,
    "name" : "锦州市",
    "parentId" : 210000
},{
    "code" : 210800,
    "name" : "营口市",
    "parentId" : 210000
},{
    "code" : 210900,
    "name" : "阜新市",
    "parentId" : 210000
},{
    "code" : 211000,
    "name" : "辽阳市",
    "parentId" : 210000
},{
    "code" : 211100,
    "name" : "盘锦市",
    "parentId" : 210000
},{
    "code" : 211200,
    "name" : "铁岭市",
    "parentId" : 210000
},{
    "code" : 211300,
    "name" : "朝阳市",
    "parentId" : 210000
},{
    "code" : 211400,
    "name" : "葫芦岛市",
    "parentId" : 210000
},{
    "code" : 220100,
    "name" : "长春市",
    "parentId" : 220000
},{
    "code" : 220200,
    "name" : "吉林市",
    "parentId" : 220000
},{
    "code" : 220300,
    "name" : "四平市",
    "parentId" : 220000
},{
    "code" : 220400,
    "name" : "辽源市",
    "parentId" : 220000
},{
    "code" : 220500,
    "name" : "通化市",
    "parentId" : 220000
},{
    "code" : 220600,
    "name" : "白山市",
    "parentId" : 220000
},{
    "code" : 220700,
    "name" : "松原市",
    "parentId" : 220000
},{
    "code" : 220800,
    "name" : "白城市",
    "parentId" : 220000
},{
    "code" : 222400,
    "name" : "延边朝鲜族自治州",
    "parentId" : 220000
},{
    "code" : 230100,
    "name" : "哈尔滨市",
    "parentId" : 230000
},{
    "code" : 230200,
    "name" : "齐齐哈尔市",
    "parentId" : 230000
},{
    "code" : 230300,
    "name" : "鸡西市",
    "parentId" : 230000
},{
    "code" : 230400,
    "name" : "鹤岗市",
    "parentId" : 230000
},{
    "code" : 230500,
    "name" : "双鸭山市",
    "parentId" : 230000
},{
    "code" : 230600,
    "name" : "大庆市",
    "parentId" : 230000
},{
    "code" : 230700,
    "name" : "伊春市",
    "parentId" : 230000
},{
    "code" : 230800,
    "name" : "佳木斯市",
    "parentId" : 230000
},{
    "code" : 230900,
    "name" : "七台河市",
    "parentId" : 230000
},{
    "code" : 231000,
    "name" : "牡丹江市",
    "parentId" : 230000
},{
    "code" : 231100,
    "name" : "黑河市",
    "parentId" : 230000
},{
    "code" : 231200,
    "name" : "绥化市",
    "parentId" : 230000
},{
    "code" : 232700,
    "name" : "大兴安岭地区",
    "parentId" : 230000
},{
    "code" : 310101,
    "name" : "黄浦区",
    "parentId" : 310000
},{
    "code" : 310104,
    "name" : "徐汇区",
    "parentId" : 310000
},{
    "code" : 310105,
    "name" : "长宁区",
    "parentId" : 310000
},{
    "code" : 310106,
    "name" : "静安区",
    "parentId" : 310000
},{
    "code" : 310107,
    "name" : "普陀区",
    "parentId" : 310000
},{
    "code" : 310108,
    "name" : "闸北区",
    "parentId" : 310000
},{
    "code" : 310109,
    "name" : "虹口区",
    "parentId" : 310000
},{
    "code" : 310110,
    "name" : "杨浦区",
    "parentId" : 310000
},{
    "code" : 310112,
    "name" : "闵行区",
    "parentId" : 310000
},{
    "code" : 310113,
    "name" : "宝山区",
    "parentId" : 310000
},{
    "code" : 310114,
    "name" : "嘉定区",
    "parentId" : 310000
},{
    "code" : 310115,
    "name" : "浦东新区",
    "parentId" : 310000
},{
    "code" : 310116,
    "name" : "金山区",
    "parentId" : 310000
},{
    "code" : 310117,
    "name" : "松江区",
    "parentId" : 310000
},{
    "code" : 310118,
    "name" : "青浦区",
    "parentId" : 310000
},{
    "code" : 310120,
    "name" : "奉贤区",
    "parentId" : 310000
},{
    "code" : 310230,
    "name" : "崇明县",
    "parentId" : 310000
},{
    "code" : 320100,
    "name" : "南京市",
    "parentId" : 320000
},{
    "code" : 320200,
    "name" : "无锡市",
    "parentId" : 320000
},{
    "code" : 320300,
    "name" : "徐州市",
    "parentId" : 320000
},{
    "code" : 320400,
    "name" : "常州市",
    "parentId" : 320000
},{
    "code" : 320500,
    "name" : "苏州市",
    "parentId" : 320000
},{
    "code" : 320600,
    "name" : "南通市",
    "parentId" : 320000
},{
    "code" : 320700,
    "name" : "连云港市",
    "parentId" : 320000
},{
    "code" : 320800,
    "name" : "淮安市",
    "parentId" : 320000
},{
    "code" : 320900,
    "name" : "盐城市",
    "parentId" : 320000
},{
    "code" : 321000,
    "name" : "扬州市",
    "parentId" : 320000
},{
    "code" : 321100,
    "name" : "镇江市",
    "parentId" : 320000
},{
    "code" : 321200,
    "name" : "泰州市",
    "parentId" : 320000
},{
    "code" : 321300,
    "name" : "宿迁市",
    "parentId" : 320000
},{
    "code" : 330100,
    "name" : "杭州市",
    "parentId" : 330000
},{
    "code" : 330200,
    "name" : "宁波市",
    "parentId" : 330000
},{
    "code" : 330300,
    "name" : "温州市",
    "parentId" : 330000
},{
    "code" : 330400,
    "name" : "嘉兴市",
    "parentId" : 330000
},{
    "code" : 330500,
    "name" : "湖州市",
    "parentId" : 330000
},{
    "code" : 330600,
    "name" : "绍兴市",
    "parentId" : 330000
},{
    "code" : 330700,
    "name" : "金华市",
    "parentId" : 330000
},{
    "code" : 330800,
    "name" : "衢州市",
    "parentId" : 330000
},{
    "code" : 330900,
    "name" : "舟山市",
    "parentId" : 330000
},{
    "code" : 331000,
    "name" : "台州市",
    "parentId" : 330000
},{
    "code" : 331100,
    "name" : "丽水市",
    "parentId" : 330000
},{
    "code" : 340100,
    "name" : "合肥市",
    "parentId" : 340000
},{
    "code" : 340200,
    "name" : "芜湖市",
    "parentId" : 340000
},{
    "code" : 340300,
    "name" : "蚌埠市",
    "parentId" : 340000
},{
    "code" : 340400,
    "name" : "淮南市",
    "parentId" : 340000
},{
    "code" : 340500,
    "name" : "马鞍山市",
    "parentId" : 340000
},{
    "code" : 340600,
    "name" : "淮北市",
    "parentId" : 340000
},{
    "code" : 340700,
    "name" : "铜陵市",
    "parentId" : 340000
},{
    "code" : 340800,
    "name" : "安庆市",
    "parentId" : 340000
},{
    "code" : 341000,
    "name" : "黄山市",
    "parentId" : 340000
},{
    "code" : 341100,
    "name" : "滁州市",
    "parentId" : 340000
},{
    "code" : 341200,
    "name" : "阜阳市",
    "parentId" : 340000
},{
    "code" : 341300,
    "name" : "宿州市",
    "parentId" : 340000
},{
    "code" : 341500,
    "name" : "六安市",
    "parentId" : 340000
},{
    "code" : 341600,
    "name" : "亳州市",
    "parentId" : 340000
},{
    "code" : 341700,
    "name" : "池州市",
    "parentId" : 340000
},{
    "code" : 341800,
    "name" : "宣城市",
    "parentId" : 340000
},{
    "code" : 350100,
    "name" : "福州市",
    "parentId" : 350000
},{
    "code" : 350200,
    "name" : "厦门市",
    "parentId" : 350000
},{
    "code" : 350300,
    "name" : "莆田市",
    "parentId" : 350000
},{
    "code" : 350400,
    "name" : "三明市",
    "parentId" : 350000
},{
    "code" : 350500,
    "name" : "泉州市",
    "parentId" : 350000
},{
    "code" : 350600,
    "name" : "漳州市",
    "parentId" : 350000
},{
    "code" : 350700,
    "name" : "南平市",
    "parentId" : 350000
},{
    "code" : 350800,
    "name" : "龙岩市",
    "parentId" : 350000
},{
    "code" : 350900,
    "name" : "宁德市",
    "parentId" : 350000
},{
    "code" : 360100,
    "name" : "南昌市",
    "parentId" : 360000
},{
    "code" : 360200,
    "name" : "景德镇市",
    "parentId" : 360000
},{
    "code" : 360300,
    "name" : "萍乡市",
    "parentId" : 360000
},{
    "code" : 360400,
    "name" : "九江市",
    "parentId" : 360000
},{
    "code" : 360500,
    "name" : "新余市",
    "parentId" : 360000
},{
    "code" : 360600,
    "name" : "鹰潭市",
    "parentId" : 360000
},{
    "code" : 360700,
    "name" : "赣州市",
    "parentId" : 360000
},{
    "code" : 360800,
    "name" : "吉安市",
    "parentId" : 360000
},{
    "code" : 360900,
    "name" : "宜春市",
    "parentId" : 360000
},{
    "code" : 361000,
    "name" : "抚州市",
    "parentId" : 360000
},{
    "code" : 361100,
    "name" : "上饶市",
    "parentId" : 360000
},{
    "code" : 370100,
    "name" : "济南市",
    "parentId" : 370000
},{
    "code" : 370200,
    "name" : "青岛市",
    "parentId" : 370000
},{
    "code" : 370300,
    "name" : "淄博市",
    "parentId" : 370000
},{
    "code" : 370400,
    "name" : "枣庄市",
    "parentId" : 370000
},{
    "code" : 370500,
    "name" : "东营市",
    "parentId" : 370000
},{
    "code" : 370600,
    "name" : "烟台市",
    "parentId" : 370000
},{
    "code" : 370700,
    "name" : "潍坊市",
    "parentId" : 370000
},{
    "code" : 370800,
    "name" : "济宁市",
    "parentId" : 370000
},{
    "code" : 370900,
    "name" : "泰安市",
    "parentId" : 370000
},{
    "code" : 371000,
    "name" : "威海市",
    "parentId" : 370000
},{
    "code" : 371100,
    "name" : "日照市",
    "parentId" : 370000
},{
    "code" : 371200,
    "name" : "莱芜市",
    "parentId" : 370000
},{
    "code" : 371300,
    "name" : "临沂市",
    "parentId" : 370000
},{
    "code" : 371400,
    "name" : "德州市",
    "parentId" : 370000
},{
    "code" : 371500,
    "name" : "聊城市",
    "parentId" : 370000
},{
    "code" : 371600,
    "name" : "滨州市",
    "parentId" : 370000
},{
    "code" : 371700,
    "name" : "菏泽市",
    "parentId" : 370000
},{
    "code" : 410100,
    "name" : "郑州市",
    "parentId" : 410000
},{
    "code" : 410200,
    "name" : "开封市",
    "parentId" : 410000
},{
    "code" : 410300,
    "name" : "洛阳市",
    "parentId" : 410000
},{
    "code" : 410400,
    "name" : "平顶山市",
    "parentId" : 410000
},{
    "code" : 410500,
    "name" : "安阳市",
    "parentId" : 410000
},{
    "code" : 410600,
    "name" : "鹤壁市",
    "parentId" : 410000
},{
    "code" : 410700,
    "name" : "新乡市",
    "parentId" : 410000
},{
    "code" : 410800,
    "name" : "焦作市",
    "parentId" : 410000
},{
    "code" : 410900,
    "name" : "濮阳市",
    "parentId" : 410000
},{
    "code" : 411000,
    "name" : "许昌市",
    "parentId" : 410000
},{
    "code" : 411100,
    "name" : "漯河市",
    "parentId" : 410000
},{
    "code" : 411200,
    "name" : "三门峡市",
    "parentId" : 410000
},{
    "code" : 411300,
    "name" : "南阳市",
    "parentId" : 410000
},{
    "code" : 411400,
    "name" : "商丘市",
    "parentId" : 410000
},{
    "code" : 411500,
    "name" : "信阳市",
    "parentId" : 410000
},{
    "code" : 411600,
    "name" : "周口市",
    "parentId" : 410000
},{
    "code" : 411700,
    "name" : "驻马店市",
    "parentId" : 410000
},{
    "code" : 419001,
    "name" : "济源市",
    "parentId" : 410000
},{
    "code" : 420100,
    "name" : "武汉市",
    "parentId" : 420000
},{
    "code" : 420200,
    "name" : "黄石市",
    "parentId" : 420000
},{
    "code" : 420300,
    "name" : "十堰市",
    "parentId" : 420000
},{
    "code" : 420500,
    "name" : "宜昌市",
    "parentId" : 420000
},{
    "code" : 420600,
    "name" : "襄阳市",
    "parentId" : 420000
},{
    "code" : 420700,
    "name" : "鄂州市",
    "parentId" : 420000
},{
    "code" : 420800,
    "name" : "荆门市",
    "parentId" : 420000
},{
    "code" : 420900,
    "name" : "孝感市",
    "parentId" : 420000
},{
    "code" : 421000,
    "name" : "荆州市",
    "parentId" : 420000
},{
    "code" : 421100,
    "name" : "黄冈市",
    "parentId" : 420000
},{
    "code" : 421200,
    "name" : "咸宁市",
    "parentId" : 420000
},{
    "code" : 421300,
    "name" : "随州市",
    "parentId" : 420000
},{
    "code" : 422800,
    "name" : "恩施土家族苗族自治州",
    "parentId" : 420000
},{
    "code" : 429004,
    "name" : "仙桃市",
    "parentId" : 420000
},{
    "code" : 429005,
    "name" : "潜江市",
    "parentId" : 420000
},{
    "code" : 429006,
    "name" : "天门市",
    "parentId" : 420000
},{
    "code" : 429021,
    "name" : "神农架林区",
    "parentId" : 420000
},{
    "code" : 430100,
    "name" : "长沙市",
    "parentId" : 430000
},{
    "code" : 430200,
    "name" : "株洲市",
    "parentId" : 430000
},{
    "code" : 430300,
    "name" : "湘潭市",
    "parentId" : 430000
},{
    "code" : 430400,
    "name" : "衡阳市",
    "parentId" : 430000
},{
    "code" : 430500,
    "name" : "邵阳市",
    "parentId" : 430000
},{
    "code" : 430600,
    "name" : "岳阳市",
    "parentId" : 430000
},{
    "code" : 430700,
    "name" : "常德市",
    "parentId" : 430000
},{
    "code" : 430800,
    "name" : "张家界市",
    "parentId" : 430000
},{
    "code" : 430900,
    "name" : "益阳市",
    "parentId" : 430000
},{
    "code" : 431000,
    "name" : "郴州市",
    "parentId" : 430000
},{
    "code" : 431100,
    "name" : "永州市",
    "parentId" : 430000
},{
    "code" : 431200,
    "name" : "怀化市",
    "parentId" : 430000
},{
    "code" : 431300,
    "name" : "娄底市",
    "parentId" : 430000
},{
    "code" : 433100,
    "name" : "湘西土家族苗族自治州",
    "parentId" : 430000
},{
    "code" : 440100,
    "name" : "广州市",
    "parentId" : 440000
},{
    "code" : 440200,
    "name" : "韶关市",
    "parentId" : 440000
},{
    "code" : 440300,
    "name" : "深圳市",
    "parentId" : 440000
},{
    "code" : 440400,
    "name" : "珠海市",
    "parentId" : 440000
},{
    "code" : 440500,
    "name" : "汕头市",
    "parentId" : 440000
},{
    "code" : 440600,
    "name" : "佛山市",
    "parentId" : 440000
},{
    "code" : 440700,
    "name" : "江门市",
    "parentId" : 440000
},{
    "code" : 440800,
    "name" : "湛江市",
    "parentId" : 440000
},{
    "code" : 440900,
    "name" : "茂名市",
    "parentId" : 440000
},{
    "code" : 441200,
    "name" : "肇庆市",
    "parentId" : 440000
},{
    "code" : 441300,
    "name" : "惠州市",
    "parentId" : 440000
},{
    "code" : 441400,
    "name" : "梅州市",
    "parentId" : 440000
},{
    "code" : 441500,
    "name" : "汕尾市",
    "parentId" : 440000
},{
    "code" : 441600,
    "name" : "河源市",
    "parentId" : 440000
},{
    "code" : 441700,
    "name" : "阳江市",
    "parentId" : 440000
},{
    "code" : 441800,
    "name" : "清远市",
    "parentId" : 440000
},{
    "code" : 441900,
    "name" : "东莞市",
    "parentId" : 440000
},{
    "code" : 442000,
    "name" : "中山市",
    "parentId" : 440000
},{
    "code" : 445100,
    "name" : "潮州市",
    "parentId" : 440000
},{
    "code" : 445200,
    "name" : "揭阳市",
    "parentId" : 440000
},{
    "code" : 445300,
    "name" : "云浮市",
    "parentId" : 440000
},{
    "code" : 450100,
    "name" : "南宁市",
    "parentId" : 450000
},{
    "code" : 450200,
    "name" : "柳州市",
    "parentId" : 450000
},{
    "code" : 450300,
    "name" : "桂林市",
    "parentId" : 450000
},{
    "code" : 450400,
    "name" : "梧州市",
    "parentId" : 450000
},{
    "code" : 450500,
    "name" : "北海市",
    "parentId" : 450000
},{
    "code" : 450600,
    "name" : "防城港市",
    "parentId" : 450000
},{
    "code" : 450700,
    "name" : "钦州市",
    "parentId" : 450000
},{
    "code" : 450800,
    "name" : "贵港市",
    "parentId" : 450000
},{
    "code" : 450900,
    "name" : "玉林市",
    "parentId" : 450000
},{
    "code" : 451000,
    "name" : "百色市",
    "parentId" : 450000
},{
    "code" : 451100,
    "name" : "贺州市",
    "parentId" : 450000
},{
    "code" : 451200,
    "name" : "河池市",
    "parentId" : 450000
},{
    "code" : 451300,
    "name" : "来宾市",
    "parentId" : 450000
},{
    "code" : 451400,
    "name" : "崇左市",
    "parentId" : 450000
},{
    "code" : 460100,
    "name" : "海口市",
    "parentId" : 460000
},{
    "code" : 460200,
    "name" : "三亚市",
    "parentId" : 460000
},{
    "code" : 460300,
    "name" : "三沙市",
    "parentId" : 460000
},{
    "code" : 469001,
    "name" : "五指山市",
    "parentId" : 460000
},{
    "code" : 469002,
    "name" : "琼海市",
    "parentId" : 460000
},{
    "code" : 469003,
    "name" : "儋州市",
    "parentId" : 460000
},{
    "code" : 469005,
    "name" : "文昌市",
    "parentId" : 460000
},{
    "code" : 469006,
    "name" : "万宁市",
    "parentId" : 460000
},{
    "code" : 469007,
    "name" : "东方市",
    "parentId" : 460000
},{
    "code" : 469021,
    "name" : "定安县",
    "parentId" : 460000
},{
    "code" : 469022,
    "name" : "屯昌县",
    "parentId" : 460000
},{
    "code" : 469023,
    "name" : "澄迈县",
    "parentId" : 460000
},{
    "code" : 469024,
    "name" : "临高县",
    "parentId" : 460000
},{
    "code" : 469025,
    "name" : "白沙黎族自治县",
    "parentId" : 460000
},{
    "code" : 469026,
    "name" : "昌江黎族自治县",
    "parentId" : 460000
},{
    "code" : 469027,
    "name" : "乐东黎族自治县",
    "parentId" : 460000
},{
    "code" : 469028,
    "name" : "陵水黎族自治县",
    "parentId" : 460000
},{
    "code" : 469029,
    "name" : "保亭黎族苗族自治县",
    "parentId" : 460000
},{
    "code" : 469030,
    "name" : "琼中黎族苗族自治县",
    "parentId" : 460000
},{
    "code" : 500101,
    "name" : "万州区",
    "parentId" : 500000
},{
    "code" : 500102,
    "name" : "涪陵区",
    "parentId" : 500000
},{
    "code" : 500103,
    "name" : "渝中区",
    "parentId" : 500000
},{
    "code" : 500104,
    "name" : "大渡口区",
    "parentId" : 500000
},{
    "code" : 500105,
    "name" : "江北区",
    "parentId" : 500000
},{
    "code" : 500106,
    "name" : "沙坪坝区",
    "parentId" : 500000
},{
    "code" : 500107,
    "name" : "九龙坡区",
    "parentId" : 500000
},{
    "code" : 500108,
    "name" : "南岸区",
    "parentId" : 500000
},{
    "code" : 500109,
    "name" : "北碚区",
    "parentId" : 500000
},{
    "code" : 500110,
    "name" : "綦江区",
    "parentId" : 500000
},{
    "code" : 500111,
    "name" : "大足区",
    "parentId" : 500000
},{
    "code" : 500112,
    "name" : "渝北区",
    "parentId" : 500000
},{
    "code" : 500113,
    "name" : "巴南区",
    "parentId" : 500000
},{
    "code" : 500114,
    "name" : "黔江区",
    "parentId" : 500000
},{
    "code" : 500115,
    "name" : "长寿区",
    "parentId" : 500000
},{
    "code" : 500116,
    "name" : "江津区",
    "parentId" : 500000
},{
    "code" : 500117,
    "name" : "合川区",
    "parentId" : 500000
},{
    "code" : 500118,
    "name" : "永川区",
    "parentId" : 500000
},{
    "code" : 500119,
    "name" : "南川区",
    "parentId" : 500000
},{
    "code" : 500120,
    "name" : "璧山区",
    "parentId" : 500000
},{
    "code" : 500151,
    "name" : "铜梁区",
    "parentId" : 500000
},{
    "code" : 500223,
    "name" : "潼南县",
    "parentId" : 500000
},{
    "code" : 500226,
    "name" : "荣昌县",
    "parentId" : 500000
},{
    "code" : 500228,
    "name" : "梁平县",
    "parentId" : 500000
},{
    "code" : 500229,
    "name" : "城口县",
    "parentId" : 500000
},{
    "code" : 500230,
    "name" : "丰都县",
    "parentId" : 500000
},{
    "code" : 500231,
    "name" : "垫江县",
    "parentId" : 500000
},{
    "code" : 500232,
    "name" : "武隆县",
    "parentId" : 500000
},{
    "code" : 500233,
    "name" : "忠县",
    "parentId" : 500000
},{
    "code" : 500234,
    "name" : "开县",
    "parentId" : 500000
},{
    "code" : 500235,
    "name" : "云阳县",
    "parentId" : 500000
},{
    "code" : 500236,
    "name" : "奉节县",
    "parentId" : 500000
},{
    "code" : 500237,
    "name" : "巫山县",
    "parentId" : 500000
},{
    "code" : 500238,
    "name" : "巫溪县",
    "parentId" : 500000
},{
    "code" : 500240,
    "name" : "石柱土家族自治县",
    "parentId" : 500000
},{
    "code" : 500241,
    "name" : "秀山土家族苗族自治县",
    "parentId" : 500000
},{
    "code" : 500242,
    "name" : "酉阳土家族苗族自治县",
    "parentId" : 500000
},{
    "code" : 500243,
    "name" : "彭水苗族土家族自治县",
    "parentId" : 500000
},{
    "code" : 510100,
    "name" : "成都市",
    "parentId" : 510000
},{
    "code" : 510300,
    "name" : "自贡市",
    "parentId" : 510000
},{
    "code" : 510400,
    "name" : "攀枝花市",
    "parentId" : 510000
},{
    "code" : 510500,
    "name" : "泸州市",
    "parentId" : 510000
},{
    "code" : 510600,
    "name" : "德阳市",
    "parentId" : 510000
},{
    "code" : 510700,
    "name" : "绵阳市",
    "parentId" : 510000
},{
    "code" : 510800,
    "name" : "广元市",
    "parentId" : 510000
},{
    "code" : 510900,
    "name" : "遂宁市",
    "parentId" : 510000
},{
    "code" : 511000,
    "name" : "内江市",
    "parentId" : 510000
},{
    "code" : 511100,
    "name" : "乐山市",
    "parentId" : 510000
},{
    "code" : 511300,
    "name" : "南充市",
    "parentId" : 510000
},{
    "code" : 511400,
    "name" : "眉山市",
    "parentId" : 510000
},{
    "code" : 511500,
    "name" : "宜宾市",
    "parentId" : 510000
},{
    "code" : 511600,
    "name" : "广安市",
    "parentId" : 510000
},{
    "code" : 511700,
    "name" : "达州市",
    "parentId" : 510000
},{
    "code" : 511800,
    "name" : "雅安市",
    "parentId" : 510000
},{
    "code" : 511900,
    "name" : "巴中市",
    "parentId" : 510000
},{
    "code" : 512000,
    "name" : "资阳市",
    "parentId" : 510000
},{
    "code" : 513200,
    "name" : "阿坝藏族羌族自治州",
    "parentId" : 510000
},{
    "code" : 513300,
    "name" : "甘孜藏族自治州",
    "parentId" : 510000
},{
    "code" : 513400,
    "name" : "凉山彝族自治州",
    "parentId" : 510000
},{
    "code" : 520100,
    "name" : "贵阳市",
    "parentId" : 520000
},{
    "code" : 520200,
    "name" : "六盘水市",
    "parentId" : 520000
},{
    "code" : 520300,
    "name" : "遵义市",
    "parentId" : 520000
},{
    "code" : 520400,
    "name" : "安顺市",
    "parentId" : 520000
},{
    "code" : 520500,
    "name" : "毕节市",
    "parentId" : 520000
},{
    "code" : 520600,
    "name" : "铜仁市",
    "parentId" : 520000
},{
    "code" : 522300,
    "name" : "黔西南布依族苗族自治州",
    "parentId" : 520000
},{
    "code" : 522600,
    "name" : "黔东南苗族侗族自治州",
    "parentId" : 520000
},{
    "code" : 522700,
    "name" : "黔南布依族苗族自治州",
    "parentId" : 520000
},{
    "code" : 530100,
    "name" : "昆明市",
    "parentId" : 530000
},{
    "code" : 530300,
    "name" : "曲靖市",
    "parentId" : 530000
},{
    "code" : 530400,
    "name" : "玉溪市",
    "parentId" : 530000
},{
    "code" : 530500,
    "name" : "保山市",
    "parentId" : 530000
},{
    "code" : 530600,
    "name" : "昭通市",
    "parentId" : 530000
},{
    "code" : 530700,
    "name" : "丽江市",
    "parentId" : 530000
},{
    "code" : 530800,
    "name" : "普洱市",
    "parentId" : 530000
},{
    "code" : 530900,
    "name" : "临沧市",
    "parentId" : 530000
},{
    "code" : 532300,
    "name" : "楚雄彝族自治州",
    "parentId" : 530000
},{
    "code" : 532500,
    "name" : "红河哈尼族彝族自治州",
    "parentId" : 530000
},{
    "code" : 532600,
    "name" : "文山壮族苗族自治州",
    "parentId" : 530000
},{
    "code" : 532800,
    "name" : "西双版纳傣族自治州",
    "parentId" : 530000
},{
    "code" : 532900,
    "name" : "大理白族自治州",
    "parentId" : 530000
},{
    "code" : 533100,
    "name" : "德宏傣族景颇族自治州",
    "parentId" : 530000
},{
    "code" : 533300,
    "name" : "怒江傈僳族自治州",
    "parentId" : 530000
},{
    "code" : 533400,
    "name" : "迪庆藏族自治州",
    "parentId" : 530000
},{
    "code" : 540100,
    "name" : "拉萨市",
    "parentId" : 540000
},{
    "code" : 540200,
    "name" : "日喀则市",
    "parentId" : 540000
},{
    "code" : 542100,
    "name" : "昌都地区",
    "parentId" : 540000
},{
    "code" : 542200,
    "name" : "山南地区",
    "parentId" : 540000
},{
    "code" : 542400,
    "name" : "那曲地区",
    "parentId" : 540000
},{
    "code" : 542500,
    "name" : "阿里地区",
    "parentId" : 540000
},{
    "code" : 542600,
    "name" : "林芝地区",
    "parentId" : 540000
},{
    "code" : 610100,
    "name" : "西安市",
    "parentId" : 610000
},{
    "code" : 610200,
    "name" : "铜川市",
    "parentId" : 610000
},{
    "code" : 610300,
    "name" : "宝鸡市",
    "parentId" : 610000
},{
    "code" : 610400,
    "name" : "咸阳市",
    "parentId" : 610000
},{
    "code" : 610500,
    "name" : "渭南市",
    "parentId" : 610000
},{
    "code" : 610600,
    "name" : "延安市",
    "parentId" : 610000
},{
    "code" : 610700,
    "name" : "汉中市",
    "parentId" : 610000
},{
    "code" : 610800,
    "name" : "榆林市",
    "parentId" : 610000
},{
    "code" : 610900,
    "name" : "安康市",
    "parentId" : 610000
},{
    "code" : 611000,
    "name" : "商洛市",
    "parentId" : 610000
},{
    "code" : 620100,
    "name" : "兰州市",
    "parentId" : 620000
},{
    "code" : 620200,
    "name" : "嘉峪关市",
    "parentId" : 620000
},{
    "code" : 620300,
    "name" : "金昌市",
    "parentId" : 620000
},{
    "code" : 620400,
    "name" : "白银市",
    "parentId" : 620000
},{
    "code" : 620500,
    "name" : "天水市",
    "parentId" : 620000
},{
    "code" : 620600,
    "name" : "武威市",
    "parentId" : 620000
},{
    "code" : 620700,
    "name" : "张掖市",
    "parentId" : 620000
},{
    "code" : 620800,
    "name" : "平凉市",
    "parentId" : 620000
},{
    "code" : 620900,
    "name" : "酒泉市",
    "parentId" : 620000
},{
    "code" : 621000,
    "name" : "庆阳市",
    "parentId" : 620000
},{
    "code" : 621100,
    "name" : "定西市",
    "parentId" : 620000
},{
    "code" : 621200,
    "name" : "陇南市",
    "parentId" : 620000
},{
    "code" : 622900,
    "name" : "临夏回族自治州",
    "parentId" : 620000
},{
    "code" : 623000,
    "name" : "甘南藏族自治州",
    "parentId" : 620000
},{
    "code" : 630100,
    "name" : "西宁市",
    "parentId" : 630000
},{
    "code" : 630200,
    "name" : "海东市",
    "parentId" : 630000
},{
    "code" : 632200,
    "name" : "海北藏族自治州",
    "parentId" : 630000
},{
    "code" : 632300,
    "name" : "黄南藏族自治州",
    "parentId" : 630000
},{
    "code" : 632500,
    "name" : "海南藏族自治州",
    "parentId" : 630000
},{
    "code" : 632600,
    "name" : "果洛藏族自治州",
    "parentId" : 630000
},{
    "code" : 632700,
    "name" : "玉树藏族自治州",
    "parentId" : 630000
},{
    "code" : 632800,
    "name" : "海西蒙古族藏族自治州",
    "parentId" : 630000
},{
    "code" : 640100,
    "name" : "银川市",
    "parentId" : 640000
},{
    "code" : 640200,
    "name" : "石嘴山市",
    "parentId" : 640000
},{
    "code" : 640300,
    "name" : "吴忠市",
    "parentId" : 640000
},{
    "code" : 640400,
    "name" : "固原市",
    "parentId" : 640000
},{
    "code" : 640500,
    "name" : "中卫市",
    "parentId" : 640000
},{
    "code" : 650100,
    "name" : "乌鲁木齐市",
    "parentId" : 650000
},{
    "code" : 650200,
    "name" : "克拉玛依市",
    "parentId" : 650000
},{
    "code" : 652100,
    "name" : "吐鲁番地区",
    "parentId" : 650000
},{
    "code" : 652200,
    "name" : "哈密地区",
    "parentId" : 650000
},{
    "code" : 652300,
    "name" : "昌吉回族自治州",
    "parentId" : 650000
},{
    "code" : 652700,
    "name" : "博尔塔拉蒙古自治州",
    "parentId" : 650000
},{
    "code" : 652800,
    "name" : "巴音郭楞蒙古自治州",
    "parentId" : 650000
},{
    "code" : 652900,
    "name" : "阿克苏地区",
    "parentId" : 650000
},{
    "code" : 653000,
    "name" : "克孜勒苏柯尔克孜自治州",
    "parentId" : 650000
},{
    "code" : 653100,
    "name" : "喀什地区",
    "parentId" : 650000
},{
    "code" : 653200,
    "name" : "和田地区",
    "parentId" : 650000
},{
    "code" : 654000,
    "name" : "伊犁哈萨克自治州",
    "parentId" : 650000
},{
    "code" : 654200,
    "name" : "塔城地区",
    "parentId" : 650000
},{
    "code" : 654300,
    "name" : "阿勒泰地区",
    "parentId" : 650000
},{
    "code" : 659001,
    "name" : "石河子市",
    "parentId" : 650000
},{
    "code" : 659002,
    "name" : "阿拉尔市",
    "parentId" : 650000
},{
    "code" : 659003,
    "name" : "图木舒克市",
    "parentId" : 650000
},{
    "code" : 659004,
    "name" : "五家渠市",
    "parentId" : 650000
},{
    "code" : 810101,
    "name" : "中西区",
    "parentId" : 810000
},{
    "code" : 810102,
    "name" : "东区",
    "parentId" : 810000
},{
    "code" : 810103,
    "name" : "九龙城区",
    "parentId" : 810000
},{
    "code" : 810104,
    "name" : "观塘区",
    "parentId" : 810000
},{
    "code" : 810105,
    "name" : "南区",
    "parentId" : 810000
},{
    "code" : 810106,
    "name" : "深水埗区",
    "parentId" : 810000
},{
    "code" : 810107,
    "name" : "湾仔区",
    "parentId" : 810000
},{
    "code" : 810108,
    "name" : "黄大仙区",
    "parentId" : 810000
},{
    "code" : 810109,
    "name" : "油尖旺区",
    "parentId" : 810000
},{
    "code" : 810110,
    "name" : "离岛区",
    "parentId" : 810000
},{
    "code" : 810111,
    "name" : "葵青区",
    "parentId" : 810000
},{
    "code" : 810112,
    "name" : "北区",
    "parentId" : 810000
},{
    "code" : 810113,
    "name" : "西贡区",
    "parentId" : 810000
},{
    "code" : 810114,
    "name" : "沙田区",
    "parentId" : 810000
},{
    "code" : 810115,
    "name" : "屯门区",
    "parentId" : 810000
},{
    "code" : 810116,
    "name" : "大埔区",
    "parentId" : 810000
},{
    "code" : 810117,
    "name" : "荃湾区",
    "parentId" : 810000
},{
    "code" : 810118,
    "name" : "元朗区",
    "parentId" : 810000
},{
    "code" : 810119,
    "name" : "香港",
    "parentId" : 810000
},{
    "code" : 810120,
    "name" : "九龙",
    "parentId" : 810000
},{
    "code" : 810121,
    "name" : "新界",
    "parentId" : 810000
},{
    "code" : 820100,
    "name" : "澳门",
    "parentId" : 820000
}];

var area = exports.area = [{
    "code" : 130102,
    "name" : "长安区",
    "parentId" : 130100
},{
    "code" : 130104,
    "name" : "桥西区",
    "parentId" : 130100
},{
    "code" : 130105,
    "name" : "新华区",
    "parentId" : 130100
},{
    "code" : 130107,
    "name" : "井陉矿区",
    "parentId" : 130100
},{
    "code" : 130108,
    "name" : "裕华区",
    "parentId" : 130100
},{
    "code" : 130109,
    "name" : "藁城区",
    "parentId" : 130100
},{
    "code" : 130110,
    "name" : "鹿泉区",
    "parentId" : 130100
},{
    "code" : 130111,
    "name" : "栾城区",
    "parentId" : 130100
},{
    "code" : 130121,
    "name" : "井陉县",
    "parentId" : 130100
},{
    "code" : 130123,
    "name" : "正定县",
    "parentId" : 130100
},{
    "code" : 130125,
    "name" : "行唐县",
    "parentId" : 130100
},{
    "code" : 130126,
    "name" : "灵寿县",
    "parentId" : 130100
},{
    "code" : 130127,
    "name" : "高邑县",
    "parentId" : 130100
},{
    "code" : 130128,
    "name" : "深泽县",
    "parentId" : 130100
},{
    "code" : 130129,
    "name" : "赞皇县",
    "parentId" : 130100
},{
    "code" : 130130,
    "name" : "无极县",
    "parentId" : 130100
},{
    "code" : 130131,
    "name" : "平山县",
    "parentId" : 130100
},{
    "code" : 130132,
    "name" : "元氏县",
    "parentId" : 130100
},{
    "code" : 130133,
    "name" : "赵县",
    "parentId" : 130100
},{
    "code" : 130181,
    "name" : "辛集市",
    "parentId" : 130100
},{
    "code" : 130183,
    "name" : "晋州市",
    "parentId" : 130100
},{
    "code" : 130184,
    "name" : "新乐市",
    "parentId" : 130100
},{
    "code" : 130202,
    "name" : "路南区",
    "parentId" : 130200
},{
    "code" : 130203,
    "name" : "路北区",
    "parentId" : 130200
},{
    "code" : 130204,
    "name" : "古冶区",
    "parentId" : 130200
},{
    "code" : 130205,
    "name" : "开平区",
    "parentId" : 130200
},{
    "code" : 130207,
    "name" : "丰南区",
    "parentId" : 130200
},{
    "code" : 130208,
    "name" : "丰润区",
    "parentId" : 130200
},{
    "code" : 130209,
    "name" : "曹妃甸区",
    "parentId" : 130200
},{
    "code" : 130223,
    "name" : "滦县",
    "parentId" : 130200
},{
    "code" : 130224,
    "name" : "滦南县",
    "parentId" : 130200
},{
    "code" : 130225,
    "name" : "乐亭县",
    "parentId" : 130200
},{
    "code" : 130227,
    "name" : "迁西县",
    "parentId" : 130200
},{
    "code" : 130229,
    "name" : "玉田县",
    "parentId" : 130200
},{
    "code" : 130281,
    "name" : "遵化市",
    "parentId" : 130200
},{
    "code" : 130283,
    "name" : "迁安市",
    "parentId" : 130200
},{
    "code" : 130302,
    "name" : "海港区",
    "parentId" : 130300
},{
    "code" : 130303,
    "name" : "山海关区",
    "parentId" : 130300
},{
    "code" : 130304,
    "name" : "北戴河区",
    "parentId" : 130300
},{
    "code" : 130321,
    "name" : "青龙满族自治县",
    "parentId" : 130300
},{
    "code" : 130322,
    "name" : "昌黎县",
    "parentId" : 130300
},{
    "code" : 130323,
    "name" : "抚宁县",
    "parentId" : 130300
},{
    "code" : 130324,
    "name" : "卢龙县",
    "parentId" : 130300
},{
    "code" : 130402,
    "name" : "邯山区",
    "parentId" : 130400
},{
    "code" : 130403,
    "name" : "丛台区",
    "parentId" : 130400
},{
    "code" : 130404,
    "name" : "复兴区",
    "parentId" : 130400
},{
    "code" : 130406,
    "name" : "峰峰矿区",
    "parentId" : 130400
},{
    "code" : 130421,
    "name" : "邯郸县",
    "parentId" : 130400
},{
    "code" : 130423,
    "name" : "临漳县",
    "parentId" : 130400
},{
    "code" : 130424,
    "name" : "成安县",
    "parentId" : 130400
},{
    "code" : 130425,
    "name" : "大名县",
    "parentId" : 130400
},{
    "code" : 130426,
    "name" : "涉县",
    "parentId" : 130400
},{
    "code" : 130427,
    "name" : "磁县",
    "parentId" : 130400
},{
    "code" : 130428,
    "name" : "肥乡县",
    "parentId" : 130400
},{
    "code" : 130429,
    "name" : "永年县",
    "parentId" : 130400
},{
    "code" : 130430,
    "name" : "邱县",
    "parentId" : 130400
},{
    "code" : 130431,
    "name" : "鸡泽县",
    "parentId" : 130400
},{
    "code" : 130432,
    "name" : "广平县",
    "parentId" : 130400
},{
    "code" : 130433,
    "name" : "馆陶县",
    "parentId" : 130400
},{
    "code" : 130434,
    "name" : "魏县",
    "parentId" : 130400
},{
    "code" : 130435,
    "name" : "曲周县",
    "parentId" : 130400
},{
    "code" : 130481,
    "name" : "武安市",
    "parentId" : 130400
},{
    "code" : 130502,
    "name" : "桥东区",
    "parentId" : 130500
},{
    "code" : 130503,
    "name" : "桥西区",
    "parentId" : 130500
},{
    "code" : 130521,
    "name" : "邢台县",
    "parentId" : 130500
},{
    "code" : 130522,
    "name" : "临城县",
    "parentId" : 130500
},{
    "code" : 130523,
    "name" : "内丘县",
    "parentId" : 130500
},{
    "code" : 130524,
    "name" : "柏乡县",
    "parentId" : 130500
},{
    "code" : 130525,
    "name" : "隆尧县",
    "parentId" : 130500
},{
    "code" : 130526,
    "name" : "任县",
    "parentId" : 130500
},{
    "code" : 130527,
    "name" : "南和县",
    "parentId" : 130500
},{
    "code" : 130528,
    "name" : "宁晋县",
    "parentId" : 130500
},{
    "code" : 130529,
    "name" : "巨鹿县",
    "parentId" : 130500
},{
    "code" : 130530,
    "name" : "新河县",
    "parentId" : 130500
},{
    "code" : 130531,
    "name" : "广宗县",
    "parentId" : 130500
},{
    "code" : 130532,
    "name" : "平乡县",
    "parentId" : 130500
},{
    "code" : 130533,
    "name" : "威县",
    "parentId" : 130500
},{
    "code" : 130534,
    "name" : "清河县",
    "parentId" : 130500
},{
    "code" : 130535,
    "name" : "临西县",
    "parentId" : 130500
},{
    "code" : 130581,
    "name" : "南宫市",
    "parentId" : 130500
},{
    "code" : 130582,
    "name" : "沙河市",
    "parentId" : 130500
},{
    "code" : 130602,
    "name" : "新市区",
    "parentId" : 130600
},{
    "code" : 130603,
    "name" : "北市区",
    "parentId" : 130600
},{
    "code" : 130604,
    "name" : "南市区",
    "parentId" : 130600
},{
    "code" : 130621,
    "name" : "满城县",
    "parentId" : 130600
},{
    "code" : 130622,
    "name" : "清苑县",
    "parentId" : 130600
},{
    "code" : 130623,
    "name" : "涞水县",
    "parentId" : 130600
},{
    "code" : 130624,
    "name" : "阜平县",
    "parentId" : 130600
},{
    "code" : 130625,
    "name" : "徐水县",
    "parentId" : 130600
},{
    "code" : 130626,
    "name" : "定兴县",
    "parentId" : 130600
},{
    "code" : 130627,
    "name" : "唐县",
    "parentId" : 130600
},{
    "code" : 130628,
    "name" : "高阳县",
    "parentId" : 130600
},{
    "code" : 130629,
    "name" : "容城县",
    "parentId" : 130600
},{
    "code" : 130630,
    "name" : "涞源县",
    "parentId" : 130600
},{
    "code" : 130631,
    "name" : "望都县",
    "parentId" : 130600
},{
    "code" : 130632,
    "name" : "安新县",
    "parentId" : 130600
},{
    "code" : 130633,
    "name" : "易县",
    "parentId" : 130600
},{
    "code" : 130634,
    "name" : "曲阳县",
    "parentId" : 130600
},{
    "code" : 130635,
    "name" : "蠡县",
    "parentId" : 130600
},{
    "code" : 130636,
    "name" : "顺平县",
    "parentId" : 130600
},{
    "code" : 130637,
    "name" : "博野县",
    "parentId" : 130600
},{
    "code" : 130638,
    "name" : "雄县",
    "parentId" : 130600
},{
    "code" : 130681,
    "name" : "涿州市",
    "parentId" : 130600
},{
    "code" : 130682,
    "name" : "定州市",
    "parentId" : 130600
},{
    "code" : 130683,
    "name" : "安国市",
    "parentId" : 130600
},{
    "code" : 130684,
    "name" : "高碑店市",
    "parentId" : 130600
},{
    "code" : 130702,
    "name" : "桥东区",
    "parentId" : 130700
},{
    "code" : 130703,
    "name" : "桥西区",
    "parentId" : 130700
},{
    "code" : 130705,
    "name" : "宣化区",
    "parentId" : 130700
},{
    "code" : 130706,
    "name" : "下花园区",
    "parentId" : 130700
},{
    "code" : 130721,
    "name" : "宣化县",
    "parentId" : 130700
},{
    "code" : 130722,
    "name" : "张北县",
    "parentId" : 130700
},{
    "code" : 130723,
    "name" : "康保县",
    "parentId" : 130700
},{
    "code" : 130724,
    "name" : "沽源县",
    "parentId" : 130700
},{
    "code" : 130725,
    "name" : "尚义县",
    "parentId" : 130700
},{
    "code" : 130726,
    "name" : "蔚县",
    "parentId" : 130700
},{
    "code" : 130727,
    "name" : "阳原县",
    "parentId" : 130700
},{
    "code" : 130728,
    "name" : "怀安县",
    "parentId" : 130700
},{
    "code" : 130729,
    "name" : "万全县",
    "parentId" : 130700
},{
    "code" : 130730,
    "name" : "怀来县",
    "parentId" : 130700
},{
    "code" : 130731,
    "name" : "涿鹿县",
    "parentId" : 130700
},{
    "code" : 130732,
    "name" : "赤城县",
    "parentId" : 130700
},{
    "code" : 130733,
    "name" : "崇礼县",
    "parentId" : 130700
},{
    "code" : 130802,
    "name" : "双桥区",
    "parentId" : 130800
},{
    "code" : 130803,
    "name" : "双滦区",
    "parentId" : 130800
},{
    "code" : 130804,
    "name" : "鹰手营子矿区",
    "parentId" : 130800
},{
    "code" : 130821,
    "name" : "承德县",
    "parentId" : 130800
},{
    "code" : 130822,
    "name" : "兴隆县",
    "parentId" : 130800
},{
    "code" : 130823,
    "name" : "平泉县",
    "parentId" : 130800
},{
    "code" : 130824,
    "name" : "滦平县",
    "parentId" : 130800
},{
    "code" : 130825,
    "name" : "隆化县",
    "parentId" : 130800
},{
    "code" : 130826,
    "name" : "丰宁满族自治县",
    "parentId" : 130800
},{
    "code" : 130827,
    "name" : "宽城满族自治县",
    "parentId" : 130800
},{
    "code" : 130828,
    "name" : "围场满族蒙古族自治县",
    "parentId" : 130800
},{
    "code" : 130902,
    "name" : "新华区",
    "parentId" : 130900
},{
    "code" : 130903,
    "name" : "运河区",
    "parentId" : 130900
},{
    "code" : 130921,
    "name" : "沧县",
    "parentId" : 130900
},{
    "code" : 130922,
    "name" : "青县",
    "parentId" : 130900
},{
    "code" : 130923,
    "name" : "东光县",
    "parentId" : 130900
},{
    "code" : 130924,
    "name" : "海兴县",
    "parentId" : 130900
},{
    "code" : 130925,
    "name" : "盐山县",
    "parentId" : 130900
},{
    "code" : 130926,
    "name" : "肃宁县",
    "parentId" : 130900
},{
    "code" : 130927,
    "name" : "南皮县",
    "parentId" : 130900
},{
    "code" : 130928,
    "name" : "吴桥县",
    "parentId" : 130900
},{
    "code" : 130929,
    "name" : "献县",
    "parentId" : 130900
},{
    "code" : 130930,
    "name" : "孟村回族自治县",
    "parentId" : 130900
},{
    "code" : 130981,
    "name" : "泊头市",
    "parentId" : 130900
},{
    "code" : 130982,
    "name" : "任丘市",
    "parentId" : 130900
},{
    "code" : 130983,
    "name" : "黄骅市",
    "parentId" : 130900
},{
    "code" : 130984,
    "name" : "河间市",
    "parentId" : 130900
},{
    "code" : 131002,
    "name" : "安次区",
    "parentId" : 131000
},{
    "code" : 131003,
    "name" : "广阳区",
    "parentId" : 131000
},{
    "code" : 131022,
    "name" : "固安县",
    "parentId" : 131000
},{
    "code" : 131023,
    "name" : "永清县",
    "parentId" : 131000
},{
    "code" : 131024,
    "name" : "香河县",
    "parentId" : 131000
},{
    "code" : 131025,
    "name" : "大城县",
    "parentId" : 131000
},{
    "code" : 131026,
    "name" : "文安县",
    "parentId" : 131000
},{
    "code" : 131028,
    "name" : "大厂回族自治县",
    "parentId" : 131000
},{
    "code" : 131081,
    "name" : "霸州市",
    "parentId" : 131000
},{
    "code" : 131082,
    "name" : "三河市",
    "parentId" : 131000
},{
    "code" : 131102,
    "name" : "桃城区",
    "parentId" : 131100
},{
    "code" : 131121,
    "name" : "枣强县",
    "parentId" : 131100
},{
    "code" : 131122,
    "name" : "武邑县",
    "parentId" : 131100
},{
    "code" : 131123,
    "name" : "武强县",
    "parentId" : 131100
},{
    "code" : 131124,
    "name" : "饶阳县",
    "parentId" : 131100
},{
    "code" : 131125,
    "name" : "安平县",
    "parentId" : 131100
},{
    "code" : 131126,
    "name" : "故城县",
    "parentId" : 131100
},{
    "code" : 131127,
    "name" : "景县",
    "parentId" : 131100
},{
    "code" : 131128,
    "name" : "阜城县",
    "parentId" : 131100
},{
    "code" : 131181,
    "name" : "冀州市",
    "parentId" : 131100
},{
    "code" : 131182,
    "name" : "深州市",
    "parentId" : 131100
},{
    "code" : 140105,
    "name" : "小店区",
    "parentId" : 140100
},{
    "code" : 140106,
    "name" : "迎泽区",
    "parentId" : 140100
},{
    "code" : 140107,
    "name" : "杏花岭区",
    "parentId" : 140100
},{
    "code" : 140108,
    "name" : "尖草坪区",
    "parentId" : 140100
},{
    "code" : 140109,
    "name" : "万柏林区",
    "parentId" : 140100
},{
    "code" : 140110,
    "name" : "晋源区",
    "parentId" : 140100
},{
    "code" : 140121,
    "name" : "清徐县",
    "parentId" : 140100
},{
    "code" : 140122,
    "name" : "阳曲县",
    "parentId" : 140100
},{
    "code" : 140123,
    "name" : "娄烦县",
    "parentId" : 140100
},{
    "code" : 140181,
    "name" : "古交市",
    "parentId" : 140100
},{
    "code" : 140202,
    "name" : "城区",
    "parentId" : 140200
},{
    "code" : 140211,
    "name" : "南郊区",
    "parentId" : 140200
},{
    "code" : 140212,
    "name" : "新荣区",
    "parentId" : 140200
},{
    "code" : 140221,
    "name" : "阳高县",
    "parentId" : 140200
},{
    "code" : 140222,
    "name" : "天镇县",
    "parentId" : 140200
},{
    "code" : 140223,
    "name" : "广灵县",
    "parentId" : 140200
},{
    "code" : 140224,
    "name" : "灵丘县",
    "parentId" : 140200
},{
    "code" : 140225,
    "name" : "浑源县",
    "parentId" : 140200
},{
    "code" : 140226,
    "name" : "左云县",
    "parentId" : 140200
},{
    "code" : 140227,
    "name" : "大同县",
    "parentId" : 140200
},{
    "code" : 140302,
    "name" : "城区",
    "parentId" : 140300
},{
    "code" : 140303,
    "name" : "矿区",
    "parentId" : 140300
},{
    "code" : 140311,
    "name" : "郊区",
    "parentId" : 140300
},{
    "code" : 140321,
    "name" : "平定县",
    "parentId" : 140300
},{
    "code" : 140322,
    "name" : "盂县",
    "parentId" : 140300
},{
    "code" : 140402,
    "name" : "城区",
    "parentId" : 140400
},{
    "code" : 140411,
    "name" : "郊区",
    "parentId" : 140400
},{
    "code" : 140421,
    "name" : "长治县",
    "parentId" : 140400
},{
    "code" : 140423,
    "name" : "襄垣县",
    "parentId" : 140400
},{
    "code" : 140424,
    "name" : "屯留县",
    "parentId" : 140400
},{
    "code" : 140425,
    "name" : "平顺县",
    "parentId" : 140400
},{
    "code" : 140426,
    "name" : "黎城县",
    "parentId" : 140400
},{
    "code" : 140427,
    "name" : "壶关县",
    "parentId" : 140400
},{
    "code" : 140428,
    "name" : "长子县",
    "parentId" : 140400
},{
    "code" : 140429,
    "name" : "武乡县",
    "parentId" : 140400
},{
    "code" : 140430,
    "name" : "沁县",
    "parentId" : 140400
},{
    "code" : 140431,
    "name" : "沁源县",
    "parentId" : 140400
},{
    "code" : 140481,
    "name" : "潞城市",
    "parentId" : 140400
},{
    "code" : 140502,
    "name" : "城区",
    "parentId" : 140500
},{
    "code" : 140521,
    "name" : "沁水县",
    "parentId" : 140500
},{
    "code" : 140522,
    "name" : "阳城县",
    "parentId" : 140500
},{
    "code" : 140524,
    "name" : "陵川县",
    "parentId" : 140500
},{
    "code" : 140525,
    "name" : "泽州县",
    "parentId" : 140500
},{
    "code" : 140581,
    "name" : "高平市",
    "parentId" : 140500
},{
    "code" : 140602,
    "name" : "朔城区",
    "parentId" : 140600
},{
    "code" : 140603,
    "name" : "平鲁区",
    "parentId" : 140600
},{
    "code" : 140621,
    "name" : "山阴县",
    "parentId" : 140600
},{
    "code" : 140622,
    "name" : "应县",
    "parentId" : 140600
},{
    "code" : 140623,
    "name" : "右玉县",
    "parentId" : 140600
},{
    "code" : 140624,
    "name" : "怀仁县",
    "parentId" : 140600
},{
    "code" : 140702,
    "name" : "榆次区",
    "parentId" : 140700
},{
    "code" : 140721,
    "name" : "榆社县",
    "parentId" : 140700
},{
    "code" : 140722,
    "name" : "左权县",
    "parentId" : 140700
},{
    "code" : 140723,
    "name" : "和顺县",
    "parentId" : 140700
},{
    "code" : 140724,
    "name" : "昔阳县",
    "parentId" : 140700
},{
    "code" : 140725,
    "name" : "寿阳县",
    "parentId" : 140700
},{
    "code" : 140726,
    "name" : "太谷县",
    "parentId" : 140700
},{
    "code" : 140727,
    "name" : "祁县",
    "parentId" : 140700
},{
    "code" : 140728,
    "name" : "平遥县",
    "parentId" : 140700
},{
    "code" : 140729,
    "name" : "灵石县",
    "parentId" : 140700
},{
    "code" : 140781,
    "name" : "介休市",
    "parentId" : 140700
},{
    "code" : 140802,
    "name" : "盐湖区",
    "parentId" : 140800
},{
    "code" : 140821,
    "name" : "临猗县",
    "parentId" : 140800
},{
    "code" : 140822,
    "name" : "万荣县",
    "parentId" : 140800
},{
    "code" : 140823,
    "name" : "闻喜县",
    "parentId" : 140800
},{
    "code" : 140824,
    "name" : "稷山县",
    "parentId" : 140800
},{
    "code" : 140825,
    "name" : "新绛县",
    "parentId" : 140800
},{
    "code" : 140826,
    "name" : "绛县",
    "parentId" : 140800
},{
    "code" : 140827,
    "name" : "垣曲县",
    "parentId" : 140800
},{
    "code" : 140828,
    "name" : "夏县",
    "parentId" : 140800
},{
    "code" : 140829,
    "name" : "平陆县",
    "parentId" : 140800
},{
    "code" : 140830,
    "name" : "芮城县",
    "parentId" : 140800
},{
    "code" : 140881,
    "name" : "永济市",
    "parentId" : 140800
},{
    "code" : 140882,
    "name" : "河津市",
    "parentId" : 140800
},{
    "code" : 140902,
    "name" : "忻府区",
    "parentId" : 140900
},{
    "code" : 140921,
    "name" : "定襄县",
    "parentId" : 140900
},{
    "code" : 140922,
    "name" : "五台县",
    "parentId" : 140900
},{
    "code" : 140923,
    "name" : "代县",
    "parentId" : 140900
},{
    "code" : 140924,
    "name" : "繁峙县",
    "parentId" : 140900
},{
    "code" : 140925,
    "name" : "宁武县",
    "parentId" : 140900
},{
    "code" : 140926,
    "name" : "静乐县",
    "parentId" : 140900
},{
    "code" : 140927,
    "name" : "神池县",
    "parentId" : 140900
},{
    "code" : 140928,
    "name" : "五寨县",
    "parentId" : 140900
},{
    "code" : 140929,
    "name" : "岢岚县",
    "parentId" : 140900
},{
    "code" : 140930,
    "name" : "河曲县",
    "parentId" : 140900
},{
    "code" : 140931,
    "name" : "保德县",
    "parentId" : 140900
},{
    "code" : 140932,
    "name" : "偏关县",
    "parentId" : 140900
},{
    "code" : 140981,
    "name" : "原平市",
    "parentId" : 140900
},{
    "code" : 141002,
    "name" : "尧都区",
    "parentId" : 141000
},{
    "code" : 141021,
    "name" : "曲沃县",
    "parentId" : 141000
},{
    "code" : 141022,
    "name" : "翼城县",
    "parentId" : 141000
},{
    "code" : 141023,
    "name" : "襄汾县",
    "parentId" : 141000
},{
    "code" : 141024,
    "name" : "洪洞县",
    "parentId" : 141000
},{
    "code" : 141025,
    "name" : "古县",
    "parentId" : 141000
},{
    "code" : 141026,
    "name" : "安泽县",
    "parentId" : 141000
},{
    "code" : 141027,
    "name" : "浮山县",
    "parentId" : 141000
},{
    "code" : 141028,
    "name" : "吉县",
    "parentId" : 141000
},{
    "code" : 141029,
    "name" : "乡宁县",
    "parentId" : 141000
},{
    "code" : 141030,
    "name" : "大宁县",
    "parentId" : 141000
},{
    "code" : 141031,
    "name" : "隰县",
    "parentId" : 141000
},{
    "code" : 141032,
    "name" : "永和县",
    "parentId" : 141000
},{
    "code" : 141033,
    "name" : "蒲县",
    "parentId" : 141000
},{
    "code" : 141034,
    "name" : "汾西县",
    "parentId" : 141000
},{
    "code" : 141081,
    "name" : "侯马市",
    "parentId" : 141000
},{
    "code" : 141082,
    "name" : "霍州市",
    "parentId" : 141000
},{
    "code" : 141102,
    "name" : "离石区",
    "parentId" : 141100
},{
    "code" : 141121,
    "name" : "文水县",
    "parentId" : 141100
},{
    "code" : 141122,
    "name" : "交城县",
    "parentId" : 141100
},{
    "code" : 141123,
    "name" : "兴县",
    "parentId" : 141100
},{
    "code" : 141124,
    "name" : "临县",
    "parentId" : 141100
},{
    "code" : 141125,
    "name" : "柳林县",
    "parentId" : 141100
},{
    "code" : 141126,
    "name" : "石楼县",
    "parentId" : 141100
},{
    "code" : 141127,
    "name" : "岚县",
    "parentId" : 141100
},{
    "code" : 141128,
    "name" : "方山县",
    "parentId" : 141100
},{
    "code" : 141129,
    "name" : "中阳县",
    "parentId" : 141100
},{
    "code" : 141130,
    "name" : "交口县",
    "parentId" : 141100
},{
    "code" : 141181,
    "name" : "孝义市",
    "parentId" : 141100
},{
    "code" : 141182,
    "name" : "汾阳市",
    "parentId" : 141100
},{
    "code" : 150102,
    "name" : "新城区",
    "parentId" : 150100
},{
    "code" : 150103,
    "name" : "回民区",
    "parentId" : 150100
},{
    "code" : 150104,
    "name" : "玉泉区",
    "parentId" : 150100
},{
    "code" : 150105,
    "name" : "赛罕区",
    "parentId" : 150100
},{
    "code" : 150121,
    "name" : "土默特左旗",
    "parentId" : 150100
},{
    "code" : 150122,
    "name" : "托克托县",
    "parentId" : 150100
},{
    "code" : 150123,
    "name" : "和林格尔县",
    "parentId" : 150100
},{
    "code" : 150124,
    "name" : "清水河县",
    "parentId" : 150100
},{
    "code" : 150125,
    "name" : "武川县",
    "parentId" : 150100
},{
    "code" : 150202,
    "name" : "东河区",
    "parentId" : 150200
},{
    "code" : 150203,
    "name" : "昆都仑区",
    "parentId" : 150200
},{
    "code" : 150204,
    "name" : "青山区",
    "parentId" : 150200
},{
    "code" : 150205,
    "name" : "石拐区",
    "parentId" : 150200
},{
    "code" : 150206,
    "name" : "白云鄂博矿区",
    "parentId" : 150200
},{
    "code" : 150207,
    "name" : "九原区",
    "parentId" : 150200
},{
    "code" : 150221,
    "name" : "土默特右旗",
    "parentId" : 150200
},{
    "code" : 150222,
    "name" : "固阳县",
    "parentId" : 150200
},{
    "code" : 150223,
    "name" : "达尔罕茂明安联合旗",
    "parentId" : 150200
},{
    "code" : 150302,
    "name" : "海勃湾区",
    "parentId" : 150300
},{
    "code" : 150303,
    "name" : "海南区",
    "parentId" : 150300
},{
    "code" : 150304,
    "name" : "乌达区",
    "parentId" : 150300
},{
    "code" : 150402,
    "name" : "红山区",
    "parentId" : 150400
},{
    "code" : 150403,
    "name" : "元宝山区",
    "parentId" : 150400
},{
    "code" : 150404,
    "name" : "松山区",
    "parentId" : 150400
},{
    "code" : 150421,
    "name" : "阿鲁科尔沁旗",
    "parentId" : 150400
},{
    "code" : 150422,
    "name" : "巴林左旗",
    "parentId" : 150400
},{
    "code" : 150423,
    "name" : "巴林右旗",
    "parentId" : 150400
},{
    "code" : 150424,
    "name" : "林西县",
    "parentId" : 150400
},{
    "code" : 150425,
    "name" : "克什克腾旗",
    "parentId" : 150400
},{
    "code" : 150426,
    "name" : "翁牛特旗",
    "parentId" : 150400
},{
    "code" : 150428,
    "name" : "喀喇沁旗",
    "parentId" : 150400
},{
    "code" : 150429,
    "name" : "宁城县",
    "parentId" : 150400
},{
    "code" : 150430,
    "name" : "敖汉旗",
    "parentId" : 150400
},{
    "code" : 150502,
    "name" : "科尔沁区",
    "parentId" : 150500
},{
    "code" : 150521,
    "name" : "科尔沁左翼中旗",
    "parentId" : 150500
},{
    "code" : 150522,
    "name" : "科尔沁左翼后旗",
    "parentId" : 150500
},{
    "code" : 150523,
    "name" : "开鲁县",
    "parentId" : 150500
},{
    "code" : 150524,
    "name" : "库伦旗",
    "parentId" : 150500
},{
    "code" : 150525,
    "name" : "奈曼旗",
    "parentId" : 150500
},{
    "code" : 150526,
    "name" : "扎鲁特旗",
    "parentId" : 150500
},{
    "code" : 150581,
    "name" : "霍林郭勒市",
    "parentId" : 150500
},{
    "code" : 150602,
    "name" : "东胜区",
    "parentId" : 150600
},{
    "code" : 150621,
    "name" : "达拉特旗",
    "parentId" : 150600
},{
    "code" : 150622,
    "name" : "准格尔旗",
    "parentId" : 150600
},{
    "code" : 150623,
    "name" : "鄂托克前旗",
    "parentId" : 150600
},{
    "code" : 150624,
    "name" : "鄂托克旗",
    "parentId" : 150600
},{
    "code" : 150625,
    "name" : "杭锦旗",
    "parentId" : 150600
},{
    "code" : 150626,
    "name" : "乌审旗",
    "parentId" : 150600
},{
    "code" : 150627,
    "name" : "伊金霍洛旗",
    "parentId" : 150600
},{
    "code" : 150702,
    "name" : "海拉尔区",
    "parentId" : 150700
},{
    "code" : 150721,
    "name" : "阿荣旗",
    "parentId" : 150700
},{
    "code" : 150722,
    "name" : "莫力达瓦达斡尔族自治旗",
    "parentId" : 150700
},{
    "code" : 150723,
    "name" : "鄂伦春自治旗",
    "parentId" : 150700
},{
    "code" : 150724,
    "name" : "鄂温克族自治旗",
    "parentId" : 150700
},{
    "code" : 150725,
    "name" : "陈巴尔虎旗",
    "parentId" : 150700
},{
    "code" : 150726,
    "name" : "新巴尔虎左旗",
    "parentId" : 150700
},{
    "code" : 150727,
    "name" : "新巴尔虎右旗",
    "parentId" : 150700
},{
    "code" : 150781,
    "name" : "满洲里市",
    "parentId" : 150700
},{
    "code" : 150782,
    "name" : "牙克石市",
    "parentId" : 150700
},{
    "code" : 150783,
    "name" : "扎兰屯市",
    "parentId" : 150700
},{
    "code" : 150784,
    "name" : "额尔古纳市",
    "parentId" : 150700
},{
    "code" : 150785,
    "name" : "根河市",
    "parentId" : 150700
},{
    "code" : 150802,
    "name" : "临河区",
    "parentId" : 150800
},{
    "code" : 150821,
    "name" : "五原县",
    "parentId" : 150800
},{
    "code" : 150822,
    "name" : "磴口县",
    "parentId" : 150800
},{
    "code" : 150823,
    "name" : "乌拉特前旗",
    "parentId" : 150800
},{
    "code" : 150824,
    "name" : "乌拉特中旗",
    "parentId" : 150800
},{
    "code" : 150825,
    "name" : "乌拉特后旗",
    "parentId" : 150800
},{
    "code" : 150826,
    "name" : "杭锦后旗",
    "parentId" : 150800
},{
    "code" : 150902,
    "name" : "集宁区",
    "parentId" : 150900
},{
    "code" : 150921,
    "name" : "卓资县",
    "parentId" : 150900
},{
    "code" : 150922,
    "name" : "化德县",
    "parentId" : 150900
},{
    "code" : 150923,
    "name" : "商都县",
    "parentId" : 150900
},{
    "code" : 150924,
    "name" : "兴和县",
    "parentId" : 150900
},{
    "code" : 150925,
    "name" : "凉城县",
    "parentId" : 150900
},{
    "code" : 150926,
    "name" : "察哈尔右翼前旗",
    "parentId" : 150900
},{
    "code" : 150927,
    "name" : "察哈尔右翼中旗",
    "parentId" : 150900
},{
    "code" : 150928,
    "name" : "察哈尔右翼后旗",
    "parentId" : 150900
},{
    "code" : 150929,
    "name" : "四子王旗",
    "parentId" : 150900
},{
    "code" : 150981,
    "name" : "丰镇市",
    "parentId" : 150900
},{
    "code" : 152201,
    "name" : "乌兰浩特市",
    "parentId" : 152200
},{
    "code" : 152202,
    "name" : "阿尔山市",
    "parentId" : 152200
},{
    "code" : 152221,
    "name" : "科尔沁右翼前旗",
    "parentId" : 152200
},{
    "code" : 152222,
    "name" : "科尔沁右翼中旗",
    "parentId" : 152200
},{
    "code" : 152223,
    "name" : "扎赉特旗",
    "parentId" : 152200
},{
    "code" : 152224,
    "name" : "突泉县",
    "parentId" : 152200
},{
    "code" : 152501,
    "name" : "二连浩特市",
    "parentId" : 152500
},{
    "code" : 152502,
    "name" : "锡林浩特市",
    "parentId" : 152500
},{
    "code" : 152522,
    "name" : "阿巴嘎旗",
    "parentId" : 152500
},{
    "code" : 152523,
    "name" : "苏尼特左旗",
    "parentId" : 152500
},{
    "code" : 152524,
    "name" : "苏尼特右旗",
    "parentId" : 152500
},{
    "code" : 152525,
    "name" : "东乌珠穆沁旗",
    "parentId" : 152500
},{
    "code" : 152526,
    "name" : "西乌珠穆沁旗",
    "parentId" : 152500
},{
    "code" : 152527,
    "name" : "太仆寺旗",
    "parentId" : 152500
},{
    "code" : 152528,
    "name" : "镶黄旗",
    "parentId" : 152500
},{
    "code" : 152529,
    "name" : "正镶白旗",
    "parentId" : 152500
},{
    "code" : 152530,
    "name" : "正蓝旗",
    "parentId" : 152500
},{
    "code" : 152531,
    "name" : "多伦县",
    "parentId" : 152500
},{
    "code" : 152921,
    "name" : "阿拉善左旗",
    "parentId" : 152900
},{
    "code" : 152922,
    "name" : "阿拉善右旗",
    "parentId" : 152900
},{
    "code" : 152923,
    "name" : "额济纳旗",
    "parentId" : 152900
},{
    "code" : 210102,
    "name" : "和平区",
    "parentId" : 210100
},{
    "code" : 210103,
    "name" : "沈河区",
    "parentId" : 210100
},{
    "code" : 210104,
    "name" : "大东区",
    "parentId" : 210100
},{
    "code" : 210105,
    "name" : "皇姑区",
    "parentId" : 210100
},{
    "code" : 210106,
    "name" : "铁西区",
    "parentId" : 210100
},{
    "code" : 210111,
    "name" : "苏家屯区",
    "parentId" : 210100
},{
    "code" : 210112,
    "name" : "浑南区",
    "parentId" : 210100
},{
    "code" : 210113,
    "name" : "沈北新区",
    "parentId" : 210100
},{
    "code" : 210114,
    "name" : "于洪区",
    "parentId" : 210100
},{
    "code" : 210122,
    "name" : "辽中县",
    "parentId" : 210100
},{
    "code" : 210123,
    "name" : "康平县",
    "parentId" : 210100
},{
    "code" : 210124,
    "name" : "法库县",
    "parentId" : 210100
},{
    "code" : 210181,
    "name" : "新民市",
    "parentId" : 210100
},{
    "code" : 210202,
    "name" : "中山区",
    "parentId" : 210200
},{
    "code" : 210203,
    "name" : "西岗区",
    "parentId" : 210200
},{
    "code" : 210204,
    "name" : "沙河口区",
    "parentId" : 210200
},{
    "code" : 210211,
    "name" : "甘井子区",
    "parentId" : 210200
},{
    "code" : 210212,
    "name" : "旅顺口区",
    "parentId" : 210200
},{
    "code" : 210213,
    "name" : "金州区",
    "parentId" : 210200
},{
    "code" : 210224,
    "name" : "长海县",
    "parentId" : 210200
},{
    "code" : 210281,
    "name" : "瓦房店市",
    "parentId" : 210200
},{
    "code" : 210282,
    "name" : "普兰店市",
    "parentId" : 210200
},{
    "code" : 210283,
    "name" : "庄河市",
    "parentId" : 210200
},{
    "code" : 210302,
    "name" : "铁东区",
    "parentId" : 210300
},{
    "code" : 210303,
    "name" : "铁西区",
    "parentId" : 210300
},{
    "code" : 210304,
    "name" : "立山区",
    "parentId" : 210300
},{
    "code" : 210311,
    "name" : "千山区",
    "parentId" : 210300
},{
    "code" : 210321,
    "name" : "台安县",
    "parentId" : 210300
},{
    "code" : 210323,
    "name" : "岫岩满族自治县",
    "parentId" : 210300
},{
    "code" : 210381,
    "name" : "海城市",
    "parentId" : 210300
},{
    "code" : 210402,
    "name" : "新抚区",
    "parentId" : 210400
},{
    "code" : 210403,
    "name" : "东洲区",
    "parentId" : 210400
},{
    "code" : 210404,
    "name" : "望花区",
    "parentId" : 210400
},{
    "code" : 210411,
    "name" : "顺城区",
    "parentId" : 210400
},{
    "code" : 210421,
    "name" : "抚顺县",
    "parentId" : 210400
},{
    "code" : 210422,
    "name" : "新宾满族自治县",
    "parentId" : 210400
},{
    "code" : 210423,
    "name" : "清原满族自治县",
    "parentId" : 210400
},{
    "code" : 210502,
    "name" : "平山区",
    "parentId" : 210500
},{
    "code" : 210503,
    "name" : "溪湖区",
    "parentId" : 210500
},{
    "code" : 210504,
    "name" : "明山区",
    "parentId" : 210500
},{
    "code" : 210505,
    "name" : "南芬区",
    "parentId" : 210500
},{
    "code" : 210521,
    "name" : "本溪满族自治县",
    "parentId" : 210500
},{
    "code" : 210522,
    "name" : "桓仁满族自治县",
    "parentId" : 210500
},{
    "code" : 210602,
    "name" : "元宝区",
    "parentId" : 210600
},{
    "code" : 210603,
    "name" : "振兴区",
    "parentId" : 210600
},{
    "code" : 210604,
    "name" : "振安区",
    "parentId" : 210600
},{
    "code" : 210624,
    "name" : "宽甸满族自治县",
    "parentId" : 210600
},{
    "code" : 210681,
    "name" : "东港市",
    "parentId" : 210600
},{
    "code" : 210682,
    "name" : "凤城市",
    "parentId" : 210600
},{
    "code" : 210702,
    "name" : "古塔区",
    "parentId" : 210700
},{
    "code" : 210703,
    "name" : "凌河区",
    "parentId" : 210700
},{
    "code" : 210711,
    "name" : "太和区",
    "parentId" : 210700
},{
    "code" : 210726,
    "name" : "黑山县",
    "parentId" : 210700
},{
    "code" : 210727,
    "name" : "义县",
    "parentId" : 210700
},{
    "code" : 210781,
    "name" : "凌海市",
    "parentId" : 210700
},{
    "code" : 210782,
    "name" : "北镇市",
    "parentId" : 210700
},{
    "code" : 210802,
    "name" : "站前区",
    "parentId" : 210800
},{
    "code" : 210803,
    "name" : "西市区",
    "parentId" : 210800
},{
    "code" : 210804,
    "name" : "鲅鱼圈区",
    "parentId" : 210800
},{
    "code" : 210811,
    "name" : "老边区",
    "parentId" : 210800
},{
    "code" : 210881,
    "name" : "盖州市",
    "parentId" : 210800
},{
    "code" : 210882,
    "name" : "大石桥市",
    "parentId" : 210800
},{
    "code" : 210902,
    "name" : "海州区",
    "parentId" : 210900
},{
    "code" : 210903,
    "name" : "新邱区",
    "parentId" : 210900
},{
    "code" : 210904,
    "name" : "太平区",
    "parentId" : 210900
},{
    "code" : 210905,
    "name" : "清河门区",
    "parentId" : 210900
},{
    "code" : 210911,
    "name" : "细河区",
    "parentId" : 210900
},{
    "code" : 210921,
    "name" : "阜新蒙古族自治县",
    "parentId" : 210900
},{
    "code" : 210922,
    "name" : "彰武县",
    "parentId" : 210900
},{
    "code" : 211002,
    "name" : "白塔区",
    "parentId" : 211000
},{
    "code" : 211003,
    "name" : "文圣区",
    "parentId" : 211000
},{
    "code" : 211004,
    "name" : "宏伟区",
    "parentId" : 211000
},{
    "code" : 211005,
    "name" : "弓长岭区",
    "parentId" : 211000
},{
    "code" : 211011,
    "name" : "太子河区",
    "parentId" : 211000
},{
    "code" : 211021,
    "name" : "辽阳县",
    "parentId" : 211000
},{
    "code" : 211081,
    "name" : "灯塔市",
    "parentId" : 211000
},{
    "code" : 211102,
    "name" : "双台子区",
    "parentId" : 211100
},{
    "code" : 211103,
    "name" : "兴隆台区",
    "parentId" : 211100
},{
    "code" : 211121,
    "name" : "大洼县",
    "parentId" : 211100
},{
    "code" : 211122,
    "name" : "盘山县",
    "parentId" : 211100
},{
    "code" : 211202,
    "name" : "银州区",
    "parentId" : 211200
},{
    "code" : 211204,
    "name" : "清河区",
    "parentId" : 211200
},{
    "code" : 211221,
    "name" : "铁岭县",
    "parentId" : 211200
},{
    "code" : 211223,
    "name" : "西丰县",
    "parentId" : 211200
},{
    "code" : 211224,
    "name" : "昌图县",
    "parentId" : 211200
},{
    "code" : 211281,
    "name" : "调兵山市",
    "parentId" : 211200
},{
    "code" : 211282,
    "name" : "开原市",
    "parentId" : 211200
},{
    "code" : 211302,
    "name" : "双塔区",
    "parentId" : 211300
},{
    "code" : 211303,
    "name" : "龙城区",
    "parentId" : 211300
},{
    "code" : 211321,
    "name" : "朝阳县",
    "parentId" : 211300
},{
    "code" : 211322,
    "name" : "建平县",
    "parentId" : 211300
},{
    "code" : 211324,
    "name" : "喀喇沁左翼蒙古族自治县",
    "parentId" : 211300
},{
    "code" : 211381,
    "name" : "北票市",
    "parentId" : 211300
},{
    "code" : 211382,
    "name" : "凌源市",
    "parentId" : 211300
},{
    "code" : 211402,
    "name" : "连山区",
    "parentId" : 211400
},{
    "code" : 211403,
    "name" : "龙港区",
    "parentId" : 211400
},{
    "code" : 211404,
    "name" : "南票区",
    "parentId" : 211400
},{
    "code" : 211421,
    "name" : "绥中县",
    "parentId" : 211400
},{
    "code" : 211422,
    "name" : "建昌县",
    "parentId" : 211400
},{
    "code" : 211481,
    "name" : "兴城市",
    "parentId" : 211400
},{
    "code" : 220102,
    "name" : "南关区",
    "parentId" : 220100
},{
    "code" : 220103,
    "name" : "宽城区",
    "parentId" : 220100
},{
    "code" : 220104,
    "name" : "朝阳区",
    "parentId" : 220100
},{
    "code" : 220105,
    "name" : "二道区",
    "parentId" : 220100
},{
    "code" : 220106,
    "name" : "绿园区",
    "parentId" : 220100
},{
    "code" : 220112,
    "name" : "双阳区",
    "parentId" : 220100
},{
    "code" : 220122,
    "name" : "农安县",
    "parentId" : 220100
},{
    "code" : 220181,
    "name" : "九台市",
    "parentId" : 220100
},{
    "code" : 220182,
    "name" : "榆树市",
    "parentId" : 220100
},{
    "code" : 220183,
    "name" : "德惠市",
    "parentId" : 220100
},{
    "code" : 220202,
    "name" : "昌邑区",
    "parentId" : 220200
},{
    "code" : 220203,
    "name" : "龙潭区",
    "parentId" : 220200
},{
    "code" : 220204,
    "name" : "船营区",
    "parentId" : 220200
},{
    "code" : 220211,
    "name" : "丰满区",
    "parentId" : 220200
},{
    "code" : 220221,
    "name" : "永吉县",
    "parentId" : 220200
},{
    "code" : 220281,
    "name" : "蛟河市",
    "parentId" : 220200
},{
    "code" : 220282,
    "name" : "桦甸市",
    "parentId" : 220200
},{
    "code" : 220283,
    "name" : "舒兰市",
    "parentId" : 220200
},{
    "code" : 220284,
    "name" : "磐石市",
    "parentId" : 220200
},{
    "code" : 220302,
    "name" : "铁西区",
    "parentId" : 220300
},{
    "code" : 220303,
    "name" : "铁东区",
    "parentId" : 220300
},{
    "code" : 220322,
    "name" : "梨树县",
    "parentId" : 220300
},{
    "code" : 220323,
    "name" : "伊通满族自治县",
    "parentId" : 220300
},{
    "code" : 220381,
    "name" : "公主岭市",
    "parentId" : 220300
},{
    "code" : 220382,
    "name" : "双辽市",
    "parentId" : 220300
},{
    "code" : 220402,
    "name" : "龙山区",
    "parentId" : 220400
},{
    "code" : 220403,
    "name" : "西安区",
    "parentId" : 220400
},{
    "code" : 220421,
    "name" : "东丰县",
    "parentId" : 220400
},{
    "code" : 220422,
    "name" : "东辽县",
    "parentId" : 220400
},{
    "code" : 220502,
    "name" : "东昌区",
    "parentId" : 220500
},{
    "code" : 220503,
    "name" : "二道江区",
    "parentId" : 220500
},{
    "code" : 220521,
    "name" : "通化县",
    "parentId" : 220500
},{
    "code" : 220523,
    "name" : "辉南县",
    "parentId" : 220500
},{
    "code" : 220524,
    "name" : "柳河县",
    "parentId" : 220500
},{
    "code" : 220581,
    "name" : "梅河口市",
    "parentId" : 220500
},{
    "code" : 220582,
    "name" : "集安市",
    "parentId" : 220500
},{
    "code" : 220602,
    "name" : "浑江区",
    "parentId" : 220600
},{
    "code" : 220605,
    "name" : "江源区",
    "parentId" : 220600
},{
    "code" : 220621,
    "name" : "抚松县",
    "parentId" : 220600
},{
    "code" : 220622,
    "name" : "靖宇县",
    "parentId" : 220600
},{
    "code" : 220623,
    "name" : "长白朝鲜族自治县",
    "parentId" : 220600
},{
    "code" : 220681,
    "name" : "临江市",
    "parentId" : 220600
},{
    "code" : 220702,
    "name" : "宁江区",
    "parentId" : 220700
},{
    "code" : 220721,
    "name" : "前郭尔罗斯蒙古族自治县",
    "parentId" : 220700
},{
    "code" : 220722,
    "name" : "长岭县",
    "parentId" : 220700
},{
    "code" : 220723,
    "name" : "乾安县",
    "parentId" : 220700
},{
    "code" : 220724,
    "name" : "扶余市",
    "parentId" : 220700
},{
    "code" : 220802,
    "name" : "洮北区",
    "parentId" : 220800
},{
    "code" : 220821,
    "name" : "镇赉县",
    "parentId" : 220800
},{
    "code" : 220822,
    "name" : "通榆县",
    "parentId" : 220800
},{
    "code" : 220881,
    "name" : "洮南市",
    "parentId" : 220800
},{
    "code" : 220882,
    "name" : "大安市",
    "parentId" : 220800
},{
    "code" : 222401,
    "name" : "延吉市",
    "parentId" : 222400
},{
    "code" : 222402,
    "name" : "图们市",
    "parentId" : 222400
},{
    "code" : 222403,
    "name" : "敦化市",
    "parentId" : 222400
},{
    "code" : 222404,
    "name" : "珲春市",
    "parentId" : 222400
},{
    "code" : 222405,
    "name" : "龙井市",
    "parentId" : 222400
},{
    "code" : 222406,
    "name" : "和龙市",
    "parentId" : 222400
},{
    "code" : 222424,
    "name" : "汪清县",
    "parentId" : 222400
},{
    "code" : 222426,
    "name" : "安图县",
    "parentId" : 222400
},{
    "code" : 230102,
    "name" : "道里区",
    "parentId" : 230100
},{
    "code" : 230103,
    "name" : "南岗区",
    "parentId" : 230100
},{
    "code" : 230104,
    "name" : "道外区",
    "parentId" : 230100
},{
    "code" : 230108,
    "name" : "平房区",
    "parentId" : 230100
},{
    "code" : 230109,
    "name" : "松北区",
    "parentId" : 230100
},{
    "code" : 230110,
    "name" : "香坊区",
    "parentId" : 230100
},{
    "code" : 230111,
    "name" : "呼兰区",
    "parentId" : 230100
},{
    "code" : 230112,
    "name" : "阿城区",
    "parentId" : 230100
},{
    "code" : 230123,
    "name" : "依兰县",
    "parentId" : 230100
},{
    "code" : 230124,
    "name" : "方正县",
    "parentId" : 230100
},{
    "code" : 230125,
    "name" : "宾县",
    "parentId" : 230100
},{
    "code" : 230126,
    "name" : "巴彦县",
    "parentId" : 230100
},{
    "code" : 230127,
    "name" : "木兰县",
    "parentId" : 230100
},{
    "code" : 230128,
    "name" : "通河县",
    "parentId" : 230100
},{
    "code" : 230129,
    "name" : "延寿县",
    "parentId" : 230100
},{
    "code" : 230182,
    "name" : "双城区",
    "parentId" : 230100
},{
    "code" : 230183,
    "name" : "尚志市",
    "parentId" : 230100
},{
    "code" : 230184,
    "name" : "五常市",
    "parentId" : 230100
},{
    "code" : 230202,
    "name" : "龙沙区",
    "parentId" : 230200
},{
    "code" : 230203,
    "name" : "建华区",
    "parentId" : 230200
},{
    "code" : 230204,
    "name" : "铁锋区",
    "parentId" : 230200
},{
    "code" : 230205,
    "name" : "昂昂溪区",
    "parentId" : 230200
},{
    "code" : 230206,
    "name" : "富拉尔基区",
    "parentId" : 230200
},{
    "code" : 230207,
    "name" : "碾子山区",
    "parentId" : 230200
},{
    "code" : 230208,
    "name" : "梅里斯达斡尔族区",
    "parentId" : 230200
},{
    "code" : 230221,
    "name" : "龙江县",
    "parentId" : 230200
},{
    "code" : 230223,
    "name" : "依安县",
    "parentId" : 230200
},{
    "code" : 230224,
    "name" : "泰来县",
    "parentId" : 230200
},{
    "code" : 230225,
    "name" : "甘南县",
    "parentId" : 230200
},{
    "code" : 230227,
    "name" : "富裕县",
    "parentId" : 230200
},{
    "code" : 230229,
    "name" : "克山县",
    "parentId" : 230200
},{
    "code" : 230230,
    "name" : "克东县",
    "parentId" : 230200
},{
    "code" : 230231,
    "name" : "拜泉县",
    "parentId" : 230200
},{
    "code" : 230281,
    "name" : "讷河市",
    "parentId" : 230200
},{
    "code" : 230302,
    "name" : "鸡冠区",
    "parentId" : 230300
},{
    "code" : 230303,
    "name" : "恒山区",
    "parentId" : 230300
},{
    "code" : 230304,
    "name" : "滴道区",
    "parentId" : 230300
},{
    "code" : 230305,
    "name" : "梨树区",
    "parentId" : 230300
},{
    "code" : 230306,
    "name" : "城子河区",
    "parentId" : 230300
},{
    "code" : 230307,
    "name" : "麻山区",
    "parentId" : 230300
},{
    "code" : 230321,
    "name" : "鸡东县",
    "parentId" : 230300
},{
    "code" : 230381,
    "name" : "虎林市",
    "parentId" : 230300
},{
    "code" : 230382,
    "name" : "密山市",
    "parentId" : 230300
},{
    "code" : 230402,
    "name" : "向阳区",
    "parentId" : 230400
},{
    "code" : 230403,
    "name" : "工农区",
    "parentId" : 230400
},{
    "code" : 230404,
    "name" : "南山区",
    "parentId" : 230400
},{
    "code" : 230405,
    "name" : "兴安区",
    "parentId" : 230400
},{
    "code" : 230406,
    "name" : "东山区",
    "parentId" : 230400
},{
    "code" : 230407,
    "name" : "兴山区",
    "parentId" : 230400
},{
    "code" : 230421,
    "name" : "萝北县",
    "parentId" : 230400
},{
    "code" : 230422,
    "name" : "绥滨县",
    "parentId" : 230400
},{
    "code" : 230502,
    "name" : "尖山区",
    "parentId" : 230500
},{
    "code" : 230503,
    "name" : "岭东区",
    "parentId" : 230500
},{
    "code" : 230505,
    "name" : "四方台区",
    "parentId" : 230500
},{
    "code" : 230506,
    "name" : "宝山区",
    "parentId" : 230500
},{
    "code" : 230521,
    "name" : "集贤县",
    "parentId" : 230500
},{
    "code" : 230522,
    "name" : "友谊县",
    "parentId" : 230500
},{
    "code" : 230523,
    "name" : "宝清县",
    "parentId" : 230500
},{
    "code" : 230524,
    "name" : "饶河县",
    "parentId" : 230500
},{
    "code" : 230602,
    "name" : "萨尔图区",
    "parentId" : 230600
},{
    "code" : 230603,
    "name" : "龙凤区",
    "parentId" : 230600
},{
    "code" : 230604,
    "name" : "让胡路区",
    "parentId" : 230600
},{
    "code" : 230605,
    "name" : "红岗区",
    "parentId" : 230600
},{
    "code" : 230606,
    "name" : "大同区",
    "parentId" : 230600
},{
    "code" : 230621,
    "name" : "肇州县",
    "parentId" : 230600
},{
    "code" : 230622,
    "name" : "肇源县",
    "parentId" : 230600
},{
    "code" : 230623,
    "name" : "林甸县",
    "parentId" : 230600
},{
    "code" : 230624,
    "name" : "杜尔伯特蒙古族自治县",
    "parentId" : 230600
},{
    "code" : 230702,
    "name" : "伊春区",
    "parentId" : 230700
},{
    "code" : 230703,
    "name" : "南岔区",
    "parentId" : 230700
},{
    "code" : 230704,
    "name" : "友好区",
    "parentId" : 230700
},{
    "code" : 230705,
    "name" : "西林区",
    "parentId" : 230700
},{
    "code" : 230706,
    "name" : "翠峦区",
    "parentId" : 230700
},{
    "code" : 230707,
    "name" : "新青区",
    "parentId" : 230700
},{
    "code" : 230708,
    "name" : "美溪区",
    "parentId" : 230700
},{
    "code" : 230709,
    "name" : "金山屯区",
    "parentId" : 230700
},{
    "code" : 230710,
    "name" : "五营区",
    "parentId" : 230700
},{
    "code" : 230711,
    "name" : "乌马河区",
    "parentId" : 230700
},{
    "code" : 230712,
    "name" : "汤旺河区",
    "parentId" : 230700
},{
    "code" : 230713,
    "name" : "带岭区",
    "parentId" : 230700
},{
    "code" : 230714,
    "name" : "乌伊岭区",
    "parentId" : 230700
},{
    "code" : 230715,
    "name" : "红星区",
    "parentId" : 230700
},{
    "code" : 230716,
    "name" : "上甘岭区",
    "parentId" : 230700
},{
    "code" : 230722,
    "name" : "嘉荫县",
    "parentId" : 230700
},{
    "code" : 230781,
    "name" : "铁力市",
    "parentId" : 230700
},{
    "code" : 230801,
    "name" : "佳木斯市区",
    "parentId" : 230800
},{
    "code" : 230822,
    "name" : "桦南县",
    "parentId" : 230800
},{
    "code" : 230826,
    "name" : "桦川县",
    "parentId" : 230800
},{
    "code" : 230828,
    "name" : "汤原县",
    "parentId" : 230800
},{
    "code" : 230833,
    "name" : "抚远县",
    "parentId" : 230800
},{
    "code" : 230881,
    "name" : "同江市",
    "parentId" : 230800
},{
    "code" : 230882,
    "name" : "富锦市",
    "parentId" : 230800
},{
    "code" : 230902,
    "name" : "新兴区",
    "parentId" : 230900
},{
    "code" : 230903,
    "name" : "桃山区",
    "parentId" : 230900
},{
    "code" : 230904,
    "name" : "茄子河区",
    "parentId" : 230900
},{
    "code" : 230921,
    "name" : "勃利县",
    "parentId" : 230900
},{
    "code" : 231002,
    "name" : "东安区",
    "parentId" : 231000
},{
    "code" : 231003,
    "name" : "阳明区",
    "parentId" : 231000
},{
    "code" : 231004,
    "name" : "爱民区",
    "parentId" : 231000
},{
    "code" : 231005,
    "name" : "西安区",
    "parentId" : 231000
},{
    "code" : 231024,
    "name" : "东宁县",
    "parentId" : 231000
},{
    "code" : 231025,
    "name" : "林口县",
    "parentId" : 231000
},{
    "code" : 231081,
    "name" : "绥芬河市",
    "parentId" : 231000
},{
    "code" : 231083,
    "name" : "海林市",
    "parentId" : 231000
},{
    "code" : 231084,
    "name" : "宁安市",
    "parentId" : 231000
},{
    "code" : 231085,
    "name" : "穆棱市",
    "parentId" : 231000
},{
    "code" : 231102,
    "name" : "爱辉区",
    "parentId" : 231100
},{
    "code" : 231121,
    "name" : "嫩江县",
    "parentId" : 231100
},{
    "code" : 231123,
    "name" : "逊克县",
    "parentId" : 231100
},{
    "code" : 231124,
    "name" : "孙吴县",
    "parentId" : 231100
},{
    "code" : 231181,
    "name" : "北安市",
    "parentId" : 231100
},{
    "code" : 231182,
    "name" : "五大连池市",
    "parentId" : 231100
},{
    "code" : 231202,
    "name" : "北林区",
    "parentId" : 231200
},{
    "code" : 231221,
    "name" : "望奎县",
    "parentId" : 231200
},{
    "code" : 231222,
    "name" : "兰西县",
    "parentId" : 231200
},{
    "code" : 231223,
    "name" : "青冈县",
    "parentId" : 231200
},{
    "code" : 231224,
    "name" : "庆安县",
    "parentId" : 231200
},{
    "code" : 231225,
    "name" : "明水县",
    "parentId" : 231200
},{
    "code" : 231226,
    "name" : "绥棱县",
    "parentId" : 231200
},{
    "code" : 231281,
    "name" : "安达市",
    "parentId" : 231200
},{
    "code" : 231282,
    "name" : "肇东市",
    "parentId" : 231200
},{
    "code" : 231283,
    "name" : "海伦市",
    "parentId" : 231200
},{
    "code" : 232721,
    "name" : "呼玛县",
    "parentId" : 232700
},{
    "code" : 232722,
    "name" : "塔河县",
    "parentId" : 232700
},{
    "code" : 232723,
    "name" : "漠河县",
    "parentId" : 232700
},{
    "code" : 320102,
    "name" : "玄武区",
    "parentId" : 320100
},{
    "code" : 320104,
    "name" : "秦淮区",
    "parentId" : 320100
},{
    "code" : 320105,
    "name" : "建邺区",
    "parentId" : 320100
},{
    "code" : 320106,
    "name" : "鼓楼区",
    "parentId" : 320100
},{
    "code" : 320111,
    "name" : "浦口区",
    "parentId" : 320100
},{
    "code" : 320113,
    "name" : "栖霞区",
    "parentId" : 320100
},{
    "code" : 320114,
    "name" : "雨花台区",
    "parentId" : 320100
},{
    "code" : 320115,
    "name" : "江宁区",
    "parentId" : 320100
},{
    "code" : 320116,
    "name" : "六合区",
    "parentId" : 320100
},{
    "code" : 320117,
    "name" : "溧水区",
    "parentId" : 320100
},{
    "code" : 320118,
    "name" : "高淳区",
    "parentId" : 320100
},{
    "code" : 320202,
    "name" : "崇安区",
    "parentId" : 320200
},{
    "code" : 320203,
    "name" : "南长区",
    "parentId" : 320200
},{
    "code" : 320204,
    "name" : "北塘区",
    "parentId" : 320200
},{
    "code" : 320205,
    "name" : "锡山区",
    "parentId" : 320200
},{
    "code" : 320206,
    "name" : "惠山区",
    "parentId" : 320200
},{
    "code" : 320211,
    "name" : "滨湖区",
    "parentId" : 320200
},{
    "code" : 320281,
    "name" : "江阴市",
    "parentId" : 320200
},{
    "code" : 320282,
    "name" : "宜兴市",
    "parentId" : 320200
},{
    "code" : 320302,
    "name" : "鼓楼区",
    "parentId" : 320300
},{
    "code" : 320303,
    "name" : "云龙区",
    "parentId" : 320300
},{
    "code" : 320305,
    "name" : "贾汪区",
    "parentId" : 320300
},{
    "code" : 320311,
    "name" : "泉山区",
    "parentId" : 320300
},{
    "code" : 320312,
    "name" : "铜山区",
    "parentId" : 320300
},{
    "code" : 320321,
    "name" : "丰县",
    "parentId" : 320300
},{
    "code" : 320322,
    "name" : "沛县",
    "parentId" : 320300
},{
    "code" : 320324,
    "name" : "睢宁县",
    "parentId" : 320300
},{
    "code" : 320381,
    "name" : "新沂市",
    "parentId" : 320300
},{
    "code" : 320382,
    "name" : "邳州市",
    "parentId" : 320300
},{
    "code" : 320402,
    "name" : "天宁区",
    "parentId" : 320400
},{
    "code" : 320404,
    "name" : "钟楼区",
    "parentId" : 320400
},{
    "code" : 320405,
    "name" : "戚墅堰区",
    "parentId" : 320400
},{
    "code" : 320411,
    "name" : "新北区",
    "parentId" : 320400
},{
    "code" : 320412,
    "name" : "武进区",
    "parentId" : 320400
},{
    "code" : 320481,
    "name" : "溧阳市",
    "parentId" : 320400
},{
    "code" : 320482,
    "name" : "金坛市",
    "parentId" : 320400
},{
    "code" : 320505,
    "name" : "虎丘区",
    "parentId" : 320500
},{
    "code" : 320506,
    "name" : "吴中区",
    "parentId" : 320500
},{
    "code" : 320507,
    "name" : "相城区",
    "parentId" : 320500
},{
    "code" : 320508,
    "name" : "姑苏区",
    "parentId" : 320500
},{
    "code" : 320509,
    "name" : "吴江区",
    "parentId" : 320500
},{
    "code" : 320581,
    "name" : "常熟市",
    "parentId" : 320500
},{
    "code" : 320582,
    "name" : "张家港市",
    "parentId" : 320500
},{
    "code" : 320583,
    "name" : "昆山市",
    "parentId" : 320500
},{
    "code" : 320585,
    "name" : "太仓市",
    "parentId" : 320500
},{
    "code" : 320602,
    "name" : "崇川区",
    "parentId" : 320600
},{
    "code" : 320611,
    "name" : "港闸区",
    "parentId" : 320600
},{
    "code" : 320612,
    "name" : "通州区",
    "parentId" : 320600
},{
    "code" : 320621,
    "name" : "海安县",
    "parentId" : 320600
},{
    "code" : 320623,
    "name" : "如东县",
    "parentId" : 320600
},{
    "code" : 320681,
    "name" : "启东市",
    "parentId" : 320600
},{
    "code" : 320682,
    "name" : "如皋市",
    "parentId" : 320600
},{
    "code" : 320684,
    "name" : "海门市",
    "parentId" : 320600
},{
    "code" : 320703,
    "name" : "连云区",
    "parentId" : 320700
},{
    "code" : 320706,
    "name" : "海州区",
    "parentId" : 320700
},{
    "code" : 320721,
    "name" : "赣榆区",
    "parentId" : 320700
},{
    "code" : 320722,
    "name" : "东海县",
    "parentId" : 320700
},{
    "code" : 320723,
    "name" : "灌云县",
    "parentId" : 320700
},{
    "code" : 320724,
    "name" : "灌南县",
    "parentId" : 320700
},{
    "code" : 320802,
    "name" : "清河区",
    "parentId" : 320800
},{
    "code" : 320803,
    "name" : "淮安区",
    "parentId" : 320800
},{
    "code" : 320804,
    "name" : "淮阴区",
    "parentId" : 320800
},{
    "code" : 320811,
    "name" : "清浦区",
    "parentId" : 320800
},{
    "code" : 320826,
    "name" : "涟水县",
    "parentId" : 320800
},{
    "code" : 320829,
    "name" : "洪泽县",
    "parentId" : 320800
},{
    "code" : 320830,
    "name" : "盱眙县",
    "parentId" : 320800
},{
    "code" : 320831,
    "name" : "金湖县",
    "parentId" : 320800
},{
    "code" : 320902,
    "name" : "亭湖区",
    "parentId" : 320900
},{
    "code" : 320903,
    "name" : "盐都区",
    "parentId" : 320900
},{
    "code" : 320921,
    "name" : "响水县",
    "parentId" : 320900
},{
    "code" : 320922,
    "name" : "滨海县",
    "parentId" : 320900
},{
    "code" : 320923,
    "name" : "阜宁县",
    "parentId" : 320900
},{
    "code" : 320924,
    "name" : "射阳县",
    "parentId" : 320900
},{
    "code" : 320925,
    "name" : "建湖县",
    "parentId" : 320900
},{
    "code" : 320981,
    "name" : "东台市",
    "parentId" : 320900
},{
    "code" : 320982,
    "name" : "大丰市",
    "parentId" : 320900
},{
    "code" : 321002,
    "name" : "广陵区",
    "parentId" : 321000
},{
    "code" : 321003,
    "name" : "邗江区",
    "parentId" : 321000
},{
    "code" : 321012,
    "name" : "江都区",
    "parentId" : 321000
},{
    "code" : 321023,
    "name" : "宝应县",
    "parentId" : 321000
},{
    "code" : 321081,
    "name" : "仪征市",
    "parentId" : 321000
},{
    "code" : 321084,
    "name" : "高邮市",
    "parentId" : 321000
},{
    "code" : 321102,
    "name" : "京口区",
    "parentId" : 321100
},{
    "code" : 321111,
    "name" : "润州区",
    "parentId" : 321100
},{
    "code" : 321112,
    "name" : "丹徒区",
    "parentId" : 321100
},{
    "code" : 321181,
    "name" : "丹阳市",
    "parentId" : 321100
},{
    "code" : 321182,
    "name" : "扬中市",
    "parentId" : 321100
},{
    "code" : 321183,
    "name" : "句容市",
    "parentId" : 321100
},{
    "code" : 321202,
    "name" : "海陵区",
    "parentId" : 321200
},{
    "code" : 321203,
    "name" : "高港区",
    "parentId" : 321200
},{
    "code" : 321204,
    "name" : "姜堰区",
    "parentId" : 321200
},{
    "code" : 321281,
    "name" : "兴化市",
    "parentId" : 321200
},{
    "code" : 321282,
    "name" : "靖江市",
    "parentId" : 321200
},{
    "code" : 321283,
    "name" : "泰兴市",
    "parentId" : 321200
},{
    "code" : 321302,
    "name" : "宿城区",
    "parentId" : 321300
},{
    "code" : 321311,
    "name" : "宿豫区",
    "parentId" : 321300
},{
    "code" : 321322,
    "name" : "沭阳县",
    "parentId" : 321300
},{
    "code" : 321323,
    "name" : "泗阳县",
    "parentId" : 321300
},{
    "code" : 321324,
    "name" : "泗洪县",
    "parentId" : 321300
},{
    "code" : 330102,
    "name" : "上城区",
    "parentId" : 330100
},{
    "code" : 330103,
    "name" : "下城区",
    "parentId" : 330100
},{
    "code" : 330104,
    "name" : "江干区",
    "parentId" : 330100
},{
    "code" : 330105,
    "name" : "拱墅区",
    "parentId" : 330100
},{
    "code" : 330106,
    "name" : "西湖区",
    "parentId" : 330100
},{
    "code" : 330108,
    "name" : "滨江区",
    "parentId" : 330100
},{
    "code" : 330109,
    "name" : "萧山区",
    "parentId" : 330100
},{
    "code" : 330110,
    "name" : "余杭区",
    "parentId" : 330100
},{
    "code" : 330111,
    "name" : "富阳区",
    "parentId" : 330100
},{
    "code" : 330122,
    "name" : "桐庐县",
    "parentId" : 330100
},{
    "code" : 330127,
    "name" : "淳安县",
    "parentId" : 330100
},{
    "code" : 330182,
    "name" : "建德市",
    "parentId" : 330100
},{
    "code" : 330185,
    "name" : "临安市",
    "parentId" : 330100
},{
    "code" : 330203,
    "name" : "海曙区",
    "parentId" : 330200
},{
    "code" : 330204,
    "name" : "江东区",
    "parentId" : 330200
},{
    "code" : 330205,
    "name" : "江北区",
    "parentId" : 330200
},{
    "code" : 330206,
    "name" : "北仑区",
    "parentId" : 330200
},{
    "code" : 330211,
    "name" : "镇海区",
    "parentId" : 330200
},{
    "code" : 330212,
    "name" : "鄞州区",
    "parentId" : 330200
},{
    "code" : 330225,
    "name" : "象山县",
    "parentId" : 330200
},{
    "code" : 330226,
    "name" : "宁海县",
    "parentId" : 330200
},{
    "code" : 330281,
    "name" : "余姚市",
    "parentId" : 330200
},{
    "code" : 330282,
    "name" : "慈溪市",
    "parentId" : 330200
},{
    "code" : 330283,
    "name" : "奉化市",
    "parentId" : 330200
},{
    "code" : 330302,
    "name" : "鹿城区",
    "parentId" : 330300
},{
    "code" : 330303,
    "name" : "龙湾区",
    "parentId" : 330300
},{
    "code" : 330304,
    "name" : "瓯海区",
    "parentId" : 330300
},{
    "code" : 330322,
    "name" : "洞头县",
    "parentId" : 330300
},{
    "code" : 330324,
    "name" : "永嘉县",
    "parentId" : 330300
},{
    "code" : 330326,
    "name" : "平阳县",
    "parentId" : 330300
},{
    "code" : 330327,
    "name" : "苍南县",
    "parentId" : 330300
},{
    "code" : 330328,
    "name" : "文成县",
    "parentId" : 330300
},{
    "code" : 330329,
    "name" : "泰顺县",
    "parentId" : 330300
},{
    "code" : 330381,
    "name" : "瑞安市",
    "parentId" : 330300
},{
    "code" : 330382,
    "name" : "乐清市",
    "parentId" : 330300
},{
    "code" : 330402,
    "name" : "南湖区",
    "parentId" : 330400
},{
    "code" : 330411,
    "name" : "秀洲区",
    "parentId" : 330400
},{
    "code" : 330421,
    "name" : "嘉善县",
    "parentId" : 330400
},{
    "code" : 330424,
    "name" : "海盐县",
    "parentId" : 330400
},{
    "code" : 330481,
    "name" : "海宁市",
    "parentId" : 330400
},{
    "code" : 330482,
    "name" : "平湖市",
    "parentId" : 330400
},{
    "code" : 330483,
    "name" : "桐乡市",
    "parentId" : 330400
},{
    "code" : 330502,
    "name" : "吴兴区",
    "parentId" : 330500
},{
    "code" : 330503,
    "name" : "南浔区",
    "parentId" : 330500
},{
    "code" : 330521,
    "name" : "德清县",
    "parentId" : 330500
},{
    "code" : 330522,
    "name" : "长兴县",
    "parentId" : 330500
},{
    "code" : 330523,
    "name" : "安吉县",
    "parentId" : 330500
},{
    "code" : 330602,
    "name" : "越城区",
    "parentId" : 330600
},{
    "code" : 330603,
    "name" : "柯桥区",
    "parentId" : 330600
},{
    "code" : 330604,
    "name" : "上虞区",
    "parentId" : 330600
},{
    "code" : 330624,
    "name" : "新昌县",
    "parentId" : 330600
},{
    "code" : 330681,
    "name" : "诸暨市",
    "parentId" : 330600
},{
    "code" : 330683,
    "name" : "嵊州市",
    "parentId" : 330600
},{
    "code" : 330702,
    "name" : "婺城区",
    "parentId" : 330700
},{
    "code" : 330703,
    "name" : "金东区",
    "parentId" : 330700
},{
    "code" : 330723,
    "name" : "武义县",
    "parentId" : 330700
},{
    "code" : 330726,
    "name" : "浦江县",
    "parentId" : 330700
},{
    "code" : 330727,
    "name" : "磐安县",
    "parentId" : 330700
},{
    "code" : 330781,
    "name" : "兰溪市",
    "parentId" : 330700
},{
    "code" : 330782,
    "name" : "义乌市",
    "parentId" : 330700
},{
    "code" : 330783,
    "name" : "东阳市",
    "parentId" : 330700
},{
    "code" : 330784,
    "name" : "永康市",
    "parentId" : 330700
},{
    "code" : 330802,
    "name" : "柯城区",
    "parentId" : 330800
},{
    "code" : 330803,
    "name" : "衢江区",
    "parentId" : 330800
},{
    "code" : 330822,
    "name" : "常山县",
    "parentId" : 330800
},{
    "code" : 330824,
    "name" : "开化县",
    "parentId" : 330800
},{
    "code" : 330825,
    "name" : "龙游县",
    "parentId" : 330800
},{
    "code" : 330881,
    "name" : "江山市",
    "parentId" : 330800
},{
    "code" : 330902,
    "name" : "定海区",
    "parentId" : 330900
},{
    "code" : 330903,
    "name" : "普陀区",
    "parentId" : 330900
},{
    "code" : 330921,
    "name" : "岱山县",
    "parentId" : 330900
},{
    "code" : 330922,
    "name" : "嵊泗县",
    "parentId" : 330900
},{
    "code" : 331002,
    "name" : "椒江区",
    "parentId" : 331000
},{
    "code" : 331003,
    "name" : "黄岩区",
    "parentId" : 331000
},{
    "code" : 331004,
    "name" : "路桥区",
    "parentId" : 331000
},{
    "code" : 331021,
    "name" : "玉环县",
    "parentId" : 331000
},{
    "code" : 331022,
    "name" : "三门县",
    "parentId" : 331000
},{
    "code" : 331023,
    "name" : "天台县",
    "parentId" : 331000
},{
    "code" : 331024,
    "name" : "仙居县",
    "parentId" : 331000
},{
    "code" : 331081,
    "name" : "温岭市",
    "parentId" : 331000
},{
    "code" : 331082,
    "name" : "临海市",
    "parentId" : 331000
},{
    "code" : 331102,
    "name" : "莲都区",
    "parentId" : 331100
},{
    "code" : 331121,
    "name" : "青田县",
    "parentId" : 331100
},{
    "code" : 331122,
    "name" : "缙云县",
    "parentId" : 331100
},{
    "code" : 331123,
    "name" : "遂昌县",
    "parentId" : 331100
},{
    "code" : 331124,
    "name" : "松阳县",
    "parentId" : 331100
},{
    "code" : 331125,
    "name" : "云和县",
    "parentId" : 331100
},{
    "code" : 331126,
    "name" : "庆元县",
    "parentId" : 331100
},{
    "code" : 331127,
    "name" : "景宁畲族自治县",
    "parentId" : 331100
},{
    "code" : 331181,
    "name" : "龙泉市",
    "parentId" : 331100
},{
    "code" : 340102,
    "name" : "瑶海区",
    "parentId" : 340100
},{
    "code" : 340103,
    "name" : "庐阳区",
    "parentId" : 340100
},{
    "code" : 340104,
    "name" : "蜀山区",
    "parentId" : 340100
},{
    "code" : 340111,
    "name" : "包河区",
    "parentId" : 340100
},{
    "code" : 340121,
    "name" : "长丰县",
    "parentId" : 340100
},{
    "code" : 340122,
    "name" : "肥东县",
    "parentId" : 340100
},{
    "code" : 340123,
    "name" : "肥西县",
    "parentId" : 340100
},{
    "code" : 340124,
    "name" : "庐江县",
    "parentId" : 340100
},{
    "code" : 340181,
    "name" : "巢湖市",
    "parentId" : 340100
},{
    "code" : 340202,
    "name" : "镜湖区",
    "parentId" : 340200
},{
    "code" : 340203,
    "name" : "弋江区",
    "parentId" : 340200
},{
    "code" : 340207,
    "name" : "鸠江区",
    "parentId" : 340200
},{
    "code" : 340208,
    "name" : "三山区",
    "parentId" : 340200
},{
    "code" : 340221,
    "name" : "芜湖县",
    "parentId" : 340200
},{
    "code" : 340222,
    "name" : "繁昌县",
    "parentId" : 340200
},{
    "code" : 340223,
    "name" : "南陵县",
    "parentId" : 340200
},{
    "code" : 340225,
    "name" : "无为县",
    "parentId" : 340200
},{
    "code" : 340302,
    "name" : "龙子湖区",
    "parentId" : 340300
},{
    "code" : 340303,
    "name" : "蚌山区",
    "parentId" : 340300
},{
    "code" : 340304,
    "name" : "禹会区",
    "parentId" : 340300
},{
    "code" : 340311,
    "name" : "淮上区",
    "parentId" : 340300
},{
    "code" : 340321,
    "name" : "怀远县",
    "parentId" : 340300
},{
    "code" : 340322,
    "name" : "五河县",
    "parentId" : 340300
},{
    "code" : 340323,
    "name" : "固镇县",
    "parentId" : 340300
},{
    "code" : 340402,
    "name" : "大通区",
    "parentId" : 340400
},{
    "code" : 340403,
    "name" : "田家庵区",
    "parentId" : 340400
},{
    "code" : 340404,
    "name" : "谢家集区",
    "parentId" : 340400
},{
    "code" : 340405,
    "name" : "八公山区",
    "parentId" : 340400
},{
    "code" : 340406,
    "name" : "潘集区",
    "parentId" : 340400
},{
    "code" : 340421,
    "name" : "凤台县",
    "parentId" : 340400
},{
    "code" : 340503,
    "name" : "花山区",
    "parentId" : 340500
},{
    "code" : 340504,
    "name" : "雨山区",
    "parentId" : 340500
},{
    "code" : 340506,
    "name" : "博望区",
    "parentId" : 340500
},{
    "code" : 340521,
    "name" : "当涂县",
    "parentId" : 340500
},{
    "code" : 340522,
    "name" : "含山县",
    "parentId" : 340500
},{
    "code" : 340523,
    "name" : "和县",
    "parentId" : 340500
},{
    "code" : 340602,
    "name" : "杜集区",
    "parentId" : 340600
},{
    "code" : 340603,
    "name" : "相山区",
    "parentId" : 340600
},{
    "code" : 340604,
    "name" : "烈山区",
    "parentId" : 340600
},{
    "code" : 340621,
    "name" : "濉溪县",
    "parentId" : 340600
},{
    "code" : 340702,
    "name" : "铜官山区",
    "parentId" : 340700
},{
    "code" : 340703,
    "name" : "狮子山区",
    "parentId" : 340700
},{
    "code" : 340711,
    "name" : "郊区",
    "parentId" : 340700
},{
    "code" : 340721,
    "name" : "铜陵县",
    "parentId" : 340700
},{
    "code" : 340802,
    "name" : "迎江区",
    "parentId" : 340800
},{
    "code" : 340803,
    "name" : "大观区",
    "parentId" : 340800
},{
    "code" : 340811,
    "name" : "宜秀区",
    "parentId" : 340800
},{
    "code" : 340822,
    "name" : "怀宁县",
    "parentId" : 340800
},{
    "code" : 340823,
    "name" : "枞阳县",
    "parentId" : 340800
},{
    "code" : 340824,
    "name" : "潜山县",
    "parentId" : 340800
},{
    "code" : 340825,
    "name" : "太湖县",
    "parentId" : 340800
},{
    "code" : 340826,
    "name" : "宿松县",
    "parentId" : 340800
},{
    "code" : 340827,
    "name" : "望江县",
    "parentId" : 340800
},{
    "code" : 340828,
    "name" : "岳西县",
    "parentId" : 340800
},{
    "code" : 340881,
    "name" : "桐城市",
    "parentId" : 340800
},{
    "code" : 341002,
    "name" : "屯溪区",
    "parentId" : 341000
},{
    "code" : 341003,
    "name" : "黄山区",
    "parentId" : 341000
},{
    "code" : 341004,
    "name" : "徽州区",
    "parentId" : 341000
},{
    "code" : 341021,
    "name" : "歙县",
    "parentId" : 341000
},{
    "code" : 341022,
    "name" : "休宁县",
    "parentId" : 341000
},{
    "code" : 341023,
    "name" : "黟县",
    "parentId" : 341000
},{
    "code" : 341024,
    "name" : "祁门县",
    "parentId" : 341000
},{
    "code" : 341102,
    "name" : "琅琊区",
    "parentId" : 341100
},{
    "code" : 341103,
    "name" : "南谯区",
    "parentId" : 341100
},{
    "code" : 341122,
    "name" : "来安县",
    "parentId" : 341100
},{
    "code" : 341124,
    "name" : "全椒县",
    "parentId" : 341100
},{
    "code" : 341125,
    "name" : "定远县",
    "parentId" : 341100
},{
    "code" : 341126,
    "name" : "凤阳县",
    "parentId" : 341100
},{
    "code" : 341181,
    "name" : "天长市",
    "parentId" : 341100
},{
    "code" : 341182,
    "name" : "明光市",
    "parentId" : 341100
},{
    "code" : 341202,
    "name" : "颍州区",
    "parentId" : 341200
},{
    "code" : 341203,
    "name" : "颍东区",
    "parentId" : 341200
},{
    "code" : 341204,
    "name" : "颍泉区",
    "parentId" : 341200
},{
    "code" : 341221,
    "name" : "临泉县",
    "parentId" : 341200
},{
    "code" : 341222,
    "name" : "太和县",
    "parentId" : 341200
},{
    "code" : 341225,
    "name" : "阜南县",
    "parentId" : 341200
},{
    "code" : 341226,
    "name" : "颍上县",
    "parentId" : 341200
},{
    "code" : 341282,
    "name" : "界首市",
    "parentId" : 341200
},{
    "code" : 341302,
    "name" : "埇桥区",
    "parentId" : 341300
},{
    "code" : 341321,
    "name" : "砀山县",
    "parentId" : 341300
},{
    "code" : 341322,
    "name" : "萧县",
    "parentId" : 341300
},{
    "code" : 341323,
    "name" : "灵璧县",
    "parentId" : 341300
},{
    "code" : 341324,
    "name" : "泗县",
    "parentId" : 341300
},{
    "code" : 341502,
    "name" : "金安区",
    "parentId" : 341500
},{
    "code" : 341503,
    "name" : "裕安区",
    "parentId" : 341500
},{
    "code" : 341521,
    "name" : "寿县",
    "parentId" : 341500
},{
    "code" : 341522,
    "name" : "霍邱县",
    "parentId" : 341500
},{
    "code" : 341523,
    "name" : "舒城县",
    "parentId" : 341500
},{
    "code" : 341524,
    "name" : "金寨县",
    "parentId" : 341500
},{
    "code" : 341525,
    "name" : "霍山县",
    "parentId" : 341500
},{
    "code" : 341602,
    "name" : "谯城区",
    "parentId" : 341600
},{
    "code" : 341621,
    "name" : "涡阳县",
    "parentId" : 341600
},{
    "code" : 341622,
    "name" : "蒙城县",
    "parentId" : 341600
},{
    "code" : 341623,
    "name" : "利辛县",
    "parentId" : 341600
},{
    "code" : 341702,
    "name" : "贵池区",
    "parentId" : 341700
},{
    "code" : 341721,
    "name" : "东至县",
    "parentId" : 341700
},{
    "code" : 341722,
    "name" : "石台县",
    "parentId" : 341700
},{
    "code" : 341723,
    "name" : "青阳县",
    "parentId" : 341700
},{
    "code" : 341802,
    "name" : "宣州区",
    "parentId" : 341800
},{
    "code" : 341821,
    "name" : "郎溪县",
    "parentId" : 341800
},{
    "code" : 341822,
    "name" : "广德县",
    "parentId" : 341800
},{
    "code" : 341823,
    "name" : "泾县",
    "parentId" : 341800
},{
    "code" : 341824,
    "name" : "绩溪县",
    "parentId" : 341800
},{
    "code" : 341825,
    "name" : "旌德县",
    "parentId" : 341800
},{
    "code" : 341881,
    "name" : "宁国市",
    "parentId" : 341800
},{
    "code" : 350102,
    "name" : "鼓楼区",
    "parentId" : 350100
},{
    "code" : 350103,
    "name" : "台江区",
    "parentId" : 350100
},{
    "code" : 350104,
    "name" : "仓山区",
    "parentId" : 350100
},{
    "code" : 350105,
    "name" : "马尾区",
    "parentId" : 350100
},{
    "code" : 350111,
    "name" : "晋安区",
    "parentId" : 350100
},{
    "code" : 350121,
    "name" : "闽侯县",
    "parentId" : 350100
},{
    "code" : 350122,
    "name" : "连江县",
    "parentId" : 350100
},{
    "code" : 350123,
    "name" : "罗源县",
    "parentId" : 350100
},{
    "code" : 350124,
    "name" : "闽清县",
    "parentId" : 350100
},{
    "code" : 350125,
    "name" : "永泰县",
    "parentId" : 350100
},{
    "code" : 350128,
    "name" : "平潭县",
    "parentId" : 350100
},{
    "code" : 350181,
    "name" : "福清市",
    "parentId" : 350100
},{
    "code" : 350182,
    "name" : "长乐市",
    "parentId" : 350100
},{
    "code" : 350203,
    "name" : "思明区",
    "parentId" : 350200
},{
    "code" : 350205,
    "name" : "海沧区",
    "parentId" : 350200
},{
    "code" : 350206,
    "name" : "湖里区",
    "parentId" : 350200
},{
    "code" : 350211,
    "name" : "集美区",
    "parentId" : 350200
},{
    "code" : 350212,
    "name" : "同安区",
    "parentId" : 350200
},{
    "code" : 350213,
    "name" : "翔安区",
    "parentId" : 350200
},{
    "code" : 350302,
    "name" : "城厢区",
    "parentId" : 350300
},{
    "code" : 350303,
    "name" : "涵江区",
    "parentId" : 350300
},{
    "code" : 350304,
    "name" : "荔城区",
    "parentId" : 350300
},{
    "code" : 350305,
    "name" : "秀屿区",
    "parentId" : 350300
},{
    "code" : 350322,
    "name" : "仙游县",
    "parentId" : 350300
},{
    "code" : 350402,
    "name" : "梅列区",
    "parentId" : 350400
},{
    "code" : 350403,
    "name" : "三元区",
    "parentId" : 350400
},{
    "code" : 350421,
    "name" : "明溪县",
    "parentId" : 350400
},{
    "code" : 350423,
    "name" : "清流县",
    "parentId" : 350400
},{
    "code" : 350424,
    "name" : "宁化县",
    "parentId" : 350400
},{
    "code" : 350425,
    "name" : "大田县",
    "parentId" : 350400
},{
    "code" : 350426,
    "name" : "尤溪县",
    "parentId" : 350400
},{
    "code" : 350427,
    "name" : "沙县",
    "parentId" : 350400
},{
    "code" : 350428,
    "name" : "将乐县",
    "parentId" : 350400
},{
    "code" : 350429,
    "name" : "泰宁县",
    "parentId" : 350400
},{
    "code" : 350430,
    "name" : "建宁县",
    "parentId" : 350400
},{
    "code" : 350481,
    "name" : "永安市",
    "parentId" : 350400
},{
    "code" : 350502,
    "name" : "鲤城区",
    "parentId" : 350500
},{
    "code" : 350503,
    "name" : "丰泽区",
    "parentId" : 350500
},{
    "code" : 350504,
    "name" : "洛江区",
    "parentId" : 350500
},{
    "code" : 350505,
    "name" : "泉港区",
    "parentId" : 350500
},{
    "code" : 350521,
    "name" : "惠安县",
    "parentId" : 350500
},{
    "code" : 350524,
    "name" : "安溪县",
    "parentId" : 350500
},{
    "code" : 350525,
    "name" : "永春县",
    "parentId" : 350500
},{
    "code" : 350526,
    "name" : "德化县",
    "parentId" : 350500
},{
    "code" : 350527,
    "name" : "金门县",
    "parentId" : 350500
},{
    "code" : 350581,
    "name" : "石狮市",
    "parentId" : 350500
},{
    "code" : 350582,
    "name" : "晋江市",
    "parentId" : 350500
},{
    "code" : 350583,
    "name" : "南安市",
    "parentId" : 350500
},{
    "code" : 350602,
    "name" : "芗城区",
    "parentId" : 350600
},{
    "code" : 350603,
    "name" : "龙文区",
    "parentId" : 350600
},{
    "code" : 350622,
    "name" : "云霄县",
    "parentId" : 350600
},{
    "code" : 350623,
    "name" : "漳浦县",
    "parentId" : 350600
},{
    "code" : 350624,
    "name" : "诏安县",
    "parentId" : 350600
},{
    "code" : 350625,
    "name" : "长泰县",
    "parentId" : 350600
},{
    "code" : 350626,
    "name" : "东山县",
    "parentId" : 350600
},{
    "code" : 350627,
    "name" : "南靖县",
    "parentId" : 350600
},{
    "code" : 350628,
    "name" : "平和县",
    "parentId" : 350600
},{
    "code" : 350629,
    "name" : "华安县",
    "parentId" : 350600
},{
    "code" : 350681,
    "name" : "龙海市",
    "parentId" : 350600
},{
    "code" : 350702,
    "name" : "延平区",
    "parentId" : 350700
},{
    "code" : 350721,
    "name" : "顺昌县",
    "parentId" : 350700
},{
    "code" : 350722,
    "name" : "浦城县",
    "parentId" : 350700
},{
    "code" : 350723,
    "name" : "光泽县",
    "parentId" : 350700
},{
    "code" : 350724,
    "name" : "松溪县",
    "parentId" : 350700
},{
    "code" : 350725,
    "name" : "政和县",
    "parentId" : 350700
},{
    "code" : 350781,
    "name" : "邵武市",
    "parentId" : 350700
},{
    "code" : 350782,
    "name" : "武夷山市",
    "parentId" : 350700
},{
    "code" : 350783,
    "name" : "建瓯市",
    "parentId" : 350700
},{
    "code" : 350784,
    "name" : "建阳区",
    "parentId" : 350700
},{
    "code" : 350802,
    "name" : "新罗区",
    "parentId" : 350800
},{
    "code" : 350821,
    "name" : "长汀县",
    "parentId" : 350800
},{
    "code" : 350822,
    "name" : "永定县",
    "parentId" : 350800
},{
    "code" : 350823,
    "name" : "上杭县",
    "parentId" : 350800
},{
    "code" : 350824,
    "name" : "武平县",
    "parentId" : 350800
},{
    "code" : 350825,
    "name" : "连城县",
    "parentId" : 350800
},{
    "code" : 350881,
    "name" : "漳平市",
    "parentId" : 350800
},{
    "code" : 350902,
    "name" : "蕉城区",
    "parentId" : 350900
},{
    "code" : 350921,
    "name" : "霞浦县",
    "parentId" : 350900
},{
    "code" : 350922,
    "name" : "古田县",
    "parentId" : 350900
},{
    "code" : 350923,
    "name" : "屏南县",
    "parentId" : 350900
},{
    "code" : 350924,
    "name" : "寿宁县",
    "parentId" : 350900
},{
    "code" : 350925,
    "name" : "周宁县",
    "parentId" : 350900
},{
    "code" : 350926,
    "name" : "柘荣县",
    "parentId" : 350900
},{
    "code" : 350981,
    "name" : "福安市",
    "parentId" : 350900
},{
    "code" : 350982,
    "name" : "福鼎市",
    "parentId" : 350900
},{
    "code" : 360102,
    "name" : "东湖区",
    "parentId" : 360100
},{
    "code" : 360103,
    "name" : "西湖区",
    "parentId" : 360100
},{
    "code" : 360104,
    "name" : "青云谱区",
    "parentId" : 360100
},{
    "code" : 360105,
    "name" : "湾里区",
    "parentId" : 360100
},{
    "code" : 360111,
    "name" : "青山湖区",
    "parentId" : 360100
},{
    "code" : 360121,
    "name" : "南昌县",
    "parentId" : 360100
},{
    "code" : 360122,
    "name" : "新建县",
    "parentId" : 360100
},{
    "code" : 360123,
    "name" : "安义县",
    "parentId" : 360100
},{
    "code" : 360124,
    "name" : "进贤县",
    "parentId" : 360100
},{
    "code" : 360202,
    "name" : "昌江区",
    "parentId" : 360200
},{
    "code" : 360203,
    "name" : "珠山区",
    "parentId" : 360200
},{
    "code" : 360222,
    "name" : "浮梁县",
    "parentId" : 360200
},{
    "code" : 360281,
    "name" : "乐平市",
    "parentId" : 360200
},{
    "code" : 360302,
    "name" : "安源区",
    "parentId" : 360300
},{
    "code" : 360313,
    "name" : "湘东区",
    "parentId" : 360300
},{
    "code" : 360321,
    "name" : "莲花县",
    "parentId" : 360300
},{
    "code" : 360322,
    "name" : "上栗县",
    "parentId" : 360300
},{
    "code" : 360323,
    "name" : "芦溪县",
    "parentId" : 360300
},{
    "code" : 360402,
    "name" : "庐山区",
    "parentId" : 360400
},{
    "code" : 360403,
    "name" : "浔阳区",
    "parentId" : 360400
},{
    "code" : 360421,
    "name" : "九江县",
    "parentId" : 360400
},{
    "code" : 360423,
    "name" : "武宁县",
    "parentId" : 360400
},{
    "code" : 360424,
    "name" : "修水县",
    "parentId" : 360400
},{
    "code" : 360425,
    "name" : "永修县",
    "parentId" : 360400
},{
    "code" : 360426,
    "name" : "德安县",
    "parentId" : 360400
},{
    "code" : 360427,
    "name" : "星子县",
    "parentId" : 360400
},{
    "code" : 360428,
    "name" : "都昌县",
    "parentId" : 360400
},{
    "code" : 360429,
    "name" : "湖口县",
    "parentId" : 360400
},{
    "code" : 360430,
    "name" : "彭泽县",
    "parentId" : 360400
},{
    "code" : 360481,
    "name" : "瑞昌市",
    "parentId" : 360400
},{
    "code" : 360502,
    "name" : "渝水区",
    "parentId" : 360500
},{
    "code" : 360521,
    "name" : "分宜县",
    "parentId" : 360500
},{
    "code" : 360602,
    "name" : "月湖区",
    "parentId" : 360600
},{
    "code" : 360622,
    "name" : "余江县",
    "parentId" : 360600
},{
    "code" : 360681,
    "name" : "贵溪市",
    "parentId" : 360600
},{
    "code" : 360702,
    "name" : "章贡区",
    "parentId" : 360700
},{
    "code" : 360703,
    "name" : "南康区",
    "parentId" : 360700
},{
    "code" : 360721,
    "name" : "赣县",
    "parentId" : 360700
},{
    "code" : 360722,
    "name" : "信丰县",
    "parentId" : 360700
},{
    "code" : 360723,
    "name" : "大余县",
    "parentId" : 360700
},{
    "code" : 360724,
    "name" : "上犹县",
    "parentId" : 360700
},{
    "code" : 360725,
    "name" : "崇义县",
    "parentId" : 360700
},{
    "code" : 360726,
    "name" : "安远县",
    "parentId" : 360700
},{
    "code" : 360727,
    "name" : "龙南县",
    "parentId" : 360700
},{
    "code" : 360728,
    "name" : "定南县",
    "parentId" : 360700
},{
    "code" : 360729,
    "name" : "全南县",
    "parentId" : 360700
},{
    "code" : 360730,
    "name" : "宁都县",
    "parentId" : 360700
},{
    "code" : 360731,
    "name" : "于都县",
    "parentId" : 360700
},{
    "code" : 360732,
    "name" : "兴国县",
    "parentId" : 360700
},{
    "code" : 360733,
    "name" : "会昌县",
    "parentId" : 360700
},{
    "code" : 360734,
    "name" : "寻乌县",
    "parentId" : 360700
},{
    "code" : 360735,
    "name" : "石城县",
    "parentId" : 360700
},{
    "code" : 360781,
    "name" : "瑞金市",
    "parentId" : 360700
},{
    "code" : 360802,
    "name" : "吉州区",
    "parentId" : 360800
},{
    "code" : 360803,
    "name" : "青原区",
    "parentId" : 360800
},{
    "code" : 360821,
    "name" : "吉安县",
    "parentId" : 360800
},{
    "code" : 360822,
    "name" : "吉水县",
    "parentId" : 360800
},{
    "code" : 360823,
    "name" : "峡江县",
    "parentId" : 360800
},{
    "code" : 360824,
    "name" : "新干县",
    "parentId" : 360800
},{
    "code" : 360825,
    "name" : "永丰县",
    "parentId" : 360800
},{
    "code" : 360826,
    "name" : "泰和县",
    "parentId" : 360800
},{
    "code" : 360827,
    "name" : "遂川县",
    "parentId" : 360800
},{
    "code" : 360828,
    "name" : "万安县",
    "parentId" : 360800
},{
    "code" : 360829,
    "name" : "安福县",
    "parentId" : 360800
},{
    "code" : 360830,
    "name" : "永新县",
    "parentId" : 360800
},{
    "code" : 360881,
    "name" : "井冈山市",
    "parentId" : 360800
},{
    "code" : 360902,
    "name" : "袁州区",
    "parentId" : 360900
},{
    "code" : 360921,
    "name" : "奉新县",
    "parentId" : 360900
},{
    "code" : 360922,
    "name" : "万载县",
    "parentId" : 360900
},{
    "code" : 360923,
    "name" : "上高县",
    "parentId" : 360900
},{
    "code" : 360924,
    "name" : "宜丰县",
    "parentId" : 360900
},{
    "code" : 360925,
    "name" : "靖安县",
    "parentId" : 360900
},{
    "code" : 360926,
    "name" : "铜鼓县",
    "parentId" : 360900
},{
    "code" : 360981,
    "name" : "丰城市",
    "parentId" : 360900
},{
    "code" : 360982,
    "name" : "樟树市",
    "parentId" : 360900
},{
    "code" : 360983,
    "name" : "高安市",
    "parentId" : 360900
},{
    "code" : 361002,
    "name" : "临川区",
    "parentId" : 361000
},{
    "code" : 361021,
    "name" : "南城县",
    "parentId" : 361000
},{
    "code" : 361022,
    "name" : "黎川县",
    "parentId" : 361000
},{
    "code" : 361023,
    "name" : "南丰县",
    "parentId" : 361000
},{
    "code" : 361024,
    "name" : "崇仁县",
    "parentId" : 361000
},{
    "code" : 361025,
    "name" : "乐安县",
    "parentId" : 361000
},{
    "code" : 361026,
    "name" : "宜黄县",
    "parentId" : 361000
},{
    "code" : 361027,
    "name" : "金溪县",
    "parentId" : 361000
},{
    "code" : 361028,
    "name" : "资溪县",
    "parentId" : 361000
},{
    "code" : 361029,
    "name" : "东乡县",
    "parentId" : 361000
},{
    "code" : 361030,
    "name" : "广昌县",
    "parentId" : 361000
},{
    "code" : 361102,
    "name" : "信州区",
    "parentId" : 361100
},{
    "code" : 361121,
    "name" : "上饶县",
    "parentId" : 361100
},{
    "code" : 361122,
    "name" : "广丰县",
    "parentId" : 361100
},{
    "code" : 361123,
    "name" : "玉山县",
    "parentId" : 361100
},{
    "code" : 361124,
    "name" : "铅山县",
    "parentId" : 361100
},{
    "code" : 361125,
    "name" : "横峰县",
    "parentId" : 361100
},{
    "code" : 361126,
    "name" : "弋阳县",
    "parentId" : 361100
},{
    "code" : 361127,
    "name" : "余干县",
    "parentId" : 361100
},{
    "code" : 361128,
    "name" : "鄱阳县",
    "parentId" : 361100
},{
    "code" : 361129,
    "name" : "万年县",
    "parentId" : 361100
},{
    "code" : 361130,
    "name" : "婺源县",
    "parentId" : 361100
},{
    "code" : 361181,
    "name" : "德兴市",
    "parentId" : 361100
},{
    "code" : 370102,
    "name" : "历下区",
    "parentId" : 370100
},{
    "code" : 370103,
    "name" : "市中区",
    "parentId" : 370100
},{
    "code" : 370104,
    "name" : "槐荫区",
    "parentId" : 370100
},{
    "code" : 370105,
    "name" : "天桥区",
    "parentId" : 370100
},{
    "code" : 370112,
    "name" : "历城区",
    "parentId" : 370100
},{
    "code" : 370113,
    "name" : "长清区",
    "parentId" : 370100
},{
    "code" : 370124,
    "name" : "平阴县",
    "parentId" : 370100
},{
    "code" : 370125,
    "name" : "济阳县",
    "parentId" : 370100
},{
    "code" : 370126,
    "name" : "商河县",
    "parentId" : 370100
},{
    "code" : 370181,
    "name" : "章丘市",
    "parentId" : 370100
},{
    "code" : 370202,
    "name" : "市南区",
    "parentId" : 370200
},{
    "code" : 370203,
    "name" : "市北区",
    "parentId" : 370200
},{
    "code" : 370211,
    "name" : "黄岛区",
    "parentId" : 370200
},{
    "code" : 370212,
    "name" : "崂山区",
    "parentId" : 370200
},{
    "code" : 370213,
    "name" : "李沧区",
    "parentId" : 370200
},{
    "code" : 370214,
    "name" : "城阳区",
    "parentId" : 370200
},{
    "code" : 370281,
    "name" : "胶州市",
    "parentId" : 370200
},{
    "code" : 370282,
    "name" : "即墨市",
    "parentId" : 370200
},{
    "code" : 370283,
    "name" : "平度市",
    "parentId" : 370200
},{
    "code" : 370285,
    "name" : "莱西市",
    "parentId" : 370200
},{
    "code" : 370302,
    "name" : "淄川区",
    "parentId" : 370300
},{
    "code" : 370303,
    "name" : "张店区",
    "parentId" : 370300
},{
    "code" : 370304,
    "name" : "博山区",
    "parentId" : 370300
},{
    "code" : 370305,
    "name" : "临淄区",
    "parentId" : 370300
},{
    "code" : 370306,
    "name" : "周村区",
    "parentId" : 370300
},{
    "code" : 370321,
    "name" : "桓台县",
    "parentId" : 370300
},{
    "code" : 370322,
    "name" : "高青县",
    "parentId" : 370300
},{
    "code" : 370323,
    "name" : "沂源县",
    "parentId" : 370300
},{
    "code" : 370402,
    "name" : "市中区",
    "parentId" : 370400
},{
    "code" : 370403,
    "name" : "薛城区",
    "parentId" : 370400
},{
    "code" : 370404,
    "name" : "峄城区",
    "parentId" : 370400
},{
    "code" : 370405,
    "name" : "台儿庄区",
    "parentId" : 370400
},{
    "code" : 370406,
    "name" : "山亭区",
    "parentId" : 370400
},{
    "code" : 370481,
    "name" : "滕州市",
    "parentId" : 370400
},{
    "code" : 370502,
    "name" : "东营区",
    "parentId" : 370500
},{
    "code" : 370503,
    "name" : "河口区",
    "parentId" : 370500
},{
    "code" : 370521,
    "name" : "垦利县",
    "parentId" : 370500
},{
    "code" : 370522,
    "name" : "利津县",
    "parentId" : 370500
},{
    "code" : 370523,
    "name" : "广饶县",
    "parentId" : 370500
},{
    "code" : 370602,
    "name" : "芝罘区",
    "parentId" : 370600
},{
    "code" : 370611,
    "name" : "福山区",
    "parentId" : 370600
},{
    "code" : 370612,
    "name" : "牟平区",
    "parentId" : 370600
},{
    "code" : 370613,
    "name" : "莱山区",
    "parentId" : 370600
},{
    "code" : 370634,
    "name" : "长岛县",
    "parentId" : 370600
},{
    "code" : 370681,
    "name" : "龙口市",
    "parentId" : 370600
},{
    "code" : 370682,
    "name" : "莱阳市",
    "parentId" : 370600
},{
    "code" : 370683,
    "name" : "莱州市",
    "parentId" : 370600
},{
    "code" : 370684,
    "name" : "蓬莱市",
    "parentId" : 370600
},{
    "code" : 370685,
    "name" : "招远市",
    "parentId" : 370600
},{
    "code" : 370686,
    "name" : "栖霞市",
    "parentId" : 370600
},{
    "code" : 370687,
    "name" : "海阳市",
    "parentId" : 370600
},{
    "code" : 370702,
    "name" : "潍城区",
    "parentId" : 370700
},{
    "code" : 370703,
    "name" : "寒亭区",
    "parentId" : 370700
},{
    "code" : 370704,
    "name" : "坊子区",
    "parentId" : 370700
},{
    "code" : 370705,
    "name" : "奎文区",
    "parentId" : 370700
},{
    "code" : 370724,
    "name" : "临朐县",
    "parentId" : 370700
},{
    "code" : 370725,
    "name" : "昌乐县",
    "parentId" : 370700
},{
    "code" : 370781,
    "name" : "青州市",
    "parentId" : 370700
},{
    "code" : 370782,
    "name" : "诸城市",
    "parentId" : 370700
},{
    "code" : 370783,
    "name" : "寿光市",
    "parentId" : 370700
},{
    "code" : 370784,
    "name" : "安丘市",
    "parentId" : 370700
},{
    "code" : 370785,
    "name" : "高密市",
    "parentId" : 370700
},{
    "code" : 370786,
    "name" : "昌邑市",
    "parentId" : 370700
},{
    "code" : 370811,
    "name" : "任城区",
    "parentId" : 370800
},{
    "code" : 370812,
    "name" : "兖州区",
    "parentId" : 370800
},{
    "code" : 370826,
    "name" : "微山县",
    "parentId" : 370800
},{
    "code" : 370827,
    "name" : "鱼台县",
    "parentId" : 370800
},{
    "code" : 370828,
    "name" : "金乡县",
    "parentId" : 370800
},{
    "code" : 370829,
    "name" : "嘉祥县",
    "parentId" : 370800
},{
    "code" : 370830,
    "name" : "汶上县",
    "parentId" : 370800
},{
    "code" : 370831,
    "name" : "泗水县",
    "parentId" : 370800
},{
    "code" : 370832,
    "name" : "梁山县",
    "parentId" : 370800
},{
    "code" : 370881,
    "name" : "曲阜市",
    "parentId" : 370800
},{
    "code" : 370883,
    "name" : "邹城市",
    "parentId" : 370800
},{
    "code" : 370902,
    "name" : "泰山区",
    "parentId" : 370900
},{
    "code" : 370911,
    "name" : "岱岳区",
    "parentId" : 370900
},{
    "code" : 370921,
    "name" : "宁阳县",
    "parentId" : 370900
},{
    "code" : 370923,
    "name" : "东平县",
    "parentId" : 370900
},{
    "code" : 370982,
    "name" : "新泰市",
    "parentId" : 370900
},{
    "code" : 370983,
    "name" : "肥城市",
    "parentId" : 370900
},{
    "code" : 371002,
    "name" : "环翠区",
    "parentId" : 371000
},{
    "code" : 371081,
    "name" : "文登区",
    "parentId" : 371000
},{
    "code" : 371082,
    "name" : "荣成市",
    "parentId" : 371000
},{
    "code" : 371083,
    "name" : "乳山市",
    "parentId" : 371000
},{
    "code" : 371102,
    "name" : "东港区",
    "parentId" : 371100
},{
    "code" : 371103,
    "name" : "岚山区",
    "parentId" : 371100
},{
    "code" : 371121,
    "name" : "五莲县",
    "parentId" : 371100
},{
    "code" : 371122,
    "name" : "莒县",
    "parentId" : 371100
},{
    "code" : 371202,
    "name" : "莱城区",
    "parentId" : 371200
},{
    "code" : 371203,
    "name" : "钢城区",
    "parentId" : 371200
},{
    "code" : 371302,
    "name" : "兰山区",
    "parentId" : 371300
},{
    "code" : 371311,
    "name" : "罗庄区",
    "parentId" : 371300
},{
    "code" : 371312,
    "name" : "河东区",
    "parentId" : 371300
},{
    "code" : 371321,
    "name" : "沂南县",
    "parentId" : 371300
},{
    "code" : 371322,
    "name" : "郯城县",
    "parentId" : 371300
},{
    "code" : 371323,
    "name" : "沂水县",
    "parentId" : 371300
},{
    "code" : 371324,
    "name" : "兰陵县",
    "parentId" : 371300
},{
    "code" : 371325,
    "name" : "费县",
    "parentId" : 371300
},{
    "code" : 371326,
    "name" : "平邑县",
    "parentId" : 371300
},{
    "code" : 371327,
    "name" : "莒南县",
    "parentId" : 371300
},{
    "code" : 371328,
    "name" : "蒙阴县",
    "parentId" : 371300
},{
    "code" : 371329,
    "name" : "临沭县",
    "parentId" : 371300
},{
    "code" : 371402,
    "name" : "德城区",
    "parentId" : 371400
},{
    "code" : 371421,
    "name" : "陵县",
    "parentId" : 371400
},{
    "code" : 371422,
    "name" : "宁津县",
    "parentId" : 371400
},{
    "code" : 371423,
    "name" : "庆云县",
    "parentId" : 371400
},{
    "code" : 371424,
    "name" : "临邑县",
    "parentId" : 371400
},{
    "code" : 371425,
    "name" : "齐河县",
    "parentId" : 371400
},{
    "code" : 371426,
    "name" : "平原县",
    "parentId" : 371400
},{
    "code" : 371427,
    "name" : "夏津县",
    "parentId" : 371400
},{
    "code" : 371428,
    "name" : "武城县",
    "parentId" : 371400
},{
    "code" : 371481,
    "name" : "乐陵市",
    "parentId" : 371400
},{
    "code" : 371482,
    "name" : "禹城市",
    "parentId" : 371400
},{
    "code" : 371502,
    "name" : "东昌府区",
    "parentId" : 371500
},{
    "code" : 371521,
    "name" : "阳谷县",
    "parentId" : 371500
},{
    "code" : 371522,
    "name" : "莘县",
    "parentId" : 371500
},{
    "code" : 371523,
    "name" : "茌平县",
    "parentId" : 371500
},{
    "code" : 371524,
    "name" : "东阿县",
    "parentId" : 371500
},{
    "code" : 371525,
    "name" : "冠县",
    "parentId" : 371500
},{
    "code" : 371526,
    "name" : "高唐县",
    "parentId" : 371500
},{
    "code" : 371581,
    "name" : "临清市",
    "parentId" : 371500
},{
    "code" : 371602,
    "name" : "滨城区",
    "parentId" : 371600
},{
    "code" : 371603,
    "name" : "沾化区",
    "parentId" : 371600
},{
    "code" : 371621,
    "name" : "惠民县",
    "parentId" : 371600
},{
    "code" : 371622,
    "name" : "阳信县",
    "parentId" : 371600
},{
    "code" : 371623,
    "name" : "无棣县",
    "parentId" : 371600
},{
    "code" : 371625,
    "name" : "博兴县",
    "parentId" : 371600
},{
    "code" : 371626,
    "name" : "邹平县",
    "parentId" : 371600
},{
    "code" : 371702,
    "name" : "牡丹区",
    "parentId" : 371700
},{
    "code" : 371721,
    "name" : "曹县",
    "parentId" : 371700
},{
    "code" : 371722,
    "name" : "单县",
    "parentId" : 371700
},{
    "code" : 371723,
    "name" : "成武县",
    "parentId" : 371700
},{
    "code" : 371724,
    "name" : "巨野县",
    "parentId" : 371700
},{
    "code" : 371725,
    "name" : "郓城县",
    "parentId" : 371700
},{
    "code" : 371726,
    "name" : "鄄城县",
    "parentId" : 371700
},{
    "code" : 371727,
    "name" : "定陶县",
    "parentId" : 371700
},{
    "code" : 371728,
    "name" : "东明县",
    "parentId" : 371700
},{
    "code" : 410102,
    "name" : "中原区",
    "parentId" : 410100
},{
    "code" : 410103,
    "name" : "二七区",
    "parentId" : 410100
},{
    "code" : 410104,
    "name" : "管城回族区",
    "parentId" : 410100
},{
    "code" : 410105,
    "name" : "金水区",
    "parentId" : 410100
},{
    "code" : 410106,
    "name" : "上街区",
    "parentId" : 410100
},{
    "code" : 410108,
    "name" : "惠济区",
    "parentId" : 410100
},{
    "code" : 410122,
    "name" : "中牟县",
    "parentId" : 410100
},{
    "code" : 410181,
    "name" : "巩义市",
    "parentId" : 410100
},{
    "code" : 410182,
    "name" : "荥阳市",
    "parentId" : 410100
},{
    "code" : 410183,
    "name" : "新密市",
    "parentId" : 410100
},{
    "code" : 410184,
    "name" : "新郑市",
    "parentId" : 410100
},{
    "code" : 410185,
    "name" : "登封市",
    "parentId" : 410100
},{
    "code" : 410202,
    "name" : "龙亭区",
    "parentId" : 410200
},{
    "code" : 410203,
    "name" : "顺河回族区",
    "parentId" : 410200
},{
    "code" : 410204,
    "name" : "鼓楼区",
    "parentId" : 410200
},{
    "code" : 410205,
    "name" : "禹王台区",
    "parentId" : 410200
},{
    "code" : 410212,
    "name" : "祥符区",
    "parentId" : 410200
},{
    "code" : 410221,
    "name" : "杞县",
    "parentId" : 410200
},{
    "code" : 410222,
    "name" : "通许县",
    "parentId" : 410200
},{
    "code" : 410223,
    "name" : "尉氏县",
    "parentId" : 410200
},{
    "code" : 410225,
    "name" : "兰考县",
    "parentId" : 410200
},{
    "code" : 410302,
    "name" : "老城区",
    "parentId" : 410300
},{
    "code" : 410303,
    "name" : "西工区",
    "parentId" : 410300
},{
    "code" : 410304,
    "name" : "瀍河回族区",
    "parentId" : 410300
},{
    "code" : 410305,
    "name" : "涧西区",
    "parentId" : 410300
},{
    "code" : 410306,
    "name" : "吉利区",
    "parentId" : 410300
},{
    "code" : 410311,
    "name" : "洛龙区",
    "parentId" : 410300
},{
    "code" : 410322,
    "name" : "孟津县",
    "parentId" : 410300
},{
    "code" : 410323,
    "name" : "新安县",
    "parentId" : 410300
},{
    "code" : 410324,
    "name" : "栾川县",
    "parentId" : 410300
},{
    "code" : 410325,
    "name" : "嵩县",
    "parentId" : 410300
},{
    "code" : 410326,
    "name" : "汝阳县",
    "parentId" : 410300
},{
    "code" : 410327,
    "name" : "宜阳县",
    "parentId" : 410300
},{
    "code" : 410328,
    "name" : "洛宁县",
    "parentId" : 410300
},{
    "code" : 410329,
    "name" : "伊川县",
    "parentId" : 410300
},{
    "code" : 410381,
    "name" : "偃师市",
    "parentId" : 410300
},{
    "code" : 410402,
    "name" : "新华区",
    "parentId" : 410400
},{
    "code" : 410403,
    "name" : "卫东区",
    "parentId" : 410400
},{
    "code" : 410404,
    "name" : "石龙区",
    "parentId" : 410400
},{
    "code" : 410411,
    "name" : "湛河区",
    "parentId" : 410400
},{
    "code" : 410421,
    "name" : "宝丰县",
    "parentId" : 410400
},{
    "code" : 410422,
    "name" : "叶县",
    "parentId" : 410400
},{
    "code" : 410423,
    "name" : "鲁山县",
    "parentId" : 410400
},{
    "code" : 410425,
    "name" : "郏县",
    "parentId" : 410400
},{
    "code" : 410481,
    "name" : "舞钢市",
    "parentId" : 410400
},{
    "code" : 410482,
    "name" : "汝州市",
    "parentId" : 410400
},{
    "code" : 410502,
    "name" : "文峰区",
    "parentId" : 410500
},{
    "code" : 410503,
    "name" : "北关区",
    "parentId" : 410500
},{
    "code" : 410505,
    "name" : "殷都区",
    "parentId" : 410500
},{
    "code" : 410506,
    "name" : "龙安区",
    "parentId" : 410500
},{
    "code" : 410522,
    "name" : "安阳县",
    "parentId" : 410500
},{
    "code" : 410523,
    "name" : "汤阴县",
    "parentId" : 410500
},{
    "code" : 410526,
    "name" : "滑县",
    "parentId" : 410500
},{
    "code" : 410527,
    "name" : "内黄县",
    "parentId" : 410500
},{
    "code" : 410581,
    "name" : "林州市",
    "parentId" : 410500
},{
    "code" : 410602,
    "name" : "鹤山区",
    "parentId" : 410600
},{
    "code" : 410603,
    "name" : "山城区",
    "parentId" : 410600
},{
    "code" : 410611,
    "name" : "淇滨区",
    "parentId" : 410600
},{
    "code" : 410621,
    "name" : "浚县",
    "parentId" : 410600
},{
    "code" : 410622,
    "name" : "淇县",
    "parentId" : 410600
},{
    "code" : 410702,
    "name" : "红旗区",
    "parentId" : 410700
},{
    "code" : 410703,
    "name" : "卫滨区",
    "parentId" : 410700
},{
    "code" : 410704,
    "name" : "凤泉区",
    "parentId" : 410700
},{
    "code" : 410711,
    "name" : "牧野区",
    "parentId" : 410700
},{
    "code" : 410721,
    "name" : "新乡县",
    "parentId" : 410700
},{
    "code" : 410724,
    "name" : "获嘉县",
    "parentId" : 410700
},{
    "code" : 410725,
    "name" : "原阳县",
    "parentId" : 410700
},{
    "code" : 410726,
    "name" : "延津县",
    "parentId" : 410700
},{
    "code" : 410727,
    "name" : "封丘县",
    "parentId" : 410700
},{
    "code" : 410728,
    "name" : "长垣县",
    "parentId" : 410700
},{
    "code" : 410781,
    "name" : "卫辉市",
    "parentId" : 410700
},{
    "code" : 410782,
    "name" : "辉县市",
    "parentId" : 410700
},{
    "code" : 410802,
    "name" : "解放区",
    "parentId" : 410800
},{
    "code" : 410803,
    "name" : "中站区",
    "parentId" : 410800
},{
    "code" : 410804,
    "name" : "马村区",
    "parentId" : 410800
},{
    "code" : 410811,
    "name" : "山阳区",
    "parentId" : 410800
},{
    "code" : 410821,
    "name" : "修武县",
    "parentId" : 410800
},{
    "code" : 410822,
    "name" : "博爱县",
    "parentId" : 410800
},{
    "code" : 410823,
    "name" : "武陟县",
    "parentId" : 410800
},{
    "code" : 410825,
    "name" : "温县",
    "parentId" : 410800
},{
    "code" : 410882,
    "name" : "沁阳市",
    "parentId" : 410800
},{
    "code" : 410883,
    "name" : "孟州市",
    "parentId" : 410800
},{
    "code" : 410902,
    "name" : "华龙区",
    "parentId" : 410900
},{
    "code" : 410922,
    "name" : "清丰县",
    "parentId" : 410900
},{
    "code" : 410923,
    "name" : "南乐县",
    "parentId" : 410900
},{
    "code" : 410926,
    "name" : "范县",
    "parentId" : 410900
},{
    "code" : 410927,
    "name" : "台前县",
    "parentId" : 410900
},{
    "code" : 410928,
    "name" : "濮阳县",
    "parentId" : 410900
},{
    "code" : 411002,
    "name" : "魏都区",
    "parentId" : 411000
},{
    "code" : 411023,
    "name" : "许昌县",
    "parentId" : 411000
},{
    "code" : 411024,
    "name" : "鄢陵县",
    "parentId" : 411000
},{
    "code" : 411025,
    "name" : "襄城县",
    "parentId" : 411000
},{
    "code" : 411081,
    "name" : "禹州市",
    "parentId" : 411000
},{
    "code" : 411082,
    "name" : "长葛市",
    "parentId" : 411000
},{
    "code" : 411102,
    "name" : "源汇区",
    "parentId" : 411100
},{
    "code" : 411103,
    "name" : "郾城区",
    "parentId" : 411100
},{
    "code" : 411104,
    "name" : "召陵区",
    "parentId" : 411100
},{
    "code" : 411121,
    "name" : "舞阳县",
    "parentId" : 411100
},{
    "code" : 411122,
    "name" : "临颍县",
    "parentId" : 411100
},{
    "code" : 411202,
    "name" : "湖滨区",
    "parentId" : 411200
},{
    "code" : 411221,
    "name" : "渑池县",
    "parentId" : 411200
},{
    "code" : 411222,
    "name" : "陕县",
    "parentId" : 411200
},{
    "code" : 411224,
    "name" : "卢氏县",
    "parentId" : 411200
},{
    "code" : 411281,
    "name" : "义马市",
    "parentId" : 411200
},{
    "code" : 411282,
    "name" : "灵宝市",
    "parentId" : 411200
},{
    "code" : 411302,
    "name" : "宛城区",
    "parentId" : 411300
},{
    "code" : 411303,
    "name" : "卧龙区",
    "parentId" : 411300
},{
    "code" : 411321,
    "name" : "南召县",
    "parentId" : 411300
},{
    "code" : 411322,
    "name" : "方城县",
    "parentId" : 411300
},{
    "code" : 411323,
    "name" : "西峡县",
    "parentId" : 411300
},{
    "code" : 411324,
    "name" : "镇平县",
    "parentId" : 411300
},{
    "code" : 411325,
    "name" : "内乡县",
    "parentId" : 411300
},{
    "code" : 411326,
    "name" : "淅川县",
    "parentId" : 411300
},{
    "code" : 411327,
    "name" : "社旗县",
    "parentId" : 411300
},{
    "code" : 411328,
    "name" : "唐河县",
    "parentId" : 411300
},{
    "code" : 411329,
    "name" : "新野县",
    "parentId" : 411300
},{
    "code" : 411330,
    "name" : "桐柏县",
    "parentId" : 411300
},{
    "code" : 411381,
    "name" : "邓州市",
    "parentId" : 411300
},{
    "code" : 411402,
    "name" : "梁园区",
    "parentId" : 411400
},{
    "code" : 411403,
    "name" : "睢阳区",
    "parentId" : 411400
},{
    "code" : 411421,
    "name" : "民权县",
    "parentId" : 411400
},{
    "code" : 411422,
    "name" : "睢县",
    "parentId" : 411400
},{
    "code" : 411423,
    "name" : "宁陵县",
    "parentId" : 411400
},{
    "code" : 411424,
    "name" : "柘城县",
    "parentId" : 411400
},{
    "code" : 411425,
    "name" : "虞城县",
    "parentId" : 411400
},{
    "code" : 411426,
    "name" : "夏邑县",
    "parentId" : 411400
},{
    "code" : 411481,
    "name" : "永城市",
    "parentId" : 411400
},{
    "code" : 411502,
    "name" : "浉河区",
    "parentId" : 411500
},{
    "code" : 411503,
    "name" : "平桥区",
    "parentId" : 411500
},{
    "code" : 411521,
    "name" : "罗山县",
    "parentId" : 411500
},{
    "code" : 411522,
    "name" : "光山县",
    "parentId" : 411500
},{
    "code" : 411523,
    "name" : "新县",
    "parentId" : 411500
},{
    "code" : 411524,
    "name" : "商城县",
    "parentId" : 411500
},{
    "code" : 411525,
    "name" : "固始县",
    "parentId" : 411500
},{
    "code" : 411526,
    "name" : "潢川县",
    "parentId" : 411500
},{
    "code" : 411527,
    "name" : "淮滨县",
    "parentId" : 411500
},{
    "code" : 411528,
    "name" : "息县",
    "parentId" : 411500
},{
    "code" : 411602,
    "name" : "川汇区",
    "parentId" : 411600
},{
    "code" : 411621,
    "name" : "扶沟县",
    "parentId" : 411600
},{
    "code" : 411622,
    "name" : "西华县",
    "parentId" : 411600
},{
    "code" : 411623,
    "name" : "商水县",
    "parentId" : 411600
},{
    "code" : 411624,
    "name" : "沈丘县",
    "parentId" : 411600
},{
    "code" : 411625,
    "name" : "郸城县",
    "parentId" : 411600
},{
    "code" : 411626,
    "name" : "淮阳县",
    "parentId" : 411600
},{
    "code" : 411627,
    "name" : "太康县",
    "parentId" : 411600
},{
    "code" : 411628,
    "name" : "鹿邑县",
    "parentId" : 411600
},{
    "code" : 411681,
    "name" : "项城市",
    "parentId" : 411600
},{
    "code" : 411702,
    "name" : "驿城区",
    "parentId" : 411700
},{
    "code" : 411721,
    "name" : "西平县",
    "parentId" : 411700
},{
    "code" : 411722,
    "name" : "上蔡县",
    "parentId" : 411700
},{
    "code" : 411723,
    "name" : "平舆县",
    "parentId" : 411700
},{
    "code" : 411724,
    "name" : "正阳县",
    "parentId" : 411700
},{
    "code" : 411725,
    "name" : "确山县",
    "parentId" : 411700
},{
    "code" : 411726,
    "name" : "泌阳县",
    "parentId" : 411700
},{
    "code" : 411727,
    "name" : "汝南县",
    "parentId" : 411700
},{
    "code" : 411728,
    "name" : "遂平县",
    "parentId" : 411700
},{
    "code" : 411729,
    "name" : "新蔡县",
    "parentId" : 411700
},{
    "code" : 420102,
    "name" : "江岸区",
    "parentId" : 420100
},{
    "code" : 420103,
    "name" : "江汉区",
    "parentId" : 420100
},{
    "code" : 420104,
    "name" : "硚口区",
    "parentId" : 420100
},{
    "code" : 420105,
    "name" : "汉阳区",
    "parentId" : 420100
},{
    "code" : 420106,
    "name" : "武昌区",
    "parentId" : 420100
},{
    "code" : 420107,
    "name" : "青山区",
    "parentId" : 420100
},{
    "code" : 420111,
    "name" : "洪山区",
    "parentId" : 420100
},{
    "code" : 420112,
    "name" : "东西湖区",
    "parentId" : 420100
},{
    "code" : 420113,
    "name" : "汉南区",
    "parentId" : 420100
},{
    "code" : 420114,
    "name" : "蔡甸区",
    "parentId" : 420100
},{
    "code" : 420115,
    "name" : "江夏区",
    "parentId" : 420100
},{
    "code" : 420116,
    "name" : "黄陂区",
    "parentId" : 420100
},{
    "code" : 420117,
    "name" : "新洲区",
    "parentId" : 420100
},{
    "code" : 420202,
    "name" : "黄石港区",
    "parentId" : 420200
},{
    "code" : 420203,
    "name" : "西塞山区",
    "parentId" : 420200
},{
    "code" : 420204,
    "name" : "下陆区",
    "parentId" : 420200
},{
    "code" : 420205,
    "name" : "铁山区",
    "parentId" : 420200
},{
    "code" : 420222,
    "name" : "阳新县",
    "parentId" : 420200
},{
    "code" : 420281,
    "name" : "大冶市",
    "parentId" : 420200
},{
    "code" : 420302,
    "name" : "茅箭区",
    "parentId" : 420300
},{
    "code" : 420303,
    "name" : "张湾区",
    "parentId" : 420300
},{
    "code" : 420304,
    "name" : "郧阳区",
    "parentId" : 420300
},{
    "code" : 420322,
    "name" : "郧西县",
    "parentId" : 420300
},{
    "code" : 420323,
    "name" : "竹山县",
    "parentId" : 420300
},{
    "code" : 420324,
    "name" : "竹溪县",
    "parentId" : 420300
},{
    "code" : 420325,
    "name" : "房县",
    "parentId" : 420300
},{
    "code" : 420381,
    "name" : "丹江口市",
    "parentId" : 420300
},{
    "code" : 420502,
    "name" : "西陵区",
    "parentId" : 420500
},{
    "code" : 420503,
    "name" : "伍家岗区",
    "parentId" : 420500
},{
    "code" : 420504,
    "name" : "点军区",
    "parentId" : 420500
},{
    "code" : 420505,
    "name" : "猇亭区",
    "parentId" : 420500
},{
    "code" : 420506,
    "name" : "夷陵区",
    "parentId" : 420500
},{
    "code" : 420525,
    "name" : "远安县",
    "parentId" : 420500
},{
    "code" : 420526,
    "name" : "兴山县",
    "parentId" : 420500
},{
    "code" : 420527,
    "name" : "秭归县",
    "parentId" : 420500
},{
    "code" : 420528,
    "name" : "长阳土家族自治县",
    "parentId" : 420500
},{
    "code" : 420529,
    "name" : "五峰土家族自治县",
    "parentId" : 420500
},{
    "code" : 420581,
    "name" : "宜都市",
    "parentId" : 420500
},{
    "code" : 420582,
    "name" : "当阳市",
    "parentId" : 420500
},{
    "code" : 420583,
    "name" : "枝江市",
    "parentId" : 420500
},{
    "code" : 420602,
    "name" : "襄城区",
    "parentId" : 420600
},{
    "code" : 420606,
    "name" : "樊城区",
    "parentId" : 420600
},{
    "code" : 420607,
    "name" : "襄州区",
    "parentId" : 420600
},{
    "code" : 420624,
    "name" : "南漳县",
    "parentId" : 420600
},{
    "code" : 420625,
    "name" : "谷城县",
    "parentId" : 420600
},{
    "code" : 420626,
    "name" : "保康县",
    "parentId" : 420600
},{
    "code" : 420682,
    "name" : "老河口市",
    "parentId" : 420600
},{
    "code" : 420683,
    "name" : "枣阳市",
    "parentId" : 420600
},{
    "code" : 420684,
    "name" : "宜城市",
    "parentId" : 420600
},{
    "code" : 420702,
    "name" : "梁子湖区",
    "parentId" : 420700
},{
    "code" : 420703,
    "name" : "华容区",
    "parentId" : 420700
},{
    "code" : 420704,
    "name" : "鄂城区",
    "parentId" : 420700
},{
    "code" : 420802,
    "name" : "东宝区",
    "parentId" : 420800
},{
    "code" : 420804,
    "name" : "掇刀区",
    "parentId" : 420800
},{
    "code" : 420821,
    "name" : "京山县",
    "parentId" : 420800
},{
    "code" : 420822,
    "name" : "沙洋县",
    "parentId" : 420800
},{
    "code" : 420881,
    "name" : "钟祥市",
    "parentId" : 420800
},{
    "code" : 420902,
    "name" : "孝南区",
    "parentId" : 420900
},{
    "code" : 420921,
    "name" : "孝昌县",
    "parentId" : 420900
},{
    "code" : 420922,
    "name" : "大悟县",
    "parentId" : 420900
},{
    "code" : 420923,
    "name" : "云梦县",
    "parentId" : 420900
},{
    "code" : 420981,
    "name" : "应城市",
    "parentId" : 420900
},{
    "code" : 420982,
    "name" : "安陆市",
    "parentId" : 420900
},{
    "code" : 420984,
    "name" : "汉川市",
    "parentId" : 420900
},{
    "code" : 421002,
    "name" : "沙市区",
    "parentId" : 421000
},{
    "code" : 421003,
    "name" : "荆州区",
    "parentId" : 421000
},{
    "code" : 421022,
    "name" : "公安县",
    "parentId" : 421000
},{
    "code" : 421023,
    "name" : "监利县",
    "parentId" : 421000
},{
    "code" : 421024,
    "name" : "江陵县",
    "parentId" : 421000
},{
    "code" : 421081,
    "name" : "石首市",
    "parentId" : 421000
},{
    "code" : 421083,
    "name" : "洪湖市",
    "parentId" : 421000
},{
    "code" : 421087,
    "name" : "松滋市",
    "parentId" : 421000
},{
    "code" : 421102,
    "name" : "黄州区",
    "parentId" : 421100
},{
    "code" : 421121,
    "name" : "团风县",
    "parentId" : 421100
},{
    "code" : 421122,
    "name" : "红安县",
    "parentId" : 421100
},{
    "code" : 421123,
    "name" : "罗田县",
    "parentId" : 421100
},{
    "code" : 421124,
    "name" : "英山县",
    "parentId" : 421100
},{
    "code" : 421125,
    "name" : "浠水县",
    "parentId" : 421100
},{
    "code" : 421126,
    "name" : "蕲春县",
    "parentId" : 421100
},{
    "code" : 421127,
    "name" : "黄梅县",
    "parentId" : 421100
},{
    "code" : 421181,
    "name" : "麻城市",
    "parentId" : 421100
},{
    "code" : 421182,
    "name" : "武穴市",
    "parentId" : 421100
},{
    "code" : 421202,
    "name" : "咸安区",
    "parentId" : 421200
},{
    "code" : 421221,
    "name" : "嘉鱼县",
    "parentId" : 421200
},{
    "code" : 421222,
    "name" : "通城县",
    "parentId" : 421200
},{
    "code" : 421223,
    "name" : "崇阳县",
    "parentId" : 421200
},{
    "code" : 421224,
    "name" : "通山县",
    "parentId" : 421200
},{
    "code" : 421281,
    "name" : "赤壁市",
    "parentId" : 421200
},{
    "code" : 421303,
    "name" : "曾都区",
    "parentId" : 421300
},{
    "code" : 421321,
    "name" : "随县",
    "parentId" : 421300
},{
    "code" : 421381,
    "name" : "广水市",
    "parentId" : 421300
},{
    "code" : 422801,
    "name" : "恩施市",
    "parentId" : 422800
},{
    "code" : 422802,
    "name" : "利川市",
    "parentId" : 422800
},{
    "code" : 422822,
    "name" : "建始县",
    "parentId" : 422800
},{
    "code" : 422823,
    "name" : "巴东县",
    "parentId" : 422800
},{
    "code" : 422825,
    "name" : "宣恩县",
    "parentId" : 422800
},{
    "code" : 422826,
    "name" : "咸丰县",
    "parentId" : 422800
},{
    "code" : 422827,
    "name" : "来凤县",
    "parentId" : 422800
},{
    "code" : 422828,
    "name" : "鹤峰县",
    "parentId" : 422800
},{
    "code" : 430102,
    "name" : "芙蓉区",
    "parentId" : 430100
},{
    "code" : 430103,
    "name" : "天心区",
    "parentId" : 430100
},{
    "code" : 430104,
    "name" : "岳麓区",
    "parentId" : 430100
},{
    "code" : 430105,
    "name" : "开福区",
    "parentId" : 430100
},{
    "code" : 430111,
    "name" : "雨花区",
    "parentId" : 430100
},{
    "code" : 430112,
    "name" : "望城区",
    "parentId" : 430100
},{
    "code" : 430121,
    "name" : "长沙县",
    "parentId" : 430100
},{
    "code" : 430124,
    "name" : "宁乡县",
    "parentId" : 430100
},{
    "code" : 430181,
    "name" : "浏阳市",
    "parentId" : 430100
},{
    "code" : 430202,
    "name" : "荷塘区",
    "parentId" : 430200
},{
    "code" : 430203,
    "name" : "芦淞区",
    "parentId" : 430200
},{
    "code" : 430204,
    "name" : "石峰区",
    "parentId" : 430200
},{
    "code" : 430211,
    "name" : "天元区",
    "parentId" : 430200
},{
    "code" : 430221,
    "name" : "株洲县",
    "parentId" : 430200
},{
    "code" : 430223,
    "name" : "攸县",
    "parentId" : 430200
},{
    "code" : 430224,
    "name" : "茶陵县",
    "parentId" : 430200
},{
    "code" : 430225,
    "name" : "炎陵县",
    "parentId" : 430200
},{
    "code" : 430281,
    "name" : "醴陵市",
    "parentId" : 430200
},{
    "code" : 430302,
    "name" : "雨湖区",
    "parentId" : 430300
},{
    "code" : 430304,
    "name" : "岳塘区",
    "parentId" : 430300
},{
    "code" : 430321,
    "name" : "湘潭县",
    "parentId" : 430300
},{
    "code" : 430381,
    "name" : "湘乡市",
    "parentId" : 430300
},{
    "code" : 430382,
    "name" : "韶山市",
    "parentId" : 430300
},{
    "code" : 430405,
    "name" : "珠晖区",
    "parentId" : 430400
},{
    "code" : 430406,
    "name" : "雁峰区",
    "parentId" : 430400
},{
    "code" : 430407,
    "name" : "石鼓区",
    "parentId" : 430400
},{
    "code" : 430408,
    "name" : "蒸湘区",
    "parentId" : 430400
},{
    "code" : 430412,
    "name" : "南岳区",
    "parentId" : 430400
},{
    "code" : 430421,
    "name" : "衡阳县",
    "parentId" : 430400
},{
    "code" : 430422,
    "name" : "衡南县",
    "parentId" : 430400
},{
    "code" : 430423,
    "name" : "衡山县",
    "parentId" : 430400
},{
    "code" : 430424,
    "name" : "衡东县",
    "parentId" : 430400
},{
    "code" : 430426,
    "name" : "祁东县",
    "parentId" : 430400
},{
    "code" : 430481,
    "name" : "耒阳市",
    "parentId" : 430400
},{
    "code" : 430482,
    "name" : "常宁市",
    "parentId" : 430400
},{
    "code" : 430502,
    "name" : "双清区",
    "parentId" : 430500
},{
    "code" : 430503,
    "name" : "大祥区",
    "parentId" : 430500
},{
    "code" : 430511,
    "name" : "北塔区",
    "parentId" : 430500
},{
    "code" : 430521,
    "name" : "邵东县",
    "parentId" : 430500
},{
    "code" : 430522,
    "name" : "新邵县",
    "parentId" : 430500
},{
    "code" : 430523,
    "name" : "邵阳县",
    "parentId" : 430500
},{
    "code" : 430524,
    "name" : "隆回县",
    "parentId" : 430500
},{
    "code" : 430525,
    "name" : "洞口县",
    "parentId" : 430500
},{
    "code" : 430527,
    "name" : "绥宁县",
    "parentId" : 430500
},{
    "code" : 430528,
    "name" : "新宁县",
    "parentId" : 430500
},{
    "code" : 430529,
    "name" : "城步苗族自治县",
    "parentId" : 430500
},{
    "code" : 430581,
    "name" : "武冈市",
    "parentId" : 430500
},{
    "code" : 430602,
    "name" : "岳阳楼区",
    "parentId" : 430600
},{
    "code" : 430603,
    "name" : "云溪区",
    "parentId" : 430600
},{
    "code" : 430611,
    "name" : "君山区",
    "parentId" : 430600
},{
    "code" : 430621,
    "name" : "岳阳县",
    "parentId" : 430600
},{
    "code" : 430623,
    "name" : "华容县",
    "parentId" : 430600
},{
    "code" : 430624,
    "name" : "湘阴县",
    "parentId" : 430600
},{
    "code" : 430626,
    "name" : "平江县",
    "parentId" : 430600
},{
    "code" : 430681,
    "name" : "汨罗市",
    "parentId" : 430600
},{
    "code" : 430682,
    "name" : "临湘市",
    "parentId" : 430600
},{
    "code" : 430702,
    "name" : "武陵区",
    "parentId" : 430700
},{
    "code" : 430703,
    "name" : "鼎城区",
    "parentId" : 430700
},{
    "code" : 430721,
    "name" : "安乡县",
    "parentId" : 430700
},{
    "code" : 430722,
    "name" : "汉寿县",
    "parentId" : 430700
},{
    "code" : 430723,
    "name" : "澧县",
    "parentId" : 430700
},{
    "code" : 430724,
    "name" : "临澧县",
    "parentId" : 430700
},{
    "code" : 430725,
    "name" : "桃源县",
    "parentId" : 430700
},{
    "code" : 430726,
    "name" : "石门县",
    "parentId" : 430700
},{
    "code" : 430781,
    "name" : "津市市",
    "parentId" : 430700
},{
    "code" : 430802,
    "name" : "永定区",
    "parentId" : 430800
},{
    "code" : 430811,
    "name" : "武陵源区",
    "parentId" : 430800
},{
    "code" : 430821,
    "name" : "慈利县",
    "parentId" : 430800
},{
    "code" : 430822,
    "name" : "桑植县",
    "parentId" : 430800
},{
    "code" : 430902,
    "name" : "资阳区",
    "parentId" : 430900
},{
    "code" : 430903,
    "name" : "赫山区",
    "parentId" : 430900
},{
    "code" : 430921,
    "name" : "南县",
    "parentId" : 430900
},{
    "code" : 430922,
    "name" : "桃江县",
    "parentId" : 430900
},{
    "code" : 430923,
    "name" : "安化县",
    "parentId" : 430900
},{
    "code" : 430981,
    "name" : "沅江市",
    "parentId" : 430900
},{
    "code" : 431002,
    "name" : "北湖区",
    "parentId" : 431000
},{
    "code" : 431003,
    "name" : "苏仙区",
    "parentId" : 431000
},{
    "code" : 431021,
    "name" : "桂阳县",
    "parentId" : 431000
},{
    "code" : 431022,
    "name" : "宜章县",
    "parentId" : 431000
},{
    "code" : 431023,
    "name" : "永兴县",
    "parentId" : 431000
},{
    "code" : 431024,
    "name" : "嘉禾县",
    "parentId" : 431000
},{
    "code" : 431025,
    "name" : "临武县",
    "parentId" : 431000
},{
    "code" : 431026,
    "name" : "汝城县",
    "parentId" : 431000
},{
    "code" : 431027,
    "name" : "桂东县",
    "parentId" : 431000
},{
    "code" : 431028,
    "name" : "安仁县",
    "parentId" : 431000
},{
    "code" : 431081,
    "name" : "资兴市",
    "parentId" : 431000
},{
    "code" : 431102,
    "name" : "零陵区",
    "parentId" : 431100
},{
    "code" : 431103,
    "name" : "冷水滩区",
    "parentId" : 431100
},{
    "code" : 431121,
    "name" : "祁阳县",
    "parentId" : 431100
},{
    "code" : 431122,
    "name" : "东安县",
    "parentId" : 431100
},{
    "code" : 431123,
    "name" : "双牌县",
    "parentId" : 431100
},{
    "code" : 431124,
    "name" : "道县",
    "parentId" : 431100
},{
    "code" : 431125,
    "name" : "江永县",
    "parentId" : 431100
},{
    "code" : 431126,
    "name" : "宁远县",
    "parentId" : 431100
},{
    "code" : 431127,
    "name" : "蓝山县",
    "parentId" : 431100
},{
    "code" : 431128,
    "name" : "新田县",
    "parentId" : 431100
},{
    "code" : 431129,
    "name" : "江华瑶族自治县",
    "parentId" : 431100
},{
    "code" : 431202,
    "name" : "鹤城区",
    "parentId" : 431200
},{
    "code" : 431221,
    "name" : "中方县",
    "parentId" : 431200
},{
    "code" : 431222,
    "name" : "沅陵县",
    "parentId" : 431200
},{
    "code" : 431223,
    "name" : "辰溪县",
    "parentId" : 431200
},{
    "code" : 431224,
    "name" : "溆浦县",
    "parentId" : 431200
},{
    "code" : 431225,
    "name" : "会同县",
    "parentId" : 431200
},{
    "code" : 431226,
    "name" : "麻阳苗族自治县",
    "parentId" : 431200
},{
    "code" : 431227,
    "name" : "新晃侗族自治县",
    "parentId" : 431200
},{
    "code" : 431228,
    "name" : "芷江侗族自治县",
    "parentId" : 431200
},{
    "code" : 431229,
    "name" : "靖州苗族侗族自治县",
    "parentId" : 431200
},{
    "code" : 431230,
    "name" : "通道侗族自治县",
    "parentId" : 431200
},{
    "code" : 431281,
    "name" : "洪江市",
    "parentId" : 431200
},{
    "code" : 431302,
    "name" : "娄星区",
    "parentId" : 431300
},{
    "code" : 431321,
    "name" : "双峰县",
    "parentId" : 431300
},{
    "code" : 431322,
    "name" : "新化县",
    "parentId" : 431300
},{
    "code" : 431381,
    "name" : "冷水江市",
    "parentId" : 431300
},{
    "code" : 431382,
    "name" : "涟源市",
    "parentId" : 431300
},{
    "code" : 433101,
    "name" : "吉首市",
    "parentId" : 433100
},{
    "code" : 433122,
    "name" : "泸溪县",
    "parentId" : 433100
},{
    "code" : 433123,
    "name" : "凤凰县",
    "parentId" : 433100
},{
    "code" : 433124,
    "name" : "花垣县",
    "parentId" : 433100
},{
    "code" : 433125,
    "name" : "保靖县",
    "parentId" : 433100
},{
    "code" : 433126,
    "name" : "古丈县",
    "parentId" : 433100
},{
    "code" : 433127,
    "name" : "永顺县",
    "parentId" : 433100
},{
    "code" : 433130,
    "name" : "龙山县",
    "parentId" : 433100
},{
    "code" : 440103,
    "name" : "荔湾区",
    "parentId" : 440100
},{
    "code" : 440104,
    "name" : "越秀区",
    "parentId" : 440100
},{
    "code" : 440105,
    "name" : "海珠区",
    "parentId" : 440100
},{
    "code" : 440106,
    "name" : "天河区",
    "parentId" : 440100
},{
    "code" : 440111,
    "name" : "白云区",
    "parentId" : 440100
},{
    "code" : 440112,
    "name" : "黄埔区",
    "parentId" : 440100
},{
    "code" : 440113,
    "name" : "番禺区",
    "parentId" : 440100
},{
    "code" : 440114,
    "name" : "花都区",
    "parentId" : 440100
},{
    "code" : 440115,
    "name" : "南沙区",
    "parentId" : 440100
},{
    "code" : 440183,
    "name" : "增城区",
    "parentId" : 440100
},{
    "code" : 440184,
    "name" : "从化区",
    "parentId" : 440100
},{
    "code" : 440203,
    "name" : "武江区",
    "parentId" : 440200
},{
    "code" : 440204,
    "name" : "浈江区",
    "parentId" : 440200
},{
    "code" : 440205,
    "name" : "曲江区",
    "parentId" : 440200
},{
    "code" : 440222,
    "name" : "始兴县",
    "parentId" : 440200
},{
    "code" : 440224,
    "name" : "仁化县",
    "parentId" : 440200
},{
    "code" : 440229,
    "name" : "翁源县",
    "parentId" : 440200
},{
    "code" : 440232,
    "name" : "乳源瑶族自治县",
    "parentId" : 440200
},{
    "code" : 440233,
    "name" : "新丰县",
    "parentId" : 440200
},{
    "code" : 440281,
    "name" : "乐昌市",
    "parentId" : 440200
},{
    "code" : 440282,
    "name" : "南雄市",
    "parentId" : 440200
},{
    "code" : 440303,
    "name" : "罗湖区",
    "parentId" : 440300
},{
    "code" : 440304,
    "name" : "福田区",
    "parentId" : 440300
},{
    "code" : 440305,
    "name" : "南山区",
    "parentId" : 440300
},{
    "code" : 440306,
    "name" : "宝安区",
    "parentId" : 440300
},{
    "code" : 440307,
    "name" : "龙岗区",
    "parentId" : 440300
},{
    "code" : 440308,
    "name" : "盐田区",
    "parentId" : 440300
},{
    "code" : 440402,
    "name" : "香洲区",
    "parentId" : 440400
},{
    "code" : 440403,
    "name" : "斗门区",
    "parentId" : 440400
},{
    "code" : 440404,
    "name" : "金湾区",
    "parentId" : 440400
},{
    "code" : 440507,
    "name" : "龙湖区",
    "parentId" : 440500
},{
    "code" : 440511,
    "name" : "金平区",
    "parentId" : 440500
},{
    "code" : 440512,
    "name" : "濠江区",
    "parentId" : 440500
},{
    "code" : 440513,
    "name" : "潮阳区",
    "parentId" : 440500
},{
    "code" : 440514,
    "name" : "潮南区",
    "parentId" : 440500
},{
    "code" : 440515,
    "name" : "澄海区",
    "parentId" : 440500
},{
    "code" : 440523,
    "name" : "南澳县",
    "parentId" : 440500
},{
    "code" : 440604,
    "name" : "禅城区",
    "parentId" : 440600
},{
    "code" : 440605,
    "name" : "南海区",
    "parentId" : 440600
},{
    "code" : 440606,
    "name" : "顺德区",
    "parentId" : 440600
},{
    "code" : 440607,
    "name" : "三水区",
    "parentId" : 440600
},{
    "code" : 440608,
    "name" : "高明区",
    "parentId" : 440600
},{
    "code" : 440703,
    "name" : "蓬江区",
    "parentId" : 440700
},{
    "code" : 440704,
    "name" : "江海区",
    "parentId" : 440700
},{
    "code" : 440705,
    "name" : "新会区",
    "parentId" : 440700
},{
    "code" : 440781,
    "name" : "台山市",
    "parentId" : 440700
},{
    "code" : 440783,
    "name" : "开平市",
    "parentId" : 440700
},{
    "code" : 440784,
    "name" : "鹤山市",
    "parentId" : 440700
},{
    "code" : 440785,
    "name" : "恩平市",
    "parentId" : 440700
},{
    "code" : 440802,
    "name" : "赤坎区",
    "parentId" : 440800
},{
    "code" : 440803,
    "name" : "霞山区",
    "parentId" : 440800
},{
    "code" : 440804,
    "name" : "坡头区",
    "parentId" : 440800
},{
    "code" : 440811,
    "name" : "麻章区",
    "parentId" : 440800
},{
    "code" : 440823,
    "name" : "遂溪县",
    "parentId" : 440800
},{
    "code" : 440825,
    "name" : "徐闻县",
    "parentId" : 440800
},{
    "code" : 440881,
    "name" : "廉江市",
    "parentId" : 440800
},{
    "code" : 440882,
    "name" : "雷州市",
    "parentId" : 440800
},{
    "code" : 440883,
    "name" : "吴川市",
    "parentId" : 440800
},{
    "code" : 440902,
    "name" : "茂南区",
    "parentId" : 440900
},{
    "code" : 440904,
    "name" : "电白区",
    "parentId" : 440900
},{
    "code" : 440981,
    "name" : "高州市",
    "parentId" : 440900
},{
    "code" : 440982,
    "name" : "化州市",
    "parentId" : 440900
},{
    "code" : 440983,
    "name" : "信宜市",
    "parentId" : 440900
},{
    "code" : 441202,
    "name" : "端州区",
    "parentId" : 441200
},{
    "code" : 441203,
    "name" : "鼎湖区",
    "parentId" : 441200
},{
    "code" : 441223,
    "name" : "广宁县",
    "parentId" : 441200
},{
    "code" : 441224,
    "name" : "怀集县",
    "parentId" : 441200
},{
    "code" : 441225,
    "name" : "封开县",
    "parentId" : 441200
},{
    "code" : 441226,
    "name" : "德庆县",
    "parentId" : 441200
},{
    "code" : 441283,
    "name" : "高要市",
    "parentId" : 441200
},{
    "code" : 441284,
    "name" : "四会市",
    "parentId" : 441200
},{
    "code" : 441302,
    "name" : "惠城区",
    "parentId" : 441300
},{
    "code" : 441303,
    "name" : "惠阳区",
    "parentId" : 441300
},{
    "code" : 441322,
    "name" : "博罗县",
    "parentId" : 441300
},{
    "code" : 441323,
    "name" : "惠东县",
    "parentId" : 441300
},{
    "code" : 441324,
    "name" : "龙门县",
    "parentId" : 441300
},{
    "code" : 441402,
    "name" : "梅江区",
    "parentId" : 441400
},{
    "code" : 441403,
    "name" : "梅县区",
    "parentId" : 441400
},{
    "code" : 441422,
    "name" : "大埔县",
    "parentId" : 441400
},{
    "code" : 441423,
    "name" : "丰顺县",
    "parentId" : 441400
},{
    "code" : 441424,
    "name" : "五华县",
    "parentId" : 441400
},{
    "code" : 441426,
    "name" : "平远县",
    "parentId" : 441400
},{
    "code" : 441427,
    "name" : "蕉岭县",
    "parentId" : 441400
},{
    "code" : 441481,
    "name" : "兴宁市",
    "parentId" : 441400
},{
    "code" : 441502,
    "name" : "城区",
    "parentId" : 441500
},{
    "code" : 441521,
    "name" : "海丰县",
    "parentId" : 441500
},{
    "code" : 441523,
    "name" : "陆河县",
    "parentId" : 441500
},{
    "code" : 441581,
    "name" : "陆丰市",
    "parentId" : 441500
},{
    "code" : 441602,
    "name" : "源城区",
    "parentId" : 441600
},{
    "code" : 441621,
    "name" : "紫金县",
    "parentId" : 441600
},{
    "code" : 441622,
    "name" : "龙川县",
    "parentId" : 441600
},{
    "code" : 441623,
    "name" : "连平县",
    "parentId" : 441600
},{
    "code" : 441624,
    "name" : "和平县",
    "parentId" : 441600
},{
    "code" : 441625,
    "name" : "东源县",
    "parentId" : 441600
},{
    "code" : 441702,
    "name" : "江城区",
    "parentId" : 441700
},{
    "code" : 441721,
    "name" : "阳西县",
    "parentId" : 441700
},{
    "code" : 441723,
    "name" : "阳东县",
    "parentId" : 441700
},{
    "code" : 441781,
    "name" : "阳春市",
    "parentId" : 441700
},{
    "code" : 441802,
    "name" : "清城区",
    "parentId" : 441800
},{
    "code" : 441803,
    "name" : "清新区",
    "parentId" : 441800
},{
    "code" : 441821,
    "name" : "佛冈县",
    "parentId" : 441800
},{
    "code" : 441823,
    "name" : "阳山县",
    "parentId" : 441800
},{
    "code" : 441825,
    "name" : "连山壮族瑶族自治县",
    "parentId" : 441800
},{
    "code" : 441826,
    "name" : "连南瑶族自治县",
    "parentId" : 441800
},{
    "code" : 441881,
    "name" : "英德市",
    "parentId" : 441800
},{
    "code" : 441882,
    "name" : "连州市",
    "parentId" : 441800
},{
    "code" : 445102,
    "name" : "湘桥区",
    "parentId" : 445100
},{
    "code" : 445121,
    "name" : "潮安县",
    "parentId" : 445100
},{
    "code" : 445122,
    "name" : "饶平县",
    "parentId" : 445100
},{
    "code" : 445202,
    "name" : "榕城区",
    "parentId" : 445200
},{
    "code" : 445203,
    "name" : "揭东区",
    "parentId" : 445200
},{
    "code" : 445222,
    "name" : "揭西县",
    "parentId" : 445200
},{
    "code" : 445224,
    "name" : "惠来县",
    "parentId" : 445200
},{
    "code" : 445281,
    "name" : "普宁市",
    "parentId" : 445200
},{
    "code" : 445302,
    "name" : "云城区",
    "parentId" : 445300
},{
    "code" : 445303,
    "name" : "云安区",
    "parentId" : 445300
},{
    "code" : 445321,
    "name" : "新兴县",
    "parentId" : 445300
},{
    "code" : 445322,
    "name" : "郁南县",
    "parentId" : 445300
},{
    "code" : 445381,
    "name" : "罗定市",
    "parentId" : 445300
},{
    "code" : 450102,
    "name" : "兴宁区",
    "parentId" : 450100
},{
    "code" : 450103,
    "name" : "青秀区",
    "parentId" : 450100
},{
    "code" : 450105,
    "name" : "江南区",
    "parentId" : 450100
},{
    "code" : 450107,
    "name" : "西乡塘区",
    "parentId" : 450100
},{
    "code" : 450108,
    "name" : "良庆区",
    "parentId" : 450100
},{
    "code" : 450109,
    "name" : "邕宁区",
    "parentId" : 450100
},{
    "code" : 450122,
    "name" : "武鸣县",
    "parentId" : 450100
},{
    "code" : 450123,
    "name" : "隆安县",
    "parentId" : 450100
},{
    "code" : 450124,
    "name" : "马山县",
    "parentId" : 450100
},{
    "code" : 450125,
    "name" : "上林县",
    "parentId" : 450100
},{
    "code" : 450126,
    "name" : "宾阳县",
    "parentId" : 450100
},{
    "code" : 450127,
    "name" : "横县",
    "parentId" : 450100
},{
    "code" : 450202,
    "name" : "城中区",
    "parentId" : 450200
},{
    "code" : 450203,
    "name" : "鱼峰区",
    "parentId" : 450200
},{
    "code" : 450204,
    "name" : "柳南区",
    "parentId" : 450200
},{
    "code" : 450205,
    "name" : "柳北区",
    "parentId" : 450200
},{
    "code" : 450221,
    "name" : "柳江县",
    "parentId" : 450200
},{
    "code" : 450222,
    "name" : "柳城县",
    "parentId" : 450200
},{
    "code" : 450223,
    "name" : "鹿寨县",
    "parentId" : 450200
},{
    "code" : 450224,
    "name" : "融安县",
    "parentId" : 450200
},{
    "code" : 450225,
    "name" : "融水苗族自治县",
    "parentId" : 450200
},{
    "code" : 450226,
    "name" : "三江侗族自治县",
    "parentId" : 450200
},{
    "code" : 450302,
    "name" : "秀峰区",
    "parentId" : 450300
},{
    "code" : 450303,
    "name" : "叠彩区",
    "parentId" : 450300
},{
    "code" : 450304,
    "name" : "象山区",
    "parentId" : 450300
},{
    "code" : 450305,
    "name" : "七星区",
    "parentId" : 450300
},{
    "code" : 450311,
    "name" : "雁山区",
    "parentId" : 450300
},{
    "code" : 450312,
    "name" : "临桂区",
    "parentId" : 450300
},{
    "code" : 450321,
    "name" : "阳朔县",
    "parentId" : 450300
},{
    "code" : 450323,
    "name" : "灵川县",
    "parentId" : 450300
},{
    "code" : 450324,
    "name" : "全州县",
    "parentId" : 450300
},{
    "code" : 450325,
    "name" : "兴安县",
    "parentId" : 450300
},{
    "code" : 450326,
    "name" : "永福县",
    "parentId" : 450300
},{
    "code" : 450327,
    "name" : "灌阳县",
    "parentId" : 450300
},{
    "code" : 450328,
    "name" : "龙胜各族自治县",
    "parentId" : 450300
},{
    "code" : 450329,
    "name" : "资源县",
    "parentId" : 450300
},{
    "code" : 450330,
    "name" : "平乐县",
    "parentId" : 450300
},{
    "code" : 450331,
    "name" : "荔浦县",
    "parentId" : 450300
},{
    "code" : 450332,
    "name" : "恭城瑶族自治县",
    "parentId" : 450300
},{
    "code" : 450403,
    "name" : "万秀区",
    "parentId" : 450400
},{
    "code" : 450405,
    "name" : "长洲区",
    "parentId" : 450400
},{
    "code" : 450421,
    "name" : "苍梧县",
    "parentId" : 450400
},{
    "code" : 450422,
    "name" : "藤县",
    "parentId" : 450400
},{
    "code" : 450423,
    "name" : "蒙山县",
    "parentId" : 450400
},{
    "code" : 450481,
    "name" : "岑溪市",
    "parentId" : 450400
},{
    "code" : 450502,
    "name" : "海城区",
    "parentId" : 450500
},{
    "code" : 450503,
    "name" : "银海区",
    "parentId" : 450500
},{
    "code" : 450512,
    "name" : "铁山港区",
    "parentId" : 450500
},{
    "code" : 450521,
    "name" : "合浦县",
    "parentId" : 450500
},{
    "code" : 450602,
    "name" : "港口区",
    "parentId" : 450600
},{
    "code" : 450603,
    "name" : "防城区",
    "parentId" : 450600
},{
    "code" : 450621,
    "name" : "上思县",
    "parentId" : 450600
},{
    "code" : 450681,
    "name" : "东兴市",
    "parentId" : 450600
},{
    "code" : 450702,
    "name" : "钦南区",
    "parentId" : 450700
},{
    "code" : 450703,
    "name" : "钦北区",
    "parentId" : 450700
},{
    "code" : 450721,
    "name" : "灵山县",
    "parentId" : 450700
},{
    "code" : 450722,
    "name" : "浦北县",
    "parentId" : 450700
},{
    "code" : 450802,
    "name" : "港北区",
    "parentId" : 450800
},{
    "code" : 450803,
    "name" : "港南区",
    "parentId" : 450800
},{
    "code" : 450804,
    "name" : "覃塘区",
    "parentId" : 450800
},{
    "code" : 450821,
    "name" : "平南县",
    "parentId" : 450800
},{
    "code" : 450881,
    "name" : "桂平市",
    "parentId" : 450800
},{
    "code" : 450902,
    "name" : "玉州区",
    "parentId" : 450900
},{
    "code" : 450921,
    "name" : "容县",
    "parentId" : 450900
},{
    "code" : 450922,
    "name" : "陆川县",
    "parentId" : 450900
},{
    "code" : 450923,
    "name" : "博白县",
    "parentId" : 450900
},{
    "code" : 450924,
    "name" : "兴业县",
    "parentId" : 450900
},{
    "code" : 450981,
    "name" : "北流市",
    "parentId" : 450900
},{
    "code" : 451002,
    "name" : "右江区",
    "parentId" : 451000
},{
    "code" : 451021,
    "name" : "田阳县",
    "parentId" : 451000
},{
    "code" : 451022,
    "name" : "田东县",
    "parentId" : 451000
},{
    "code" : 451023,
    "name" : "平果县",
    "parentId" : 451000
},{
    "code" : 451024,
    "name" : "德保县",
    "parentId" : 451000
},{
    "code" : 451025,
    "name" : "靖西县",
    "parentId" : 451000
},{
    "code" : 451026,
    "name" : "那坡县",
    "parentId" : 451000
},{
    "code" : 451027,
    "name" : "凌云县",
    "parentId" : 451000
},{
    "code" : 451028,
    "name" : "乐业县",
    "parentId" : 451000
},{
    "code" : 451029,
    "name" : "田林县",
    "parentId" : 451000
},{
    "code" : 451030,
    "name" : "西林县",
    "parentId" : 451000
},{
    "code" : 451031,
    "name" : "隆林各族自治县",
    "parentId" : 451000
},{
    "code" : 451102,
    "name" : "八步区",
    "parentId" : 451100
},{
    "code" : 451121,
    "name" : "昭平县",
    "parentId" : 451100
},{
    "code" : 451122,
    "name" : "钟山县",
    "parentId" : 451100
},{
    "code" : 451123,
    "name" : "富川瑶族自治县",
    "parentId" : 451100
},{
    "code" : 451202,
    "name" : "金城江区",
    "parentId" : 451200
},{
    "code" : 451221,
    "name" : "南丹县",
    "parentId" : 451200
},{
    "code" : 451222,
    "name" : "天峨县",
    "parentId" : 451200
},{
    "code" : 451223,
    "name" : "凤山县",
    "parentId" : 451200
},{
    "code" : 451224,
    "name" : "东兰县",
    "parentId" : 451200
},{
    "code" : 451225,
    "name" : "罗城仫佬族自治县",
    "parentId" : 451200
},{
    "code" : 451226,
    "name" : "环江毛南族自治县",
    "parentId" : 451200
},{
    "code" : 451227,
    "name" : "巴马瑶族自治县",
    "parentId" : 451200
},{
    "code" : 451228,
    "name" : "都安瑶族自治县",
    "parentId" : 451200
},{
    "code" : 451229,
    "name" : "大化瑶族自治县",
    "parentId" : 451200
},{
    "code" : 451281,
    "name" : "宜州市",
    "parentId" : 451200
},{
    "code" : 451302,
    "name" : "兴宾区",
    "parentId" : 451300
},{
    "code" : 451321,
    "name" : "忻城县",
    "parentId" : 451300
},{
    "code" : 451322,
    "name" : "象州县",
    "parentId" : 451300
},{
    "code" : 451323,
    "name" : "武宣县",
    "parentId" : 451300
},{
    "code" : 451324,
    "name" : "金秀瑶族自治县",
    "parentId" : 451300
},{
    "code" : 451381,
    "name" : "合山市",
    "parentId" : 451300
},{
    "code" : 451402,
    "name" : "江州区",
    "parentId" : 451400
},{
    "code" : 451421,
    "name" : "扶绥县",
    "parentId" : 451400
},{
    "code" : 451422,
    "name" : "宁明县",
    "parentId" : 451400
},{
    "code" : 451423,
    "name" : "龙州县",
    "parentId" : 451400
},{
    "code" : 451424,
    "name" : "大新县",
    "parentId" : 451400
},{
    "code" : 451425,
    "name" : "天等县",
    "parentId" : 451400
},{
    "code" : 451481,
    "name" : "凭祥市",
    "parentId" : 451400
},{
    "code" : 460105,
    "name" : "秀英区",
    "parentId" : 460100
},{
    "code" : 460106,
    "name" : "龙华区",
    "parentId" : 460100
},{
    "code" : 460107,
    "name" : "琼山区",
    "parentId" : 460100
},{
    "code" : 460108,
    "name" : "美兰区",
    "parentId" : 460100
},{
    "code" : 460201,
    "name" : "三亚市",
    "parentId" : 460200
},{
    "code" : 510104,
    "name" : "锦江区",
    "parentId" : 510100
},{
    "code" : 510105,
    "name" : "青羊区",
    "parentId" : 510100
},{
    "code" : 510106,
    "name" : "金牛区",
    "parentId" : 510100
},{
    "code" : 510107,
    "name" : "武侯区",
    "parentId" : 510100
},{
    "code" : 510108,
    "name" : "成华区",
    "parentId" : 510100
},{
    "code" : 510112,
    "name" : "龙泉驿区",
    "parentId" : 510100
},{
    "code" : 510113,
    "name" : "青白江区",
    "parentId" : 510100
},{
    "code" : 510114,
    "name" : "新都区",
    "parentId" : 510100
},{
    "code" : 510115,
    "name" : "温江区",
    "parentId" : 510100
},{
    "code" : 510121,
    "name" : "金堂县",
    "parentId" : 510100
},{
    "code" : 510122,
    "name" : "双流县",
    "parentId" : 510100
},{
    "code" : 510124,
    "name" : "郫县",
    "parentId" : 510100
},{
    "code" : 510129,
    "name" : "大邑县",
    "parentId" : 510100
},{
    "code" : 510131,
    "name" : "蒲江县",
    "parentId" : 510100
},{
    "code" : 510132,
    "name" : "新津县",
    "parentId" : 510100
},{
    "code" : 510181,
    "name" : "都江堰市",
    "parentId" : 510100
},{
    "code" : 510182,
    "name" : "彭州市",
    "parentId" : 510100
},{
    "code" : 510183,
    "name" : "邛崃市",
    "parentId" : 510100
},{
    "code" : 510184,
    "name" : "崇州市",
    "parentId" : 510100
},{
    "code" : 510302,
    "name" : "自流井区",
    "parentId" : 510300
},{
    "code" : 510303,
    "name" : "贡井区",
    "parentId" : 510300
},{
    "code" : 510304,
    "name" : "大安区",
    "parentId" : 510300
},{
    "code" : 510311,
    "name" : "沿滩区",
    "parentId" : 510300
},{
    "code" : 510321,
    "name" : "荣县",
    "parentId" : 510300
},{
    "code" : 510322,
    "name" : "富顺县",
    "parentId" : 510300
},{
    "code" : 510402,
    "name" : "东区",
    "parentId" : 510400
},{
    "code" : 510403,
    "name" : "西区",
    "parentId" : 510400
},{
    "code" : 510411,
    "name" : "仁和区",
    "parentId" : 510400
},{
    "code" : 510421,
    "name" : "米易县",
    "parentId" : 510400
},{
    "code" : 510422,
    "name" : "盐边县",
    "parentId" : 510400
},{
    "code" : 510502,
    "name" : "江阳区",
    "parentId" : 510500
},{
    "code" : 510503,
    "name" : "纳溪区",
    "parentId" : 510500
},{
    "code" : 510504,
    "name" : "龙马潭区",
    "parentId" : 510500
},{
    "code" : 510521,
    "name" : "泸县",
    "parentId" : 510500
},{
    "code" : 510522,
    "name" : "合江县",
    "parentId" : 510500
},{
    "code" : 510524,
    "name" : "叙永县",
    "parentId" : 510500
},{
    "code" : 510525,
    "name" : "古蔺县",
    "parentId" : 510500
},{
    "code" : 510603,
    "name" : "旌阳区",
    "parentId" : 510600
},{
    "code" : 510623,
    "name" : "中江县",
    "parentId" : 510600
},{
    "code" : 510626,
    "name" : "罗江县",
    "parentId" : 510600
},{
    "code" : 510681,
    "name" : "广汉市",
    "parentId" : 510600
},{
    "code" : 510682,
    "name" : "什邡市",
    "parentId" : 510600
},{
    "code" : 510683,
    "name" : "绵竹市",
    "parentId" : 510600
},{
    "code" : 510703,
    "name" : "涪城区",
    "parentId" : 510700
},{
    "code" : 510704,
    "name" : "游仙区",
    "parentId" : 510700
},{
    "code" : 510722,
    "name" : "三台县",
    "parentId" : 510700
},{
    "code" : 510723,
    "name" : "盐亭县",
    "parentId" : 510700
},{
    "code" : 510724,
    "name" : "安县",
    "parentId" : 510700
},{
    "code" : 510725,
    "name" : "梓潼县",
    "parentId" : 510700
},{
    "code" : 510726,
    "name" : "北川羌族自治县",
    "parentId" : 510700
},{
    "code" : 510727,
    "name" : "平武县",
    "parentId" : 510700
},{
    "code" : 510781,
    "name" : "江油市",
    "parentId" : 510700
},{
    "code" : 510802,
    "name" : "利州区",
    "parentId" : 510800
},{
    "code" : 510811,
    "name" : "昭化区",
    "parentId" : 510800
},{
    "code" : 510812,
    "name" : "朝天区",
    "parentId" : 510800
},{
    "code" : 510821,
    "name" : "旺苍县",
    "parentId" : 510800
},{
    "code" : 510822,
    "name" : "青川县",
    "parentId" : 510800
},{
    "code" : 510823,
    "name" : "剑阁县",
    "parentId" : 510800
},{
    "code" : 510824,
    "name" : "苍溪县",
    "parentId" : 510800
},{
    "code" : 510903,
    "name" : "船山区",
    "parentId" : 510900
},{
    "code" : 510904,
    "name" : "安居区",
    "parentId" : 510900
},{
    "code" : 510921,
    "name" : "蓬溪县",
    "parentId" : 510900
},{
    "code" : 510922,
    "name" : "射洪县",
    "parentId" : 510900
},{
    "code" : 510923,
    "name" : "大英县",
    "parentId" : 510900
},{
    "code" : 511002,
    "name" : "市中区",
    "parentId" : 511000
},{
    "code" : 511011,
    "name" : "东兴区",
    "parentId" : 511000
},{
    "code" : 511024,
    "name" : "威远县",
    "parentId" : 511000
},{
    "code" : 511025,
    "name" : "资中县",
    "parentId" : 511000
},{
    "code" : 511028,
    "name" : "隆昌县",
    "parentId" : 511000
},{
    "code" : 511102,
    "name" : "市中区",
    "parentId" : 511100
},{
    "code" : 511111,
    "name" : "沙湾区",
    "parentId" : 511100
},{
    "code" : 511112,
    "name" : "五通桥区",
    "parentId" : 511100
},{
    "code" : 511113,
    "name" : "金口河区",
    "parentId" : 511100
},{
    "code" : 511123,
    "name" : "犍为县",
    "parentId" : 511100
},{
    "code" : 511124,
    "name" : "井研县",
    "parentId" : 511100
},{
    "code" : 511126,
    "name" : "夹江县",
    "parentId" : 511100
},{
    "code" : 511129,
    "name" : "沐川县",
    "parentId" : 511100
},{
    "code" : 511132,
    "name" : "峨边彝族自治县",
    "parentId" : 511100
},{
    "code" : 511133,
    "name" : "马边彝族自治县",
    "parentId" : 511100
},{
    "code" : 511181,
    "name" : "峨眉山市",
    "parentId" : 511100
},{
    "code" : 511302,
    "name" : "顺庆区",
    "parentId" : 511300
},{
    "code" : 511303,
    "name" : "高坪区",
    "parentId" : 511300
},{
    "code" : 511304,
    "name" : "嘉陵区",
    "parentId" : 511300
},{
    "code" : 511321,
    "name" : "南部县",
    "parentId" : 511300
},{
    "code" : 511322,
    "name" : "营山县",
    "parentId" : 511300
},{
    "code" : 511323,
    "name" : "蓬安县",
    "parentId" : 511300
},{
    "code" : 511324,
    "name" : "仪陇县",
    "parentId" : 511300
},{
    "code" : 511325,
    "name" : "西充县",
    "parentId" : 511300
},{
    "code" : 511381,
    "name" : "阆中市",
    "parentId" : 511300
},{
    "code" : 511402,
    "name" : "东坡区",
    "parentId" : 511400
},{
    "code" : 511421,
    "name" : "仁寿县",
    "parentId" : 511400
},{
    "code" : 511422,
    "name" : "彭山县",
    "parentId" : 511400
},{
    "code" : 511423,
    "name" : "洪雅县",
    "parentId" : 511400
},{
    "code" : 511424,
    "name" : "丹棱县",
    "parentId" : 511400
},{
    "code" : 511425,
    "name" : "青神县",
    "parentId" : 511400
},{
    "code" : 511502,
    "name" : "翠屏区",
    "parentId" : 511500
},{
    "code" : 511503,
    "name" : "南溪区",
    "parentId" : 511500
},{
    "code" : 511521,
    "name" : "宜宾县",
    "parentId" : 511500
},{
    "code" : 511523,
    "name" : "江安县",
    "parentId" : 511500
},{
    "code" : 511524,
    "name" : "长宁县",
    "parentId" : 511500
},{
    "code" : 511525,
    "name" : "高县",
    "parentId" : 511500
},{
    "code" : 511526,
    "name" : "珙县",
    "parentId" : 511500
},{
    "code" : 511527,
    "name" : "筠连县",
    "parentId" : 511500
},{
    "code" : 511528,
    "name" : "兴文县",
    "parentId" : 511500
},{
    "code" : 511529,
    "name" : "屏山县",
    "parentId" : 511500
},{
    "code" : 511602,
    "name" : "广安区",
    "parentId" : 511600
},{
    "code" : 511621,
    "name" : "岳池县",
    "parentId" : 511600
},{
    "code" : 511622,
    "name" : "武胜县",
    "parentId" : 511600
},{
    "code" : 511623,
    "name" : "邻水县",
    "parentId" : 511600
},{
    "code" : 511681,
    "name" : "华蓥市",
    "parentId" : 511600
},{
    "code" : 511702,
    "name" : "通川区",
    "parentId" : 511700
},{
    "code" : 511721,
    "name" : "达县",
    "parentId" : 511700
},{
    "code" : 511722,
    "name" : "宣汉县",
    "parentId" : 511700
},{
    "code" : 511723,
    "name" : "开江县",
    "parentId" : 511700
},{
    "code" : 511724,
    "name" : "大竹县",
    "parentId" : 511700
},{
    "code" : 511725,
    "name" : "渠县",
    "parentId" : 511700
},{
    "code" : 511781,
    "name" : "万源市",
    "parentId" : 511700
},{
    "code" : 511802,
    "name" : "雨城区",
    "parentId" : 511800
},{
    "code" : 511803,
    "name" : "名山区",
    "parentId" : 511800
},{
    "code" : 511822,
    "name" : "荥经县",
    "parentId" : 511800
},{
    "code" : 511823,
    "name" : "汉源县",
    "parentId" : 511800
},{
    "code" : 511824,
    "name" : "石棉县",
    "parentId" : 511800
},{
    "code" : 511825,
    "name" : "天全县",
    "parentId" : 511800
},{
    "code" : 511826,
    "name" : "芦山县",
    "parentId" : 511800
},{
    "code" : 511827,
    "name" : "宝兴县",
    "parentId" : 511800
},{
    "code" : 511902,
    "name" : "巴州区",
    "parentId" : 511900
},{
    "code" : 511921,
    "name" : "通江县",
    "parentId" : 511900
},{
    "code" : 511922,
    "name" : "南江县",
    "parentId" : 511900
},{
    "code" : 511923,
    "name" : "平昌县",
    "parentId" : 511900
},{
    "code" : 512002,
    "name" : "雁江区",
    "parentId" : 512000
},{
    "code" : 512021,
    "name" : "安岳县",
    "parentId" : 512000
},{
    "code" : 512022,
    "name" : "乐至县",
    "parentId" : 512000
},{
    "code" : 512081,
    "name" : "简阳市",
    "parentId" : 512000
},{
    "code" : 513221,
    "name" : "汶川县",
    "parentId" : 513200
},{
    "code" : 513222,
    "name" : "理县",
    "parentId" : 513200
},{
    "code" : 513223,
    "name" : "茂县",
    "parentId" : 513200
},{
    "code" : 513224,
    "name" : "松潘县",
    "parentId" : 513200
},{
    "code" : 513225,
    "name" : "九寨沟县",
    "parentId" : 513200
},{
    "code" : 513226,
    "name" : "金川县",
    "parentId" : 513200
},{
    "code" : 513227,
    "name" : "小金县",
    "parentId" : 513200
},{
    "code" : 513228,
    "name" : "黑水县",
    "parentId" : 513200
},{
    "code" : 513229,
    "name" : "马尔康县",
    "parentId" : 513200
},{
    "code" : 513230,
    "name" : "壤塘县",
    "parentId" : 513200
},{
    "code" : 513231,
    "name" : "阿坝县",
    "parentId" : 513200
},{
    "code" : 513232,
    "name" : "若尔盖县",
    "parentId" : 513200
},{
    "code" : 513233,
    "name" : "红原县",
    "parentId" : 513200
},{
    "code" : 513321,
    "name" : "康定县",
    "parentId" : 513300
},{
    "code" : 513322,
    "name" : "泸定县",
    "parentId" : 513300
},{
    "code" : 513323,
    "name" : "丹巴县",
    "parentId" : 513300
},{
    "code" : 513324,
    "name" : "九龙县",
    "parentId" : 513300
},{
    "code" : 513325,
    "name" : "雅江县",
    "parentId" : 513300
},{
    "code" : 513326,
    "name" : "道孚县",
    "parentId" : 513300
},{
    "code" : 513327,
    "name" : "炉霍县",
    "parentId" : 513300
},{
    "code" : 513328,
    "name" : "甘孜县",
    "parentId" : 513300
},{
    "code" : 513329,
    "name" : "新龙县",
    "parentId" : 513300
},{
    "code" : 513330,
    "name" : "德格县",
    "parentId" : 513300
},{
    "code" : 513331,
    "name" : "白玉县",
    "parentId" : 513300
},{
    "code" : 513332,
    "name" : "石渠县",
    "parentId" : 513300
},{
    "code" : 513333,
    "name" : "色达县",
    "parentId" : 513300
},{
    "code" : 513334,
    "name" : "理塘县",
    "parentId" : 513300
},{
    "code" : 513335,
    "name" : "巴塘县",
    "parentId" : 513300
},{
    "code" : 513336,
    "name" : "乡城县",
    "parentId" : 513300
},{
    "code" : 513337,
    "name" : "稻城县",
    "parentId" : 513300
},{
    "code" : 513338,
    "name" : "得荣县",
    "parentId" : 513300
},{
    "code" : 513401,
    "name" : "西昌市",
    "parentId" : 513400
},{
    "code" : 513422,
    "name" : "木里藏族自治县",
    "parentId" : 513400
},{
    "code" : 513423,
    "name" : "盐源县",
    "parentId" : 513400
},{
    "code" : 513424,
    "name" : "德昌县",
    "parentId" : 513400
},{
    "code" : 513425,
    "name" : "会理县",
    "parentId" : 513400
},{
    "code" : 513426,
    "name" : "会东县",
    "parentId" : 513400
},{
    "code" : 513427,
    "name" : "宁南县",
    "parentId" : 513400
},{
    "code" : 513428,
    "name" : "普格县",
    "parentId" : 513400
},{
    "code" : 513429,
    "name" : "布拖县",
    "parentId" : 513400
},{
    "code" : 513430,
    "name" : "金阳县",
    "parentId" : 513400
},{
    "code" : 513431,
    "name" : "昭觉县",
    "parentId" : 513400
},{
    "code" : 513432,
    "name" : "喜德县",
    "parentId" : 513400
},{
    "code" : 513433,
    "name" : "冕宁县",
    "parentId" : 513400
},{
    "code" : 513434,
    "name" : "越西县",
    "parentId" : 513400
},{
    "code" : 513435,
    "name" : "甘洛县",
    "parentId" : 513400
},{
    "code" : 513436,
    "name" : "美姑县",
    "parentId" : 513400
},{
    "code" : 513437,
    "name" : "雷波县",
    "parentId" : 513400
},{
    "code" : 520102,
    "name" : "南明区",
    "parentId" : 520100
},{
    "code" : 520103,
    "name" : "云岩区",
    "parentId" : 520100
},{
    "code" : 520111,
    "name" : "花溪区",
    "parentId" : 520100
},{
    "code" : 520112,
    "name" : "乌当区",
    "parentId" : 520100
},{
    "code" : 520113,
    "name" : "白云区",
    "parentId" : 520100
},{
    "code" : 520121,
    "name" : "开阳县",
    "parentId" : 520100
},{
    "code" : 520122,
    "name" : "息烽县",
    "parentId" : 520100
},{
    "code" : 520123,
    "name" : "修文县",
    "parentId" : 520100
},{
    "code" : 520181,
    "name" : "清镇市",
    "parentId" : 520100
},{
    "code" : 520201,
    "name" : "钟山区",
    "parentId" : 520200
},{
    "code" : 520203,
    "name" : "六枝特区",
    "parentId" : 520200
},{
    "code" : 520221,
    "name" : "水城县",
    "parentId" : 520200
},{
    "code" : 520222,
    "name" : "盘县",
    "parentId" : 520200
},{
    "code" : 520302,
    "name" : "红花岗区",
    "parentId" : 520300
},{
    "code" : 520303,
    "name" : "汇川区",
    "parentId" : 520300
},{
    "code" : 520321,
    "name" : "遵义县",
    "parentId" : 520300
},{
    "code" : 520322,
    "name" : "桐梓县",
    "parentId" : 520300
},{
    "code" : 520323,
    "name" : "绥阳县",
    "parentId" : 520300
},{
    "code" : 520324,
    "name" : "正安县",
    "parentId" : 520300
},{
    "code" : 520325,
    "name" : "道真仡佬族苗族自治县",
    "parentId" : 520300
},{
    "code" : 520326,
    "name" : "务川仡佬族苗族自治县",
    "parentId" : 520300
},{
    "code" : 520327,
    "name" : "凤冈县",
    "parentId" : 520300
},{
    "code" : 520328,
    "name" : "湄潭县",
    "parentId" : 520300
},{
    "code" : 520329,
    "name" : "余庆县",
    "parentId" : 520300
},{
    "code" : 520330,
    "name" : "习水县",
    "parentId" : 520300
},{
    "code" : 520381,
    "name" : "赤水市",
    "parentId" : 520300
},{
    "code" : 520382,
    "name" : "仁怀市",
    "parentId" : 520300
},{
    "code" : 520402,
    "name" : "西秀区",
    "parentId" : 520400
},{
    "code" : 520421,
    "name" : "平坝县",
    "parentId" : 520400
},{
    "code" : 520422,
    "name" : "普定县",
    "parentId" : 520400
},{
    "code" : 520423,
    "name" : "镇宁布依族苗族自治县",
    "parentId" : 520400
},{
    "code" : 520424,
    "name" : "关岭布依族苗族自治县",
    "parentId" : 520400
},{
    "code" : 520425,
    "name" : "紫云苗族布依族自治县",
    "parentId" : 520400
},{
    "code" : 520502,
    "name" : "七星关区",
    "parentId" : 520500
},{
    "code" : 520521,
    "name" : "大方县",
    "parentId" : 520500
},{
    "code" : 520522,
    "name" : "黔西县",
    "parentId" : 520500
},{
    "code" : 520523,
    "name" : "金沙县",
    "parentId" : 520500
},{
    "code" : 520524,
    "name" : "织金县",
    "parentId" : 520500
},{
    "code" : 520525,
    "name" : "纳雍县",
    "parentId" : 520500
},{
    "code" : 520526,
    "name" : "威宁彝族回族苗族自治县",
    "parentId" : 520500
},{
    "code" : 520527,
    "name" : "赫章县",
    "parentId" : 520500
},{
    "code" : 520602,
    "name" : "碧江区",
    "parentId" : 520600
},{
    "code" : 520603,
    "name" : "万山区",
    "parentId" : 520600
},{
    "code" : 520621,
    "name" : "江口县",
    "parentId" : 520600
},{
    "code" : 520622,
    "name" : "玉屏侗族自治县",
    "parentId" : 520600
},{
    "code" : 520623,
    "name" : "石阡县",
    "parentId" : 520600
},{
    "code" : 520624,
    "name" : "思南县",
    "parentId" : 520600
},{
    "code" : 520625,
    "name" : "印江土家族苗族自治县",
    "parentId" : 520600
},{
    "code" : 520626,
    "name" : "德江县",
    "parentId" : 520600
},{
    "code" : 520627,
    "name" : "沿河土家族自治县",
    "parentId" : 520600
},{
    "code" : 520628,
    "name" : "松桃苗族自治县",
    "parentId" : 520600
},{
    "code" : 522301,
    "name" : "兴义市",
    "parentId" : 522300
},{
    "code" : 522322,
    "name" : "兴仁县",
    "parentId" : 522300
},{
    "code" : 522323,
    "name" : "普安县",
    "parentId" : 522300
},{
    "code" : 522324,
    "name" : "晴隆县",
    "parentId" : 522300
},{
    "code" : 522325,
    "name" : "贞丰县",
    "parentId" : 522300
},{
    "code" : 522326,
    "name" : "望谟县",
    "parentId" : 522300
},{
    "code" : 522327,
    "name" : "册亨县",
    "parentId" : 522300
},{
    "code" : 522328,
    "name" : "安龙县",
    "parentId" : 522300
},{
    "code" : 522601,
    "name" : "凯里市",
    "parentId" : 522600
},{
    "code" : 522622,
    "name" : "黄平县",
    "parentId" : 522600
},{
    "code" : 522623,
    "name" : "施秉县",
    "parentId" : 522600
},{
    "code" : 522624,
    "name" : "三穗县",
    "parentId" : 522600
},{
    "code" : 522625,
    "name" : "镇远县",
    "parentId" : 522600
},{
    "code" : 522626,
    "name" : "岑巩县",
    "parentId" : 522600
},{
    "code" : 522627,
    "name" : "天柱县",
    "parentId" : 522600
},{
    "code" : 522628,
    "name" : "锦屏县",
    "parentId" : 522600
},{
    "code" : 522629,
    "name" : "剑河县",
    "parentId" : 522600
},{
    "code" : 522630,
    "name" : "台江县",
    "parentId" : 522600
},{
    "code" : 522631,
    "name" : "黎平县",
    "parentId" : 522600
},{
    "code" : 522632,
    "name" : "榕江县",
    "parentId" : 522600
},{
    "code" : 522633,
    "name" : "从江县",
    "parentId" : 522600
},{
    "code" : 522634,
    "name" : "雷山县",
    "parentId" : 522600
},{
    "code" : 522635,
    "name" : "麻江县",
    "parentId" : 522600
},{
    "code" : 522636,
    "name" : "丹寨县",
    "parentId" : 522600
},{
    "code" : 522701,
    "name" : "都匀市",
    "parentId" : 522700
},{
    "code" : 522702,
    "name" : "福泉市",
    "parentId" : 522700
},{
    "code" : 522722,
    "name" : "荔波县",
    "parentId" : 522700
},{
    "code" : 522723,
    "name" : "贵定县",
    "parentId" : 522700
},{
    "code" : 522725,
    "name" : "瓮安县",
    "parentId" : 522700
},{
    "code" : 522726,
    "name" : "独山县",
    "parentId" : 522700
},{
    "code" : 522727,
    "name" : "平塘县",
    "parentId" : 522700
},{
    "code" : 522728,
    "name" : "罗甸县",
    "parentId" : 522700
},{
    "code" : 522729,
    "name" : "长顺县",
    "parentId" : 522700
},{
    "code" : 522730,
    "name" : "龙里县",
    "parentId" : 522700
},{
    "code" : 522731,
    "name" : "惠水县",
    "parentId" : 522700
},{
    "code" : 522732,
    "name" : "三都水族自治县",
    "parentId" : 522700
},{
    "code" : 530102,
    "name" : "五华区",
    "parentId" : 530100
},{
    "code" : 530103,
    "name" : "盘龙区",
    "parentId" : 530100
},{
    "code" : 530111,
    "name" : "官渡区",
    "parentId" : 530100
},{
    "code" : 530112,
    "name" : "西山区",
    "parentId" : 530100
},{
    "code" : 530113,
    "name" : "东川区",
    "parentId" : 530100
},{
    "code" : 530114,
    "name" : "呈贡区",
    "parentId" : 530100
},{
    "code" : 530122,
    "name" : "晋宁县",
    "parentId" : 530100
},{
    "code" : 530124,
    "name" : "富民县",
    "parentId" : 530100
},{
    "code" : 530125,
    "name" : "宜良县",
    "parentId" : 530100
},{
    "code" : 530126,
    "name" : "石林彝族自治县",
    "parentId" : 530100
},{
    "code" : 530127,
    "name" : "嵩明县",
    "parentId" : 530100
},{
    "code" : 530128,
    "name" : "禄劝彝族苗族自治县",
    "parentId" : 530100
},{
    "code" : 530129,
    "name" : "寻甸回族彝族自治县",
    "parentId" : 530100
},{
    "code" : 530181,
    "name" : "安宁市",
    "parentId" : 530100
},{
    "code" : 530302,
    "name" : "麒麟区",
    "parentId" : 530300
},{
    "code" : 530321,
    "name" : "马龙县",
    "parentId" : 530300
},{
    "code" : 530322,
    "name" : "陆良县",
    "parentId" : 530300
},{
    "code" : 530323,
    "name" : "师宗县",
    "parentId" : 530300
},{
    "code" : 530324,
    "name" : "罗平县",
    "parentId" : 530300
},{
    "code" : 530325,
    "name" : "富源县",
    "parentId" : 530300
},{
    "code" : 530326,
    "name" : "会泽县",
    "parentId" : 530300
},{
    "code" : 530328,
    "name" : "沾益县",
    "parentId" : 530300
},{
    "code" : 530381,
    "name" : "宣威市",
    "parentId" : 530300
},{
    "code" : 530402,
    "name" : "红塔区",
    "parentId" : 530400
},{
    "code" : 530421,
    "name" : "江川县",
    "parentId" : 530400
},{
    "code" : 530422,
    "name" : "澄江县",
    "parentId" : 530400
},{
    "code" : 530423,
    "name" : "通海县",
    "parentId" : 530400
},{
    "code" : 530424,
    "name" : "华宁县",
    "parentId" : 530400
},{
    "code" : 530425,
    "name" : "易门县",
    "parentId" : 530400
},{
    "code" : 530426,
    "name" : "峨山彝族自治县",
    "parentId" : 530400
},{
    "code" : 530427,
    "name" : "新平彝族傣族自治县",
    "parentId" : 530400
},{
    "code" : 530428,
    "name" : "元江",
    "parentId" : 530400
},{
    "code" : 530502,
    "name" : "隆阳区",
    "parentId" : 530500
},{
    "code" : 530521,
    "name" : "施甸县",
    "parentId" : 530500
},{
    "code" : 530522,
    "name" : "腾冲县",
    "parentId" : 530500
},{
    "code" : 530523,
    "name" : "龙陵县",
    "parentId" : 530500
},{
    "code" : 530524,
    "name" : "昌宁县",
    "parentId" : 530500
},{
    "code" : 530602,
    "name" : "昭阳区",
    "parentId" : 530600
},{
    "code" : 530621,
    "name" : "鲁甸县",
    "parentId" : 530600
},{
    "code" : 530622,
    "name" : "巧家县",
    "parentId" : 530600
},{
    "code" : 530623,
    "name" : "盐津县",
    "parentId" : 530600
},{
    "code" : 530624,
    "name" : "大关县",
    "parentId" : 530600
},{
    "code" : 530625,
    "name" : "永善县",
    "parentId" : 530600
},{
    "code" : 530626,
    "name" : "绥江县",
    "parentId" : 530600
},{
    "code" : 530627,
    "name" : "镇雄县",
    "parentId" : 530600
},{
    "code" : 530628,
    "name" : "彝良县",
    "parentId" : 530600
},{
    "code" : 530629,
    "name" : "威信县",
    "parentId" : 530600
},{
    "code" : 530630,
    "name" : "水富县",
    "parentId" : 530600
},{
    "code" : 530702,
    "name" : "古城区",
    "parentId" : 530700
},{
    "code" : 530721,
    "name" : "玉龙纳西族自治县",
    "parentId" : 530700
},{
    "code" : 530722,
    "name" : "永胜县",
    "parentId" : 530700
},{
    "code" : 530723,
    "name" : "华坪县",
    "parentId" : 530700
},{
    "code" : 530724,
    "name" : "宁蒗彝族自治县",
    "parentId" : 530700
},{
    "code" : 530802,
    "name" : "思茅区",
    "parentId" : 530800
},{
    "code" : 530821,
    "name" : "宁洱哈尼族彝族自治县",
    "parentId" : 530800
},{
    "code" : 530822,
    "name" : "墨江哈尼族自治县",
    "parentId" : 530800
},{
    "code" : 530823,
    "name" : "景东彝族自治县",
    "parentId" : 530800
},{
    "code" : 530824,
    "name" : "景谷傣族彝族自治县",
    "parentId" : 530800
},{
    "code" : 530825,
    "name" : "镇沅",
    "parentId" : 530800
},{
    "code" : 530826,
    "name" : "江城哈尼族彝族自治县",
    "parentId" : 530800
},{
    "code" : 530827,
    "name" : "孟连",
    "parentId" : 530800
},{
    "code" : 530828,
    "name" : "澜沧拉祜族自治县",
    "parentId" : 530800
},{
    "code" : 530829,
    "name" : "西盟佤族自治县",
    "parentId" : 530800
},{
    "code" : 530902,
    "name" : "临翔区",
    "parentId" : 530900
},{
    "code" : 530921,
    "name" : "凤庆县",
    "parentId" : 530900
},{
    "code" : 530922,
    "name" : "云县",
    "parentId" : 530900
},{
    "code" : 530923,
    "name" : "永德县",
    "parentId" : 530900
},{
    "code" : 530924,
    "name" : "镇康县",
    "parentId" : 530900
},{
    "code" : 530925,
    "name" : "双江",
    "parentId" : 530900
},{
    "code" : 530926,
    "name" : "耿马傣族佤族自治县",
    "parentId" : 530900
},{
    "code" : 530927,
    "name" : "沧源佤族自治县",
    "parentId" : 530900
},{
    "code" : 532301,
    "name" : "楚雄市",
    "parentId" : 532300
},{
    "code" : 532322,
    "name" : "双柏县",
    "parentId" : 532300
},{
    "code" : 532323,
    "name" : "牟定县",
    "parentId" : 532300
},{
    "code" : 532324,
    "name" : "南华县",
    "parentId" : 532300
},{
    "code" : 532325,
    "name" : "姚安县",
    "parentId" : 532300
},{
    "code" : 532326,
    "name" : "大姚县",
    "parentId" : 532300
},{
    "code" : 532327,
    "name" : "永仁县",
    "parentId" : 532300
},{
    "code" : 532328,
    "name" : "元谋县",
    "parentId" : 532300
},{
    "code" : 532329,
    "name" : "武定县",
    "parentId" : 532300
},{
    "code" : 532331,
    "name" : "禄丰县",
    "parentId" : 532300
},{
    "code" : 532501,
    "name" : "个旧市",
    "parentId" : 532500
},{
    "code" : 532502,
    "name" : "开远市",
    "parentId" : 532500
},{
    "code" : 532503,
    "name" : "蒙自市",
    "parentId" : 532500
},{
    "code" : 532504,
    "name" : "弥勒市",
    "parentId" : 532500
},{
    "code" : 532523,
    "name" : "屏边苗族自治县",
    "parentId" : 532500
},{
    "code" : 532524,
    "name" : "建水县",
    "parentId" : 532500
},{
    "code" : 532525,
    "name" : "石屏县",
    "parentId" : 532500
},{
    "code" : 532527,
    "name" : "泸西县",
    "parentId" : 532500
},{
    "code" : 532528,
    "name" : "元阳县",
    "parentId" : 532500
},{
    "code" : 532529,
    "name" : "红河县",
    "parentId" : 532500
},{
    "code" : 532530,
    "name" : "金平苗族瑶族傣族自治县",
    "parentId" : 532500
},{
    "code" : 532531,
    "name" : "绿春县",
    "parentId" : 532500
},{
    "code" : 532532,
    "name" : "河口瑶族自治县",
    "parentId" : 532500
},{
    "code" : 532601,
    "name" : "文山市",
    "parentId" : 532600
},{
    "code" : 532622,
    "name" : "砚山县",
    "parentId" : 532600
},{
    "code" : 532623,
    "name" : "西畴县",
    "parentId" : 532600
},{
    "code" : 532624,
    "name" : "麻栗坡县",
    "parentId" : 532600
},{
    "code" : 532625,
    "name" : "马关县",
    "parentId" : 532600
},{
    "code" : 532626,
    "name" : "丘北县",
    "parentId" : 532600
},{
    "code" : 532627,
    "name" : "广南县",
    "parentId" : 532600
},{
    "code" : 532628,
    "name" : "富宁县",
    "parentId" : 532600
},{
    "code" : 532801,
    "name" : "景洪市",
    "parentId" : 532800
},{
    "code" : 532822,
    "name" : "勐海县",
    "parentId" : 532800
},{
    "code" : 532823,
    "name" : "勐腊县",
    "parentId" : 532800
},{
    "code" : 532901,
    "name" : "大理市",
    "parentId" : 532900
},{
    "code" : 532922,
    "name" : "漾濞彝族自治县",
    "parentId" : 532900
},{
    "code" : 532923,
    "name" : "祥云县",
    "parentId" : 532900
},{
    "code" : 532924,
    "name" : "宾川县",
    "parentId" : 532900
},{
    "code" : 532925,
    "name" : "弥渡县",
    "parentId" : 532900
},{
    "code" : 532926,
    "name" : "南涧彝族自治县",
    "parentId" : 532900
},{
    "code" : 532927,
    "name" : "巍山彝族回族自治县",
    "parentId" : 532900
},{
    "code" : 532928,
    "name" : "永平县",
    "parentId" : 532900
},{
    "code" : 532929,
    "name" : "云龙县",
    "parentId" : 532900
},{
    "code" : 532930,
    "name" : "洱源县",
    "parentId" : 532900
},{
    "code" : 532931,
    "name" : "剑川县",
    "parentId" : 532900
},{
    "code" : 532932,
    "name" : "鹤庆县",
    "parentId" : 532900
},{
    "code" : 533102,
    "name" : "瑞丽市",
    "parentId" : 533100
},{
    "code" : 533103,
    "name" : "芒市",
    "parentId" : 533100
},{
    "code" : 533122,
    "name" : "梁河县",
    "parentId" : 533100
},{
    "code" : 533123,
    "name" : "盈江县",
    "parentId" : 533100
},{
    "code" : 533124,
    "name" : "陇川县",
    "parentId" : 533100
},{
    "code" : 533321,
    "name" : "泸水县",
    "parentId" : 533300
},{
    "code" : 533323,
    "name" : "福贡县",
    "parentId" : 533300
},{
    "code" : 533324,
    "name" : "贡山独龙族怒族自治县",
    "parentId" : 533300
},{
    "code" : 533325,
    "name" : "兰坪白族普米族自治县",
    "parentId" : 533300
},{
    "code" : 533421,
    "name" : "香格里拉县",
    "parentId" : 533400
},{
    "code" : 533422,
    "name" : "德钦县",
    "parentId" : 533400
},{
    "code" : 533423,
    "name" : "维西傈僳族自治县",
    "parentId" : 533400
},{
    "code" : 540102,
    "name" : "城关区",
    "parentId" : 540100
},{
    "code" : 540121,
    "name" : "林周县",
    "parentId" : 540100
},{
    "code" : 540122,
    "name" : "当雄县",
    "parentId" : 540100
},{
    "code" : 540123,
    "name" : "尼木县",
    "parentId" : 540100
},{
    "code" : 540124,
    "name" : "曲水县",
    "parentId" : 540100
},{
    "code" : 540125,
    "name" : "堆龙德庆县",
    "parentId" : 540100
},{
    "code" : 540126,
    "name" : "达孜县",
    "parentId" : 540100
},{
    "code" : 540127,
    "name" : "墨竹工卡县",
    "parentId" : 540100
},{
    "code" : 540202,
    "name" : "桑珠孜区",
    "parentId" : 540200
},{
    "code" : 540221,
    "name" : "南木林县",
    "parentId" : 540200
},{
    "code" : 540222,
    "name" : "江孜县",
    "parentId" : 540200
},{
    "code" : 540223,
    "name" : "定日县",
    "parentId" : 540200
},{
    "code" : 540224,
    "name" : "萨迦县",
    "parentId" : 540200
},{
    "code" : 540225,
    "name" : "拉孜县",
    "parentId" : 540200
},{
    "code" : 540226,
    "name" : "昂仁县",
    "parentId" : 540200
},{
    "code" : 540227,
    "name" : "谢通门县",
    "parentId" : 540200
},{
    "code" : 540228,
    "name" : "白朗县",
    "parentId" : 540200
},{
    "code" : 540229,
    "name" : "仁布县",
    "parentId" : 540200
},{
    "code" : 540230,
    "name" : "康马县",
    "parentId" : 540200
},{
    "code" : 540231,
    "name" : "定结县",
    "parentId" : 540200
},{
    "code" : 540232,
    "name" : "仲巴县",
    "parentId" : 540200
},{
    "code" : 540233,
    "name" : "亚东县",
    "parentId" : 540200
},{
    "code" : 540234,
    "name" : "吉隆县",
    "parentId" : 540200
},{
    "code" : 540235,
    "name" : "聂拉木县",
    "parentId" : 540200
},{
    "code" : 540236,
    "name" : "萨嘎县",
    "parentId" : 540200
},{
    "code" : 540237,
    "name" : "岗巴县",
    "parentId" : 540200
},{
    "code" : 542121,
    "name" : "昌都县",
    "parentId" : 542100
},{
    "code" : 542122,
    "name" : "江达县",
    "parentId" : 542100
},{
    "code" : 542123,
    "name" : "贡觉县",
    "parentId" : 542100
},{
    "code" : 542124,
    "name" : "类乌齐县",
    "parentId" : 542100
},{
    "code" : 542125,
    "name" : "丁青县",
    "parentId" : 542100
},{
    "code" : 542126,
    "name" : "察雅县",
    "parentId" : 542100
},{
    "code" : 542127,
    "name" : "八宿县",
    "parentId" : 542100
},{
    "code" : 542128,
    "name" : "左贡县",
    "parentId" : 542100
},{
    "code" : 542129,
    "name" : "芒康县",
    "parentId" : 542100
},{
    "code" : 542132,
    "name" : "洛隆县",
    "parentId" : 542100
},{
    "code" : 542133,
    "name" : "边坝县",
    "parentId" : 542100
},{
    "code" : 542221,
    "name" : "乃东县",
    "parentId" : 542200
},{
    "code" : 542222,
    "name" : "扎囊县",
    "parentId" : 542200
},{
    "code" : 542223,
    "name" : "贡嘎县",
    "parentId" : 542200
},{
    "code" : 542224,
    "name" : "桑日县",
    "parentId" : 542200
},{
    "code" : 542225,
    "name" : "琼结县",
    "parentId" : 542200
},{
    "code" : 542226,
    "name" : "曲松县",
    "parentId" : 542200
},{
    "code" : 542227,
    "name" : "措美县",
    "parentId" : 542200
},{
    "code" : 542228,
    "name" : "洛扎县",
    "parentId" : 542200
},{
    "code" : 542229,
    "name" : "加查县",
    "parentId" : 542200
},{
    "code" : 542231,
    "name" : "隆子县",
    "parentId" : 542200
},{
    "code" : 542232,
    "name" : "错那县",
    "parentId" : 542200
},{
    "code" : 542233,
    "name" : "浪卡子县",
    "parentId" : 542200
},{
    "code" : 542421,
    "name" : "那曲县",
    "parentId" : 542400
},{
    "code" : 542422,
    "name" : "嘉黎县",
    "parentId" : 542400
},{
    "code" : 542423,
    "name" : "比如县",
    "parentId" : 542400
},{
    "code" : 542424,
    "name" : "聂荣县",
    "parentId" : 542400
},{
    "code" : 542425,
    "name" : "安多县",
    "parentId" : 542400
},{
    "code" : 542426,
    "name" : "申扎县",
    "parentId" : 542400
},{
    "code" : 542427,
    "name" : "索县",
    "parentId" : 542400
},{
    "code" : 542428,
    "name" : "班戈县",
    "parentId" : 542400
},{
    "code" : 542429,
    "name" : "巴青县",
    "parentId" : 542400
},{
    "code" : 542430,
    "name" : "尼玛县",
    "parentId" : 542400
},{
    "code" : 542521,
    "name" : "普兰县",
    "parentId" : 542500
},{
    "code" : 542522,
    "name" : "札达县",
    "parentId" : 542500
},{
    "code" : 542523,
    "name" : "噶尔县",
    "parentId" : 542500
},{
    "code" : 542524,
    "name" : "日土县",
    "parentId" : 542500
},{
    "code" : 542525,
    "name" : "革吉县",
    "parentId" : 542500
},{
    "code" : 542526,
    "name" : "改则县",
    "parentId" : 542500
},{
    "code" : 542527,
    "name" : "措勤县",
    "parentId" : 542500
},{
    "code" : 542621,
    "name" : "林芝县",
    "parentId" : 542600
},{
    "code" : 542622,
    "name" : "工布江达县",
    "parentId" : 542600
},{
    "code" : 542623,
    "name" : "米林县",
    "parentId" : 542600
},{
    "code" : 542624,
    "name" : "墨脱县",
    "parentId" : 542600
},{
    "code" : 542625,
    "name" : "波密县",
    "parentId" : 542600
},{
    "code" : 542626,
    "name" : "察隅县",
    "parentId" : 542600
},{
    "code" : 542627,
    "name" : "朗县",
    "parentId" : 542600
},{
    "code" : 610102,
    "name" : "新城区",
    "parentId" : 610100
},{
    "code" : 610103,
    "name" : "碑林区",
    "parentId" : 610100
},{
    "code" : 610104,
    "name" : "莲湖区",
    "parentId" : 610100
},{
    "code" : 610111,
    "name" : "灞桥区",
    "parentId" : 610100
},{
    "code" : 610112,
    "name" : "未央区",
    "parentId" : 610100
},{
    "code" : 610113,
    "name" : "雁塔区",
    "parentId" : 610100
},{
    "code" : 610114,
    "name" : "阎良区",
    "parentId" : 610100
},{
    "code" : 610115,
    "name" : "临潼区",
    "parentId" : 610100
},{
    "code" : 610116,
    "name" : "长安区",
    "parentId" : 610100
},{
    "code" : 610122,
    "name" : "蓝田县",
    "parentId" : 610100
},{
    "code" : 610124,
    "name" : "周至县",
    "parentId" : 610100
},{
    "code" : 610125,
    "name" : "户县",
    "parentId" : 610100
},{
    "code" : 610126,
    "name" : "高陵县",
    "parentId" : 610100
},{
    "code" : 610202,
    "name" : "王益区",
    "parentId" : 610200
},{
    "code" : 610203,
    "name" : "印台区",
    "parentId" : 610200
},{
    "code" : 610204,
    "name" : "耀州区",
    "parentId" : 610200
},{
    "code" : 610222,
    "name" : "宜君县",
    "parentId" : 610200
},{
    "code" : 610302,
    "name" : "渭滨区",
    "parentId" : 610300
},{
    "code" : 610303,
    "name" : "金台区",
    "parentId" : 610300
},{
    "code" : 610304,
    "name" : "陈仓区",
    "parentId" : 610300
},{
    "code" : 610322,
    "name" : "凤翔县",
    "parentId" : 610300
},{
    "code" : 610323,
    "name" : "岐山县",
    "parentId" : 610300
},{
    "code" : 610324,
    "name" : "扶风县",
    "parentId" : 610300
},{
    "code" : 610326,
    "name" : "眉县",
    "parentId" : 610300
},{
    "code" : 610327,
    "name" : "陇县",
    "parentId" : 610300
},{
    "code" : 610328,
    "name" : "千阳县",
    "parentId" : 610300
},{
    "code" : 610329,
    "name" : "麟游县",
    "parentId" : 610300
},{
    "code" : 610330,
    "name" : "凤县",
    "parentId" : 610300
},{
    "code" : 610331,
    "name" : "太白县",
    "parentId" : 610300
},{
    "code" : 610402,
    "name" : "秦都区",
    "parentId" : 610400
},{
    "code" : 610403,
    "name" : "杨陵区",
    "parentId" : 610400
},{
    "code" : 610404,
    "name" : "渭城区",
    "parentId" : 610400
},{
    "code" : 610422,
    "name" : "三原县",
    "parentId" : 610400
},{
    "code" : 610423,
    "name" : "泾阳县",
    "parentId" : 610400
},{
    "code" : 610424,
    "name" : "乾县",
    "parentId" : 610400
},{
    "code" : 610425,
    "name" : "礼泉县",
    "parentId" : 610400
},{
    "code" : 610426,
    "name" : "永寿县",
    "parentId" : 610400
},{
    "code" : 610427,
    "name" : "彬县",
    "parentId" : 610400
},{
    "code" : 610428,
    "name" : "长武县",
    "parentId" : 610400
},{
    "code" : 610429,
    "name" : "旬邑县",
    "parentId" : 610400
},{
    "code" : 610430,
    "name" : "淳化县",
    "parentId" : 610400
},{
    "code" : 610431,
    "name" : "武功县",
    "parentId" : 610400
},{
    "code" : 610481,
    "name" : "兴平市",
    "parentId" : 610400
},{
    "code" : 610502,
    "name" : "临渭区",
    "parentId" : 610500
},{
    "code" : 610521,
    "name" : "华县",
    "parentId" : 610500
},{
    "code" : 610522,
    "name" : "潼关县",
    "parentId" : 610500
},{
    "code" : 610523,
    "name" : "大荔县",
    "parentId" : 610500
},{
    "code" : 610524,
    "name" : "合阳县",
    "parentId" : 610500
},{
    "code" : 610525,
    "name" : "澄城县",
    "parentId" : 610500
},{
    "code" : 610526,
    "name" : "蒲城县",
    "parentId" : 610500
},{
    "code" : 610527,
    "name" : "白水县",
    "parentId" : 610500
},{
    "code" : 610528,
    "name" : "富平县",
    "parentId" : 610500
},{
    "code" : 610581,
    "name" : "韩城市",
    "parentId" : 610500
},{
    "code" : 610582,
    "name" : "华阴市",
    "parentId" : 610500
},{
    "code" : 610602,
    "name" : "宝塔区",
    "parentId" : 610600
},{
    "code" : 610621,
    "name" : "延长县",
    "parentId" : 610600
},{
    "code" : 610622,
    "name" : "延川县",
    "parentId" : 610600
},{
    "code" : 610623,
    "name" : "子长县",
    "parentId" : 610600
},{
    "code" : 610624,
    "name" : "安塞县",
    "parentId" : 610600
},{
    "code" : 610625,
    "name" : "志丹县",
    "parentId" : 610600
},{
    "code" : 610626,
    "name" : "吴起县",
    "parentId" : 610600
},{
    "code" : 610627,
    "name" : "甘泉县",
    "parentId" : 610600
},{
    "code" : 610628,
    "name" : "富县",
    "parentId" : 610600
},{
    "code" : 610629,
    "name" : "洛川县",
    "parentId" : 610600
},{
    "code" : 610630,
    "name" : "宜川县",
    "parentId" : 610600
},{
    "code" : 610631,
    "name" : "黄龙县",
    "parentId" : 610600
},{
    "code" : 610632,
    "name" : "黄陵县",
    "parentId" : 610600
},{
    "code" : 610702,
    "name" : "汉台区",
    "parentId" : 610700
},{
    "code" : 610721,
    "name" : "南郑县",
    "parentId" : 610700
},{
    "code" : 610722,
    "name" : "城固县",
    "parentId" : 610700
},{
    "code" : 610723,
    "name" : "洋县",
    "parentId" : 610700
},{
    "code" : 610724,
    "name" : "西乡县",
    "parentId" : 610700
},{
    "code" : 610725,
    "name" : "勉县",
    "parentId" : 610700
},{
    "code" : 610726,
    "name" : "宁强县",
    "parentId" : 610700
},{
    "code" : 610727,
    "name" : "略阳县",
    "parentId" : 610700
},{
    "code" : 610728,
    "name" : "镇巴县",
    "parentId" : 610700
},{
    "code" : 610729,
    "name" : "留坝县",
    "parentId" : 610700
},{
    "code" : 610730,
    "name" : "佛坪县",
    "parentId" : 610700
},{
    "code" : 610802,
    "name" : "榆阳区",
    "parentId" : 610800
},{
    "code" : 610821,
    "name" : "神木县",
    "parentId" : 610800
},{
    "code" : 610822,
    "name" : "府谷县",
    "parentId" : 610800
},{
    "code" : 610823,
    "name" : "横山县",
    "parentId" : 610800
},{
    "code" : 610824,
    "name" : "靖边县",
    "parentId" : 610800
},{
    "code" : 610825,
    "name" : "定边县",
    "parentId" : 610800
},{
    "code" : 610826,
    "name" : "绥德县",
    "parentId" : 610800
},{
    "code" : 610827,
    "name" : "米脂县",
    "parentId" : 610800
},{
    "code" : 610828,
    "name" : "佳县",
    "parentId" : 610800
},{
    "code" : 610829,
    "name" : "吴堡县",
    "parentId" : 610800
},{
    "code" : 610830,
    "name" : "清涧县",
    "parentId" : 610800
},{
    "code" : 610831,
    "name" : "子洲县",
    "parentId" : 610800
},{
    "code" : 610902,
    "name" : "汉滨区",
    "parentId" : 610900
},{
    "code" : 610921,
    "name" : "汉阴县",
    "parentId" : 610900
},{
    "code" : 610922,
    "name" : "石泉县",
    "parentId" : 610900
},{
    "code" : 610923,
    "name" : "宁陕县",
    "parentId" : 610900
},{
    "code" : 610924,
    "name" : "紫阳县",
    "parentId" : 610900
},{
    "code" : 610925,
    "name" : "岚皋县",
    "parentId" : 610900
},{
    "code" : 610926,
    "name" : "平利县",
    "parentId" : 610900
},{
    "code" : 610927,
    "name" : "镇坪县",
    "parentId" : 610900
},{
    "code" : 610928,
    "name" : "旬阳县",
    "parentId" : 610900
},{
    "code" : 610929,
    "name" : "白河县",
    "parentId" : 610900
},{
    "code" : 611002,
    "name" : "商州区",
    "parentId" : 611000
},{
    "code" : 611021,
    "name" : "洛南县",
    "parentId" : 611000
},{
    "code" : 611022,
    "name" : "丹凤县",
    "parentId" : 611000
},{
    "code" : 611023,
    "name" : "商南县",
    "parentId" : 611000
},{
    "code" : 611024,
    "name" : "山阳县",
    "parentId" : 611000
},{
    "code" : 611025,
    "name" : "镇安县",
    "parentId" : 611000
},{
    "code" : 611026,
    "name" : "柞水县",
    "parentId" : 611000
},{
    "code" : 620102,
    "name" : "城关区",
    "parentId" : 620100
},{
    "code" : 620103,
    "name" : "七里河区",
    "parentId" : 620100
},{
    "code" : 620104,
    "name" : "西固区",
    "parentId" : 620100
},{
    "code" : 620105,
    "name" : "安宁区",
    "parentId" : 620100
},{
    "code" : 620111,
    "name" : "红古区",
    "parentId" : 620100
},{
    "code" : 620121,
    "name" : "永登县",
    "parentId" : 620100
},{
    "code" : 620122,
    "name" : "皋兰县",
    "parentId" : 620100
},{
    "code" : 620123,
    "name" : "榆中县",
    "parentId" : 620100
},{
    "code" : 620201,
    "name" : "嘉峪关市",
    "parentId" : 620200
},{
    "code" : 620302,
    "name" : "金川区",
    "parentId" : 620300
},{
    "code" : 620321,
    "name" : "永昌县",
    "parentId" : 620300
},{
    "code" : 620402,
    "name" : "白银区",
    "parentId" : 620400
},{
    "code" : 620403,
    "name" : "平川区",
    "parentId" : 620400
},{
    "code" : 620421,
    "name" : "靖远县",
    "parentId" : 620400
},{
    "code" : 620422,
    "name" : "会宁县",
    "parentId" : 620400
},{
    "code" : 620423,
    "name" : "景泰县",
    "parentId" : 620400
},{
    "code" : 620502,
    "name" : "秦州区",
    "parentId" : 620500
},{
    "code" : 620503,
    "name" : "麦积区",
    "parentId" : 620500
},{
    "code" : 620521,
    "name" : "清水县",
    "parentId" : 620500
},{
    "code" : 620522,
    "name" : "秦安县",
    "parentId" : 620500
},{
    "code" : 620523,
    "name" : "甘谷县",
    "parentId" : 620500
},{
    "code" : 620524,
    "name" : "武山县",
    "parentId" : 620500
},{
    "code" : 620525,
    "name" : "张家川回族自治县",
    "parentId" : 620500
},{
    "code" : 620602,
    "name" : "凉州区",
    "parentId" : 620600
},{
    "code" : 620621,
    "name" : "民勤县",
    "parentId" : 620600
},{
    "code" : 620622,
    "name" : "古浪县",
    "parentId" : 620600
},{
    "code" : 620623,
    "name" : "天祝藏族自治县",
    "parentId" : 620600
},{
    "code" : 620702,
    "name" : "甘州区",
    "parentId" : 620700
},{
    "code" : 620721,
    "name" : "肃南裕固族自治县",
    "parentId" : 620700
},{
    "code" : 620722,
    "name" : "民乐县",
    "parentId" : 620700
},{
    "code" : 620723,
    "name" : "临泽县",
    "parentId" : 620700
},{
    "code" : 620724,
    "name" : "高台县",
    "parentId" : 620700
},{
    "code" : 620725,
    "name" : "山丹县",
    "parentId" : 620700
},{
    "code" : 620802,
    "name" : "崆峒区",
    "parentId" : 620800
},{
    "code" : 620821,
    "name" : "泾川县",
    "parentId" : 620800
},{
    "code" : 620822,
    "name" : "灵台县",
    "parentId" : 620800
},{
    "code" : 620823,
    "name" : "崇信县",
    "parentId" : 620800
},{
    "code" : 620824,
    "name" : "华亭县",
    "parentId" : 620800
},{
    "code" : 620825,
    "name" : "庄浪县",
    "parentId" : 620800
},{
    "code" : 620826,
    "name" : "静宁县",
    "parentId" : 620800
},{
    "code" : 620902,
    "name" : "肃州区",
    "parentId" : 620900
},{
    "code" : 620921,
    "name" : "金塔县",
    "parentId" : 620900
},{
    "code" : 620922,
    "name" : "瓜州县",
    "parentId" : 620900
},{
    "code" : 620923,
    "name" : "肃北蒙古族自治县",
    "parentId" : 620900
},{
    "code" : 620924,
    "name" : "阿克塞哈萨克族自治县",
    "parentId" : 620900
},{
    "code" : 620981,
    "name" : "玉门市",
    "parentId" : 620900
},{
    "code" : 620982,
    "name" : "敦煌市",
    "parentId" : 620900
},{
    "code" : 621002,
    "name" : "西峰区",
    "parentId" : 621000
},{
    "code" : 621021,
    "name" : "庆城县",
    "parentId" : 621000
},{
    "code" : 621022,
    "name" : "环县",
    "parentId" : 621000
},{
    "code" : 621023,
    "name" : "华池县",
    "parentId" : 621000
},{
    "code" : 621024,
    "name" : "合水县",
    "parentId" : 621000
},{
    "code" : 621025,
    "name" : "正宁县",
    "parentId" : 621000
},{
    "code" : 621026,
    "name" : "宁县",
    "parentId" : 621000
},{
    "code" : 621027,
    "name" : "镇原县",
    "parentId" : 621000
},{
    "code" : 621102,
    "name" : "安定区",
    "parentId" : 621100
},{
    "code" : 621121,
    "name" : "通渭县",
    "parentId" : 621100
},{
    "code" : 621122,
    "name" : "陇西县",
    "parentId" : 621100
},{
    "code" : 621123,
    "name" : "渭源县",
    "parentId" : 621100
},{
    "code" : 621124,
    "name" : "临洮县",
    "parentId" : 621100
},{
    "code" : 621125,
    "name" : "漳县",
    "parentId" : 621100
},{
    "code" : 621126,
    "name" : "岷县",
    "parentId" : 621100
},{
    "code" : 621202,
    "name" : "武都区",
    "parentId" : 621200
},{
    "code" : 621221,
    "name" : "成县",
    "parentId" : 621200
},{
    "code" : 621222,
    "name" : "文县",
    "parentId" : 621200
},{
    "code" : 621223,
    "name" : "宕昌县",
    "parentId" : 621200
},{
    "code" : 621224,
    "name" : "康县",
    "parentId" : 621200
},{
    "code" : 621225,
    "name" : "西和县",
    "parentId" : 621200
},{
    "code" : 621226,
    "name" : "礼县",
    "parentId" : 621200
},{
    "code" : 621227,
    "name" : "徽县",
    "parentId" : 621200
},{
    "code" : 621228,
    "name" : "两当县",
    "parentId" : 621200
},{
    "code" : 622901,
    "name" : "临夏市",
    "parentId" : 622900
},{
    "code" : 622921,
    "name" : "临夏县",
    "parentId" : 622900
},{
    "code" : 622922,
    "name" : "康乐县",
    "parentId" : 622900
},{
    "code" : 622923,
    "name" : "永靖县",
    "parentId" : 622900
},{
    "code" : 622924,
    "name" : "广河县",
    "parentId" : 622900
},{
    "code" : 622925,
    "name" : "和政县",
    "parentId" : 622900
},{
    "code" : 622926,
    "name" : "东乡族自治县",
    "parentId" : 622900
},{
    "code" : 622927,
    "name" : "积石山县",
    "parentId" : 622900
},{
    "code" : 623001,
    "name" : "合作市",
    "parentId" : 623000
},{
    "code" : 623021,
    "name" : "临潭县",
    "parentId" : 623000
},{
    "code" : 623022,
    "name" : "卓尼县",
    "parentId" : 623000
},{
    "code" : 623023,
    "name" : "舟曲县",
    "parentId" : 623000
},{
    "code" : 623024,
    "name" : "迭部县",
    "parentId" : 623000
},{
    "code" : 623025,
    "name" : "玛曲县",
    "parentId" : 623000
},{
    "code" : 623026,
    "name" : "碌曲县",
    "parentId" : 623000
},{
    "code" : 623027,
    "name" : "夏河县",
    "parentId" : 623000
},{
    "code" : 630102,
    "name" : "城东区",
    "parentId" : 630100
},{
    "code" : 630103,
    "name" : "城中区",
    "parentId" : 630100
},{
    "code" : 630104,
    "name" : "城西区",
    "parentId" : 630100
},{
    "code" : 630105,
    "name" : "城北区",
    "parentId" : 630100
},{
    "code" : 630121,
    "name" : "大通回族土族自治县",
    "parentId" : 630100
},{
    "code" : 630122,
    "name" : "湟中县",
    "parentId" : 630100
},{
    "code" : 630123,
    "name" : "湟源县",
    "parentId" : 630100
},{
    "code" : 630202,
    "name" : "乐都区",
    "parentId" : 630200
},{
    "code" : 630221,
    "name" : "平安县",
    "parentId" : 630200
},{
    "code" : 630222,
    "name" : "民和回族土族自治县",
    "parentId" : 630200
},{
    "code" : 630223,
    "name" : "互助土族自治县",
    "parentId" : 630200
},{
    "code" : 630224,
    "name" : "化隆回族自治县",
    "parentId" : 630200
},{
    "code" : 630225,
    "name" : "循化撒拉族自治县",
    "parentId" : 630200
},{
    "code" : 632221,
    "name" : "门源回族自治县",
    "parentId" : 632200
},{
    "code" : 632222,
    "name" : "祁连县",
    "parentId" : 632200
},{
    "code" : 632223,
    "name" : "海晏县",
    "parentId" : 632200
},{
    "code" : 632224,
    "name" : "刚察县",
    "parentId" : 632200
},{
    "code" : 632321,
    "name" : "同仁县",
    "parentId" : 632300
},{
    "code" : 632322,
    "name" : "尖扎县",
    "parentId" : 632300
},{
    "code" : 632323,
    "name" : "泽库县",
    "parentId" : 632300
},{
    "code" : 632324,
    "name" : "河南蒙古族自治县",
    "parentId" : 632300
},{
    "code" : 632521,
    "name" : "共和县",
    "parentId" : 632500
},{
    "code" : 632522,
    "name" : "同德县",
    "parentId" : 632500
},{
    "code" : 632523,
    "name" : "贵德县",
    "parentId" : 632500
},{
    "code" : 632524,
    "name" : "兴海县",
    "parentId" : 632500
},{
    "code" : 632525,
    "name" : "贵南县",
    "parentId" : 632500
},{
    "code" : 632621,
    "name" : "玛沁县",
    "parentId" : 632600
},{
    "code" : 632622,
    "name" : "班玛县",
    "parentId" : 632600
},{
    "code" : 632623,
    "name" : "甘德县",
    "parentId" : 632600
},{
    "code" : 632624,
    "name" : "达日县",
    "parentId" : 632600
},{
    "code" : 632625,
    "name" : "久治县",
    "parentId" : 632600
},{
    "code" : 632626,
    "name" : "玛多县",
    "parentId" : 632600
},{
    "code" : 632721,
    "name" : "玉树市",
    "parentId" : 632700
},{
    "code" : 632722,
    "name" : "杂多县",
    "parentId" : 632700
},{
    "code" : 632723,
    "name" : "称多县",
    "parentId" : 632700
},{
    "code" : 632724,
    "name" : "治多县",
    "parentId" : 632700
},{
    "code" : 632725,
    "name" : "囊谦县",
    "parentId" : 632700
},{
    "code" : 632726,
    "name" : "曲麻莱县",
    "parentId" : 632700
},{
    "code" : 632801,
    "name" : "格尔木市",
    "parentId" : 632800
},{
    "code" : 632802,
    "name" : "德令哈市",
    "parentId" : 632800
},{
    "code" : 632821,
    "name" : "乌兰县",
    "parentId" : 632800
},{
    "code" : 632822,
    "name" : "都兰县",
    "parentId" : 632800
},{
    "code" : 632823,
    "name" : "天峻县",
    "parentId" : 632800
},{
    "code" : 632824,
    "name" : "冷湖行政委员会",
    "parentId" : 632800
},{
    "code" : 632825,
    "name" : "大柴旦行政委员会",
    "parentId" : 632800
},{
    "code" : 632826,
    "name" : "茫崖行政委员会",
    "parentId" : 632800
},{
    "code" : 640104,
    "name" : "兴庆区",
    "parentId" : 640100
},{
    "code" : 640105,
    "name" : "西夏区",
    "parentId" : 640100
},{
    "code" : 640106,
    "name" : "金凤区",
    "parentId" : 640100
},{
    "code" : 640121,
    "name" : "永宁县",
    "parentId" : 640100
},{
    "code" : 640122,
    "name" : "贺兰县",
    "parentId" : 640100
},{
    "code" : 640181,
    "name" : "灵武市",
    "parentId" : 640100
},{
    "code" : 640202,
    "name" : "大武口区",
    "parentId" : 640200
},{
    "code" : 640205,
    "name" : "惠农区",
    "parentId" : 640200
},{
    "code" : 640221,
    "name" : "平罗县",
    "parentId" : 640200
},{
    "code" : 640302,
    "name" : "利通区",
    "parentId" : 640300
},{
    "code" : 640303,
    "name" : "红寺堡区",
    "parentId" : 640300
},{
    "code" : 640323,
    "name" : "盐池县",
    "parentId" : 640300
},{
    "code" : 640324,
    "name" : "同心县",
    "parentId" : 640300
},{
    "code" : 640381,
    "name" : "青铜峡市",
    "parentId" : 640300
},{
    "code" : 640402,
    "name" : "原州区",
    "parentId" : 640400
},{
    "code" : 640422,
    "name" : "西吉县",
    "parentId" : 640400
},{
    "code" : 640423,
    "name" : "隆德县",
    "parentId" : 640400
},{
    "code" : 640424,
    "name" : "泾源县",
    "parentId" : 640400
},{
    "code" : 640425,
    "name" : "彭阳县",
    "parentId" : 640400
},{
    "code" : 640502,
    "name" : "沙坡头区",
    "parentId" : 640500
},{
    "code" : 640521,
    "name" : "中宁县",
    "parentId" : 640500
},{
    "code" : 640522,
    "name" : "海原县",
    "parentId" : 640500
},{
    "code" : 650102,
    "name" : "天山区",
    "parentId" : 650100
},{
    "code" : 650103,
    "name" : "沙依巴克区",
    "parentId" : 650100
},{
    "code" : 650104,
    "name" : "新市区",
    "parentId" : 650100
},{
    "code" : 650105,
    "name" : "水磨沟区",
    "parentId" : 650100
},{
    "code" : 650106,
    "name" : "头屯河区",
    "parentId" : 650100
},{
    "code" : 650107,
    "name" : "达坂城区",
    "parentId" : 650100
},{
    "code" : 650109,
    "name" : "米东区",
    "parentId" : 650100
},{
    "code" : 650121,
    "name" : "乌鲁木齐县",
    "parentId" : 650100
},{
    "code" : 650202,
    "name" : "独山子区",
    "parentId" : 650200
},{
    "code" : 650203,
    "name" : "克拉玛依区",
    "parentId" : 650200
},{
    "code" : 650204,
    "name" : "白碱滩区",
    "parentId" : 650200
},{
    "code" : 650205,
    "name" : "乌尔禾区",
    "parentId" : 650200
},{
    "code" : 652101,
    "name" : "吐鲁番市",
    "parentId" : 652100
},{
    "code" : 652122,
    "name" : "鄯善县",
    "parentId" : 652100
},{
    "code" : 652123,
    "name" : "托克逊县",
    "parentId" : 652100
},{
    "code" : 652201,
    "name" : "哈密市",
    "parentId" : 652200
},{
    "code" : 652222,
    "name" : "巴里坤哈萨克自治县",
    "parentId" : 652200
},{
    "code" : 652223,
    "name" : "伊吾县",
    "parentId" : 652200
},{
    "code" : 652301,
    "name" : "昌吉市",
    "parentId" : 652300
},{
    "code" : 652302,
    "name" : "阜康市",
    "parentId" : 652300
},{
    "code" : 652323,
    "name" : "呼图壁县",
    "parentId" : 652300
},{
    "code" : 652324,
    "name" : "玛纳斯县",
    "parentId" : 652300
},{
    "code" : 652325,
    "name" : "奇台县",
    "parentId" : 652300
},{
    "code" : 652327,
    "name" : "吉木萨尔县",
    "parentId" : 652300
},{
    "code" : 652328,
    "name" : "木垒哈萨克自治县",
    "parentId" : 652300
},{
    "code" : 652701,
    "name" : "博乐市",
    "parentId" : 652700
},{
    "code" : 652722,
    "name" : "精河县",
    "parentId" : 652700
},{
    "code" : 652723,
    "name" : "温泉县",
    "parentId" : 652700
},{
    "code" : 652801,
    "name" : "库尔勒市",
    "parentId" : 652800
},{
    "code" : 652822,
    "name" : "轮台县",
    "parentId" : 652800
},{
    "code" : 652823,
    "name" : "尉犁县",
    "parentId" : 652800
},{
    "code" : 652824,
    "name" : "若羌县",
    "parentId" : 652800
},{
    "code" : 652825,
    "name" : "且末县",
    "parentId" : 652800
},{
    "code" : 652826,
    "name" : "焉耆回族自治县",
    "parentId" : 652800
},{
    "code" : 652827,
    "name" : "和静县",
    "parentId" : 652800
},{
    "code" : 652828,
    "name" : "和硕县",
    "parentId" : 652800
},{
    "code" : 652829,
    "name" : "博湖县",
    "parentId" : 652800
},{
    "code" : 652901,
    "name" : "阿克苏市",
    "parentId" : 652900
},{
    "code" : 652922,
    "name" : "温宿县",
    "parentId" : 652900
},{
    "code" : 652923,
    "name" : "库车县",
    "parentId" : 652900
},{
    "code" : 652924,
    "name" : "沙雅县",
    "parentId" : 652900
},{
    "code" : 652925,
    "name" : "新和县",
    "parentId" : 652900
},{
    "code" : 652926,
    "name" : "拜城县",
    "parentId" : 652900
},{
    "code" : 652927,
    "name" : "乌什县",
    "parentId" : 652900
},{
    "code" : 652928,
    "name" : "阿瓦提县",
    "parentId" : 652900
},{
    "code" : 652929,
    "name" : "柯坪县",
    "parentId" : 652900
},{
    "code" : 653001,
    "name" : "阿图什市",
    "parentId" : 653000
},{
    "code" : 653022,
    "name" : "阿克陶县",
    "parentId" : 653000
},{
    "code" : 653023,
    "name" : "阿合奇县",
    "parentId" : 653000
},{
    "code" : 653024,
    "name" : "乌恰县",
    "parentId" : 653000
},{
    "code" : 653101,
    "name" : "喀什市",
    "parentId" : 653100
},{
    "code" : 653121,
    "name" : "疏附县",
    "parentId" : 653100
},{
    "code" : 653122,
    "name" : "疏勒县",
    "parentId" : 653100
},{
    "code" : 653123,
    "name" : "英吉沙县",
    "parentId" : 653100
},{
    "code" : 653124,
    "name" : "泽普县",
    "parentId" : 653100
},{
    "code" : 653125,
    "name" : "莎车县",
    "parentId" : 653100
},{
    "code" : 653126,
    "name" : "叶城县",
    "parentId" : 653100
},{
    "code" : 653127,
    "name" : "麦盖提县",
    "parentId" : 653100
},{
    "code" : 653128,
    "name" : "岳普湖县",
    "parentId" : 653100
},{
    "code" : 653129,
    "name" : "伽师县",
    "parentId" : 653100
},{
    "code" : 653130,
    "name" : "巴楚县",
    "parentId" : 653100
},{
    "code" : 653131,
    "name" : "塔什库尔干塔吉克自治县",
    "parentId" : 653100
},{
    "code" : 653201,
    "name" : "和田市",
    "parentId" : 653200
},{
    "code" : 653221,
    "name" : "和田县",
    "parentId" : 653200
},{
    "code" : 653222,
    "name" : "墨玉县",
    "parentId" : 653200
},{
    "code" : 653223,
    "name" : "皮山县",
    "parentId" : 653200
},{
    "code" : 653224,
    "name" : "洛浦县",
    "parentId" : 653200
},{
    "code" : 653225,
    "name" : "策勒县",
    "parentId" : 653200
},{
    "code" : 653226,
    "name" : "于田县",
    "parentId" : 653200
},{
    "code" : 653227,
    "name" : "民丰县",
    "parentId" : 653200
},{
    "code" : 654002,
    "name" : "伊宁市",
    "parentId" : 654000
},{
    "code" : 654003,
    "name" : "奎屯市",
    "parentId" : 654000
},{
    "code" : 654021,
    "name" : "伊宁县",
    "parentId" : 654000
},{
    "code" : 654022,
    "name" : "察布查尔锡伯自治县",
    "parentId" : 654000
},{
    "code" : 654023,
    "name" : "霍城县",
    "parentId" : 654000
},{
    "code" : 654024,
    "name" : "巩留县",
    "parentId" : 654000
},{
    "code" : 654025,
    "name" : "新源县",
    "parentId" : 654000
},{
    "code" : 654026,
    "name" : "昭苏县",
    "parentId" : 654000
},{
    "code" : 654027,
    "name" : "特克斯县",
    "parentId" : 654000
},{
    "code" : 654028,
    "name" : "尼勒克县",
    "parentId" : 654000
},{
    "code" : 654201,
    "name" : "塔城市",
    "parentId" : 654200
},{
    "code" : 654202,
    "name" : "乌苏市",
    "parentId" : 654200
},{
    "code" : 654221,
    "name" : "额敏县",
    "parentId" : 654200
},{
    "code" : 654223,
    "name" : "沙湾县",
    "parentId" : 654200
},{
    "code" : 654224,
    "name" : "托里县",
    "parentId" : 654200
},{
    "code" : 654225,
    "name" : "裕民县",
    "parentId" : 654200
},{
    "code" : 654226,
    "name" : "和布克赛尔蒙古自治县",
    "parentId" : 654200
},{
    "code" : 654301,
    "name" : "阿勒泰市",
    "parentId" : 654300
},{
    "code" : 654321,
    "name" : "布尔津县",
    "parentId" : 654300
},{
    "code" : 654322,
    "name" : "富蕴县",
    "parentId" : 654300
},{
    "code" : 654323,
    "name" : "福海县",
    "parentId" : 654300
},{
    "code" : 654324,
    "name" : "哈巴河县",
    "parentId" : 654300
},{
    "code" : 654325,
    "name" : "青河县",
    "parentId" : 654300
},{
    "code" : 654326,
    "name" : "吉木乃县",
    "parentId" : 654300
},{
    "code" : 820101,
    "name" : "澳门半岛",
    "parentId" : 820100
},{
    "code" : 820102,
    "name" : "凼仔",
    "parentId" : 820100
},{
    "code" : 820103,
    "name" : "路凼城",
    "parentId" : 820100
},{
    "code" : 820104,
    "name" : "路环",
    "parentId" : 820100
},{
    "code" : 110101001,
    "name" : "东华门街道",
    "parentId" : 110101
},{
    "code" : 110101003,
    "name" : "交道口街道",
    "parentId" : 110101
},{
    "code" : 110101004,
    "name" : "安定门街道",
    "parentId" : 110101
},{
    "code" : 110101005,
    "name" : "北新桥街道",
    "parentId" : 110101
},{
    "code" : 110101006,
    "name" : "东四街道",
    "parentId" : 110101
},{
    "code" : 110101007,
    "name" : "朝阳门街道",
    "parentId" : 110101
},{
    "code" : 110101008,
    "name" : "建国门街道",
    "parentId" : 110101
},{
    "code" : 110101009,
    "name" : "东直门街道",
    "parentId" : 110101
},{
    "code" : 110101010,
    "name" : "和平里街道",
    "parentId" : 110101
},{
    "code" : 110101011,
    "name" : "前门街道",
    "parentId" : 110101
},{
    "code" : 110101012,
    "name" : "崇文门外街道",
    "parentId" : 110101
},{
    "code" : 110101013,
    "name" : "东花市街道",
    "parentId" : 110101
},{
    "code" : 110101014,
    "name" : "龙潭街道",
    "parentId" : 110101
},{
    "code" : 110101015,
    "name" : "体育馆路街道",
    "parentId" : 110101
},{
    "code" : 110101016,
    "name" : "天坛街道",
    "parentId" : 110101
},{
    "code" : 110101017,
    "name" : "永定门外街道",
    "parentId" : 110101
},{
    "code" : 110102001,
    "name" : "西长安街街道",
    "parentId" : 110102
},{
    "code" : 110102003,
    "name" : "新街口街道",
    "parentId" : 110102
},{
    "code" : 110102007,
    "name" : "月坛街道",
    "parentId" : 110102
},{
    "code" : 110102009,
    "name" : "展览路街道",
    "parentId" : 110102
},{
    "code" : 110102010,
    "name" : "德胜街道",
    "parentId" : 110102
},{
    "code" : 110102011,
    "name" : "金融街街道",
    "parentId" : 110102
},{
    "code" : 110102012,
    "name" : "什刹海街道",
    "parentId" : 110102
},{
    "code" : 110102013,
    "name" : "大栅栏街道",
    "parentId" : 110102
},{
    "code" : 110102014,
    "name" : "天桥街道",
    "parentId" : 110102
},{
    "code" : 110102015,
    "name" : "椿树街道",
    "parentId" : 110102
},{
    "code" : 110102016,
    "name" : "陶然亭街道",
    "parentId" : 110102
},{
    "code" : 110102017,
    "name" : "广安门内街道",
    "parentId" : 110102
},{
    "code" : 110102018,
    "name" : "牛街街道",
    "parentId" : 110102
},{
    "code" : 110102019,
    "name" : "白纸坊街道",
    "parentId" : 110102
},{
    "code" : 110102020,
    "name" : "广安门外街道",
    "parentId" : 110102
},{
    "code" : 110105001,
    "name" : "建外街道",
    "parentId" : 110105
},{
    "code" : 110105002,
    "name" : "朝外街道",
    "parentId" : 110105
},{
    "code" : 110105003,
    "name" : "呼家楼街道",
    "parentId" : 110105
},{
    "code" : 110105004,
    "name" : "三里屯街道",
    "parentId" : 110105
},{
    "code" : 110105005,
    "name" : "左家庄街道",
    "parentId" : 110105
},{
    "code" : 110105006,
    "name" : "香河园街道",
    "parentId" : 110105
},{
    "code" : 110105007,
    "name" : "和平街街道",
    "parentId" : 110105
},{
    "code" : 110105008,
    "name" : "安贞街道",
    "parentId" : 110105
},{
    "code" : 110105009,
    "name" : "亚运村街道",
    "parentId" : 110105
},{
    "code" : 110105010,
    "name" : "小关街道",
    "parentId" : 110105
},{
    "code" : 110105011,
    "name" : "酒仙桥街道",
    "parentId" : 110105
},{
    "code" : 110105012,
    "name" : "麦子店街道",
    "parentId" : 110105
},{
    "code" : 110105013,
    "name" : "团结湖街道",
    "parentId" : 110105
},{
    "code" : 110105014,
    "name" : "六里屯街道",
    "parentId" : 110105
},{
    "code" : 110105015,
    "name" : "八里庄街道",
    "parentId" : 110105
},{
    "code" : 110105016,
    "name" : "双井街道",
    "parentId" : 110105
},{
    "code" : 110105017,
    "name" : "劲松街道",
    "parentId" : 110105
},{
    "code" : 110105018,
    "name" : "潘家园街道",
    "parentId" : 110105
},{
    "code" : 110105019,
    "name" : "垡头街道",
    "parentId" : 110105
},{
    "code" : 110105021,
    "name" : "南磨房",
    "parentId" : 110105
},{
    "code" : 110105022,
    "name" : "高碑店",
    "parentId" : 110105
},{
    "code" : 110105023,
    "name" : "将台",
    "parentId" : 110105
},{
    "code" : 110105024,
    "name" : "太阳宫",
    "parentId" : 110105
},{
    "code" : 110105025,
    "name" : "大屯街道",
    "parentId" : 110105
},{
    "code" : 110105026,
    "name" : "望京街道",
    "parentId" : 110105
},{
    "code" : 110105027,
    "name" : "小红门",
    "parentId" : 110105
},{
    "code" : 110105028,
    "name" : "十八里店",
    "parentId" : 110105
},{
    "code" : 110105029,
    "name" : "平房",
    "parentId" : 110105
},{
    "code" : 110105030,
    "name" : "东风",
    "parentId" : 110105
},{
    "code" : 110105031,
    "name" : "奥运村街道",
    "parentId" : 110105
},{
    "code" : 110105032,
    "name" : "来广营",
    "parentId" : 110105
},{
    "code" : 110105033,
    "name" : "常营",
    "parentId" : 110105
},{
    "code" : 110105034,
    "name" : "三间房",
    "parentId" : 110105
},{
    "code" : 110105035,
    "name" : "管庄",
    "parentId" : 110105
},{
    "code" : 110105036,
    "name" : "金盏",
    "parentId" : 110105
},{
    "code" : 110105037,
    "name" : "孙河",
    "parentId" : 110105
},{
    "code" : 110105038,
    "name" : "崔各庄",
    "parentId" : 110105
},{
    "code" : 110105039,
    "name" : "东坝",
    "parentId" : 110105
},{
    "code" : 110105040,
    "name" : "黑庄户",
    "parentId" : 110105
},{
    "code" : 110105041,
    "name" : "豆各庄",
    "parentId" : 110105
},{
    "code" : 110105042,
    "name" : "王四营",
    "parentId" : 110105
},{
    "code" : 110105501,
    "name" : "望京开发街道",
    "parentId" : 110105
},{
    "code" : 110106001,
    "name" : "右安门街道",
    "parentId" : 110106
},{
    "code" : 110106002,
    "name" : "太平桥街道",
    "parentId" : 110106
},{
    "code" : 110106003,
    "name" : "西罗园街道",
    "parentId" : 110106
},{
    "code" : 110106004,
    "name" : "大红门街道",
    "parentId" : 110106
},{
    "code" : 110106005,
    "name" : "南苑街道",
    "parentId" : 110106
},{
    "code" : 110106006,
    "name" : "东高地街道",
    "parentId" : 110106
},{
    "code" : 110106008,
    "name" : "卢沟桥街道",
    "parentId" : 110106
},{
    "code" : 110106009,
    "name" : "丰台街道",
    "parentId" : 110106
},{
    "code" : 110106010,
    "name" : "新村街道",
    "parentId" : 110106
},{
    "code" : 110106011,
    "name" : "长辛店街道",
    "parentId" : 110106
},{
    "code" : 110106012,
    "name" : "云岗街道",
    "parentId" : 110106
},{
    "code" : 110106013,
    "name" : "方庄",
    "parentId" : 110106
},{
    "code" : 110106014,
    "name" : "宛平城",
    "parentId" : 110106
},{
    "code" : 110106015,
    "name" : "马家堡街道",
    "parentId" : 110106
},{
    "code" : 110106016,
    "name" : "和义街道",
    "parentId" : 110106
},{
    "code" : 110106017,
    "name" : "卢沟桥",
    "parentId" : 110106
},{
    "code" : 110106018,
    "name" : "花乡",
    "parentId" : 110106
},{
    "code" : 110106019,
    "name" : "南苑",
    "parentId" : 110106
},{
    "code" : 110106100,
    "name" : "长辛店镇",
    "parentId" : 110106
},{
    "code" : 110106101,
    "name" : "王佐镇",
    "parentId" : 110106
},{
    "code" : 110107001,
    "name" : "八宝山街道",
    "parentId" : 110107
},{
    "code" : 110107002,
    "name" : "老山街道",
    "parentId" : 110107
},{
    "code" : 110107003,
    "name" : "八角街道",
    "parentId" : 110107
},{
    "code" : 110107004,
    "name" : "古城街道",
    "parentId" : 110107
},{
    "code" : 110107005,
    "name" : "苹果园街道",
    "parentId" : 110107
},{
    "code" : 110107006,
    "name" : "金顶街街道",
    "parentId" : 110107
},{
    "code" : 110107009,
    "name" : "广宁街道",
    "parentId" : 110107
},{
    "code" : 110107010,
    "name" : "五里坨街道",
    "parentId" : 110107
},{
    "code" : 110107011,
    "name" : "鲁谷街道",
    "parentId" : 110107
},{
    "code" : 110108001,
    "name" : "万寿路街道",
    "parentId" : 110108
},{
    "code" : 110108002,
    "name" : "永定路街道",
    "parentId" : 110108
},{
    "code" : 110108003,
    "name" : "羊坊店街道",
    "parentId" : 110108
},{
    "code" : 110108004,
    "name" : "甘家口街道",
    "parentId" : 110108
},{
    "code" : 110108005,
    "name" : "八里庄街道",
    "parentId" : 110108
},{
    "code" : 110108006,
    "name" : "紫竹院街道",
    "parentId" : 110108
},{
    "code" : 110108007,
    "name" : "北下关街道",
    "parentId" : 110108
},{
    "code" : 110108008,
    "name" : "北太平庄街道",
    "parentId" : 110108
},{
    "code" : 110108010,
    "name" : "学院路街道",
    "parentId" : 110108
},{
    "code" : 110108011,
    "name" : "中关村街道",
    "parentId" : 110108
},{
    "code" : 110108012,
    "name" : "海淀街道",
    "parentId" : 110108
},{
    "code" : 110108013,
    "name" : "青龙桥街道",
    "parentId" : 110108
},{
    "code" : 110108014,
    "name" : "清华园街道",
    "parentId" : 110108
},{
    "code" : 110108015,
    "name" : "燕园街道",
    "parentId" : 110108
},{
    "code" : 110108016,
    "name" : "香山街道",
    "parentId" : 110108
},{
    "code" : 110108017,
    "name" : "清河街道",
    "parentId" : 110108
},{
    "code" : 110108018,
    "name" : "花园路街道",
    "parentId" : 110108
},{
    "code" : 110108019,
    "name" : "西三旗街道",
    "parentId" : 110108
},{
    "code" : 110108020,
    "name" : "马连洼街道",
    "parentId" : 110108
},{
    "code" : 110108021,
    "name" : "田村路街道",
    "parentId" : 110108
},{
    "code" : 110108022,
    "name" : "上地街道",
    "parentId" : 110108
},{
    "code" : 110108023,
    "name" : "万柳",
    "parentId" : 110108
},{
    "code" : 110108024,
    "name" : "东升",
    "parentId" : 110108
},{
    "code" : 110108025,
    "name" : "曙光街道",
    "parentId" : 110108
},{
    "code" : 110108026,
    "name" : "温泉",
    "parentId" : 110108
},{
    "code" : 110108027,
    "name" : "四季青",
    "parentId" : 110108
},{
    "code" : 110108028,
    "name" : "西北旺",
    "parentId" : 110108
},{
    "code" : 110108029,
    "name" : "苏家坨",
    "parentId" : 110108
},{
    "code" : 110108030,
    "name" : "上庄",
    "parentId" : 110108
},{
    "code" : 110109001,
    "name" : "大峪街道",
    "parentId" : 110109
},{
    "code" : 110109002,
    "name" : "城子街道",
    "parentId" : 110109
},{
    "code" : 110109003,
    "name" : "东辛房街道",
    "parentId" : 110109
},{
    "code" : 110109004,
    "name" : "大台街道",
    "parentId" : 110109
},{
    "code" : 110109005,
    "name" : "王平",
    "parentId" : 110109
},{
    "code" : 110109006,
    "name" : "永定",
    "parentId" : 110109
},{
    "code" : 110109007,
    "name" : "龙泉",
    "parentId" : 110109
},{
    "code" : 110109101,
    "name" : "潭柘寺镇",
    "parentId" : 110109
},{
    "code" : 110109104,
    "name" : "军庄镇",
    "parentId" : 110109
},{
    "code" : 110109105,
    "name" : "雁翅镇",
    "parentId" : 110109
},{
    "code" : 110109106,
    "name" : "斋堂镇",
    "parentId" : 110109
},{
    "code" : 110109107,
    "name" : "清水镇",
    "parentId" : 110109
},{
    "code" : 110109108,
    "name" : "妙峰山镇",
    "parentId" : 110109
},{
    "code" : 110111001,
    "name" : "城关街道",
    "parentId" : 110111
},{
    "code" : 110111002,
    "name" : "新镇街道",
    "parentId" : 110111
},{
    "code" : 110111004,
    "name" : "向阳街道",
    "parentId" : 110111
},{
    "code" : 110111005,
    "name" : "东风街道",
    "parentId" : 110111
},{
    "code" : 110111006,
    "name" : "迎风街道",
    "parentId" : 110111
},{
    "code" : 110111007,
    "name" : "星城街道",
    "parentId" : 110111
},{
    "code" : 110111008,
    "name" : "良乡",
    "parentId" : 110111
},{
    "code" : 110111009,
    "name" : "周口店",
    "parentId" : 110111
},{
    "code" : 110111010,
    "name" : "琉璃河",
    "parentId" : 110111
},{
    "code" : 110111011,
    "name" : "拱辰街道",
    "parentId" : 110111
},{
    "code" : 110111012,
    "name" : "西潞街道",
    "parentId" : 110111
},{
    "code" : 110111101,
    "name" : "阎村镇",
    "parentId" : 110111
},{
    "code" : 110111103,
    "name" : "窦店镇",
    "parentId" : 110111
},{
    "code" : 110111104,
    "name" : "石楼镇",
    "parentId" : 110111
},{
    "code" : 110111105,
    "name" : "长阳镇",
    "parentId" : 110111
},{
    "code" : 110111107,
    "name" : "河北镇",
    "parentId" : 110111
},{
    "code" : 110111108,
    "name" : "长沟镇",
    "parentId" : 110111
},{
    "code" : 110111109,
    "name" : "大石窝镇",
    "parentId" : 110111
},{
    "code" : 110111110,
    "name" : "张坊镇",
    "parentId" : 110111
},{
    "code" : 110111111,
    "name" : "十渡镇",
    "parentId" : 110111
},{
    "code" : 110111112,
    "name" : "青龙湖镇",
    "parentId" : 110111
},{
    "code" : 110111115,
    "name" : "韩村河镇",
    "parentId" : 110111
},{
    "code" : 110111208,
    "name" : "霞云岭乡",
    "parentId" : 110111
},{
    "code" : 110111209,
    "name" : "南窖乡",
    "parentId" : 110111
},{
    "code" : 110111210,
    "name" : "佛子庄乡",
    "parentId" : 110111
},{
    "code" : 110111211,
    "name" : "大安山乡",
    "parentId" : 110111
},{
    "code" : 110111212,
    "name" : "史家营乡",
    "parentId" : 110111
},{
    "code" : 110111213,
    "name" : "蒲洼乡",
    "parentId" : 110111
},{
    "code" : 110112001,
    "name" : "中仓街道",
    "parentId" : 110112
},{
    "code" : 110112002,
    "name" : "新华街道",
    "parentId" : 110112
},{
    "code" : 110112003,
    "name" : "北苑街道",
    "parentId" : 110112
},{
    "code" : 110112004,
    "name" : "玉桥街道",
    "parentId" : 110112
},{
    "code" : 110112005,
    "name" : "永顺",
    "parentId" : 110112
},{
    "code" : 110112006,
    "name" : "梨园",
    "parentId" : 110112
},{
    "code" : 110112104,
    "name" : "宋庄镇",
    "parentId" : 110112
},{
    "code" : 110112105,
    "name" : "张家湾镇",
    "parentId" : 110112
},{
    "code" : 110112106,
    "name" : "漷县镇",
    "parentId" : 110112
},{
    "code" : 110112109,
    "name" : "马驹桥镇",
    "parentId" : 110112
},{
    "code" : 110112110,
    "name" : "西集镇",
    "parentId" : 110112
},{
    "code" : 110112114,
    "name" : "台湖镇",
    "parentId" : 110112
},{
    "code" : 110112117,
    "name" : "永乐店镇",
    "parentId" : 110112
},{
    "code" : 110112119,
    "name" : "潞城镇",
    "parentId" : 110112
},{
    "code" : 110112209,
    "name" : "于家务回族乡",
    "parentId" : 110112
},{
    "code" : 110113001,
    "name" : "胜利街道",
    "parentId" : 110113
},{
    "code" : 110113002,
    "name" : "光明街道",
    "parentId" : 110113
},{
    "code" : 110113003,
    "name" : "仁和",
    "parentId" : 110113
},{
    "code" : 110113004,
    "name" : "后沙峪",
    "parentId" : 110113
},{
    "code" : 110113005,
    "name" : "天竺",
    "parentId" : 110113
},{
    "code" : 110113006,
    "name" : "杨镇",
    "parentId" : 110113
},{
    "code" : 110113007,
    "name" : "牛栏山",
    "parentId" : 110113
},{
    "code" : 110113008,
    "name" : "南法信",
    "parentId" : 110113
},{
    "code" : 110113009,
    "name" : "马坡",
    "parentId" : 110113
},{
    "code" : 110113010,
    "name" : "石园街道",
    "parentId" : 110113
},{
    "code" : 110113011,
    "name" : "空港街道",
    "parentId" : 110113
},{
    "code" : 110113012,
    "name" : "双丰街道",
    "parentId" : 110113
},{
    "code" : 110113101,
    "name" : "高丽营镇",
    "parentId" : 110113
},{
    "code" : 110113104,
    "name" : "李桥镇",
    "parentId" : 110113
},{
    "code" : 110113105,
    "name" : "李遂镇",
    "parentId" : 110113
},{
    "code" : 110113106,
    "name" : "南彩镇",
    "parentId" : 110113
},{
    "code" : 110113108,
    "name" : "北务镇",
    "parentId" : 110113
},{
    "code" : 110113109,
    "name" : "大孙各庄镇",
    "parentId" : 110113
},{
    "code" : 110113110,
    "name" : "张镇",
    "parentId" : 110113
},{
    "code" : 110113111,
    "name" : "龙湾屯镇",
    "parentId" : 110113
},{
    "code" : 110113112,
    "name" : "木林镇",
    "parentId" : 110113
},{
    "code" : 110113113,
    "name" : "北小营镇",
    "parentId" : 110113
},{
    "code" : 110113115,
    "name" : "北石槽镇",
    "parentId" : 110113
},{
    "code" : 110113116,
    "name" : "赵全营镇",
    "parentId" : 110113
},{
    "code" : 110114001,
    "name" : "城北街道",
    "parentId" : 110114
},{
    "code" : 110114002,
    "name" : "南口",
    "parentId" : 110114
},{
    "code" : 110114003,
    "name" : "马池口",
    "parentId" : 110114
},{
    "code" : 110114004,
    "name" : "沙河",
    "parentId" : 110114
},{
    "code" : 110114005,
    "name" : "城南街道",
    "parentId" : 110114
},{
    "code" : 110114006,
    "name" : "回龙观",
    "parentId" : 110114
},{
    "code" : 110114007,
    "name" : "东小口",
    "parentId" : 110114
},{
    "code" : 110114008,
    "name" : "天通苑北街道",
    "parentId" : 110114
},{
    "code" : 110114009,
    "name" : "天通苑南街道",
    "parentId" : 110114
},{
    "code" : 110114010,
    "name" : "霍营街道",
    "parentId" : 110114
},{
    "code" : 110114104,
    "name" : "阳坊镇",
    "parentId" : 110114
},{
    "code" : 110114110,
    "name" : "小汤山镇",
    "parentId" : 110114
},{
    "code" : 110114111,
    "name" : "南邵镇",
    "parentId" : 110114
},{
    "code" : 110114112,
    "name" : "崔村镇",
    "parentId" : 110114
},{
    "code" : 110114113,
    "name" : "百善镇",
    "parentId" : 110114
},{
    "code" : 110114115,
    "name" : "北七家镇",
    "parentId" : 110114
},{
    "code" : 110114116,
    "name" : "兴寿镇",
    "parentId" : 110114
},{
    "code" : 110114118,
    "name" : "流村镇",
    "parentId" : 110114
},{
    "code" : 110114119,
    "name" : "十三陵镇",
    "parentId" : 110114
},{
    "code" : 110114120,
    "name" : "延寿镇",
    "parentId" : 110114
},{
    "code" : 110115001,
    "name" : "兴丰街道",
    "parentId" : 110115
},{
    "code" : 110115002,
    "name" : "林校路街道",
    "parentId" : 110115
},{
    "code" : 110115003,
    "name" : "清源街道",
    "parentId" : 110115
},{
    "code" : 110115004,
    "name" : "亦庄",
    "parentId" : 110115
},{
    "code" : 110115005,
    "name" : "黄村",
    "parentId" : 110115
},{
    "code" : 110115006,
    "name" : "旧宫",
    "parentId" : 110115
},{
    "code" : 110115007,
    "name" : "西红门",
    "parentId" : 110115
},{
    "code" : 110115008,
    "name" : "瀛海",
    "parentId" : 110115
},{
    "code" : 110115009,
    "name" : "观音寺街道",
    "parentId" : 110115
},{
    "code" : 110115010,
    "name" : "天宫院街道",
    "parentId" : 110115
},{
    "code" : 110115103,
    "name" : "青云店镇",
    "parentId" : 110115
},{
    "code" : 110115104,
    "name" : "采育镇",
    "parentId" : 110115
},{
    "code" : 110115105,
    "name" : "安定镇",
    "parentId" : 110115
},{
    "code" : 110115106,
    "name" : "礼贤镇",
    "parentId" : 110115
},{
    "code" : 110115107,
    "name" : "榆垡镇",
    "parentId" : 110115
},{
    "code" : 110115108,
    "name" : "庞各庄镇",
    "parentId" : 110115
},{
    "code" : 110115109,
    "name" : "北臧村镇",
    "parentId" : 110115
},{
    "code" : 110115110,
    "name" : "魏善庄镇",
    "parentId" : 110115
},{
    "code" : 110115111,
    "name" : "长子营镇",
    "parentId" : 110115
},{
    "code" : 110115403,
    "name" : "北京经济技术开发区",
    "parentId" : 110115
},{
    "code" : 110115404,
    "name" : "中关村国家自主创新示范区大兴生物医药产业基地",
    "parentId" : 110115
},{
    "code" : 110115405,
    "name" : "国家新媒体产业基地",
    "parentId" : 110115
},{
    "code" : 110116001,
    "name" : "泉河街道",
    "parentId" : 110116
},{
    "code" : 110116002,
    "name" : "龙山街道",
    "parentId" : 110116
},{
    "code" : 110116003,
    "name" : "怀柔",
    "parentId" : 110116
},{
    "code" : 110116004,
    "name" : "雁栖",
    "parentId" : 110116
},{
    "code" : 110116005,
    "name" : "庙城",
    "parentId" : 110116
},{
    "code" : 110116102,
    "name" : "北房镇",
    "parentId" : 110116
},{
    "code" : 110116103,
    "name" : "杨宋镇",
    "parentId" : 110116
},{
    "code" : 110116106,
    "name" : "怀北镇",
    "parentId" : 110116
},{
    "code" : 110116107,
    "name" : "汤河口镇",
    "parentId" : 110116
},{
    "code" : 110116108,
    "name" : "渤海镇",
    "parentId" : 110116
},{
    "code" : 110116109,
    "name" : "九渡河镇",
    "parentId" : 110116
},{
    "code" : 110116110,
    "name" : "琉璃庙镇",
    "parentId" : 110116
},{
    "code" : 110116111,
    "name" : "宝山镇",
    "parentId" : 110116
},{
    "code" : 110116211,
    "name" : "长哨营满族乡",
    "parentId" : 110116
},{
    "code" : 110116213,
    "name" : "喇叭沟门满族乡",
    "parentId" : 110116
},{
    "code" : 110116400,
    "name" : "北京雁栖经济开发区",
    "parentId" : 110116
},{
    "code" : 110117001,
    "name" : "滨河街道",
    "parentId" : 110117
},{
    "code" : 110117002,
    "name" : "兴谷街道",
    "parentId" : 110117
},{
    "code" : 110117003,
    "name" : "渔阳",
    "parentId" : 110117
},{
    "code" : 110117004,
    "name" : "峪口",
    "parentId" : 110117
},{
    "code" : 110117005,
    "name" : "马坊",
    "parentId" : 110117
},{
    "code" : 110117006,
    "name" : "金海湖",
    "parentId" : 110117
},{
    "code" : 110117101,
    "name" : "东高村镇",
    "parentId" : 110117
},{
    "code" : 110117102,
    "name" : "山东庄镇",
    "parentId" : 110117
},{
    "code" : 110117104,
    "name" : "南独乐河镇",
    "parentId" : 110117
},{
    "code" : 110117105,
    "name" : "大华山镇",
    "parentId" : 110117
},{
    "code" : 110117106,
    "name" : "夏各庄镇",
    "parentId" : 110117
},{
    "code" : 110117108,
    "name" : "马昌营镇",
    "parentId" : 110117
},{
    "code" : 110117110,
    "name" : "王辛庄镇",
    "parentId" : 110117
},{
    "code" : 110117111,
    "name" : "大兴庄镇",
    "parentId" : 110117
},{
    "code" : 110117112,
    "name" : "刘家店镇",
    "parentId" : 110117
},{
    "code" : 110117114,
    "name" : "镇罗营镇",
    "parentId" : 110117
},{
    "code" : 110117213,
    "name" : "黄松峪乡",
    "parentId" : 110117
},{
    "code" : 110117214,
    "name" : "熊儿寨乡",
    "parentId" : 110117
},{
    "code" : 110228001,
    "name" : "鼓楼街道",
    "parentId" : 110228
},{
    "code" : 110228002,
    "name" : "果园街道",
    "parentId" : 110228
},{
    "code" : 110228003,
    "name" : "檀营",
    "parentId" : 110228
},{
    "code" : 110228100,
    "name" : "密云镇",
    "parentId" : 110228
},{
    "code" : 110228101,
    "name" : "溪翁庄镇",
    "parentId" : 110228
},{
    "code" : 110228102,
    "name" : "西田各庄镇",
    "parentId" : 110228
},{
    "code" : 110228103,
    "name" : "十里堡镇",
    "parentId" : 110228
},{
    "code" : 110228104,
    "name" : "河南寨镇",
    "parentId" : 110228
},{
    "code" : 110228105,
    "name" : "巨各庄镇",
    "parentId" : 110228
},{
    "code" : 110228106,
    "name" : "穆家峪镇",
    "parentId" : 110228
},{
    "code" : 110228107,
    "name" : "太师屯镇",
    "parentId" : 110228
},{
    "code" : 110228108,
    "name" : "高岭镇",
    "parentId" : 110228
},{
    "code" : 110228109,
    "name" : "不老屯镇",
    "parentId" : 110228
},{
    "code" : 110228110,
    "name" : "冯家峪镇",
    "parentId" : 110228
},{
    "code" : 110228111,
    "name" : "古北口镇",
    "parentId" : 110228
},{
    "code" : 110228112,
    "name" : "大城子镇",
    "parentId" : 110228
},{
    "code" : 110228113,
    "name" : "东邵渠镇",
    "parentId" : 110228
},{
    "code" : 110228114,
    "name" : "北庄镇",
    "parentId" : 110228
},{
    "code" : 110228115,
    "name" : "新城子镇",
    "parentId" : 110228
},{
    "code" : 110228116,
    "name" : "石城镇",
    "parentId" : 110228
},{
    "code" : 110228400,
    "name" : "北京密云经济开发区",
    "parentId" : 110228
},{
    "code" : 110229001,
    "name" : "百泉街道",
    "parentId" : 110229
},{
    "code" : 110229002,
    "name" : "香水园街道",
    "parentId" : 110229
},{
    "code" : 110229003,
    "name" : "儒林街道",
    "parentId" : 110229
},{
    "code" : 110229100,
    "name" : "延庆镇",
    "parentId" : 110229
},{
    "code" : 110229101,
    "name" : "康庄镇",
    "parentId" : 110229
},{
    "code" : 110229102,
    "name" : "八达岭镇",
    "parentId" : 110229
},{
    "code" : 110229103,
    "name" : "永宁镇",
    "parentId" : 110229
},{
    "code" : 110229104,
    "name" : "旧县镇",
    "parentId" : 110229
},{
    "code" : 110229105,
    "name" : "张山营镇",
    "parentId" : 110229
},{
    "code" : 110229106,
    "name" : "四海镇",
    "parentId" : 110229
},{
    "code" : 110229107,
    "name" : "千家店镇",
    "parentId" : 110229
},{
    "code" : 110229108,
    "name" : "沈家营镇",
    "parentId" : 110229
},{
    "code" : 110229109,
    "name" : "大榆树镇",
    "parentId" : 110229
},{
    "code" : 110229110,
    "name" : "井庄镇",
    "parentId" : 110229
},{
    "code" : 110229207,
    "name" : "大庄科乡",
    "parentId" : 110229
},{
    "code" : 110229209,
    "name" : "刘斌堡乡",
    "parentId" : 110229
},{
    "code" : 110229210,
    "name" : "香营乡",
    "parentId" : 110229
},{
    "code" : 110229214,
    "name" : "珍珠泉乡",
    "parentId" : 110229
},{
    "code" : 120101001,
    "name" : "劝业场街道",
    "parentId" : 120101
},{
    "code" : 120101002,
    "name" : "小白楼街道",
    "parentId" : 120101
},{
    "code" : 120101003,
    "name" : "体育馆街道",
    "parentId" : 120101
},{
    "code" : 120101004,
    "name" : "新兴街道",
    "parentId" : 120101
},{
    "code" : 120101006,
    "name" : "南市街道",
    "parentId" : 120101
},{
    "code" : 120102001,
    "name" : "大王庄街道",
    "parentId" : 120102
},{
    "code" : 120102002,
    "name" : "大直沽街道",
    "parentId" : 120102
},{
    "code" : 120102003,
    "name" : "中山门街道",
    "parentId" : 120102
},{
    "code" : 120102004,
    "name" : "富民路街道",
    "parentId" : 120102
},{
    "code" : 120102005,
    "name" : "二号桥街道",
    "parentId" : 120102
},{
    "code" : 120102006,
    "name" : "春华街道",
    "parentId" : 120102
},{
    "code" : 120102007,
    "name" : "唐家口街道",
    "parentId" : 120102
},{
    "code" : 120102008,
    "name" : "向阳楼街道",
    "parentId" : 120102
},{
    "code" : 120102009,
    "name" : "常州道街道",
    "parentId" : 120102
},{
    "code" : 120102010,
    "name" : "上杭路街道",
    "parentId" : 120102
},{
    "code" : 120102011,
    "name" : "东新街道",
    "parentId" : 120102
},{
    "code" : 120102012,
    "name" : "鲁山道街道",
    "parentId" : 120102
},{
    "code" : 120102013,
    "name" : "天津铁厂街道",
    "parentId" : 120102
},{
    "code" : 120103001,
    "name" : "大营门街道",
    "parentId" : 120103
},{
    "code" : 120103002,
    "name" : "下瓦房街道",
    "parentId" : 120103
},{
    "code" : 120103003,
    "name" : "桃园街道",
    "parentId" : 120103
},{
    "code" : 120103004,
    "name" : "挂甲寺街道",
    "parentId" : 120103
},{
    "code" : 120103005,
    "name" : "马场街道",
    "parentId" : 120103
},{
    "code" : 120103006,
    "name" : "越秀路街道",
    "parentId" : 120103
},{
    "code" : 120103007,
    "name" : "友谊路街道",
    "parentId" : 120103
},{
    "code" : 120103008,
    "name" : "天塔街道",
    "parentId" : 120103
},{
    "code" : 120103009,
    "name" : "尖山街道",
    "parentId" : 120103
},{
    "code" : 120103010,
    "name" : "陈塘庄街道",
    "parentId" : 120103
},{
    "code" : 120103011,
    "name" : "柳林街道",
    "parentId" : 120103
},{
    "code" : 120103012,
    "name" : "东海街道",
    "parentId" : 120103
},{
    "code" : 120103013,
    "name" : "梅江街道",
    "parentId" : 120103
},{
    "code" : 120104001,
    "name" : "长虹街道",
    "parentId" : 120104
},{
    "code" : 120104002,
    "name" : "鼓楼街道",
    "parentId" : 120104
},{
    "code" : 120104003,
    "name" : "兴南街道",
    "parentId" : 120104
},{
    "code" : 120104004,
    "name" : "广开街道",
    "parentId" : 120104
},{
    "code" : 120104005,
    "name" : "万兴街道",
    "parentId" : 120104
},{
    "code" : 120104006,
    "name" : "学府街道",
    "parentId" : 120104
},{
    "code" : 120104007,
    "name" : "向阳路街道",
    "parentId" : 120104
},{
    "code" : 120104008,
    "name" : "嘉陵道街道",
    "parentId" : 120104
},{
    "code" : 120104009,
    "name" : "王顶堤街道",
    "parentId" : 120104
},{
    "code" : 120104010,
    "name" : "水上公园街道",
    "parentId" : 120104
},{
    "code" : 120104011,
    "name" : "体育中心街道",
    "parentId" : 120104
},{
    "code" : 120104012,
    "name" : "华苑街道",
    "parentId" : 120104
},{
    "code" : 120105001,
    "name" : "光复道街道",
    "parentId" : 120105
},{
    "code" : 120105002,
    "name" : "望海楼街道",
    "parentId" : 120105
},{
    "code" : 120105003,
    "name" : "鸿顺里街道",
    "parentId" : 120105
},{
    "code" : 120105004,
    "name" : "新开河街道",
    "parentId" : 120105
},{
    "code" : 120105005,
    "name" : "铁东路街道",
    "parentId" : 120105
},{
    "code" : 120105006,
    "name" : "建昌道街道",
    "parentId" : 120105
},{
    "code" : 120105007,
    "name" : "宁园街道",
    "parentId" : 120105
},{
    "code" : 120105008,
    "name" : "王串场街道",
    "parentId" : 120105
},{
    "code" : 120105009,
    "name" : "江都路街道",
    "parentId" : 120105
},{
    "code" : 120105010,
    "name" : "月牙河街道",
    "parentId" : 120105
},{
    "code" : 120106001,
    "name" : "西于庄街道",
    "parentId" : 120106
},{
    "code" : 120106002,
    "name" : "双环村街道",
    "parentId" : 120106
},{
    "code" : 120106003,
    "name" : "咸阳北路街道",
    "parentId" : 120106
},{
    "code" : 120106004,
    "name" : "丁字沽街道",
    "parentId" : 120106
},{
    "code" : 120106005,
    "name" : "西沽街道",
    "parentId" : 120106
},{
    "code" : 120106006,
    "name" : "三条石街道",
    "parentId" : 120106
},{
    "code" : 120106008,
    "name" : "邵公庄街道",
    "parentId" : 120106
},{
    "code" : 120106009,
    "name" : "芥园街道",
    "parentId" : 120106
},{
    "code" : 120106010,
    "name" : "铃铛阁街道",
    "parentId" : 120106
},{
    "code" : 120106011,
    "name" : "大胡同街道",
    "parentId" : 120106
},{
    "code" : 120110001,
    "name" : "张贵庄街道",
    "parentId" : 120110
},{
    "code" : 120110002,
    "name" : "丰年村街道",
    "parentId" : 120110
},{
    "code" : 120110003,
    "name" : "万新街道",
    "parentId" : 120110
},{
    "code" : 120110004,
    "name" : "无瑕街道",
    "parentId" : 120110
},{
    "code" : 120110005,
    "name" : "新立街道",
    "parentId" : 120110
},{
    "code" : 120110006,
    "name" : "华明街道",
    "parentId" : 120110
},{
    "code" : 120110007,
    "name" : "金钟街道",
    "parentId" : 120110
},{
    "code" : 120110008,
    "name" : "军粮城街道",
    "parentId" : 120110
},{
    "code" : 120110009,
    "name" : "金桥街道",
    "parentId" : 120110
},{
    "code" : 120110400,
    "name" : "开发区西区",
    "parentId" : 120110
},{
    "code" : 120110401,
    "name" : "保税区空港国际物流区",
    "parentId" : 120110
},{
    "code" : 120110402,
    "name" : "保税区空港国际物流经济区",
    "parentId" : 120110
},{
    "code" : 120110403,
    "name" : "东丽区开发区",
    "parentId" : 120110
},{
    "code" : 120110404,
    "name" : "东丽湖",
    "parentId" : 120110
},{
    "code" : 120110405,
    "name" : "综合保税区",
    "parentId" : 120110
},{
    "code" : 120110407,
    "name" : "服务滨海新区建设管理委员会",
    "parentId" : 120110
},{
    "code" : 120111001,
    "name" : "西营门街道",
    "parentId" : 120111
},{
    "code" : 120111002,
    "name" : "李七庄街道",
    "parentId" : 120111
},{
    "code" : 120111100,
    "name" : "中北镇",
    "parentId" : 120111
},{
    "code" : 120111101,
    "name" : "杨柳青镇",
    "parentId" : 120111
},{
    "code" : 120111103,
    "name" : "张家窝镇",
    "parentId" : 120111
},{
    "code" : 120111104,
    "name" : "精武镇",
    "parentId" : 120111
},{
    "code" : 120111105,
    "name" : "大寺镇",
    "parentId" : 120111
},{
    "code" : 120111106,
    "name" : "王稳庄镇",
    "parentId" : 120111
},{
    "code" : 120111400,
    "name" : "开发区西青微电子小区",
    "parentId" : 120111
},{
    "code" : 120111401,
    "name" : "新技术产业园区",
    "parentId" : 120111
},{
    "code" : 120111402,
    "name" : "西青高校区",
    "parentId" : 120111
},{
    "code" : 120111450,
    "name" : "西青区开发区",
    "parentId" : 120111
},{
    "code" : 120112100,
    "name" : "咸水沽镇",
    "parentId" : 120112
},{
    "code" : 120112101,
    "name" : "葛沽镇",
    "parentId" : 120112
},{
    "code" : 120112102,
    "name" : "小站镇",
    "parentId" : 120112
},{
    "code" : 120112103,
    "name" : "双港镇",
    "parentId" : 120112
},{
    "code" : 120112104,
    "name" : "辛庄镇",
    "parentId" : 120112
},{
    "code" : 120112106,
    "name" : "双桥河镇",
    "parentId" : 120112
},{
    "code" : 120112107,
    "name" : "八里台镇",
    "parentId" : 120112
},{
    "code" : 120112108,
    "name" : "北闸口镇",
    "parentId" : 120112
},{
    "code" : 120112401,
    "name" : "铁路十八局",
    "parentId" : 120112
},{
    "code" : 120112403,
    "name" : "长青办事处",
    "parentId" : 120112
},{
    "code" : 120112404,
    "name" : "津南开发区东区",
    "parentId" : 120112
},{
    "code" : 120112405,
    "name" : "津南开发区西区",
    "parentId" : 120112
},{
    "code" : 120112407,
    "name" : "海河教育园区",
    "parentId" : 120112
},{
    "code" : 120112500,
    "name" : "双林农场",
    "parentId" : 120112
},{
    "code" : 120112501,
    "name" : "津南国家农业园区",
    "parentId" : 120112
},{
    "code" : 120113001,
    "name" : "果园新村街道",
    "parentId" : 120113
},{
    "code" : 120113002,
    "name" : "集贤里街道",
    "parentId" : 120113
},{
    "code" : 120113003,
    "name" : "普东街道",
    "parentId" : 120113
},{
    "code" : 120113004,
    "name" : "瑞景街道",
    "parentId" : 120113
},{
    "code" : 120113005,
    "name" : "佳荣里街道",
    "parentId" : 120113
},{
    "code" : 120113100,
    "name" : "天穆镇",
    "parentId" : 120113
},{
    "code" : 120113101,
    "name" : "北仓镇",
    "parentId" : 120113
},{
    "code" : 120113102,
    "name" : "双街镇",
    "parentId" : 120113
},{
    "code" : 120113103,
    "name" : "双口镇",
    "parentId" : 120113
},{
    "code" : 120113104,
    "name" : "青光镇",
    "parentId" : 120113
},{
    "code" : 120113106,
    "name" : "宜兴埠镇",
    "parentId" : 120113
},{
    "code" : 120113107,
    "name" : "小淀镇",
    "parentId" : 120113
},{
    "code" : 120113108,
    "name" : "大张庄镇",
    "parentId" : 120113
},{
    "code" : 120113111,
    "name" : "西堤头镇",
    "parentId" : 120113
},{
    "code" : 120113400,
    "name" : "科技园区北区",
    "parentId" : 120113
},{
    "code" : 120113401,
    "name" : "科技园区南区",
    "parentId" : 120113
},{
    "code" : 120113402,
    "name" : "天津医药医疗器械工业园",
    "parentId" : 120113
},{
    "code" : 120113403,
    "name" : "天津陆路港物流装备产业园",
    "parentId" : 120113
},{
    "code" : 120113404,
    "name" : "天津风电产业园",
    "parentId" : 120113
},{
    "code" : 120113500,
    "name" : "红旗农场",
    "parentId" : 120113
},{
    "code" : 120113501,
    "name" : "曙光农场",
    "parentId" : 120113
},{
    "code" : 120114001,
    "name" : "杨村街道",
    "parentId" : 120114
},{
    "code" : 120114002,
    "name" : "下朱庄街道",
    "parentId" : 120114
},{
    "code" : 120114003,
    "name" : "东蒲洼街道",
    "parentId" : 120114
},{
    "code" : 120114004,
    "name" : "黄庄街道",
    "parentId" : 120114
},{
    "code" : 120114005,
    "name" : "徐官屯街道",
    "parentId" : 120114
},{
    "code" : 120114006,
    "name" : "运河西街道",
    "parentId" : 120114
},{
    "code" : 120114101,
    "name" : "梅厂镇",
    "parentId" : 120114
},{
    "code" : 120114102,
    "name" : "大碱厂镇",
    "parentId" : 120114
},{
    "code" : 120114103,
    "name" : "崔黄口镇",
    "parentId" : 120114
},{
    "code" : 120114104,
    "name" : "大良镇",
    "parentId" : 120114
},{
    "code" : 120114105,
    "name" : "下伍旗镇",
    "parentId" : 120114
},{
    "code" : 120114106,
    "name" : "南蔡村镇",
    "parentId" : 120114
},{
    "code" : 120114107,
    "name" : "大孟庄镇",
    "parentId" : 120114
},{
    "code" : 120114108,
    "name" : "泗村店镇",
    "parentId" : 120114
},{
    "code" : 120114109,
    "name" : "河西务镇",
    "parentId" : 120114
},{
    "code" : 120114110,
    "name" : "城关镇",
    "parentId" : 120114
},{
    "code" : 120114111,
    "name" : "东马圈镇",
    "parentId" : 120114
},{
    "code" : 120114112,
    "name" : "黄花店镇",
    "parentId" : 120114
},{
    "code" : 120114113,
    "name" : "石各庄镇",
    "parentId" : 120114
},{
    "code" : 120114114,
    "name" : "王庆坨镇",
    "parentId" : 120114
},{
    "code" : 120114115,
    "name" : "汊沽港镇",
    "parentId" : 120114
},{
    "code" : 120114116,
    "name" : "河北屯镇",
    "parentId" : 120114
},{
    "code" : 120114117,
    "name" : "上马台镇",
    "parentId" : 120114
},{
    "code" : 120114118,
    "name" : "大王古庄镇",
    "parentId" : 120114
},{
    "code" : 120114119,
    "name" : "陈咀镇",
    "parentId" : 120114
},{
    "code" : 120114120,
    "name" : "豆张庄镇",
    "parentId" : 120114
},{
    "code" : 120114121,
    "name" : "曹子里镇",
    "parentId" : 120114
},{
    "code" : 120114122,
    "name" : "大黄堡镇",
    "parentId" : 120114
},{
    "code" : 120114123,
    "name" : "高村镇",
    "parentId" : 120114
},{
    "code" : 120114124,
    "name" : "白古屯镇",
    "parentId" : 120114
},{
    "code" : 120114400,
    "name" : "开发区武清逸仙园小区",
    "parentId" : 120114
},{
    "code" : 120114401,
    "name" : "武清区开发区",
    "parentId" : 120114
},{
    "code" : 120114402,
    "name" : "武清商务区",
    "parentId" : 120114
},{
    "code" : 120114403,
    "name" : "武清京滨园",
    "parentId" : 120114
},{
    "code" : 120114404,
    "name" : "武清地毯园",
    "parentId" : 120114
},{
    "code" : 120114405,
    "name" : "武清汽车园",
    "parentId" : 120114
},{
    "code" : 120114406,
    "name" : "武清科技谷",
    "parentId" : 120114
},{
    "code" : 120114500,
    "name" : "武清农场",
    "parentId" : 120114
},{
    "code" : 120115001,
    "name" : "海滨街道",
    "parentId" : 120115
},{
    "code" : 120115002,
    "name" : "宝平街道",
    "parentId" : 120115
},{
    "code" : 120115003,
    "name" : "钰华街道",
    "parentId" : 120115
},{
    "code" : 120115101,
    "name" : "大口屯镇",
    "parentId" : 120115
},{
    "code" : 120115102,
    "name" : "大白庄镇",
    "parentId" : 120115
},{
    "code" : 120115103,
    "name" : "王卜庄镇",
    "parentId" : 120115
},{
    "code" : 120115104,
    "name" : "方家庄镇",
    "parentId" : 120115
},{
    "code" : 120115105,
    "name" : "林亭口镇",
    "parentId" : 120115
},{
    "code" : 120115106,
    "name" : "八门城镇",
    "parentId" : 120115
},{
    "code" : 120115107,
    "name" : "大钟庄镇",
    "parentId" : 120115
},{
    "code" : 120115108,
    "name" : "新安镇",
    "parentId" : 120115
},{
    "code" : 120115110,
    "name" : "马家店镇",
    "parentId" : 120115
},{
    "code" : 120115111,
    "name" : "霍各庄镇",
    "parentId" : 120115
},{
    "code" : 120115113,
    "name" : "新开口镇",
    "parentId" : 120115
},{
    "code" : 120115115,
    "name" : "大唐庄镇",
    "parentId" : 120115
},{
    "code" : 120115117,
    "name" : "高家庄镇",
    "parentId" : 120115
},{
    "code" : 120115118,
    "name" : "口东镇",
    "parentId" : 120115
},{
    "code" : 120115119,
    "name" : "牛道口镇",
    "parentId" : 120115
},{
    "code" : 120115120,
    "name" : "史各庄镇",
    "parentId" : 120115
},{
    "code" : 120115121,
    "name" : "郝各庄镇",
    "parentId" : 120115
},{
    "code" : 120115122,
    "name" : "周良庄镇",
    "parentId" : 120115
},{
    "code" : 120115123,
    "name" : "牛家牌镇",
    "parentId" : 120115
},{
    "code" : 120115124,
    "name" : "尔王庄镇",
    "parentId" : 120115
},{
    "code" : 120115125,
    "name" : "黄庄镇",
    "parentId" : 120115
},{
    "code" : 120115453,
    "name" : "天宝工业园区",
    "parentId" : 120115
},{
    "code" : 120115454,
    "name" : "九园工业园区",
    "parentId" : 120115
},{
    "code" : 120115455,
    "name" : "京津新城",
    "parentId" : 120115
},{
    "code" : 120115500,
    "name" : "里自沽农场",
    "parentId" : 120115
},{
    "code" : 120115501,
    "name" : "黄庄农场",
    "parentId" : 120115
},{
    "code" : 120115502,
    "name" : "大钟农场",
    "parentId" : 120115
},{
    "code" : 120116001,
    "name" : "新村街道",
    "parentId" : 120116
},{
    "code" : 120116002,
    "name" : "于家堡街道",
    "parentId" : 120116
},{
    "code" : 120116003,
    "name" : "新港街道",
    "parentId" : 120116
},{
    "code" : 120116004,
    "name" : "向阳街道",
    "parentId" : 120116
},{
    "code" : 120116005,
    "name" : "杭州道街道",
    "parentId" : 120116
},{
    "code" : 120116006,
    "name" : "新河街道",
    "parentId" : 120116
},{
    "code" : 120116007,
    "name" : "大沽街道",
    "parentId" : 120116
},{
    "code" : 120116008,
    "name" : "新北街道",
    "parentId" : 120116
},{
    "code" : 120116009,
    "name" : "北塘街道",
    "parentId" : 120116
},{
    "code" : 120116010,
    "name" : "渤海石油街道",
    "parentId" : 120116
},{
    "code" : 120116011,
    "name" : "胡家园街道",
    "parentId" : 120116
},{
    "code" : 120116031,
    "name" : "汉沽街道",
    "parentId" : 120116
},{
    "code" : 120116032,
    "name" : "寨上街道",
    "parentId" : 120116
},{
    "code" : 120116033,
    "name" : "河西街道",
    "parentId" : 120116
},{
    "code" : 120116051,
    "name" : "迎宾街道",
    "parentId" : 120116
},{
    "code" : 120116052,
    "name" : "胜利街道",
    "parentId" : 120116
},{
    "code" : 120116053,
    "name" : "古林街道",
    "parentId" : 120116
},{
    "code" : 120116054,
    "name" : "海滨街道",
    "parentId" : 120116
},{
    "code" : 120116055,
    "name" : "港西街道",
    "parentId" : 120116
},{
    "code" : 120116100,
    "name" : "新城镇",
    "parentId" : 120116
},{
    "code" : 120116134,
    "name" : "大田镇",
    "parentId" : 120116
},{
    "code" : 120116135,
    "name" : "杨家泊镇",
    "parentId" : 120116
},{
    "code" : 120116136,
    "name" : "茶淀镇",
    "parentId" : 120116
},{
    "code" : 120116156,
    "name" : "太平镇",
    "parentId" : 120116
},{
    "code" : 120116157,
    "name" : "小王庄镇",
    "parentId" : 120116
},{
    "code" : 120116158,
    "name" : "中塘镇",
    "parentId" : 120116
},{
    "code" : 120116400,
    "name" : "开发区",
    "parentId" : 120116
},{
    "code" : 120116401,
    "name" : "保税区",
    "parentId" : 120116
},{
    "code" : 120116402,
    "name" : "天津滨海新区高新技术产业开发区",
    "parentId" : 120116
},{
    "code" : 120116403,
    "name" : "东疆保税港区",
    "parentId" : 120116
},{
    "code" : 120116404,
    "name" : "中心商务区",
    "parentId" : 120116
},{
    "code" : 120116405,
    "name" : "临港工业区",
    "parentId" : 120116
},{
    "code" : 120116406,
    "name" : "中新天津生态城",
    "parentId" : 120116
},{
    "code" : 120116407,
    "name" : "滨海旅游区",
    "parentId" : 120116
},{
    "code" : 120116408,
    "name" : "南港工业区",
    "parentId" : 120116
},{
    "code" : 120116410,
    "name" : "临港产业园区二",
    "parentId" : 120116
},{
    "code" : 120116411,
    "name" : "北塘经济区",
    "parentId" : 120116
},{
    "code" : 120116412,
    "name" : "轻纺经济区",
    "parentId" : 120116
},{
    "code" : 120116413,
    "name" : "中心渔港经济区",
    "parentId" : 120116
},{
    "code" : 120116414,
    "name" : "海洋高新技术产业园区",
    "parentId" : 120116
},{
    "code" : 120221100,
    "name" : "芦台镇",
    "parentId" : 120221
},{
    "code" : 120221102,
    "name" : "宁河镇",
    "parentId" : 120221
},{
    "code" : 120221103,
    "name" : "苗庄镇",
    "parentId" : 120221
},{
    "code" : 120221104,
    "name" : "丰台镇",
    "parentId" : 120221
},{
    "code" : 120221105,
    "name" : "岳龙镇",
    "parentId" : 120221
},{
    "code" : 120221106,
    "name" : "板桥镇",
    "parentId" : 120221
},{
    "code" : 120221107,
    "name" : "潘庄镇",
    "parentId" : 120221
},{
    "code" : 120221109,
    "name" : "造甲城镇",
    "parentId" : 120221
},{
    "code" : 120221110,
    "name" : "七里海镇",
    "parentId" : 120221
},{
    "code" : 120221111,
    "name" : "大北涧沽镇",
    "parentId" : 120221
},{
    "code" : 120221112,
    "name" : "东棘坨镇",
    "parentId" : 120221
},{
    "code" : 120221204,
    "name" : "北淮淀乡",
    "parentId" : 120221
},{
    "code" : 120221205,
    "name" : "俵口乡",
    "parentId" : 120221
},{
    "code" : 120221206,
    "name" : "廉庄子乡",
    "parentId" : 120221
},{
    "code" : 120221400,
    "name" : "宁河县贸易开发区",
    "parentId" : 120221
},{
    "code" : 120221401,
    "name" : "宁河县经济开发区",
    "parentId" : 120221
},{
    "code" : 120221451,
    "name" : "宁河县现代产业园区",
    "parentId" : 120221
},{
    "code" : 120221452,
    "name" : "天津潘庄工业区",
    "parentId" : 120221
},{
    "code" : 120221500,
    "name" : "潘庄农场",
    "parentId" : 120221
},{
    "code" : 120223100,
    "name" : "静海镇",
    "parentId" : 120223
},{
    "code" : 120223101,
    "name" : "唐官屯镇",
    "parentId" : 120223
},{
    "code" : 120223102,
    "name" : "独流镇",
    "parentId" : 120223
},{
    "code" : 120223103,
    "name" : "王口镇",
    "parentId" : 120223
},{
    "code" : 120223104,
    "name" : "台头镇",
    "parentId" : 120223
},{
    "code" : 120223105,
    "name" : "子牙镇",
    "parentId" : 120223
},{
    "code" : 120223106,
    "name" : "陈官屯镇",
    "parentId" : 120223
},{
    "code" : 120223107,
    "name" : "中旺镇",
    "parentId" : 120223
},{
    "code" : 120223108,
    "name" : "大邱庄镇",
    "parentId" : 120223
},{
    "code" : 120223109,
    "name" : "蔡公庄镇",
    "parentId" : 120223
},{
    "code" : 120223110,
    "name" : "梁头镇",
    "parentId" : 120223
},{
    "code" : 120223111,
    "name" : "团泊镇",
    "parentId" : 120223
},{
    "code" : 120223112,
    "name" : "双塘镇",
    "parentId" : 120223
},{
    "code" : 120223113,
    "name" : "大丰堆镇",
    "parentId" : 120223
},{
    "code" : 120223114,
    "name" : "沿庄镇",
    "parentId" : 120223
},{
    "code" : 120223115,
    "name" : "西翟庄镇",
    "parentId" : 120223
},{
    "code" : 120223200,
    "name" : "良王庄乡",
    "parentId" : 120223
},{
    "code" : 120223201,
    "name" : "杨成庄乡",
    "parentId" : 120223
},{
    "code" : 120223400,
    "name" : "天津静海经济开发区",
    "parentId" : 120223
},{
    "code" : 120223402,
    "name" : "天津子牙工业园区",
    "parentId" : 120223
},{
    "code" : 120223403,
    "name" : "团泊新城",
    "parentId" : 120223
},{
    "code" : 120225001,
    "name" : "文昌街道",
    "parentId" : 120225
},{
    "code" : 120225100,
    "name" : "渔阳镇",
    "parentId" : 120225
},{
    "code" : 120225101,
    "name" : "洇溜镇",
    "parentId" : 120225
},{
    "code" : 120225102,
    "name" : "官庄镇",
    "parentId" : 120225
},{
    "code" : 120225103,
    "name" : "马伸桥镇",
    "parentId" : 120225
},{
    "code" : 120225104,
    "name" : "下营镇",
    "parentId" : 120225
},{
    "code" : 120225105,
    "name" : "邦均镇",
    "parentId" : 120225
},{
    "code" : 120225106,
    "name" : "别山镇",
    "parentId" : 120225
},{
    "code" : 120225108,
    "name" : "尤古庄镇",
    "parentId" : 120225
},{
    "code" : 120225109,
    "name" : "上仓镇",
    "parentId" : 120225
},{
    "code" : 120225111,
    "name" : "下仓镇",
    "parentId" : 120225
},{
    "code" : 120225112,
    "name" : "罗庄子镇",
    "parentId" : 120225
},{
    "code" : 120225113,
    "name" : "白涧镇",
    "parentId" : 120225
},{
    "code" : 120225114,
    "name" : "五百户镇",
    "parentId" : 120225
},{
    "code" : 120225115,
    "name" : "侯家营镇",
    "parentId" : 120225
},{
    "code" : 120225116,
    "name" : "桑梓镇",
    "parentId" : 120225
},{
    "code" : 120225117,
    "name" : "东施古镇",
    "parentId" : 120225
},{
    "code" : 120225118,
    "name" : "下窝头镇",
    "parentId" : 120225
},{
    "code" : 120225119,
    "name" : "杨津庄镇",
    "parentId" : 120225
},{
    "code" : 120225120,
    "name" : "出头岭镇",
    "parentId" : 120225
},{
    "code" : 120225121,
    "name" : "西龙虎峪镇",
    "parentId" : 120225
},{
    "code" : 120225122,
    "name" : "穿芳峪镇",
    "parentId" : 120225
},{
    "code" : 120225123,
    "name" : "东二营镇",
    "parentId" : 120225
},{
    "code" : 120225124,
    "name" : "许家台镇",
    "parentId" : 120225
},{
    "code" : 120225125,
    "name" : "礼明庄镇",
    "parentId" : 120225
},{
    "code" : 120225126,
    "name" : "东赵各庄镇",
    "parentId" : 120225
},{
    "code" : 120225203,
    "name" : "孙各庄乡",
    "parentId" : 120225
},{
    "code" : 310101002,
    "name" : "南京东路街道",
    "parentId" : 310101
},{
    "code" : 310101013,
    "name" : "外滩街道",
    "parentId" : 310101
},{
    "code" : 310101015,
    "name" : "半淞园路街道",
    "parentId" : 310101
},{
    "code" : 310101017,
    "name" : "小东门街道",
    "parentId" : 310101
},{
    "code" : 310101018,
    "name" : "豫园街道",
    "parentId" : 310101
},{
    "code" : 310101019,
    "name" : "老西门街道",
    "parentId" : 310101
},{
    "code" : 310101020,
    "name" : "五里桥街道",
    "parentId" : 310101
},{
    "code" : 310101021,
    "name" : "打浦桥街道",
    "parentId" : 310101
},{
    "code" : 310101022,
    "name" : "淮海中路街道",
    "parentId" : 310101
},{
    "code" : 310101023,
    "name" : "瑞金二路街道",
    "parentId" : 310101
},{
    "code" : 310104003,
    "name" : "天平路街道",
    "parentId" : 310104
},{
    "code" : 310104004,
    "name" : "湖南路街道",
    "parentId" : 310104
},{
    "code" : 310104007,
    "name" : "斜土路街道",
    "parentId" : 310104
},{
    "code" : 310104008,
    "name" : "枫林路街道",
    "parentId" : 310104
},{
    "code" : 310104010,
    "name" : "长桥街道",
    "parentId" : 310104
},{
    "code" : 310104011,
    "name" : "田林街道",
    "parentId" : 310104
},{
    "code" : 310104012,
    "name" : "虹梅路街道",
    "parentId" : 310104
},{
    "code" : 310104013,
    "name" : "康健新村街道",
    "parentId" : 310104
},{
    "code" : 310104014,
    "name" : "徐家汇街道",
    "parentId" : 310104
},{
    "code" : 310104015,
    "name" : "凌云路街道",
    "parentId" : 310104
},{
    "code" : 310104016,
    "name" : "龙华街道",
    "parentId" : 310104
},{
    "code" : 310104017,
    "name" : "漕河泾街道",
    "parentId" : 310104
},{
    "code" : 310104103,
    "name" : "华泾镇",
    "parentId" : 310104
},{
    "code" : 310104501,
    "name" : "漕河泾新兴技术开发区",
    "parentId" : 310104
},{
    "code" : 310105001,
    "name" : "华阳路街道",
    "parentId" : 310105
},{
    "code" : 310105002,
    "name" : "江苏路街道",
    "parentId" : 310105
},{
    "code" : 310105004,
    "name" : "新华路街道",
    "parentId" : 310105
},{
    "code" : 310105005,
    "name" : "周家桥街道",
    "parentId" : 310105
},{
    "code" : 310105006,
    "name" : "天山路街道",
    "parentId" : 310105
},{
    "code" : 310105008,
    "name" : "仙霞新村街道",
    "parentId" : 310105
},{
    "code" : 310105009,
    "name" : "虹桥街道",
    "parentId" : 310105
},{
    "code" : 310105010,
    "name" : "程家桥街道",
    "parentId" : 310105
},{
    "code" : 310105011,
    "name" : "北新泾街道",
    "parentId" : 310105
},{
    "code" : 310105102,
    "name" : "新泾镇",
    "parentId" : 310105
},{
    "code" : 310106006,
    "name" : "江宁路街道",
    "parentId" : 310106
},{
    "code" : 310106011,
    "name" : "石门二路街道",
    "parentId" : 310106
},{
    "code" : 310106012,
    "name" : "南京西路街道",
    "parentId" : 310106
},{
    "code" : 310106013,
    "name" : "静安寺街道",
    "parentId" : 310106
},{
    "code" : 310106014,
    "name" : "曹家渡街道",
    "parentId" : 310106
},{
    "code" : 310107005,
    "name" : "曹杨新村街道",
    "parentId" : 310107
},{
    "code" : 310107014,
    "name" : "长风新村街道",
    "parentId" : 310107
},{
    "code" : 310107015,
    "name" : "长寿路街道",
    "parentId" : 310107
},{
    "code" : 310107016,
    "name" : "甘泉路街道",
    "parentId" : 310107
},{
    "code" : 310107017,
    "name" : "石泉路街道",
    "parentId" : 310107
},{
    "code" : 310107020,
    "name" : "宜川路街道",
    "parentId" : 310107
},{
    "code" : 310107101,
    "name" : "真如镇",
    "parentId" : 310107
},{
    "code" : 310107102,
    "name" : "长征镇",
    "parentId" : 310107
},{
    "code" : 310107103,
    "name" : "桃浦镇",
    "parentId" : 310107
},{
    "code" : 310108001,
    "name" : "天目西路街道",
    "parentId" : 310108
},{
    "code" : 310108006,
    "name" : "北站街道",
    "parentId" : 310108
},{
    "code" : 310108007,
    "name" : "宝山路街道",
    "parentId" : 310108
},{
    "code" : 310108012,
    "name" : "共和新路街道",
    "parentId" : 310108
},{
    "code" : 310108013,
    "name" : "大宁路街道",
    "parentId" : 310108
},{
    "code" : 310108014,
    "name" : "彭浦新村街道",
    "parentId" : 310108
},{
    "code" : 310108015,
    "name" : "临汾路街道",
    "parentId" : 310108
},{
    "code" : 310108016,
    "name" : "芷江西路街道",
    "parentId" : 310108
},{
    "code" : 310108101,
    "name" : "彭浦镇",
    "parentId" : 310108
},{
    "code" : 310109009,
    "name" : "欧阳路街道",
    "parentId" : 310109
},{
    "code" : 310109010,
    "name" : "曲阳路街道",
    "parentId" : 310109
},{
    "code" : 310109011,
    "name" : "广中路街道",
    "parentId" : 310109
},{
    "code" : 310109014,
    "name" : "嘉兴路街道",
    "parentId" : 310109
},{
    "code" : 310109016,
    "name" : "凉城新村街道",
    "parentId" : 310109
},{
    "code" : 310109017,
    "name" : "四川北路街道",
    "parentId" : 310109
},{
    "code" : 310109018,
    "name" : "提篮桥街道",
    "parentId" : 310109
},{
    "code" : 310109019,
    "name" : "江湾镇街道",
    "parentId" : 310109
},{
    "code" : 310110001,
    "name" : "定海路街道",
    "parentId" : 310110
},{
    "code" : 310110006,
    "name" : "平凉路街道",
    "parentId" : 310110
},{
    "code" : 310110008,
    "name" : "江浦路街道",
    "parentId" : 310110
},{
    "code" : 310110009,
    "name" : "四平路街道",
    "parentId" : 310110
},{
    "code" : 310110012,
    "name" : "控江路街道",
    "parentId" : 310110
},{
    "code" : 310110013,
    "name" : "长白新村街道",
    "parentId" : 310110
},{
    "code" : 310110015,
    "name" : "延吉新村街道",
    "parentId" : 310110
},{
    "code" : 310110016,
    "name" : "殷行街道",
    "parentId" : 310110
},{
    "code" : 310110018,
    "name" : "大桥街道",
    "parentId" : 310110
},{
    "code" : 310110019,
    "name" : "五角场街道",
    "parentId" : 310110
},{
    "code" : 310110020,
    "name" : "新江湾城街道",
    "parentId" : 310110
},{
    "code" : 310110101,
    "name" : "五角场镇",
    "parentId" : 310110
},{
    "code" : 310112001,
    "name" : "江川路街道",
    "parentId" : 310112
},{
    "code" : 310112006,
    "name" : "古美街道",
    "parentId" : 310112
},{
    "code" : 310112008,
    "name" : "新虹街道",
    "parentId" : 310112
},{
    "code" : 310112101,
    "name" : "莘庄镇",
    "parentId" : 310112
},{
    "code" : 310112102,
    "name" : "七宝镇",
    "parentId" : 310112
},{
    "code" : 310112103,
    "name" : "颛桥镇",
    "parentId" : 310112
},{
    "code" : 310112106,
    "name" : "华漕镇",
    "parentId" : 310112
},{
    "code" : 310112107,
    "name" : "虹桥镇",
    "parentId" : 310112
},{
    "code" : 310112108,
    "name" : "梅陇镇",
    "parentId" : 310112
},{
    "code" : 310112110,
    "name" : "吴泾镇",
    "parentId" : 310112
},{
    "code" : 310112112,
    "name" : "马桥镇",
    "parentId" : 310112
},{
    "code" : 310112114,
    "name" : "浦江镇",
    "parentId" : 310112
},{
    "code" : 310112501,
    "name" : "莘庄工业区",
    "parentId" : 310112
},{
    "code" : 310113003,
    "name" : "友谊路街道",
    "parentId" : 310113
},{
    "code" : 310113007,
    "name" : "吴淞街道",
    "parentId" : 310113
},{
    "code" : 310113008,
    "name" : "张庙街道",
    "parentId" : 310113
},{
    "code" : 310113101,
    "name" : "罗店镇",
    "parentId" : 310113
},{
    "code" : 310113102,
    "name" : "大场镇",
    "parentId" : 310113
},{
    "code" : 310113103,
    "name" : "杨行镇",
    "parentId" : 310113
},{
    "code" : 310113104,
    "name" : "月浦镇",
    "parentId" : 310113
},{
    "code" : 310113106,
    "name" : "罗泾镇",
    "parentId" : 310113
},{
    "code" : 310113109,
    "name" : "顾村镇",
    "parentId" : 310113
},{
    "code" : 310113111,
    "name" : "高境镇",
    "parentId" : 310113
},{
    "code" : 310113112,
    "name" : "庙行镇",
    "parentId" : 310113
},{
    "code" : 310113113,
    "name" : "淞南镇",
    "parentId" : 310113
},{
    "code" : 310113501,
    "name" : "宝山城市工业园区",
    "parentId" : 310113
},{
    "code" : 310114001,
    "name" : "新成路街道",
    "parentId" : 310114
},{
    "code" : 310114002,
    "name" : "真新街道",
    "parentId" : 310114
},{
    "code" : 310114003,
    "name" : "菊园新区管委会",
    "parentId" : 310114
},{
    "code" : 310114004,
    "name" : "嘉定镇街道",
    "parentId" : 310114
},{
    "code" : 310114102,
    "name" : "南翔镇",
    "parentId" : 310114
},{
    "code" : 310114106,
    "name" : "马陆镇",
    "parentId" : 310114
},{
    "code" : 310114109,
    "name" : "徐行镇",
    "parentId" : 310114
},{
    "code" : 310114111,
    "name" : "华亭镇",
    "parentId" : 310114
},{
    "code" : 310114114,
    "name" : "外冈镇",
    "parentId" : 310114
},{
    "code" : 310114118,
    "name" : "江桥镇",
    "parentId" : 310114
},{
    "code" : 310114501,
    "name" : "嘉定工业区",
    "parentId" : 310114
},{
    "code" : 310115004,
    "name" : "潍坊新村街道",
    "parentId" : 310115
},{
    "code" : 310115005,
    "name" : "陆家嘴街道",
    "parentId" : 310115
},{
    "code" : 310115007,
    "name" : "周家渡街道",
    "parentId" : 310115
},{
    "code" : 310115008,
    "name" : "塘桥街道",
    "parentId" : 310115
},{
    "code" : 310115009,
    "name" : "上钢新村街道",
    "parentId" : 310115
},{
    "code" : 310115010,
    "name" : "南码头路街道",
    "parentId" : 310115
},{
    "code" : 310115011,
    "name" : "沪东新村街道",
    "parentId" : 310115
},{
    "code" : 310115012,
    "name" : "金杨新村街道",
    "parentId" : 310115
},{
    "code" : 310115013,
    "name" : "洋泾街道",
    "parentId" : 310115
},{
    "code" : 310115014,
    "name" : "浦兴路街道",
    "parentId" : 310115
},{
    "code" : 310115015,
    "name" : "东明路街道",
    "parentId" : 310115
},{
    "code" : 310115016,
    "name" : "花木街道",
    "parentId" : 310115
},{
    "code" : 310115103,
    "name" : "川沙新镇",
    "parentId" : 310115
},{
    "code" : 310115104,
    "name" : "高桥镇",
    "parentId" : 310115
},{
    "code" : 310115105,
    "name" : "北蔡镇",
    "parentId" : 310115
},{
    "code" : 310115110,
    "name" : "合庆镇",
    "parentId" : 310115
},{
    "code" : 310115114,
    "name" : "唐镇",
    "parentId" : 310115
},{
    "code" : 310115117,
    "name" : "曹路镇",
    "parentId" : 310115
},{
    "code" : 310115120,
    "name" : "金桥镇",
    "parentId" : 310115
},{
    "code" : 310115121,
    "name" : "高行镇",
    "parentId" : 310115
},{
    "code" : 310115123,
    "name" : "高东镇",
    "parentId" : 310115
},{
    "code" : 310115125,
    "name" : "张江镇",
    "parentId" : 310115
},{
    "code" : 310115130,
    "name" : "三林镇",
    "parentId" : 310115
},{
    "code" : 310115131,
    "name" : "惠南镇",
    "parentId" : 310115
},{
    "code" : 310115132,
    "name" : "周浦镇",
    "parentId" : 310115
},{
    "code" : 310115133,
    "name" : "新场镇",
    "parentId" : 310115
},{
    "code" : 310115134,
    "name" : "大团镇",
    "parentId" : 310115
},{
    "code" : 310115136,
    "name" : "康桥镇",
    "parentId" : 310115
},{
    "code" : 310115137,
    "name" : "航头镇",
    "parentId" : 310115
},{
    "code" : 310115139,
    "name" : "祝桥镇",
    "parentId" : 310115
},{
    "code" : 310115140,
    "name" : "泥城镇",
    "parentId" : 310115
},{
    "code" : 310115141,
    "name" : "宣桥镇",
    "parentId" : 310115
},{
    "code" : 310115142,
    "name" : "书院镇",
    "parentId" : 310115
},{
    "code" : 310115143,
    "name" : "万祥镇",
    "parentId" : 310115
},{
    "code" : 310115144,
    "name" : "老港镇",
    "parentId" : 310115
},{
    "code" : 310115145,
    "name" : "南汇新城镇",
    "parentId" : 310115
},{
    "code" : 310115501,
    "name" : "外高桥保税区",
    "parentId" : 310115
},{
    "code" : 310115502,
    "name" : "金桥经济技术开发区",
    "parentId" : 310115
},{
    "code" : 310115503,
    "name" : "张江高科技园区",
    "parentId" : 310115
},{
    "code" : 310116001,
    "name" : "石化街道",
    "parentId" : 310116
},{
    "code" : 310116101,
    "name" : "朱泾镇",
    "parentId" : 310116
},{
    "code" : 310116102,
    "name" : "枫泾镇",
    "parentId" : 310116
},{
    "code" : 310116103,
    "name" : "张堰镇",
    "parentId" : 310116
},{
    "code" : 310116105,
    "name" : "吕巷镇",
    "parentId" : 310116
},{
    "code" : 310116107,
    "name" : "廊下镇",
    "parentId" : 310116
},{
    "code" : 310116109,
    "name" : "金山卫镇",
    "parentId" : 310116
},{
    "code" : 310116112,
    "name" : "漕泾镇",
    "parentId" : 310116
},{
    "code" : 310116113,
    "name" : "山阳镇",
    "parentId" : 310116
},{
    "code" : 310116503,
    "name" : "金山工业区",
    "parentId" : 310116
},{
    "code" : 310117001,
    "name" : "岳阳街道",
    "parentId" : 310117
},{
    "code" : 310117002,
    "name" : "永丰街道",
    "parentId" : 310117
},{
    "code" : 310117003,
    "name" : "方松街道",
    "parentId" : 310117
},{
    "code" : 310117004,
    "name" : "中山街道",
    "parentId" : 310117
},{
    "code" : 310117102,
    "name" : "泗泾镇",
    "parentId" : 310117
},{
    "code" : 310117103,
    "name" : "佘山镇",
    "parentId" : 310117
},{
    "code" : 310117104,
    "name" : "车墩镇",
    "parentId" : 310117
},{
    "code" : 310117105,
    "name" : "新桥镇",
    "parentId" : 310117
},{
    "code" : 310117106,
    "name" : "洞泾镇",
    "parentId" : 310117
},{
    "code" : 310117107,
    "name" : "九亭镇",
    "parentId" : 310117
},{
    "code" : 310117109,
    "name" : "泖港镇",
    "parentId" : 310117
},{
    "code" : 310117116,
    "name" : "石湖荡镇",
    "parentId" : 310117
},{
    "code" : 310117117,
    "name" : "新浜镇",
    "parentId" : 310117
},{
    "code" : 310117120,
    "name" : "叶榭镇",
    "parentId" : 310117
},{
    "code" : 310117121,
    "name" : "小昆山镇",
    "parentId" : 310117
},{
    "code" : 310117501,
    "name" : "松江工业区",
    "parentId" : 310117
},{
    "code" : 310118001,
    "name" : "夏阳街道",
    "parentId" : 310118
},{
    "code" : 310118002,
    "name" : "盈浦街道",
    "parentId" : 310118
},{
    "code" : 310118003,
    "name" : "香花桥街道",
    "parentId" : 310118
},{
    "code" : 310118102,
    "name" : "朱家角镇",
    "parentId" : 310118
},{
    "code" : 310118103,
    "name" : "练塘镇",
    "parentId" : 310118
},{
    "code" : 310118104,
    "name" : "金泽镇",
    "parentId" : 310118
},{
    "code" : 310118105,
    "name" : "赵巷镇",
    "parentId" : 310118
},{
    "code" : 310118106,
    "name" : "徐泾镇",
    "parentId" : 310118
},{
    "code" : 310118109,
    "name" : "重固镇",
    "parentId" : 310118
},{
    "code" : 310118110,
    "name" : "白鹤镇",
    "parentId" : 310118
},{
    "code" : 310120101,
    "name" : "南桥镇",
    "parentId" : 310120
},{
    "code" : 310120102,
    "name" : "奉城镇",
    "parentId" : 310120
},{
    "code" : 310120104,
    "name" : "庄行镇",
    "parentId" : 310120
},{
    "code" : 310120106,
    "name" : "金汇镇",
    "parentId" : 310120
},{
    "code" : 310120109,
    "name" : "四团镇",
    "parentId" : 310120
},{
    "code" : 310120111,
    "name" : "青村镇",
    "parentId" : 310120
},{
    "code" : 310120118,
    "name" : "柘林镇",
    "parentId" : 310120
},{
    "code" : 310120123,
    "name" : "海湾镇",
    "parentId" : 310120
},{
    "code" : 310120501,
    "name" : "奉浦社区",
    "parentId" : 310120
},{
    "code" : 310120503,
    "name" : "上海市奉贤区海湾旅游区",
    "parentId" : 310120
},{
    "code" : 310120504,
    "name" : "金海社区",
    "parentId" : 310120
},{
    "code" : 310120505,
    "name" : "上海海港综合经济开发区",
    "parentId" : 310120
},{
    "code" : 310230101,
    "name" : "城桥镇",
    "parentId" : 310230
},{
    "code" : 310230102,
    "name" : "堡镇",
    "parentId" : 310230
},{
    "code" : 310230103,
    "name" : "新河镇",
    "parentId" : 310230
},{
    "code" : 310230104,
    "name" : "庙镇",
    "parentId" : 310230
},{
    "code" : 310230106,
    "name" : "竖新镇",
    "parentId" : 310230
},{
    "code" : 310230107,
    "name" : "向化镇",
    "parentId" : 310230
},{
    "code" : 310230109,
    "name" : "三星镇",
    "parentId" : 310230
},{
    "code" : 310230113,
    "name" : "港沿镇",
    "parentId" : 310230
},{
    "code" : 310230114,
    "name" : "中兴镇",
    "parentId" : 310230
},{
    "code" : 310230115,
    "name" : "陈家镇",
    "parentId" : 310230
},{
    "code" : 310230116,
    "name" : "绿华镇",
    "parentId" : 310230
},{
    "code" : 310230118,
    "name" : "港西镇",
    "parentId" : 310230
},{
    "code" : 310230119,
    "name" : "建设镇",
    "parentId" : 310230
},{
    "code" : 310230121,
    "name" : "新海镇",
    "parentId" : 310230
},{
    "code" : 310230122,
    "name" : "东平镇",
    "parentId" : 310230
},{
    "code" : 310230123,
    "name" : "长兴镇",
    "parentId" : 310230
},{
    "code" : 310230201,
    "name" : "新村乡",
    "parentId" : 310230
},{
    "code" : 310230203,
    "name" : "横沙乡",
    "parentId" : 310230
},{
    "code" : 310230409,
    "name" : "前卫农场",
    "parentId" : 310230
},{
    "code" : 310230410,
    "name" : "东平林场",
    "parentId" : 310230
},{
    "code" : 310230501,
    "name" : "上实现代农业园区",
    "parentId" : 310230
},{
    "code" : 419001001,
    "name" : "济源市沁园街道办事处",
    "parentId" : 419001
},{
    "code" : 419001002,
    "name" : "济源市济水街道办事处",
    "parentId" : 419001
},{
    "code" : 419001003,
    "name" : "济源市北海街道办事处",
    "parentId" : 419001
},{
    "code" : 419001004,
    "name" : "济源市天坛街道办事处",
    "parentId" : 419001
},{
    "code" : 419001005,
    "name" : "济源市玉泉街道办事处",
    "parentId" : 419001
},{
    "code" : 419001100,
    "name" : "济源市克井镇",
    "parentId" : 419001
},{
    "code" : 419001101,
    "name" : "济源市五龙口镇",
    "parentId" : 419001
},{
    "code" : 419001102,
    "name" : "济源市轵城镇",
    "parentId" : 419001
},{
    "code" : 419001103,
    "name" : "济源市承留镇",
    "parentId" : 419001
},{
    "code" : 419001104,
    "name" : "济源市邵原镇",
    "parentId" : 419001
},{
    "code" : 419001105,
    "name" : "济源市坡头镇",
    "parentId" : 419001
},{
    "code" : 419001106,
    "name" : "济源市梨林镇",
    "parentId" : 419001
},{
    "code" : 419001107,
    "name" : "济源市大峪镇",
    "parentId" : 419001
},{
    "code" : 419001108,
    "name" : "济源市思礼镇",
    "parentId" : 419001
},{
    "code" : 419001109,
    "name" : "济源市王屋镇",
    "parentId" : 419001
},{
    "code" : 419001110,
    "name" : "济源市下冶镇",
    "parentId" : 419001
},{
    "code" : 429004001,
    "name" : "沙嘴街道办事处",
    "parentId" : 429004
},{
    "code" : 429004002,
    "name" : "干河街道办事处",
    "parentId" : 429004
},{
    "code" : 429004003,
    "name" : "龙华山办事处",
    "parentId" : 429004
},{
    "code" : 429004100,
    "name" : "郑场镇",
    "parentId" : 429004
},{
    "code" : 429004101,
    "name" : "毛嘴镇",
    "parentId" : 429004
},{
    "code" : 429004102,
    "name" : "豆河镇",
    "parentId" : 429004
},{
    "code" : 429004103,
    "name" : "三伏潭镇",
    "parentId" : 429004
},{
    "code" : 429004104,
    "name" : "胡场镇",
    "parentId" : 429004
},{
    "code" : 429004105,
    "name" : "长倘口镇",
    "parentId" : 429004
},{
    "code" : 429004106,
    "name" : "西流河镇",
    "parentId" : 429004
},{
    "code" : 429004107,
    "name" : "沙湖镇",
    "parentId" : 429004
},{
    "code" : 429004108,
    "name" : "杨林尾镇",
    "parentId" : 429004
},{
    "code" : 429004109,
    "name" : "彭场镇",
    "parentId" : 429004
},{
    "code" : 429004110,
    "name" : "张沟镇",
    "parentId" : 429004
},{
    "code" : 429004111,
    "name" : "郭河镇",
    "parentId" : 429004
},{
    "code" : 429004112,
    "name" : "沔城回族镇",
    "parentId" : 429004
},{
    "code" : 429004113,
    "name" : "通海口镇",
    "parentId" : 429004
},{
    "code" : 429004114,
    "name" : "陈场镇",
    "parentId" : 429004
},{
    "code" : 429005001,
    "name" : "园林办事处",
    "parentId" : 429005
},{
    "code" : 429005002,
    "name" : "杨市办事处",
    "parentId" : 429005
},{
    "code" : 429005003,
    "name" : "周矶办事处",
    "parentId" : 429005
},{
    "code" : 429005004,
    "name" : "广华办事处",
    "parentId" : 429005
},{
    "code" : 429005005,
    "name" : "泰丰办事处",
    "parentId" : 429005
},{
    "code" : 429005006,
    "name" : "高场办事处",
    "parentId" : 429005
},{
    "code" : 429005100,
    "name" : "竹根滩镇",
    "parentId" : 429005
},{
    "code" : 429005101,
    "name" : "渔洋镇",
    "parentId" : 429005
},{
    "code" : 429005102,
    "name" : "王场镇",
    "parentId" : 429005
},{
    "code" : 429005103,
    "name" : "高石碑镇",
    "parentId" : 429005
},{
    "code" : 429005104,
    "name" : "熊口镇",
    "parentId" : 429005
},{
    "code" : 429005105,
    "name" : "老新镇",
    "parentId" : 429005
},{
    "code" : 429005106,
    "name" : "浩口镇",
    "parentId" : 429005
},{
    "code" : 429005107,
    "name" : "积玉口镇",
    "parentId" : 429005
},{
    "code" : 429005108,
    "name" : "张金镇",
    "parentId" : 429005
},{
    "code" : 429005109,
    "name" : "龙湾镇",
    "parentId" : 429005
},{
    "code" : 429006001,
    "name" : "竟陵街道办事处",
    "parentId" : 429006
},{
    "code" : 429006002,
    "name" : "侨乡街道开发区",
    "parentId" : 429006
},{
    "code" : 429006003,
    "name" : "杨林街道办事处",
    "parentId" : 429006
},{
    "code" : 429006101,
    "name" : "拖市镇",
    "parentId" : 429006
},{
    "code" : 429006102,
    "name" : "张港镇",
    "parentId" : 429006
},{
    "code" : 429006103,
    "name" : "蒋场镇",
    "parentId" : 429006
},{
    "code" : 429006104,
    "name" : "汪场镇",
    "parentId" : 429006
},{
    "code" : 429006105,
    "name" : "渔薪镇",
    "parentId" : 429006
},{
    "code" : 429006106,
    "name" : "黄潭镇",
    "parentId" : 429006
},{
    "code" : 429006107,
    "name" : "岳口镇",
    "parentId" : 429006
},{
    "code" : 429006108,
    "name" : "横林镇",
    "parentId" : 429006
},{
    "code" : 429006109,
    "name" : "彭市镇",
    "parentId" : 429006
},{
    "code" : 429006110,
    "name" : "麻洋镇",
    "parentId" : 429006
},{
    "code" : 429006111,
    "name" : "多祥镇",
    "parentId" : 429006
},{
    "code" : 429006112,
    "name" : "干驿镇",
    "parentId" : 429006
},{
    "code" : 429006113,
    "name" : "马湾镇",
    "parentId" : 429006
},{
    "code" : 429006114,
    "name" : "卢市镇",
    "parentId" : 429006
},{
    "code" : 429006115,
    "name" : "小板镇",
    "parentId" : 429006
},{
    "code" : 429006116,
    "name" : "九真镇",
    "parentId" : 429006
},{
    "code" : 429006118,
    "name" : "皂市镇",
    "parentId" : 429006
},{
    "code" : 429006119,
    "name" : "胡市镇",
    "parentId" : 429006
},{
    "code" : 429006120,
    "name" : "石河镇",
    "parentId" : 429006
},{
    "code" : 429006121,
    "name" : "佛子山镇",
    "parentId" : 429006
},{
    "code" : 429006201,
    "name" : "净潭乡",
    "parentId" : 429006
},{
    "code" : 429021100,
    "name" : "松柏镇",
    "parentId" : 429021
},{
    "code" : 429021101,
    "name" : "阳日镇",
    "parentId" : 429021
},{
    "code" : 429021102,
    "name" : "木鱼镇",
    "parentId" : 429021
},{
    "code" : 429021103,
    "name" : "红坪镇",
    "parentId" : 429021
},{
    "code" : 429021104,
    "name" : "新华镇",
    "parentId" : 429021
},{
    "code" : 429021105,
    "name" : "九湖镇",
    "parentId" : 429021
},{
    "code" : 429021200,
    "name" : "宋洛乡",
    "parentId" : 429021
},{
    "code" : 429021202,
    "name" : "下谷坪土家族乡",
    "parentId" : 429021
},{
    "code" : 469001100,
    "name" : "通什镇",
    "parentId" : 469001
},{
    "code" : 469001101,
    "name" : "南圣镇",
    "parentId" : 469001
},{
    "code" : 469001102,
    "name" : "毛阳镇",
    "parentId" : 469001
},{
    "code" : 469001103,
    "name" : "番阳镇",
    "parentId" : 469001
},{
    "code" : 469001200,
    "name" : "畅好乡",
    "parentId" : 469001
},{
    "code" : 469001201,
    "name" : "毛道乡",
    "parentId" : 469001
},{
    "code" : 469001202,
    "name" : "水满乡",
    "parentId" : 469001
},{
    "code" : 469002100,
    "name" : "嘉积镇",
    "parentId" : 469002
},{
    "code" : 469002101,
    "name" : "万泉镇",
    "parentId" : 469002
},{
    "code" : 469002102,
    "name" : "石壁镇",
    "parentId" : 469002
},{
    "code" : 469002103,
    "name" : "中原镇",
    "parentId" : 469002
},{
    "code" : 469002104,
    "name" : "博鳌镇",
    "parentId" : 469002
},{
    "code" : 469002105,
    "name" : "阳江镇",
    "parentId" : 469002
},{
    "code" : 469002106,
    "name" : "龙江镇",
    "parentId" : 469002
},{
    "code" : 469002107,
    "name" : "潭门镇",
    "parentId" : 469002
},{
    "code" : 469002108,
    "name" : "塔洋镇",
    "parentId" : 469002
},{
    "code" : 469002109,
    "name" : "长坡镇",
    "parentId" : 469002
},{
    "code" : 469002110,
    "name" : "大路镇",
    "parentId" : 469002
},{
    "code" : 469002111,
    "name" : "会山镇",
    "parentId" : 469002
},{
    "code" : 469003100,
    "name" : "那大镇",
    "parentId" : 469003
},{
    "code" : 469003101,
    "name" : "和庆镇",
    "parentId" : 469003
},{
    "code" : 469003102,
    "name" : "南丰镇",
    "parentId" : 469003
},{
    "code" : 469003103,
    "name" : "大成镇",
    "parentId" : 469003
},{
    "code" : 469003104,
    "name" : "雅星镇",
    "parentId" : 469003
},{
    "code" : 469003105,
    "name" : "兰洋镇",
    "parentId" : 469003
},{
    "code" : 469003106,
    "name" : "光村镇",
    "parentId" : 469003
},{
    "code" : 469003107,
    "name" : "木棠镇",
    "parentId" : 469003
},{
    "code" : 469003108,
    "name" : "海头镇",
    "parentId" : 469003
},{
    "code" : 469003109,
    "name" : "峨蔓镇",
    "parentId" : 469003
},{
    "code" : 469003110,
    "name" : "三都镇",
    "parentId" : 469003
},{
    "code" : 469003111,
    "name" : "王五镇",
    "parentId" : 469003
},{
    "code" : 469003112,
    "name" : "白马井镇",
    "parentId" : 469003
},{
    "code" : 469003113,
    "name" : "中和镇",
    "parentId" : 469003
},{
    "code" : 469003114,
    "name" : "排浦镇",
    "parentId" : 469003
},{
    "code" : 469003115,
    "name" : "东成镇",
    "parentId" : 469003
},{
    "code" : 469003116,
    "name" : "新州镇",
    "parentId" : 469003
},{
    "code" : 469005100,
    "name" : "文城镇",
    "parentId" : 469005
},{
    "code" : 469005101,
    "name" : "重兴镇",
    "parentId" : 469005
},{
    "code" : 469005102,
    "name" : "蓬莱镇",
    "parentId" : 469005
},{
    "code" : 469005103,
    "name" : "会文镇",
    "parentId" : 469005
},{
    "code" : 469005104,
    "name" : "东路镇",
    "parentId" : 469005
},{
    "code" : 469005105,
    "name" : "潭牛镇",
    "parentId" : 469005
},{
    "code" : 469005106,
    "name" : "东阁镇",
    "parentId" : 469005
},{
    "code" : 469005107,
    "name" : "文教镇",
    "parentId" : 469005
},{
    "code" : 469005108,
    "name" : "东郊镇",
    "parentId" : 469005
},{
    "code" : 469005109,
    "name" : "龙楼镇",
    "parentId" : 469005
},{
    "code" : 469005110,
    "name" : "昌洒镇",
    "parentId" : 469005
},{
    "code" : 469005111,
    "name" : "翁田镇",
    "parentId" : 469005
},{
    "code" : 469005112,
    "name" : "抱罗镇",
    "parentId" : 469005
},{
    "code" : 469005113,
    "name" : "冯坡镇",
    "parentId" : 469005
},{
    "code" : 469005114,
    "name" : "锦山镇",
    "parentId" : 469005
},{
    "code" : 469005115,
    "name" : "铺前镇",
    "parentId" : 469005
},{
    "code" : 469005116,
    "name" : "公坡镇",
    "parentId" : 469005
},{
    "code" : 469006100,
    "name" : "万城镇",
    "parentId" : 469006
},{
    "code" : 469006101,
    "name" : "龙滚镇",
    "parentId" : 469006
},{
    "code" : 469006102,
    "name" : "和乐镇",
    "parentId" : 469006
},{
    "code" : 469006103,
    "name" : "后安镇",
    "parentId" : 469006
},{
    "code" : 469006104,
    "name" : "大茂镇",
    "parentId" : 469006
},{
    "code" : 469006105,
    "name" : "东澳镇",
    "parentId" : 469006
},{
    "code" : 469006106,
    "name" : "礼纪镇",
    "parentId" : 469006
},{
    "code" : 469006107,
    "name" : "长丰镇",
    "parentId" : 469006
},{
    "code" : 469006108,
    "name" : "山根镇",
    "parentId" : 469006
},{
    "code" : 469006109,
    "name" : "北大镇",
    "parentId" : 469006
},{
    "code" : 469006110,
    "name" : "南桥镇",
    "parentId" : 469006
},{
    "code" : 469006111,
    "name" : "三更罗镇",
    "parentId" : 469006
},{
    "code" : 469007100,
    "name" : "八所镇",
    "parentId" : 469007
},{
    "code" : 469007101,
    "name" : "东河镇",
    "parentId" : 469007
},{
    "code" : 469007102,
    "name" : "大田镇",
    "parentId" : 469007
},{
    "code" : 469007103,
    "name" : "感城镇",
    "parentId" : 469007
},{
    "code" : 469007104,
    "name" : "板桥镇",
    "parentId" : 469007
},{
    "code" : 469007105,
    "name" : "三家镇",
    "parentId" : 469007
},{
    "code" : 469007106,
    "name" : "四更镇",
    "parentId" : 469007
},{
    "code" : 469007107,
    "name" : "新龙镇",
    "parentId" : 469007
},{
    "code" : 469007200,
    "name" : "天安乡",
    "parentId" : 469007
},{
    "code" : 469007201,
    "name" : "江边乡",
    "parentId" : 469007
},{
    "code" : 469021100,
    "name" : "定城镇",
    "parentId" : 469021
},{
    "code" : 469021101,
    "name" : "新竹镇",
    "parentId" : 469021
},{
    "code" : 469021102,
    "name" : "龙湖镇",
    "parentId" : 469021
},{
    "code" : 469021103,
    "name" : "黄竹镇",
    "parentId" : 469021
},{
    "code" : 469021104,
    "name" : "雷鸣镇",
    "parentId" : 469021
},{
    "code" : 469021105,
    "name" : "龙门镇",
    "parentId" : 469021
},{
    "code" : 469021106,
    "name" : "龙河镇",
    "parentId" : 469021
},{
    "code" : 469021107,
    "name" : "岭口镇",
    "parentId" : 469021
},{
    "code" : 469021108,
    "name" : "翰林镇",
    "parentId" : 469021
},{
    "code" : 469021109,
    "name" : "富文镇",
    "parentId" : 469021
},{
    "code" : 469022100,
    "name" : "屯城镇",
    "parentId" : 469022
},{
    "code" : 469022101,
    "name" : "新兴镇",
    "parentId" : 469022
},{
    "code" : 469022102,
    "name" : "枫木镇",
    "parentId" : 469022
},{
    "code" : 469022103,
    "name" : "乌坡镇",
    "parentId" : 469022
},{
    "code" : 469022104,
    "name" : "南吕镇",
    "parentId" : 469022
},{
    "code" : 469022105,
    "name" : "南坤镇",
    "parentId" : 469022
},{
    "code" : 469022106,
    "name" : "坡心镇",
    "parentId" : 469022
},{
    "code" : 469022107,
    "name" : "西昌镇",
    "parentId" : 469022
},{
    "code" : 469023100,
    "name" : "金江镇",
    "parentId" : 469023
},{
    "code" : 469023101,
    "name" : "老城镇",
    "parentId" : 469023
},{
    "code" : 469023102,
    "name" : "瑞溪镇",
    "parentId" : 469023
},{
    "code" : 469023103,
    "name" : "永发镇",
    "parentId" : 469023
},{
    "code" : 469023104,
    "name" : "加乐镇",
    "parentId" : 469023
},{
    "code" : 469023105,
    "name" : "文儒镇",
    "parentId" : 469023
},{
    "code" : 469023106,
    "name" : "中兴镇",
    "parentId" : 469023
},{
    "code" : 469023107,
    "name" : "仁兴镇",
    "parentId" : 469023
},{
    "code" : 469023108,
    "name" : "福山镇",
    "parentId" : 469023
},{
    "code" : 469023109,
    "name" : "桥头镇",
    "parentId" : 469023
},{
    "code" : 469023110,
    "name" : "大丰镇",
    "parentId" : 469023
},{
    "code" : 469024100,
    "name" : "临城镇",
    "parentId" : 469024
},{
    "code" : 469024101,
    "name" : "波莲镇",
    "parentId" : 469024
},{
    "code" : 469024102,
    "name" : "东英镇",
    "parentId" : 469024
},{
    "code" : 469024103,
    "name" : "博厚镇",
    "parentId" : 469024
},{
    "code" : 469024104,
    "name" : "皇桐镇",
    "parentId" : 469024
},{
    "code" : 469024105,
    "name" : "多文镇",
    "parentId" : 469024
},{
    "code" : 469024106,
    "name" : "和舍镇",
    "parentId" : 469024
},{
    "code" : 469024107,
    "name" : "南宝镇",
    "parentId" : 469024
},{
    "code" : 469024108,
    "name" : "新盈镇",
    "parentId" : 469024
},{
    "code" : 469024109,
    "name" : "调楼镇",
    "parentId" : 469024
},{
    "code" : 469025100,
    "name" : "牙叉镇",
    "parentId" : 469025
},{
    "code" : 469025101,
    "name" : "七坊镇",
    "parentId" : 469025
},{
    "code" : 469025102,
    "name" : "邦溪镇",
    "parentId" : 469025
},{
    "code" : 469025103,
    "name" : "打安镇",
    "parentId" : 469025
},{
    "code" : 469025200,
    "name" : "细水乡",
    "parentId" : 469025
},{
    "code" : 469025201,
    "name" : "元门乡",
    "parentId" : 469025
},{
    "code" : 469025202,
    "name" : "南开乡",
    "parentId" : 469025
},{
    "code" : 469025203,
    "name" : "阜龙乡",
    "parentId" : 469025
},{
    "code" : 469025204,
    "name" : "青松乡",
    "parentId" : 469025
},{
    "code" : 469025205,
    "name" : "金波乡",
    "parentId" : 469025
},{
    "code" : 469025206,
    "name" : "荣邦乡",
    "parentId" : 469025
},{
    "code" : 469026100,
    "name" : "石碌镇",
    "parentId" : 469026
},{
    "code" : 469026101,
    "name" : "叉河镇",
    "parentId" : 469026
},{
    "code" : 469026102,
    "name" : "十月田镇",
    "parentId" : 469026
},{
    "code" : 469026103,
    "name" : "乌烈镇",
    "parentId" : 469026
},{
    "code" : 469026104,
    "name" : "昌化镇",
    "parentId" : 469026
},{
    "code" : 469026105,
    "name" : "海尾镇",
    "parentId" : 469026
},{
    "code" : 469026106,
    "name" : "七叉镇",
    "parentId" : 469026
},{
    "code" : 469026200,
    "name" : "王下乡",
    "parentId" : 469026
},{
    "code" : 469027100,
    "name" : "抱由镇",
    "parentId" : 469027
},{
    "code" : 469027101,
    "name" : "万冲镇",
    "parentId" : 469027
},{
    "code" : 469027102,
    "name" : "大安镇",
    "parentId" : 469027
},{
    "code" : 469027103,
    "name" : "志仲镇",
    "parentId" : 469027
},{
    "code" : 469027104,
    "name" : "千家镇",
    "parentId" : 469027
},{
    "code" : 469027105,
    "name" : "九所镇",
    "parentId" : 469027
},{
    "code" : 469027106,
    "name" : "利国镇",
    "parentId" : 469027
},{
    "code" : 469027107,
    "name" : "黄流镇",
    "parentId" : 469027
},{
    "code" : 469027108,
    "name" : "佛罗镇",
    "parentId" : 469027
},{
    "code" : 469027109,
    "name" : "尖峰镇",
    "parentId" : 469027
},{
    "code" : 469027110,
    "name" : "莺歌海镇",
    "parentId" : 469027
},{
    "code" : 469028100,
    "name" : "椰林镇",
    "parentId" : 469028
},{
    "code" : 469028101,
    "name" : "光坡镇",
    "parentId" : 469028
},{
    "code" : 469028102,
    "name" : "三才镇",
    "parentId" : 469028
},{
    "code" : 469028103,
    "name" : "英州镇",
    "parentId" : 469028
},{
    "code" : 469028104,
    "name" : "隆广镇",
    "parentId" : 469028
},{
    "code" : 469028105,
    "name" : "文罗镇",
    "parentId" : 469028
},{
    "code" : 469028106,
    "name" : "本号镇",
    "parentId" : 469028
},{
    "code" : 469028107,
    "name" : "新村镇",
    "parentId" : 469028
},{
    "code" : 469028108,
    "name" : "黎安镇",
    "parentId" : 469028
},{
    "code" : 469028200,
    "name" : "提蒙乡",
    "parentId" : 469028
},{
    "code" : 469028201,
    "name" : "群英乡",
    "parentId" : 469028
},{
    "code" : 469029100,
    "name" : "保城镇",
    "parentId" : 469029
},{
    "code" : 469029101,
    "name" : "什玲镇",
    "parentId" : 469029
},{
    "code" : 469029102,
    "name" : "加茂镇",
    "parentId" : 469029
},{
    "code" : 469029103,
    "name" : "响水镇",
    "parentId" : 469029
},{
    "code" : 469029104,
    "name" : "新政镇",
    "parentId" : 469029
},{
    "code" : 469029105,
    "name" : "三道镇",
    "parentId" : 469029
},{
    "code" : 469029200,
    "name" : "六弓乡",
    "parentId" : 469029
},{
    "code" : 469029201,
    "name" : "南林乡",
    "parentId" : 469029
},{
    "code" : 469029202,
    "name" : "毛感乡",
    "parentId" : 469029
},{
    "code" : 469030100,
    "name" : "营根镇",
    "parentId" : 469030
},{
    "code" : 469030101,
    "name" : "湾岭镇",
    "parentId" : 469030
},{
    "code" : 469030102,
    "name" : "黎母山镇",
    "parentId" : 469030
},{
    "code" : 469030103,
    "name" : "和平镇",
    "parentId" : 469030
},{
    "code" : 469030104,
    "name" : "长征镇",
    "parentId" : 469030
},{
    "code" : 469030105,
    "name" : "红毛镇",
    "parentId" : 469030
},{
    "code" : 469030106,
    "name" : "中平镇",
    "parentId" : 469030
},{
    "code" : 469030200,
    "name" : "吊罗山乡",
    "parentId" : 469030
},{
    "code" : 469030201,
    "name" : "上安乡",
    "parentId" : 469030
},{
    "code" : 469030202,
    "name" : "什运乡",
    "parentId" : 469030
},{
    "code" : 500101001,
    "name" : "高笋塘街道",
    "parentId" : 500101
},{
    "code" : 500101017,
    "name" : "太白街道",
    "parentId" : 500101
},{
    "code" : 500101018,
    "name" : "牌楼街道",
    "parentId" : 500101
},{
    "code" : 500101019,
    "name" : "双河口街道",
    "parentId" : 500101
},{
    "code" : 500101020,
    "name" : "龙都街道",
    "parentId" : 500101
},{
    "code" : 500101021,
    "name" : "周家坝街道",
    "parentId" : 500101
},{
    "code" : 500101022,
    "name" : "沙河街道",
    "parentId" : 500101
},{
    "code" : 500101023,
    "name" : "钟鼓楼街道",
    "parentId" : 500101
},{
    "code" : 500101024,
    "name" : "百安坝街道",
    "parentId" : 500101
},{
    "code" : 500101025,
    "name" : "五桥街道",
    "parentId" : 500101
},{
    "code" : 500101026,
    "name" : "陈家坝街道",
    "parentId" : 500101
},{
    "code" : 500101109,
    "name" : "小周镇",
    "parentId" : 500101
},{
    "code" : 500101110,
    "name" : "大周镇",
    "parentId" : 500101
},{
    "code" : 500101123,
    "name" : "新乡镇",
    "parentId" : 500101
},{
    "code" : 500101132,
    "name" : "孙家镇",
    "parentId" : 500101
},{
    "code" : 500101134,
    "name" : "高峰镇",
    "parentId" : 500101
},{
    "code" : 500101135,
    "name" : "龙沙镇",
    "parentId" : 500101
},{
    "code" : 500101136,
    "name" : "响水镇",
    "parentId" : 500101
},{
    "code" : 500101137,
    "name" : "武陵镇",
    "parentId" : 500101
},{
    "code" : 500101138,
    "name" : "瀼渡镇",
    "parentId" : 500101
},{
    "code" : 500101139,
    "name" : "甘宁镇",
    "parentId" : 500101
},{
    "code" : 500101140,
    "name" : "天城镇",
    "parentId" : 500101
},{
    "code" : 500101141,
    "name" : "熊家镇",
    "parentId" : 500101
},{
    "code" : 500101142,
    "name" : "高梁镇",
    "parentId" : 500101
},{
    "code" : 500101143,
    "name" : "李河镇",
    "parentId" : 500101
},{
    "code" : 500101144,
    "name" : "分水镇",
    "parentId" : 500101
},{
    "code" : 500101145,
    "name" : "余家镇",
    "parentId" : 500101
},{
    "code" : 500101146,
    "name" : "后山镇",
    "parentId" : 500101
},{
    "code" : 500101147,
    "name" : "弹子镇",
    "parentId" : 500101
},{
    "code" : 500101148,
    "name" : "长岭镇",
    "parentId" : 500101
},{
    "code" : 500101149,
    "name" : "新田镇",
    "parentId" : 500101
},{
    "code" : 500101150,
    "name" : "白羊镇",
    "parentId" : 500101
},{
    "code" : 500101151,
    "name" : "龙驹镇",
    "parentId" : 500101
},{
    "code" : 500101152,
    "name" : "走马镇",
    "parentId" : 500101
},{
    "code" : 500101153,
    "name" : "罗田镇",
    "parentId" : 500101
},{
    "code" : 500101154,
    "name" : "太龙镇",
    "parentId" : 500101
},{
    "code" : 500101155,
    "name" : "长滩镇",
    "parentId" : 500101
},{
    "code" : 500101156,
    "name" : "太安镇",
    "parentId" : 500101
},{
    "code" : 500101157,
    "name" : "白土镇",
    "parentId" : 500101
},{
    "code" : 500101201,
    "name" : "柱山乡",
    "parentId" : 500101
},{
    "code" : 500101212,
    "name" : "铁峰乡",
    "parentId" : 500101
},{
    "code" : 500101225,
    "name" : "溪口乡",
    "parentId" : 500101
},{
    "code" : 500101226,
    "name" : "长坪乡",
    "parentId" : 500101
},{
    "code" : 500101227,
    "name" : "燕山乡",
    "parentId" : 500101
},{
    "code" : 500101234,
    "name" : "梨树乡",
    "parentId" : 500101
},{
    "code" : 500101237,
    "name" : "普子乡",
    "parentId" : 500101
},{
    "code" : 500101238,
    "name" : "地宝土家族乡",
    "parentId" : 500101
},{
    "code" : 500101239,
    "name" : "恒合土家族乡",
    "parentId" : 500101
},{
    "code" : 500101244,
    "name" : "黄柏乡",
    "parentId" : 500101
},{
    "code" : 500101245,
    "name" : "九池乡",
    "parentId" : 500101
},{
    "code" : 500101247,
    "name" : "茨竹乡",
    "parentId" : 500101
},{
    "code" : 500102006,
    "name" : "敦仁街道",
    "parentId" : 500102
},{
    "code" : 500102007,
    "name" : "崇义街道",
    "parentId" : 500102
},{
    "code" : 500102008,
    "name" : "荔枝街道",
    "parentId" : 500102
},{
    "code" : 500102009,
    "name" : "江北街道",
    "parentId" : 500102
},{
    "code" : 500102010,
    "name" : "江东街道",
    "parentId" : 500102
},{
    "code" : 500102011,
    "name" : "李渡街道",
    "parentId" : 500102
},{
    "code" : 500102012,
    "name" : "龙桥街道",
    "parentId" : 500102
},{
    "code" : 500102013,
    "name" : "白涛街道",
    "parentId" : 500102
},{
    "code" : 500102103,
    "name" : "南沱镇",
    "parentId" : 500102
},{
    "code" : 500102107,
    "name" : "青羊镇",
    "parentId" : 500102
},{
    "code" : 500102118,
    "name" : "百胜镇",
    "parentId" : 500102
},{
    "code" : 500102119,
    "name" : "珍溪镇",
    "parentId" : 500102
},{
    "code" : 500102120,
    "name" : "清溪镇",
    "parentId" : 500102
},{
    "code" : 500102121,
    "name" : "焦石镇",
    "parentId" : 500102
},{
    "code" : 500102122,
    "name" : "马武镇",
    "parentId" : 500102
},{
    "code" : 500102123,
    "name" : "龙潭镇",
    "parentId" : 500102
},{
    "code" : 500102124,
    "name" : "蔺市镇",
    "parentId" : 500102
},{
    "code" : 500102125,
    "name" : "新妙镇",
    "parentId" : 500102
},{
    "code" : 500102126,
    "name" : "石沱镇",
    "parentId" : 500102
},{
    "code" : 500102127,
    "name" : "义和镇",
    "parentId" : 500102
},{
    "code" : 500102204,
    "name" : "罗云乡",
    "parentId" : 500102
},{
    "code" : 500102206,
    "name" : "大木乡",
    "parentId" : 500102
},{
    "code" : 500102208,
    "name" : "武陵山乡",
    "parentId" : 500102
},{
    "code" : 500102216,
    "name" : "大顺乡",
    "parentId" : 500102
},{
    "code" : 500102217,
    "name" : "增福乡",
    "parentId" : 500102
},{
    "code" : 500102222,
    "name" : "同乐乡",
    "parentId" : 500102
},{
    "code" : 500103001,
    "name" : "七星岗街道",
    "parentId" : 500103
},{
    "code" : 500103003,
    "name" : "解放碑街道",
    "parentId" : 500103
},{
    "code" : 500103004,
    "name" : "两路口街道",
    "parentId" : 500103
},{
    "code" : 500103005,
    "name" : "上清寺街道",
    "parentId" : 500103
},{
    "code" : 500103007,
    "name" : "菜园坝街道",
    "parentId" : 500103
},{
    "code" : 500103008,
    "name" : "南纪门街道",
    "parentId" : 500103
},{
    "code" : 500103009,
    "name" : "望龙门街道",
    "parentId" : 500103
},{
    "code" : 500103010,
    "name" : "朝天门街道",
    "parentId" : 500103
},{
    "code" : 500103011,
    "name" : "大溪沟街道",
    "parentId" : 500103
},{
    "code" : 500103012,
    "name" : "大坪街道",
    "parentId" : 500103
},{
    "code" : 500103013,
    "name" : "化龙桥街道",
    "parentId" : 500103
},{
    "code" : 500103014,
    "name" : "石油路街道",
    "parentId" : 500103
},{
    "code" : 500104001,
    "name" : "新山村街道",
    "parentId" : 500104
},{
    "code" : 500104002,
    "name" : "跃进村街道",
    "parentId" : 500104
},{
    "code" : 500104003,
    "name" : "九宫庙街道",
    "parentId" : 500104
},{
    "code" : 500104004,
    "name" : "茄子溪街道",
    "parentId" : 500104
},{
    "code" : 500104005,
    "name" : "春晖路街道",
    "parentId" : 500104
},{
    "code" : 500104101,
    "name" : "八桥镇",
    "parentId" : 500104
},{
    "code" : 500104102,
    "name" : "建胜镇",
    "parentId" : 500104
},{
    "code" : 500104103,
    "name" : "跳磴镇",
    "parentId" : 500104
},{
    "code" : 500105001,
    "name" : "华新街街道",
    "parentId" : 500105
},{
    "code" : 500105002,
    "name" : "江北城街道",
    "parentId" : 500105
},{
    "code" : 500105003,
    "name" : "石马河街道",
    "parentId" : 500105
},{
    "code" : 500105004,
    "name" : "大石坝街道",
    "parentId" : 500105
},{
    "code" : 500105005,
    "name" : "寸滩街道",
    "parentId" : 500105
},{
    "code" : 500105006,
    "name" : "观音桥街道",
    "parentId" : 500105
},{
    "code" : 500105007,
    "name" : "五里店街道",
    "parentId" : 500105
},{
    "code" : 500105008,
    "name" : "郭家沱街道",
    "parentId" : 500105
},{
    "code" : 500105009,
    "name" : "铁山坪街道",
    "parentId" : 500105
},{
    "code" : 500105100,
    "name" : "鱼嘴镇人民政府",
    "parentId" : 500105
},{
    "code" : 500105101,
    "name" : "复盛镇人民政府",
    "parentId" : 500105
},{
    "code" : 500105102,
    "name" : "五宝镇人民政府",
    "parentId" : 500105
},{
    "code" : 500106001,
    "name" : "小龙坎街道",
    "parentId" : 500106
},{
    "code" : 500106002,
    "name" : "沙坪坝街道",
    "parentId" : 500106
},{
    "code" : 500106003,
    "name" : "渝碚路街道",
    "parentId" : 500106
},{
    "code" : 500106004,
    "name" : "磁器口街道",
    "parentId" : 500106
},{
    "code" : 500106005,
    "name" : "童家桥街道",
    "parentId" : 500106
},{
    "code" : 500106006,
    "name" : "石井坡街道",
    "parentId" : 500106
},{
    "code" : 500106007,
    "name" : "詹家溪街道",
    "parentId" : 500106
},{
    "code" : 500106008,
    "name" : "井口街道",
    "parentId" : 500106
},{
    "code" : 500106009,
    "name" : "歌乐山街道",
    "parentId" : 500106
},{
    "code" : 500106010,
    "name" : "山洞街道",
    "parentId" : 500106
},{
    "code" : 500106011,
    "name" : "新桥街道",
    "parentId" : 500106
},{
    "code" : 500106012,
    "name" : "天星桥街道",
    "parentId" : 500106
},{
    "code" : 500106013,
    "name" : "土湾街道",
    "parentId" : 500106
},{
    "code" : 500106014,
    "name" : "覃家岗街道",
    "parentId" : 500106
},{
    "code" : 500106015,
    "name" : "陈家桥街道",
    "parentId" : 500106
},{
    "code" : 500106016,
    "name" : "虎溪街道",
    "parentId" : 500106
},{
    "code" : 500106017,
    "name" : "西永街道",
    "parentId" : 500106
},{
    "code" : 500106018,
    "name" : "联芳街道",
    "parentId" : 500106
},{
    "code" : 500106102,
    "name" : "井口镇",
    "parentId" : 500106
},{
    "code" : 500106103,
    "name" : "歌乐山镇",
    "parentId" : 500106
},{
    "code" : 500106104,
    "name" : "青木关镇",
    "parentId" : 500106
},{
    "code" : 500106105,
    "name" : "凤凰镇",
    "parentId" : 500106
},{
    "code" : 500106106,
    "name" : "回龙坝镇",
    "parentId" : 500106
},{
    "code" : 500106108,
    "name" : "曾家镇",
    "parentId" : 500106
},{
    "code" : 500106111,
    "name" : "土主镇",
    "parentId" : 500106
},{
    "code" : 500106112,
    "name" : "中梁镇",
    "parentId" : 500106
},{
    "code" : 500107001,
    "name" : "杨家坪街道",
    "parentId" : 500107
},{
    "code" : 500107002,
    "name" : "黄桷坪街道",
    "parentId" : 500107
},{
    "code" : 500107003,
    "name" : "谢家湾街道",
    "parentId" : 500107
},{
    "code" : 500107004,
    "name" : "石坪桥街道",
    "parentId" : 500107
},{
    "code" : 500107005,
    "name" : "石桥铺街道",
    "parentId" : 500107
},{
    "code" : 500107006,
    "name" : "中梁山街道",
    "parentId" : 500107
},{
    "code" : 500107007,
    "name" : "渝州路街道",
    "parentId" : 500107
},{
    "code" : 500107100,
    "name" : "九龙镇",
    "parentId" : 500107
},{
    "code" : 500107102,
    "name" : "华岩镇",
    "parentId" : 500107
},{
    "code" : 500107103,
    "name" : "含谷镇",
    "parentId" : 500107
},{
    "code" : 500107104,
    "name" : "金凤镇",
    "parentId" : 500107
},{
    "code" : 500107105,
    "name" : "白市驿镇",
    "parentId" : 500107
},{
    "code" : 500107106,
    "name" : "走马镇",
    "parentId" : 500107
},{
    "code" : 500107107,
    "name" : "石板镇",
    "parentId" : 500107
},{
    "code" : 500107108,
    "name" : "巴福镇",
    "parentId" : 500107
},{
    "code" : 500107109,
    "name" : "陶家镇",
    "parentId" : 500107
},{
    "code" : 500107110,
    "name" : "西彭镇",
    "parentId" : 500107
},{
    "code" : 500107111,
    "name" : "铜罐驿镇",
    "parentId" : 500107
},{
    "code" : 500108001,
    "name" : "铜元局街道",
    "parentId" : 500108
},{
    "code" : 500108002,
    "name" : "花园路街道",
    "parentId" : 500108
},{
    "code" : 500108003,
    "name" : "南坪街道",
    "parentId" : 500108
},{
    "code" : 500108004,
    "name" : "海棠溪街道",
    "parentId" : 500108
},{
    "code" : 500108005,
    "name" : "龙门浩街道",
    "parentId" : 500108
},{
    "code" : 500108006,
    "name" : "弹子石街道",
    "parentId" : 500108
},{
    "code" : 500108007,
    "name" : "南山街道",
    "parentId" : 500108
},{
    "code" : 500108008,
    "name" : "天文街道",
    "parentId" : 500108
},{
    "code" : 500108101,
    "name" : "南坪镇",
    "parentId" : 500108
},{
    "code" : 500108102,
    "name" : "涂山镇",
    "parentId" : 500108
},{
    "code" : 500108103,
    "name" : "鸡冠石镇",
    "parentId" : 500108
},{
    "code" : 500108105,
    "name" : "峡口镇",
    "parentId" : 500108
},{
    "code" : 500108106,
    "name" : "长生桥镇",
    "parentId" : 500108
},{
    "code" : 500108107,
    "name" : "迎龙镇",
    "parentId" : 500108
},{
    "code" : 500108108,
    "name" : "广阳镇",
    "parentId" : 500108
},{
    "code" : 500109001,
    "name" : "天生街道",
    "parentId" : 500109
},{
    "code" : 500109002,
    "name" : "朝阳街道",
    "parentId" : 500109
},{
    "code" : 500109003,
    "name" : "北温泉街道",
    "parentId" : 500109
},{
    "code" : 500109004,
    "name" : "东阳街道",
    "parentId" : 500109
},{
    "code" : 500109005,
    "name" : "龙凤桥街道",
    "parentId" : 500109
},{
    "code" : 500109101,
    "name" : "歇马镇",
    "parentId" : 500109
},{
    "code" : 500109102,
    "name" : "澄江镇",
    "parentId" : 500109
},{
    "code" : 500109103,
    "name" : "蔡家岗镇",
    "parentId" : 500109
},{
    "code" : 500109104,
    "name" : "童家溪镇",
    "parentId" : 500109
},{
    "code" : 500109105,
    "name" : "天府镇",
    "parentId" : 500109
},{
    "code" : 500109108,
    "name" : "施家梁镇",
    "parentId" : 500109
},{
    "code" : 500109109,
    "name" : "水土镇",
    "parentId" : 500109
},{
    "code" : 500109110,
    "name" : "静观镇",
    "parentId" : 500109
},{
    "code" : 500109111,
    "name" : "柳荫镇",
    "parentId" : 500109
},{
    "code" : 500109112,
    "name" : "复兴镇",
    "parentId" : 500109
},{
    "code" : 500109113,
    "name" : "三圣镇",
    "parentId" : 500109
},{
    "code" : 500109116,
    "name" : "金刀峡镇",
    "parentId" : 500109
},{
    "code" : 500110001,
    "name" : "古南街道",
    "parentId" : 500110
},{
    "code" : 500110002,
    "name" : "文龙街道",
    "parentId" : 500110
},{
    "code" : 500110003,
    "name" : "三江街道",
    "parentId" : 500110
},{
    "code" : 500110004,
    "name" : "万盛街道",
    "parentId" : 500110
},{
    "code" : 500110005,
    "name" : "东林街道",
    "parentId" : 500110
},{
    "code" : 500110100,
    "name" : "万东镇",
    "parentId" : 500110
},{
    "code" : 500110101,
    "name" : "南桐镇",
    "parentId" : 500110
},{
    "code" : 500110102,
    "name" : "青年镇",
    "parentId" : 500110
},{
    "code" : 500110103,
    "name" : "关坝镇",
    "parentId" : 500110
},{
    "code" : 500110104,
    "name" : "丛林镇",
    "parentId" : 500110
},{
    "code" : 500110105,
    "name" : "石林镇",
    "parentId" : 500110
},{
    "code" : 500110106,
    "name" : "金桥镇",
    "parentId" : 500110
},{
    "code" : 500110107,
    "name" : "黑山镇",
    "parentId" : 500110
},{
    "code" : 500110108,
    "name" : "石角镇",
    "parentId" : 500110
},{
    "code" : 500110109,
    "name" : "东溪镇",
    "parentId" : 500110
},{
    "code" : 500110110,
    "name" : "赶水镇",
    "parentId" : 500110
},{
    "code" : 500110111,
    "name" : "打通镇",
    "parentId" : 500110
},{
    "code" : 500110112,
    "name" : "石壕镇",
    "parentId" : 500110
},{
    "code" : 500110113,
    "name" : "永新镇",
    "parentId" : 500110
},{
    "code" : 500110114,
    "name" : "三角镇",
    "parentId" : 500110
},{
    "code" : 500110115,
    "name" : "隆盛镇",
    "parentId" : 500110
},{
    "code" : 500110116,
    "name" : "郭扶镇",
    "parentId" : 500110
},{
    "code" : 500110117,
    "name" : "篆塘镇",
    "parentId" : 500110
},{
    "code" : 500110118,
    "name" : "丁山镇",
    "parentId" : 500110
},{
    "code" : 500110119,
    "name" : "安稳镇",
    "parentId" : 500110
},{
    "code" : 500110120,
    "name" : "扶欢镇",
    "parentId" : 500110
},{
    "code" : 500110121,
    "name" : "永城镇",
    "parentId" : 500110
},{
    "code" : 500110122,
    "name" : "新盛镇",
    "parentId" : 500110
},{
    "code" : 500110123,
    "name" : "中峰镇",
    "parentId" : 500110
},{
    "code" : 500110124,
    "name" : "横山镇",
    "parentId" : 500110
},{
    "code" : 500111001,
    "name" : "龙岗街道",
    "parentId" : 500111
},{
    "code" : 500111002,
    "name" : "棠香街道",
    "parentId" : 500111
},{
    "code" : 500111003,
    "name" : "龙滩子街道",
    "parentId" : 500111
},{
    "code" : 500111100,
    "name" : "龙水镇",
    "parentId" : 500111
},{
    "code" : 500111101,
    "name" : "智凤镇",
    "parentId" : 500111
},{
    "code" : 500111102,
    "name" : "宝顶镇",
    "parentId" : 500111
},{
    "code" : 500111104,
    "name" : "三驱镇",
    "parentId" : 500111
},{
    "code" : 500111105,
    "name" : "宝兴镇",
    "parentId" : 500111
},{
    "code" : 500111106,
    "name" : "玉龙镇",
    "parentId" : 500111
},{
    "code" : 500111107,
    "name" : "石马镇",
    "parentId" : 500111
},{
    "code" : 500111108,
    "name" : "拾万镇",
    "parentId" : 500111
},{
    "code" : 500111109,
    "name" : "回龙镇",
    "parentId" : 500111
},{
    "code" : 500111110,
    "name" : "金山镇",
    "parentId" : 500111
},{
    "code" : 500111111,
    "name" : "万古镇",
    "parentId" : 500111
},{
    "code" : 500111112,
    "name" : "国梁镇",
    "parentId" : 500111
},{
    "code" : 500111113,
    "name" : "雍溪镇",
    "parentId" : 500111
},{
    "code" : 500111115,
    "name" : "龙石镇",
    "parentId" : 500111
},{
    "code" : 500111116,
    "name" : "邮亭镇",
    "parentId" : 500111
},{
    "code" : 500111117,
    "name" : "铁山镇",
    "parentId" : 500111
},{
    "code" : 500111119,
    "name" : "季家镇",
    "parentId" : 500111
},{
    "code" : 500111120,
    "name" : "古龙镇",
    "parentId" : 500111
},{
    "code" : 500111121,
    "name" : "高坪镇",
    "parentId" : 500111
},{
    "code" : 500111122,
    "name" : "双路镇",
    "parentId" : 500111
},{
    "code" : 500111123,
    "name" : "通桥镇",
    "parentId" : 500111
},{
    "code" : 500112002,
    "name" : "双龙湖街道",
    "parentId" : 500112
},{
    "code" : 500112004,
    "name" : "回兴街道",
    "parentId" : 500112
},{
    "code" : 500112007,
    "name" : "鸳鸯街道",
    "parentId" : 500112
},{
    "code" : 500112008,
    "name" : "翠云街道",
    "parentId" : 500112
},{
    "code" : 500112009,
    "name" : "人和街道",
    "parentId" : 500112
},{
    "code" : 500112010,
    "name" : "天宫殿街道",
    "parentId" : 500112
},{
    "code" : 500112011,
    "name" : "龙溪街道",
    "parentId" : 500112
},{
    "code" : 500112012,
    "name" : "龙山街道",
    "parentId" : 500112
},{
    "code" : 500112013,
    "name" : "龙塔街道",
    "parentId" : 500112
},{
    "code" : 500112014,
    "name" : "大竹林街道",
    "parentId" : 500112
},{
    "code" : 500112015,
    "name" : "悦来街道",
    "parentId" : 500112
},{
    "code" : 500112016,
    "name" : "两路街道",
    "parentId" : 500112
},{
    "code" : 500112017,
    "name" : "双凤桥街道",
    "parentId" : 500112
},{
    "code" : 500112018,
    "name" : "王家街道",
    "parentId" : 500112
},{
    "code" : 500112019,
    "name" : "礼嘉街道",
    "parentId" : 500112
},{
    "code" : 500112129,
    "name" : "玉峰山镇",
    "parentId" : 500112
},{
    "code" : 500112131,
    "name" : "龙兴镇",
    "parentId" : 500112
},{
    "code" : 500112133,
    "name" : "统景镇",
    "parentId" : 500112
},{
    "code" : 500112135,
    "name" : "大湾镇",
    "parentId" : 500112
},{
    "code" : 500112138,
    "name" : "兴隆镇",
    "parentId" : 500112
},{
    "code" : 500112139,
    "name" : "木耳镇",
    "parentId" : 500112
},{
    "code" : 500112140,
    "name" : "茨竹镇",
    "parentId" : 500112
},{
    "code" : 500112141,
    "name" : "古路镇",
    "parentId" : 500112
},{
    "code" : 500112142,
    "name" : "石船镇",
    "parentId" : 500112
},{
    "code" : 500112143,
    "name" : "大盛镇",
    "parentId" : 500112
},{
    "code" : 500112144,
    "name" : "洛碛镇",
    "parentId" : 500112
},{
    "code" : 500113003,
    "name" : "龙洲湾街道",
    "parentId" : 500113
},{
    "code" : 500113004,
    "name" : "鱼洞街道",
    "parentId" : 500113
},{
    "code" : 500113005,
    "name" : "花溪街道",
    "parentId" : 500113
},{
    "code" : 500113006,
    "name" : "李家沱街道",
    "parentId" : 500113
},{
    "code" : 500113007,
    "name" : "南泉街道",
    "parentId" : 500113
},{
    "code" : 500113008,
    "name" : "一品街道",
    "parentId" : 500113
},{
    "code" : 500113009,
    "name" : "南彭街道",
    "parentId" : 500113
},{
    "code" : 500113010,
    "name" : "惠民街道",
    "parentId" : 500113
},{
    "code" : 500113103,
    "name" : "界石镇",
    "parentId" : 500113
},{
    "code" : 500113107,
    "name" : "安澜镇",
    "parentId" : 500113
},{
    "code" : 500113108,
    "name" : "跳石镇",
    "parentId" : 500113
},{
    "code" : 500113109,
    "name" : "木洞镇",
    "parentId" : 500113
},{
    "code" : 500113110,
    "name" : "双河口镇",
    "parentId" : 500113
},{
    "code" : 500113111,
    "name" : "麻柳嘴镇",
    "parentId" : 500113
},{
    "code" : 500113112,
    "name" : "丰盛镇",
    "parentId" : 500113
},{
    "code" : 500113113,
    "name" : "二圣镇",
    "parentId" : 500113
},{
    "code" : 500113114,
    "name" : "东泉镇",
    "parentId" : 500113
},{
    "code" : 500113115,
    "name" : "姜家镇",
    "parentId" : 500113
},{
    "code" : 500113116,
    "name" : "天星寺镇",
    "parentId" : 500113
},{
    "code" : 500113117,
    "name" : "接龙镇",
    "parentId" : 500113
},{
    "code" : 500113118,
    "name" : "石滩镇",
    "parentId" : 500113
},{
    "code" : 500113119,
    "name" : "石龙镇",
    "parentId" : 500113
},{
    "code" : 500114001,
    "name" : "城东街道",
    "parentId" : 500114
},{
    "code" : 500114002,
    "name" : "城南街道",
    "parentId" : 500114
},{
    "code" : 500114003,
    "name" : "城西街道",
    "parentId" : 500114
},{
    "code" : 500114004,
    "name" : "正阳街道",
    "parentId" : 500114
},{
    "code" : 500114005,
    "name" : "舟白街道",
    "parentId" : 500114
},{
    "code" : 500114006,
    "name" : "冯家街道",
    "parentId" : 500114
},{
    "code" : 500114105,
    "name" : "阿蓬江镇",
    "parentId" : 500114
},{
    "code" : 500114106,
    "name" : "石会镇",
    "parentId" : 500114
},{
    "code" : 500114107,
    "name" : "黑溪镇",
    "parentId" : 500114
},{
    "code" : 500114108,
    "name" : "黄溪镇",
    "parentId" : 500114
},{
    "code" : 500114109,
    "name" : "黎水镇",
    "parentId" : 500114
},{
    "code" : 500114110,
    "name" : "金溪镇",
    "parentId" : 500114
},{
    "code" : 500114111,
    "name" : "马喇镇",
    "parentId" : 500114
},{
    "code" : 500114112,
    "name" : "濯水镇",
    "parentId" : 500114
},{
    "code" : 500114113,
    "name" : "石家镇",
    "parentId" : 500114
},{
    "code" : 500114114,
    "name" : "鹅池镇",
    "parentId" : 500114
},{
    "code" : 500114117,
    "name" : "小南海镇",
    "parentId" : 500114
},{
    "code" : 500114119,
    "name" : "邻鄂镇",
    "parentId" : 500114
},{
    "code" : 500114245,
    "name" : "中塘乡",
    "parentId" : 500114
},{
    "code" : 500114246,
    "name" : "蓬东乡",
    "parentId" : 500114
},{
    "code" : 500114247,
    "name" : "沙坝乡",
    "parentId" : 500114
},{
    "code" : 500114248,
    "name" : "白石乡",
    "parentId" : 500114
},{
    "code" : 500114249,
    "name" : "杉岭乡",
    "parentId" : 500114
},{
    "code" : 500114250,
    "name" : "太极乡",
    "parentId" : 500114
},{
    "code" : 500114251,
    "name" : "水田乡",
    "parentId" : 500114
},{
    "code" : 500114252,
    "name" : "白土乡",
    "parentId" : 500114
},{
    "code" : 500114253,
    "name" : "金洞乡",
    "parentId" : 500114
},{
    "code" : 500114254,
    "name" : "五里乡",
    "parentId" : 500114
},{
    "code" : 500114255,
    "name" : "水市乡",
    "parentId" : 500114
},{
    "code" : 500114256,
    "name" : "新华乡",
    "parentId" : 500114
},{
    "code" : 500115001,
    "name" : "凤城街道",
    "parentId" : 500115
},{
    "code" : 500115002,
    "name" : "晏家街道",
    "parentId" : 500115
},{
    "code" : 500115003,
    "name" : "江南街道",
    "parentId" : 500115
},{
    "code" : 500115004,
    "name" : "渡舟街道",
    "parentId" : 500115
},{
    "code" : 500115123,
    "name" : "邻封镇",
    "parentId" : 500115
},{
    "code" : 500115124,
    "name" : "但渡镇",
    "parentId" : 500115
},{
    "code" : 500115125,
    "name" : "云集镇",
    "parentId" : 500115
},{
    "code" : 500115126,
    "name" : "长寿湖镇",
    "parentId" : 500115
},{
    "code" : 500115127,
    "name" : "双龙镇",
    "parentId" : 500115
},{
    "code" : 500115128,
    "name" : "龙河镇",
    "parentId" : 500115
},{
    "code" : 500115129,
    "name" : "石堰镇",
    "parentId" : 500115
},{
    "code" : 500115130,
    "name" : "云台镇",
    "parentId" : 500115
},{
    "code" : 500115131,
    "name" : "海棠镇",
    "parentId" : 500115
},{
    "code" : 500115132,
    "name" : "葛兰镇",
    "parentId" : 500115
},{
    "code" : 500115133,
    "name" : "新市镇",
    "parentId" : 500115
},{
    "code" : 500115135,
    "name" : "八颗镇",
    "parentId" : 500115
},{
    "code" : 500115136,
    "name" : "洪湖镇",
    "parentId" : 500115
},{
    "code" : 500115137,
    "name" : "万顺镇",
    "parentId" : 500115
},{
    "code" : 500116001,
    "name" : "几江街道办事处",
    "parentId" : 500116
},{
    "code" : 500116002,
    "name" : "德感街道办事处",
    "parentId" : 500116
},{
    "code" : 500116004,
    "name" : "双福街道办事处",
    "parentId" : 500116
},{
    "code" : 500116005,
    "name" : "鼎山街道办事处",
    "parentId" : 500116
},{
    "code" : 500116101,
    "name" : "油溪镇",
    "parentId" : 500116
},{
    "code" : 500116102,
    "name" : "吴滩镇",
    "parentId" : 500116
},{
    "code" : 500116103,
    "name" : "石门镇",
    "parentId" : 500116
},{
    "code" : 500116104,
    "name" : "朱杨镇",
    "parentId" : 500116
},{
    "code" : 500116105,
    "name" : "石蟆镇",
    "parentId" : 500116
},{
    "code" : 500116106,
    "name" : "永兴镇",
    "parentId" : 500116
},{
    "code" : 500116107,
    "name" : "塘河镇",
    "parentId" : 500116
},{
    "code" : 500116108,
    "name" : "白沙镇",
    "parentId" : 500116
},{
    "code" : 500116109,
    "name" : "龙华镇",
    "parentId" : 500116
},{
    "code" : 500116110,
    "name" : "李市镇",
    "parentId" : 500116
},{
    "code" : 500116111,
    "name" : "慈云镇",
    "parentId" : 500116
},{
    "code" : 500116112,
    "name" : "蔡家镇",
    "parentId" : 500116
},{
    "code" : 500116113,
    "name" : "中山镇",
    "parentId" : 500116
},{
    "code" : 500116114,
    "name" : "嘉平镇",
    "parentId" : 500116
},{
    "code" : 500116115,
    "name" : "柏林镇",
    "parentId" : 500116
},{
    "code" : 500116116,
    "name" : "先锋镇",
    "parentId" : 500116
},{
    "code" : 500116117,
    "name" : "珞璜镇",
    "parentId" : 500116
},{
    "code" : 500116118,
    "name" : "贾嗣镇",
    "parentId" : 500116
},{
    "code" : 500116119,
    "name" : "夏坝镇",
    "parentId" : 500116
},{
    "code" : 500116120,
    "name" : "西湖镇",
    "parentId" : 500116
},{
    "code" : 500116122,
    "name" : "广兴镇",
    "parentId" : 500116
},{
    "code" : 500116123,
    "name" : "四面山镇",
    "parentId" : 500116
},{
    "code" : 500116124,
    "name" : "支坪镇",
    "parentId" : 500116
},{
    "code" : 500117001,
    "name" : "合阳城街道办事处",
    "parentId" : 500117
},{
    "code" : 500117002,
    "name" : "钓鱼城街道办事处",
    "parentId" : 500117
},{
    "code" : 500117003,
    "name" : "南津街街道办事处",
    "parentId" : 500117
},{
    "code" : 500117004,
    "name" : "盐井街道",
    "parentId" : 500117
},{
    "code" : 500117005,
    "name" : "草街街道",
    "parentId" : 500117
},{
    "code" : 500117006,
    "name" : "云门街道",
    "parentId" : 500117
},{
    "code" : 500117007,
    "name" : "大石街道",
    "parentId" : 500117
},{
    "code" : 500117100,
    "name" : "沙鱼镇",
    "parentId" : 500117
},{
    "code" : 500117101,
    "name" : "官渡镇",
    "parentId" : 500117
},{
    "code" : 500117102,
    "name" : "涞滩镇",
    "parentId" : 500117
},{
    "code" : 500117103,
    "name" : "肖家镇",
    "parentId" : 500117
},{
    "code" : 500117104,
    "name" : "古楼镇",
    "parentId" : 500117
},{
    "code" : 500117105,
    "name" : "三庙镇",
    "parentId" : 500117
},{
    "code" : 500117106,
    "name" : "二郎镇",
    "parentId" : 500117
},{
    "code" : 500117107,
    "name" : "龙凤镇",
    "parentId" : 500117
},{
    "code" : 500117108,
    "name" : "隆兴镇",
    "parentId" : 500117
},{
    "code" : 500117109,
    "name" : "铜溪镇",
    "parentId" : 500117
},{
    "code" : 500117112,
    "name" : "双凤镇",
    "parentId" : 500117
},{
    "code" : 500117113,
    "name" : "狮滩镇",
    "parentId" : 500117
},{
    "code" : 500117114,
    "name" : "清平镇",
    "parentId" : 500117
},{
    "code" : 500117115,
    "name" : "土场镇",
    "parentId" : 500117
},{
    "code" : 500117116,
    "name" : "小沔镇",
    "parentId" : 500117
},{
    "code" : 500117117,
    "name" : "三汇镇",
    "parentId" : 500117
},{
    "code" : 500117118,
    "name" : "香龙镇",
    "parentId" : 500117
},{
    "code" : 500117120,
    "name" : "钱塘镇",
    "parentId" : 500117
},{
    "code" : 500117121,
    "name" : "龙市镇",
    "parentId" : 500117
},{
    "code" : 500117123,
    "name" : "燕窝镇",
    "parentId" : 500117
},{
    "code" : 500117124,
    "name" : "太和镇",
    "parentId" : 500117
},{
    "code" : 500117125,
    "name" : "渭沱镇",
    "parentId" : 500117
},{
    "code" : 500117126,
    "name" : "双槐镇",
    "parentId" : 500117
},{
    "code" : 500118001,
    "name" : "中山路街道",
    "parentId" : 500118
},{
    "code" : 500118002,
    "name" : "胜利路街道",
    "parentId" : 500118
},{
    "code" : 500118003,
    "name" : "南大街街道",
    "parentId" : 500118
},{
    "code" : 500118004,
    "name" : "茶山竹海街道",
    "parentId" : 500118
},{
    "code" : 500118005,
    "name" : "大安街道",
    "parentId" : 500118
},{
    "code" : 500118006,
    "name" : "陈食街道",
    "parentId" : 500118
},{
    "code" : 500118007,
    "name" : "卫星湖街道",
    "parentId" : 500118
},{
    "code" : 500118100,
    "name" : "青峰镇",
    "parentId" : 500118
},{
    "code" : 500118102,
    "name" : "金龙镇",
    "parentId" : 500118
},{
    "code" : 500118104,
    "name" : "临江镇",
    "parentId" : 500118
},{
    "code" : 500118106,
    "name" : "何埂镇",
    "parentId" : 500118
},{
    "code" : 500118107,
    "name" : "松溉镇",
    "parentId" : 500118
},{
    "code" : 500118108,
    "name" : "仙龙镇",
    "parentId" : 500118
},{
    "code" : 500118109,
    "name" : "吉安镇",
    "parentId" : 500118
},{
    "code" : 500118110,
    "name" : "五间镇",
    "parentId" : 500118
},{
    "code" : 500118111,
    "name" : "来苏镇",
    "parentId" : 500118
},{
    "code" : 500118112,
    "name" : "宝峰镇",
    "parentId" : 500118
},{
    "code" : 500118113,
    "name" : "双石镇",
    "parentId" : 500118
},{
    "code" : 500118114,
    "name" : "红炉镇",
    "parentId" : 500118
},{
    "code" : 500118115,
    "name" : "永荣镇",
    "parentId" : 500118
},{
    "code" : 500118116,
    "name" : "三教镇",
    "parentId" : 500118
},{
    "code" : 500118117,
    "name" : "板桥镇",
    "parentId" : 500118
},{
    "code" : 500118118,
    "name" : "朱沱镇",
    "parentId" : 500118
},{
    "code" : 500119001,
    "name" : "东城街道办事处",
    "parentId" : 500119
},{
    "code" : 500119002,
    "name" : "南城街道办事处",
    "parentId" : 500119
},{
    "code" : 500119003,
    "name" : "西城街道办事处",
    "parentId" : 500119
},{
    "code" : 500119100,
    "name" : "三泉镇",
    "parentId" : 500119
},{
    "code" : 500119101,
    "name" : "南平镇",
    "parentId" : 500119
},{
    "code" : 500119102,
    "name" : "神童镇",
    "parentId" : 500119
},{
    "code" : 500119103,
    "name" : "鸣玉镇",
    "parentId" : 500119
},{
    "code" : 500119104,
    "name" : "大观镇",
    "parentId" : 500119
},{
    "code" : 500119105,
    "name" : "兴隆镇",
    "parentId" : 500119
},{
    "code" : 500119106,
    "name" : "太平场镇",
    "parentId" : 500119
},{
    "code" : 500119107,
    "name" : "白沙镇",
    "parentId" : 500119
},{
    "code" : 500119108,
    "name" : "水江镇",
    "parentId" : 500119
},{
    "code" : 500119109,
    "name" : "石墙镇",
    "parentId" : 500119
},{
    "code" : 500119110,
    "name" : "金山镇",
    "parentId" : 500119
},{
    "code" : 500119111,
    "name" : "头渡镇",
    "parentId" : 500119
},{
    "code" : 500119112,
    "name" : "大有镇",
    "parentId" : 500119
},{
    "code" : 500119113,
    "name" : "合溪镇",
    "parentId" : 500119
},{
    "code" : 500119114,
    "name" : "黎香湖镇",
    "parentId" : 500119
},{
    "code" : 500119115,
    "name" : "山王坪镇",
    "parentId" : 500119
},{
    "code" : 500119200,
    "name" : "石莲乡",
    "parentId" : 500119
},{
    "code" : 500119201,
    "name" : "木凉乡",
    "parentId" : 500119
},{
    "code" : 500119202,
    "name" : "河图乡",
    "parentId" : 500119
},{
    "code" : 500119204,
    "name" : "乾丰乡",
    "parentId" : 500119
},{
    "code" : 500119205,
    "name" : "骑龙乡",
    "parentId" : 500119
},{
    "code" : 500119207,
    "name" : "中桥乡",
    "parentId" : 500119
},{
    "code" : 500119208,
    "name" : "铁村乡",
    "parentId" : 500119
},{
    "code" : 500119209,
    "name" : "德隆乡",
    "parentId" : 500119
},{
    "code" : 500119210,
    "name" : "庆元乡",
    "parentId" : 500119
},{
    "code" : 500119211,
    "name" : "古花乡",
    "parentId" : 500119
},{
    "code" : 500119212,
    "name" : "峰岩乡",
    "parentId" : 500119
},{
    "code" : 500119213,
    "name" : "民主乡",
    "parentId" : 500119
},{
    "code" : 500119214,
    "name" : "冷水关乡",
    "parentId" : 500119
},{
    "code" : 500119215,
    "name" : "石溪乡",
    "parentId" : 500119
},{
    "code" : 500119216,
    "name" : "福寿乡",
    "parentId" : 500119
},{
    "code" : 500223001,
    "name" : "桂林街道",
    "parentId" : 500223
},{
    "code" : 500223002,
    "name" : "梓潼街道",
    "parentId" : 500223
},{
    "code" : 500223101,
    "name" : "上和镇",
    "parentId" : 500223
},{
    "code" : 500223102,
    "name" : "龙形镇",
    "parentId" : 500223
},{
    "code" : 500223103,
    "name" : "古溪镇",
    "parentId" : 500223
},{
    "code" : 500223104,
    "name" : "宝龙镇",
    "parentId" : 500223
},{
    "code" : 500223107,
    "name" : "玉溪镇",
    "parentId" : 500223
},{
    "code" : 500223108,
    "name" : "米心镇",
    "parentId" : 500223
},{
    "code" : 500223109,
    "name" : "群力镇",
    "parentId" : 500223
},{
    "code" : 500223110,
    "name" : "双江镇",
    "parentId" : 500223
},{
    "code" : 500223112,
    "name" : "花岩镇",
    "parentId" : 500223
},{
    "code" : 500223113,
    "name" : "柏梓镇",
    "parentId" : 500223
},{
    "code" : 500223114,
    "name" : "崇龛镇",
    "parentId" : 500223
},{
    "code" : 500223115,
    "name" : "塘坝镇",
    "parentId" : 500223
},{
    "code" : 500223116,
    "name" : "新胜镇",
    "parentId" : 500223
},{
    "code" : 500223117,
    "name" : "太安镇",
    "parentId" : 500223
},{
    "code" : 500223119,
    "name" : "小渡镇",
    "parentId" : 500223
},{
    "code" : 500223120,
    "name" : "卧佛镇",
    "parentId" : 500223
},{
    "code" : 500223121,
    "name" : "五桂镇",
    "parentId" : 500223
},{
    "code" : 500223122,
    "name" : "田家镇",
    "parentId" : 500223
},{
    "code" : 500223123,
    "name" : "别口镇",
    "parentId" : 500223
},{
    "code" : 500223124,
    "name" : "寿桥镇",
    "parentId" : 500223
},{
    "code" : 500226001,
    "name" : "昌元街道",
    "parentId" : 500226
},{
    "code" : 500226002,
    "name" : "昌洲街道",
    "parentId" : 500226
},{
    "code" : 500226003,
    "name" : "广顺街道",
    "parentId" : 500226
},{
    "code" : 500226004,
    "name" : "双河街道",
    "parentId" : 500226
},{
    "code" : 500226005,
    "name" : "安富街道",
    "parentId" : 500226
},{
    "code" : 500226006,
    "name" : "峰高街道",
    "parentId" : 500226
},{
    "code" : 500226103,
    "name" : "直升镇",
    "parentId" : 500226
},{
    "code" : 500226104,
    "name" : "路孔镇",
    "parentId" : 500226
},{
    "code" : 500226106,
    "name" : "清江镇",
    "parentId" : 500226
},{
    "code" : 500226107,
    "name" : "仁义镇",
    "parentId" : 500226
},{
    "code" : 500226108,
    "name" : "河包镇",
    "parentId" : 500226
},{
    "code" : 500226109,
    "name" : "古昌镇",
    "parentId" : 500226
},{
    "code" : 500226110,
    "name" : "吴家镇",
    "parentId" : 500226
},{
    "code" : 500226111,
    "name" : "观胜镇",
    "parentId" : 500226
},{
    "code" : 500226112,
    "name" : "铜鼓镇",
    "parentId" : 500226
},{
    "code" : 500226113,
    "name" : "清流镇",
    "parentId" : 500226
},{
    "code" : 500226115,
    "name" : "远觉镇",
    "parentId" : 500226
},{
    "code" : 500226117,
    "name" : "清升镇",
    "parentId" : 500226
},{
    "code" : 500226118,
    "name" : "荣隆镇",
    "parentId" : 500226
},{
    "code" : 500226119,
    "name" : "龙集镇",
    "parentId" : 500226
},{
    "code" : 500228001,
    "name" : "梁平县梁山街道",
    "parentId" : 500228
},{
    "code" : 500228002,
    "name" : "梁平县双桂街道",
    "parentId" : 500228
},{
    "code" : 500228101,
    "name" : "仁贤镇",
    "parentId" : 500228
},{
    "code" : 500228102,
    "name" : "礼让镇",
    "parentId" : 500228
},{
    "code" : 500228103,
    "name" : "云龙镇",
    "parentId" : 500228
},{
    "code" : 500228104,
    "name" : "屏锦镇",
    "parentId" : 500228
},{
    "code" : 500228106,
    "name" : "袁驿镇",
    "parentId" : 500228
},{
    "code" : 500228107,
    "name" : "新盛镇",
    "parentId" : 500228
},{
    "code" : 500228108,
    "name" : "福禄镇",
    "parentId" : 500228
},{
    "code" : 500228109,
    "name" : "金带镇",
    "parentId" : 500228
},{
    "code" : 500228110,
    "name" : "聚奎镇",
    "parentId" : 500228
},{
    "code" : 500228112,
    "name" : "荫平镇",
    "parentId" : 500228
},{
    "code" : 500228113,
    "name" : "和林镇",
    "parentId" : 500228
},{
    "code" : 500228114,
    "name" : "回龙镇",
    "parentId" : 500228
},{
    "code" : 500228115,
    "name" : "碧山镇",
    "parentId" : 500228
},{
    "code" : 500228116,
    "name" : "虎城镇",
    "parentId" : 500228
},{
    "code" : 500228117,
    "name" : "七星镇",
    "parentId" : 500228
},{
    "code" : 500228118,
    "name" : "龙门镇",
    "parentId" : 500228
},{
    "code" : 500228119,
    "name" : "文化镇",
    "parentId" : 500228
},{
    "code" : 500228120,
    "name" : "合兴镇",
    "parentId" : 500228
},{
    "code" : 500228121,
    "name" : "石安镇",
    "parentId" : 500228
},{
    "code" : 500228122,
    "name" : "柏家镇",
    "parentId" : 500228
},{
    "code" : 500228123,
    "name" : "大观镇",
    "parentId" : 500228
},{
    "code" : 500228124,
    "name" : "竹山镇",
    "parentId" : 500228
},{
    "code" : 500228125,
    "name" : "蟠龙镇",
    "parentId" : 500228
},{
    "code" : 500228201,
    "name" : "铁门乡",
    "parentId" : 500228
},{
    "code" : 500228202,
    "name" : "龙胜乡",
    "parentId" : 500228
},{
    "code" : 500228203,
    "name" : "复平乡",
    "parentId" : 500228
},{
    "code" : 500228205,
    "name" : "紫照乡",
    "parentId" : 500228
},{
    "code" : 500228206,
    "name" : "城北乡",
    "parentId" : 500228
},{
    "code" : 500228207,
    "name" : "曲水乡",
    "parentId" : 500228
},{
    "code" : 500228400,
    "name" : "梁平县农场",
    "parentId" : 500228
},{
    "code" : 500228401,
    "name" : "梁平县双桂工业园区",
    "parentId" : 500228
},{
    "code" : 500229001,
    "name" : "葛城街道",
    "parentId" : 500229
},{
    "code" : 500229002,
    "name" : "复兴街道",
    "parentId" : 500229
},{
    "code" : 500229102,
    "name" : "巴山镇",
    "parentId" : 500229
},{
    "code" : 500229103,
    "name" : "坪坝镇",
    "parentId" : 500229
},{
    "code" : 500229104,
    "name" : "庙坝镇",
    "parentId" : 500229
},{
    "code" : 500229105,
    "name" : "明通镇",
    "parentId" : 500229
},{
    "code" : 500229106,
    "name" : "修齐镇",
    "parentId" : 500229
},{
    "code" : 500229107,
    "name" : "高观镇",
    "parentId" : 500229
},{
    "code" : 500229108,
    "name" : "高燕镇",
    "parentId" : 500229
},{
    "code" : 500229201,
    "name" : "龙田乡",
    "parentId" : 500229
},{
    "code" : 500229202,
    "name" : "北屏乡",
    "parentId" : 500229
},{
    "code" : 500229204,
    "name" : "高楠乡",
    "parentId" : 500229
},{
    "code" : 500229205,
    "name" : "左岚乡",
    "parentId" : 500229
},{
    "code" : 500229208,
    "name" : "沿河乡",
    "parentId" : 500229
},{
    "code" : 500229210,
    "name" : "双河乡",
    "parentId" : 500229
},{
    "code" : 500229211,
    "name" : "蓼子乡",
    "parentId" : 500229
},{
    "code" : 500229212,
    "name" : "鸡鸣乡",
    "parentId" : 500229
},{
    "code" : 500229213,
    "name" : "咸宜乡",
    "parentId" : 500229
},{
    "code" : 500229214,
    "name" : "周溪乡",
    "parentId" : 500229
},{
    "code" : 500229216,
    "name" : "明中乡",
    "parentId" : 500229
},{
    "code" : 500229217,
    "name" : "治平乡",
    "parentId" : 500229
},{
    "code" : 500229219,
    "name" : "岚天乡",
    "parentId" : 500229
},{
    "code" : 500229220,
    "name" : "厚坪乡",
    "parentId" : 500229
},{
    "code" : 500229221,
    "name" : "河鱼乡",
    "parentId" : 500229
},{
    "code" : 500229223,
    "name" : "东安乡",
    "parentId" : 500229
},{
    "code" : 500230001,
    "name" : "三合街道",
    "parentId" : 500230
},{
    "code" : 500230002,
    "name" : "名山街道",
    "parentId" : 500230
},{
    "code" : 500230101,
    "name" : "虎威镇",
    "parentId" : 500230
},{
    "code" : 500230102,
    "name" : "社坛镇",
    "parentId" : 500230
},{
    "code" : 500230104,
    "name" : "许明寺镇",
    "parentId" : 500230
},{
    "code" : 500230105,
    "name" : "董家镇",
    "parentId" : 500230
},{
    "code" : 500230106,
    "name" : "树人镇",
    "parentId" : 500230
},{
    "code" : 500230107,
    "name" : "十直镇",
    "parentId" : 500230
},{
    "code" : 500230109,
    "name" : "高家镇",
    "parentId" : 500230
},{
    "code" : 500230110,
    "name" : "兴义镇",
    "parentId" : 500230
},{
    "code" : 500230111,
    "name" : "双路镇",
    "parentId" : 500230
},{
    "code" : 500230112,
    "name" : "江池镇",
    "parentId" : 500230
},{
    "code" : 500230113,
    "name" : "龙河镇",
    "parentId" : 500230
},{
    "code" : 500230114,
    "name" : "武平镇",
    "parentId" : 500230
},{
    "code" : 500230115,
    "name" : "包鸾镇",
    "parentId" : 500230
},{
    "code" : 500230116,
    "name" : "湛普镇",
    "parentId" : 500230
},{
    "code" : 500230118,
    "name" : "南天湖镇",
    "parentId" : 500230
},{
    "code" : 500230119,
    "name" : "保合镇",
    "parentId" : 500230
},{
    "code" : 500230122,
    "name" : "龙孔镇",
    "parentId" : 500230
},{
    "code" : 500230123,
    "name" : "暨龙镇",
    "parentId" : 500230
},{
    "code" : 500230124,
    "name" : "双龙镇",
    "parentId" : 500230
},{
    "code" : 500230125,
    "name" : "仙女湖镇",
    "parentId" : 500230
},{
    "code" : 500230202,
    "name" : "青龙乡",
    "parentId" : 500230
},{
    "code" : 500230206,
    "name" : "太平坝乡",
    "parentId" : 500230
},{
    "code" : 500230207,
    "name" : "都督乡",
    "parentId" : 500230
},{
    "code" : 500230209,
    "name" : "栗子乡",
    "parentId" : 500230
},{
    "code" : 500230210,
    "name" : "三建乡",
    "parentId" : 500230
},{
    "code" : 500231100,
    "name" : "桂溪镇",
    "parentId" : 500231
},{
    "code" : 500231101,
    "name" : "新民镇",
    "parentId" : 500231
},{
    "code" : 500231103,
    "name" : "周嘉镇",
    "parentId" : 500231
},{
    "code" : 500231104,
    "name" : "普顺镇",
    "parentId" : 500231
},{
    "code" : 500231105,
    "name" : "永安镇",
    "parentId" : 500231
},{
    "code" : 500231106,
    "name" : "高安镇",
    "parentId" : 500231
},{
    "code" : 500231107,
    "name" : "高峰镇",
    "parentId" : 500231
},{
    "code" : 500231108,
    "name" : "五洞镇",
    "parentId" : 500231
},{
    "code" : 500231109,
    "name" : "澄溪镇",
    "parentId" : 500231
},{
    "code" : 500231110,
    "name" : "太平镇",
    "parentId" : 500231
},{
    "code" : 500231111,
    "name" : "鹤游镇",
    "parentId" : 500231
},{
    "code" : 500231112,
    "name" : "坪山镇",
    "parentId" : 500231
},{
    "code" : 500231113,
    "name" : "砚台镇",
    "parentId" : 500231
},{
    "code" : 500231115,
    "name" : "杠家镇",
    "parentId" : 500231
},{
    "code" : 500231116,
    "name" : "包家镇",
    "parentId" : 500231
},{
    "code" : 500231117,
    "name" : "白家镇",
    "parentId" : 500231
},{
    "code" : 500231118,
    "name" : "永平镇",
    "parentId" : 500231
},{
    "code" : 500231119,
    "name" : "三溪镇",
    "parentId" : 500231
},{
    "code" : 500231120,
    "name" : "裴兴镇",
    "parentId" : 500231
},{
    "code" : 500231201,
    "name" : "长龙乡",
    "parentId" : 500231
},{
    "code" : 500231202,
    "name" : "沙河乡",
    "parentId" : 500231
},{
    "code" : 500231204,
    "name" : "大石乡",
    "parentId" : 500231
},{
    "code" : 500231205,
    "name" : "黄沙乡",
    "parentId" : 500231
},{
    "code" : 500232100,
    "name" : "巷口镇",
    "parentId" : 500232
},{
    "code" : 500232101,
    "name" : "火炉镇",
    "parentId" : 500232
},{
    "code" : 500232102,
    "name" : "白马镇",
    "parentId" : 500232
},{
    "code" : 500232103,
    "name" : "鸭江镇",
    "parentId" : 500232
},{
    "code" : 500232104,
    "name" : "长坝镇",
    "parentId" : 500232
},{
    "code" : 500232105,
    "name" : "江口镇",
    "parentId" : 500232
},{
    "code" : 500232106,
    "name" : "平桥镇",
    "parentId" : 500232
},{
    "code" : 500232107,
    "name" : "羊角镇",
    "parentId" : 500232
},{
    "code" : 500232108,
    "name" : "仙女山镇",
    "parentId" : 500232
},{
    "code" : 500232109,
    "name" : "桐梓镇",
    "parentId" : 500232
},{
    "code" : 500232110,
    "name" : "土坎镇",
    "parentId" : 500232
},{
    "code" : 500232111,
    "name" : "和顺镇",
    "parentId" : 500232
},{
    "code" : 500232200,
    "name" : "凤来乡",
    "parentId" : 500232
},{
    "code" : 500232202,
    "name" : "庙垭乡",
    "parentId" : 500232
},{
    "code" : 500232203,
    "name" : "石桥苗族土家族乡",
    "parentId" : 500232
},{
    "code" : 500232204,
    "name" : "双河乡",
    "parentId" : 500232
},{
    "code" : 500232205,
    "name" : "黄莺乡",
    "parentId" : 500232
},{
    "code" : 500232206,
    "name" : "沧沟乡",
    "parentId" : 500232
},{
    "code" : 500232207,
    "name" : "文复苗族土家族乡",
    "parentId" : 500232
},{
    "code" : 500232208,
    "name" : "土地乡",
    "parentId" : 500232
},{
    "code" : 500232209,
    "name" : "白云乡",
    "parentId" : 500232
},{
    "code" : 500232210,
    "name" : "后坪苗族土家族乡",
    "parentId" : 500232
},{
    "code" : 500232211,
    "name" : "浩口苗族仡佬族乡",
    "parentId" : 500232
},{
    "code" : 500232212,
    "name" : "接龙乡",
    "parentId" : 500232
},{
    "code" : 500232213,
    "name" : "赵家乡",
    "parentId" : 500232
},{
    "code" : 500232214,
    "name" : "铁矿乡",
    "parentId" : 500232
},{
    "code" : 500233100,
    "name" : "忠州镇",
    "parentId" : 500233
},{
    "code" : 500233101,
    "name" : "新生镇",
    "parentId" : 500233
},{
    "code" : 500233102,
    "name" : "任家镇",
    "parentId" : 500233
},{
    "code" : 500233103,
    "name" : "乌杨镇",
    "parentId" : 500233
},{
    "code" : 500233104,
    "name" : "洋渡镇",
    "parentId" : 500233
},{
    "code" : 500233105,
    "name" : "东溪镇",
    "parentId" : 500233
},{
    "code" : 500233106,
    "name" : "复兴镇",
    "parentId" : 500233
},{
    "code" : 500233107,
    "name" : "石宝镇",
    "parentId" : 500233
},{
    "code" : 500233108,
    "name" : "汝溪镇",
    "parentId" : 500233
},{
    "code" : 500233109,
    "name" : "野鹤镇",
    "parentId" : 500233
},{
    "code" : 500233110,
    "name" : "官坝镇",
    "parentId" : 500233
},{
    "code" : 500233111,
    "name" : "石黄镇",
    "parentId" : 500233
},{
    "code" : 500233112,
    "name" : "马灌镇",
    "parentId" : 500233
},{
    "code" : 500233113,
    "name" : "金鸡镇",
    "parentId" : 500233
},{
    "code" : 500233114,
    "name" : "新立镇",
    "parentId" : 500233
},{
    "code" : 500233115,
    "name" : "双桂镇",
    "parentId" : 500233
},{
    "code" : 500233116,
    "name" : "拔山镇",
    "parentId" : 500233
},{
    "code" : 500233117,
    "name" : "花桥镇",
    "parentId" : 500233
},{
    "code" : 500233118,
    "name" : "永丰镇",
    "parentId" : 500233
},{
    "code" : 500233119,
    "name" : "三汇镇",
    "parentId" : 500233
},{
    "code" : 500233120,
    "name" : "白石镇",
    "parentId" : 500233
},{
    "code" : 500233122,
    "name" : "黄金镇",
    "parentId" : 500233
},{
    "code" : 500233201,
    "name" : "善广乡",
    "parentId" : 500233
},{
    "code" : 500233203,
    "name" : "石子乡",
    "parentId" : 500233
},{
    "code" : 500233204,
    "name" : "磨子土家族乡",
    "parentId" : 500233
},{
    "code" : 500233206,
    "name" : "涂井乡",
    "parentId" : 500233
},{
    "code" : 500233208,
    "name" : "金声乡",
    "parentId" : 500233
},{
    "code" : 500233210,
    "name" : "兴峰乡",
    "parentId" : 500233
},{
    "code" : 500234002,
    "name" : "镇东街道",
    "parentId" : 500234
},{
    "code" : 500234003,
    "name" : "丰乐街道",
    "parentId" : 500234
},{
    "code" : 500234004,
    "name" : "白鹤街道",
    "parentId" : 500234
},{
    "code" : 500234005,
    "name" : "汉丰街道",
    "parentId" : 500234
},{
    "code" : 500234006,
    "name" : "文峰街道",
    "parentId" : 500234
},{
    "code" : 500234007,
    "name" : "云枫街道",
    "parentId" : 500234
},{
    "code" : 500234008,
    "name" : "赵家街道",
    "parentId" : 500234
},{
    "code" : 500234103,
    "name" : "郭家镇",
    "parentId" : 500234
},{
    "code" : 500234106,
    "name" : "温泉镇",
    "parentId" : 500234
},{
    "code" : 500234107,
    "name" : "铁桥镇",
    "parentId" : 500234
},{
    "code" : 500234112,
    "name" : "南雅镇",
    "parentId" : 500234
},{
    "code" : 500234114,
    "name" : "和谦镇",
    "parentId" : 500234
},{
    "code" : 500234116,
    "name" : "镇安镇",
    "parentId" : 500234
},{
    "code" : 500234118,
    "name" : "竹溪镇",
    "parentId" : 500234
},{
    "code" : 500234119,
    "name" : "渠口镇",
    "parentId" : 500234
},{
    "code" : 500234120,
    "name" : "厚坝镇",
    "parentId" : 500234
},{
    "code" : 500234122,
    "name" : "高桥镇",
    "parentId" : 500234
},{
    "code" : 500234127,
    "name" : "义和镇",
    "parentId" : 500234
},{
    "code" : 500234128,
    "name" : "大进镇",
    "parentId" : 500234
},{
    "code" : 500234129,
    "name" : "长沙镇",
    "parentId" : 500234
},{
    "code" : 500234130,
    "name" : "临江镇",
    "parentId" : 500234
},{
    "code" : 500234132,
    "name" : "敦好镇",
    "parentId" : 500234
},{
    "code" : 500234133,
    "name" : "中和镇",
    "parentId" : 500234
},{
    "code" : 500234134,
    "name" : "岳溪镇",
    "parentId" : 500234
},{
    "code" : 500234135,
    "name" : "南门镇",
    "parentId" : 500234
},{
    "code" : 500234136,
    "name" : "河堰镇",
    "parentId" : 500234
},{
    "code" : 500234137,
    "name" : "九龙山镇",
    "parentId" : 500234
},{
    "code" : 500234138,
    "name" : "白桥镇",
    "parentId" : 500234
},{
    "code" : 500234139,
    "name" : "天和镇",
    "parentId" : 500234
},{
    "code" : 500234140,
    "name" : "金峰镇",
    "parentId" : 500234
},{
    "code" : 500234141,
    "name" : "谭家镇",
    "parentId" : 500234
},{
    "code" : 500234142,
    "name" : "巫山镇",
    "parentId" : 500234
},{
    "code" : 500234143,
    "name" : "大德镇",
    "parentId" : 500234
},{
    "code" : 500234202,
    "name" : "白泉乡",
    "parentId" : 500234
},{
    "code" : 500234203,
    "name" : "关面乡",
    "parentId" : 500234
},{
    "code" : 500234204,
    "name" : "满月乡",
    "parentId" : 500234
},{
    "code" : 500234211,
    "name" : "五通乡",
    "parentId" : 500234
},{
    "code" : 500234215,
    "name" : "麻柳乡",
    "parentId" : 500234
},{
    "code" : 500234216,
    "name" : "紫水乡",
    "parentId" : 500234
},{
    "code" : 500234225,
    "name" : "三汇口乡",
    "parentId" : 500234
},{
    "code" : 500235001,
    "name" : "双江街道",
    "parentId" : 500235
},{
    "code" : 500235002,
    "name" : "青龙街道",
    "parentId" : 500235
},{
    "code" : 500235003,
    "name" : "人和街道",
    "parentId" : 500235
},{
    "code" : 500235004,
    "name" : "盘龙街道",
    "parentId" : 500235
},{
    "code" : 500235105,
    "name" : "龙角镇",
    "parentId" : 500235
},{
    "code" : 500235107,
    "name" : "故陵镇",
    "parentId" : 500235
},{
    "code" : 500235108,
    "name" : "红狮镇",
    "parentId" : 500235
},{
    "code" : 500235115,
    "name" : "路阳镇",
    "parentId" : 500235
},{
    "code" : 500235116,
    "name" : "农坝镇",
    "parentId" : 500235
},{
    "code" : 500235118,
    "name" : "渠马镇",
    "parentId" : 500235
},{
    "code" : 500235121,
    "name" : "黄石镇",
    "parentId" : 500235
},{
    "code" : 500235122,
    "name" : "巴阳镇",
    "parentId" : 500235
},{
    "code" : 500235123,
    "name" : "沙市镇",
    "parentId" : 500235
},{
    "code" : 500235124,
    "name" : "鱼泉镇",
    "parentId" : 500235
},{
    "code" : 500235125,
    "name" : "凤鸣镇",
    "parentId" : 500235
},{
    "code" : 500235127,
    "name" : "宝坪镇",
    "parentId" : 500235
},{
    "code" : 500235128,
    "name" : "南溪镇",
    "parentId" : 500235
},{
    "code" : 500235129,
    "name" : "双土镇",
    "parentId" : 500235
},{
    "code" : 500235130,
    "name" : "桑坪镇",
    "parentId" : 500235
},{
    "code" : 500235131,
    "name" : "江口镇",
    "parentId" : 500235
},{
    "code" : 500235132,
    "name" : "高阳镇",
    "parentId" : 500235
},{
    "code" : 500235133,
    "name" : "平安镇",
    "parentId" : 500235
},{
    "code" : 500235135,
    "name" : "云阳镇",
    "parentId" : 500235
},{
    "code" : 500235136,
    "name" : "云安镇",
    "parentId" : 500235
},{
    "code" : 500235137,
    "name" : "栖霞镇",
    "parentId" : 500235
},{
    "code" : 500235138,
    "name" : "双龙镇",
    "parentId" : 500235
},{
    "code" : 500235139,
    "name" : "泥溪镇",
    "parentId" : 500235
},{
    "code" : 500235140,
    "name" : "票草镇",
    "parentId" : 500235
},{
    "code" : 500235141,
    "name" : "养鹿镇",
    "parentId" : 500235
},{
    "code" : 500235142,
    "name" : "水口镇",
    "parentId" : 500235
},{
    "code" : 500235143,
    "name" : "堰坪镇",
    "parentId" : 500235
},{
    "code" : 500235144,
    "name" : "龙洞镇",
    "parentId" : 500235
},{
    "code" : 500235145,
    "name" : "后叶镇",
    "parentId" : 500235
},{
    "code" : 500235208,
    "name" : "外郎乡",
    "parentId" : 500235
},{
    "code" : 500235210,
    "name" : "耀灵乡",
    "parentId" : 500235
},{
    "code" : 500235215,
    "name" : "新津乡",
    "parentId" : 500235
},{
    "code" : 500235216,
    "name" : "普安乡",
    "parentId" : 500235
},{
    "code" : 500235218,
    "name" : "洞鹿乡",
    "parentId" : 500235
},{
    "code" : 500235219,
    "name" : "石门乡",
    "parentId" : 500235
},{
    "code" : 500235220,
    "name" : "大阳乡",
    "parentId" : 500235
},{
    "code" : 500235239,
    "name" : "上坝乡",
    "parentId" : 500235
},{
    "code" : 500235242,
    "name" : "清水土家族自治乡",
    "parentId" : 500235
},{
    "code" : 500236116,
    "name" : "永安镇",
    "parentId" : 500236
},{
    "code" : 500236117,
    "name" : "白帝镇",
    "parentId" : 500236
},{
    "code" : 500236118,
    "name" : "草堂镇",
    "parentId" : 500236
},{
    "code" : 500236119,
    "name" : "汾河镇",
    "parentId" : 500236
},{
    "code" : 500236120,
    "name" : "康乐镇",
    "parentId" : 500236
},{
    "code" : 500236121,
    "name" : "大树镇",
    "parentId" : 500236
},{
    "code" : 500236122,
    "name" : "竹园镇",
    "parentId" : 500236
},{
    "code" : 500236123,
    "name" : "公平镇",
    "parentId" : 500236
},{
    "code" : 500236124,
    "name" : "朱衣镇",
    "parentId" : 500236
},{
    "code" : 500236125,
    "name" : "甲高镇",
    "parentId" : 500236
},{
    "code" : 500236126,
    "name" : "羊市镇",
    "parentId" : 500236
},{
    "code" : 500236127,
    "name" : "吐祥镇",
    "parentId" : 500236
},{
    "code" : 500236128,
    "name" : "兴隆镇",
    "parentId" : 500236
},{
    "code" : 500236129,
    "name" : "青龙镇",
    "parentId" : 500236
},{
    "code" : 500236130,
    "name" : "新民镇",
    "parentId" : 500236
},{
    "code" : 500236131,
    "name" : "永乐镇",
    "parentId" : 500236
},{
    "code" : 500236132,
    "name" : "安坪镇",
    "parentId" : 500236
},{
    "code" : 500236133,
    "name" : "五马镇",
    "parentId" : 500236
},{
    "code" : 500236134,
    "name" : "青莲镇",
    "parentId" : 500236
},{
    "code" : 500236265,
    "name" : "岩湾乡",
    "parentId" : 500236
},{
    "code" : 500236266,
    "name" : "平安乡",
    "parentId" : 500236
},{
    "code" : 500236267,
    "name" : "红土乡",
    "parentId" : 500236
},{
    "code" : 500236269,
    "name" : "石岗乡",
    "parentId" : 500236
},{
    "code" : 500236270,
    "name" : "康坪乡",
    "parentId" : 500236
},{
    "code" : 500236272,
    "name" : "太和土家族乡",
    "parentId" : 500236
},{
    "code" : 500236274,
    "name" : "鹤峰乡",
    "parentId" : 500236
},{
    "code" : 500236275,
    "name" : "冯坪乡",
    "parentId" : 500236
},{
    "code" : 500236276,
    "name" : "长安土家族乡",
    "parentId" : 500236
},{
    "code" : 500236277,
    "name" : "龙桥土家族乡",
    "parentId" : 500236
},{
    "code" : 500236278,
    "name" : "云雾土家族乡",
    "parentId" : 500236
},{
    "code" : 500236400,
    "name" : "白帝城风景区管理委员会",
    "parentId" : 500236
},{
    "code" : 500237001,
    "name" : "高唐街道",
    "parentId" : 500237
},{
    "code" : 500237002,
    "name" : "龙门街道",
    "parentId" : 500237
},{
    "code" : 500237101,
    "name" : "庙宇镇",
    "parentId" : 500237
},{
    "code" : 500237102,
    "name" : "大昌镇",
    "parentId" : 500237
},{
    "code" : 500237103,
    "name" : "福田镇",
    "parentId" : 500237
},{
    "code" : 500237104,
    "name" : "龙溪镇",
    "parentId" : 500237
},{
    "code" : 500237105,
    "name" : "双龙镇",
    "parentId" : 500237
},{
    "code" : 500237106,
    "name" : "官阳镇",
    "parentId" : 500237
},{
    "code" : 500237107,
    "name" : "骡坪镇",
    "parentId" : 500237
},{
    "code" : 500237108,
    "name" : "抱龙镇",
    "parentId" : 500237
},{
    "code" : 500237109,
    "name" : "官渡镇",
    "parentId" : 500237
},{
    "code" : 500237110,
    "name" : "铜鼓镇",
    "parentId" : 500237
},{
    "code" : 500237111,
    "name" : "巫峡镇",
    "parentId" : 500237
},{
    "code" : 500237200,
    "name" : "红椿乡",
    "parentId" : 500237
},{
    "code" : 500237207,
    "name" : "两坪乡",
    "parentId" : 500237
},{
    "code" : 500237208,
    "name" : "曲尺乡",
    "parentId" : 500237
},{
    "code" : 500237210,
    "name" : "建坪乡",
    "parentId" : 500237
},{
    "code" : 500237211,
    "name" : "大溪乡",
    "parentId" : 500237
},{
    "code" : 500237214,
    "name" : "金坪乡",
    "parentId" : 500237
},{
    "code" : 500237216,
    "name" : "平河乡",
    "parentId" : 500237
},{
    "code" : 500237219,
    "name" : "当阳乡",
    "parentId" : 500237
},{
    "code" : 500237222,
    "name" : "竹贤乡",
    "parentId" : 500237
},{
    "code" : 500237225,
    "name" : "三溪乡",
    "parentId" : 500237
},{
    "code" : 500237227,
    "name" : "培石乡",
    "parentId" : 500237
},{
    "code" : 500237229,
    "name" : "笃坪乡",
    "parentId" : 500237
},{
    "code" : 500237231,
    "name" : "邓家乡",
    "parentId" : 500237
},{
    "code" : 500238001,
    "name" : "宁河街道",
    "parentId" : 500238
},{
    "code" : 500238002,
    "name" : "柏杨街道",
    "parentId" : 500238
},{
    "code" : 500238100,
    "name" : "城厢镇",
    "parentId" : 500238
},{
    "code" : 500238101,
    "name" : "凤凰镇",
    "parentId" : 500238
},{
    "code" : 500238102,
    "name" : "宁厂镇",
    "parentId" : 500238
},{
    "code" : 500238103,
    "name" : "上磺镇",
    "parentId" : 500238
},{
    "code" : 500238104,
    "name" : "古路镇",
    "parentId" : 500238
},{
    "code" : 500238105,
    "name" : "文峰镇",
    "parentId" : 500238
},{
    "code" : 500238106,
    "name" : "徐家镇",
    "parentId" : 500238
},{
    "code" : 500238107,
    "name" : "白鹿镇",
    "parentId" : 500238
},{
    "code" : 500238108,
    "name" : "尖山镇",
    "parentId" : 500238
},{
    "code" : 500238109,
    "name" : "下堡镇",
    "parentId" : 500238
},{
    "code" : 500238110,
    "name" : "峰灵镇",
    "parentId" : 500238
},{
    "code" : 500238111,
    "name" : "塘坊镇",
    "parentId" : 500238
},{
    "code" : 500238112,
    "name" : "朝阳镇",
    "parentId" : 500238
},{
    "code" : 500238113,
    "name" : "田坝镇",
    "parentId" : 500238
},{
    "code" : 500238114,
    "name" : "通城镇",
    "parentId" : 500238
},{
    "code" : 500238204,
    "name" : "胜利乡",
    "parentId" : 500238
},{
    "code" : 500238205,
    "name" : "菱角乡",
    "parentId" : 500238
},{
    "code" : 500238207,
    "name" : "大河乡",
    "parentId" : 500238
},{
    "code" : 500238208,
    "name" : "天星乡",
    "parentId" : 500238
},{
    "code" : 500238210,
    "name" : "长桂乡",
    "parentId" : 500238
},{
    "code" : 500238212,
    "name" : "蒲莲乡",
    "parentId" : 500238
},{
    "code" : 500238226,
    "name" : "鱼鳞乡",
    "parentId" : 500238
},{
    "code" : 500238227,
    "name" : "乌龙乡",
    "parentId" : 500238
},{
    "code" : 500238234,
    "name" : "中岗乡",
    "parentId" : 500238
},{
    "code" : 500238237,
    "name" : "花台乡",
    "parentId" : 500238
},{
    "code" : 500238239,
    "name" : "兰英乡",
    "parentId" : 500238
},{
    "code" : 500238240,
    "name" : "双阳乡",
    "parentId" : 500238
},{
    "code" : 500238242,
    "name" : "中梁乡",
    "parentId" : 500238
},{
    "code" : 500238243,
    "name" : "天元乡",
    "parentId" : 500238
},{
    "code" : 500238245,
    "name" : "土城乡",
    "parentId" : 500238
},{
    "code" : 500238400,
    "name" : "红池坝经济开发区",
    "parentId" : 500238
},{
    "code" : 500240100,
    "name" : "南宾镇",
    "parentId" : 500240
},{
    "code" : 500240101,
    "name" : "西沱镇",
    "parentId" : 500240
},{
    "code" : 500240102,
    "name" : "下路镇",
    "parentId" : 500240
},{
    "code" : 500240103,
    "name" : "悦崃镇",
    "parentId" : 500240
},{
    "code" : 500240104,
    "name" : "临溪镇",
    "parentId" : 500240
},{
    "code" : 500240105,
    "name" : "黄水镇",
    "parentId" : 500240
},{
    "code" : 500240106,
    "name" : "马武镇",
    "parentId" : 500240
},{
    "code" : 500240107,
    "name" : "沙子镇",
    "parentId" : 500240
},{
    "code" : 500240108,
    "name" : "王场镇",
    "parentId" : 500240
},{
    "code" : 500240109,
    "name" : "沿溪镇",
    "parentId" : 500240
},{
    "code" : 500240110,
    "name" : "龙沙镇",
    "parentId" : 500240
},{
    "code" : 500240111,
    "name" : "鱼池镇",
    "parentId" : 500240
},{
    "code" : 500240112,
    "name" : "三河镇",
    "parentId" : 500240
},{
    "code" : 500240113,
    "name" : "大歇镇",
    "parentId" : 500240
},{
    "code" : 500240114,
    "name" : "桥头镇",
    "parentId" : 500240
},{
    "code" : 500240115,
    "name" : "万朝镇",
    "parentId" : 500240
},{
    "code" : 500240116,
    "name" : "冷水镇",
    "parentId" : 500240
},{
    "code" : 500240203,
    "name" : "黎场乡",
    "parentId" : 500240
},{
    "code" : 500240204,
    "name" : "三星乡",
    "parentId" : 500240
},{
    "code" : 500240205,
    "name" : "六塘乡",
    "parentId" : 500240
},{
    "code" : 500240207,
    "name" : "三益乡",
    "parentId" : 500240
},{
    "code" : 500240208,
    "name" : "王家乡",
    "parentId" : 500240
},{
    "code" : 500240209,
    "name" : "河嘴乡",
    "parentId" : 500240
},{
    "code" : 500240210,
    "name" : "石家乡",
    "parentId" : 500240
},{
    "code" : 500240212,
    "name" : "枫木乡",
    "parentId" : 500240
},{
    "code" : 500240213,
    "name" : "中益乡",
    "parentId" : 500240
},{
    "code" : 500240214,
    "name" : "洗新乡",
    "parentId" : 500240
},{
    "code" : 500240215,
    "name" : "黄鹤乡",
    "parentId" : 500240
},{
    "code" : 500240216,
    "name" : "龙潭乡",
    "parentId" : 500240
},{
    "code" : 500240217,
    "name" : "新乐乡",
    "parentId" : 500240
},{
    "code" : 500240218,
    "name" : "金铃乡",
    "parentId" : 500240
},{
    "code" : 500240219,
    "name" : "金竹乡",
    "parentId" : 500240
},{
    "code" : 500241001,
    "name" : "中和街道",
    "parentId" : 500241
},{
    "code" : 500241002,
    "name" : "乌杨街道",
    "parentId" : 500241
},{
    "code" : 500241003,
    "name" : "平凯街道",
    "parentId" : 500241
},{
    "code" : 500241102,
    "name" : "清溪场镇",
    "parentId" : 500241
},{
    "code" : 500241103,
    "name" : "隘口镇",
    "parentId" : 500241
},{
    "code" : 500241104,
    "name" : "溶溪镇",
    "parentId" : 500241
},{
    "code" : 500241105,
    "name" : "官庄镇",
    "parentId" : 500241
},{
    "code" : 500241106,
    "name" : "龙池镇",
    "parentId" : 500241
},{
    "code" : 500241107,
    "name" : "石堤镇",
    "parentId" : 500241
},{
    "code" : 500241108,
    "name" : "峨溶镇",
    "parentId" : 500241
},{
    "code" : 500241109,
    "name" : "洪安镇",
    "parentId" : 500241
},{
    "code" : 500241110,
    "name" : "雅江镇",
    "parentId" : 500241
},{
    "code" : 500241111,
    "name" : "石耶镇",
    "parentId" : 500241
},{
    "code" : 500241112,
    "name" : "梅江镇",
    "parentId" : 500241
},{
    "code" : 500241113,
    "name" : "兰桥镇",
    "parentId" : 500241
},{
    "code" : 500241114,
    "name" : "膏田镇",
    "parentId" : 500241
},{
    "code" : 500241115,
    "name" : "溪口镇",
    "parentId" : 500241
},{
    "code" : 500241116,
    "name" : "妙泉镇",
    "parentId" : 500241
},{
    "code" : 500241117,
    "name" : "宋农镇",
    "parentId" : 500241
},{
    "code" : 500241118,
    "name" : "里仁镇",
    "parentId" : 500241
},{
    "code" : 500241119,
    "name" : "钟灵镇",
    "parentId" : 500241
},{
    "code" : 500241201,
    "name" : "孝溪乡",
    "parentId" : 500241
},{
    "code" : 500241207,
    "name" : "海洋乡",
    "parentId" : 500241
},{
    "code" : 500241208,
    "name" : "大溪乡",
    "parentId" : 500241
},{
    "code" : 500241211,
    "name" : "涌洞乡",
    "parentId" : 500241
},{
    "code" : 500241214,
    "name" : "中平乡",
    "parentId" : 500241
},{
    "code" : 500241215,
    "name" : "岑溪乡",
    "parentId" : 500241
},{
    "code" : 500242100,
    "name" : "桃花源镇",
    "parentId" : 500242
},{
    "code" : 500242101,
    "name" : "龙潭镇",
    "parentId" : 500242
},{
    "code" : 500242102,
    "name" : "麻旺镇",
    "parentId" : 500242
},{
    "code" : 500242103,
    "name" : "酉酬镇",
    "parentId" : 500242
},{
    "code" : 500242104,
    "name" : "大溪镇",
    "parentId" : 500242
},{
    "code" : 500242105,
    "name" : "兴隆镇",
    "parentId" : 500242
},{
    "code" : 500242106,
    "name" : "黑水镇",
    "parentId" : 500242
},{
    "code" : 500242107,
    "name" : "丁市镇",
    "parentId" : 500242
},{
    "code" : 500242108,
    "name" : "龚滩镇",
    "parentId" : 500242
},{
    "code" : 500242109,
    "name" : "李溪镇",
    "parentId" : 500242
},{
    "code" : 500242110,
    "name" : "泔溪镇",
    "parentId" : 500242
},{
    "code" : 500242111,
    "name" : "酉水河镇",
    "parentId" : 500242
},{
    "code" : 500242112,
    "name" : "苍岭镇",
    "parentId" : 500242
},{
    "code" : 500242113,
    "name" : "小河镇",
    "parentId" : 500242
},{
    "code" : 500242114,
    "name" : "板溪镇",
    "parentId" : 500242
},{
    "code" : 500242200,
    "name" : "涂市乡",
    "parentId" : 500242
},{
    "code" : 500242202,
    "name" : "铜鼓乡",
    "parentId" : 500242
},{
    "code" : 500242204,
    "name" : "可大乡",
    "parentId" : 500242
},{
    "code" : 500242205,
    "name" : "偏柏乡",
    "parentId" : 500242
},{
    "code" : 500242206,
    "name" : "五福乡",
    "parentId" : 500242
},{
    "code" : 500242207,
    "name" : "木叶乡",
    "parentId" : 500242
},{
    "code" : 500242208,
    "name" : "毛坝乡",
    "parentId" : 500242
},{
    "code" : 500242209,
    "name" : "花田乡",
    "parentId" : 500242
},{
    "code" : 500242210,
    "name" : "后坪乡",
    "parentId" : 500242
},{
    "code" : 500242211,
    "name" : "天馆乡",
    "parentId" : 500242
},{
    "code" : 500242212,
    "name" : "宜居乡",
    "parentId" : 500242
},{
    "code" : 500242213,
    "name" : "万木乡",
    "parentId" : 500242
},{
    "code" : 500242214,
    "name" : "两罾乡",
    "parentId" : 500242
},{
    "code" : 500242215,
    "name" : "板桥乡",
    "parentId" : 500242
},{
    "code" : 500242216,
    "name" : "官清乡",
    "parentId" : 500242
},{
    "code" : 500242217,
    "name" : "南腰界乡",
    "parentId" : 500242
},{
    "code" : 500242218,
    "name" : "车田乡",
    "parentId" : 500242
},{
    "code" : 500242219,
    "name" : "腴地乡",
    "parentId" : 500242
},{
    "code" : 500242220,
    "name" : "清泉乡",
    "parentId" : 500242
},{
    "code" : 500242221,
    "name" : "庙溪乡",
    "parentId" : 500242
},{
    "code" : 500242222,
    "name" : "浪坪乡",
    "parentId" : 500242
},{
    "code" : 500242223,
    "name" : "双泉乡",
    "parentId" : 500242
},{
    "code" : 500242224,
    "name" : "楠木乡",
    "parentId" : 500242
},{
    "code" : 500243001,
    "name" : "汉葭街道",
    "parentId" : 500243
},{
    "code" : 500243002,
    "name" : "绍庆街道",
    "parentId" : 500243
},{
    "code" : 500243003,
    "name" : "靛水街道",
    "parentId" : 500243
},{
    "code" : 500243101,
    "name" : "保家镇",
    "parentId" : 500243
},{
    "code" : 500243102,
    "name" : "郁山镇",
    "parentId" : 500243
},{
    "code" : 500243103,
    "name" : "高谷镇",
    "parentId" : 500243
},{
    "code" : 500243104,
    "name" : "桑柘镇",
    "parentId" : 500243
},{
    "code" : 500243105,
    "name" : "鹿角镇",
    "parentId" : 500243
},{
    "code" : 500243106,
    "name" : "黄家镇",
    "parentId" : 500243
},{
    "code" : 500243107,
    "name" : "普子镇",
    "parentId" : 500243
},{
    "code" : 500243108,
    "name" : "龙射镇",
    "parentId" : 500243
},{
    "code" : 500243109,
    "name" : "连湖镇",
    "parentId" : 500243
},{
    "code" : 500243110,
    "name" : "万足镇",
    "parentId" : 500243
},{
    "code" : 500243111,
    "name" : "平安镇",
    "parentId" : 500243
},{
    "code" : 500243112,
    "name" : "长生镇",
    "parentId" : 500243
},{
    "code" : 500243113,
    "name" : "新田镇",
    "parentId" : 500243
},{
    "code" : 500243201,
    "name" : "岩东乡",
    "parentId" : 500243
},{
    "code" : 500243202,
    "name" : "鹿鸣乡",
    "parentId" : 500243
},{
    "code" : 500243204,
    "name" : "棣棠乡",
    "parentId" : 500243
},{
    "code" : 500243205,
    "name" : "太原乡",
    "parentId" : 500243
},{
    "code" : 500243206,
    "name" : "三义乡",
    "parentId" : 500243
},{
    "code" : 500243207,
    "name" : "联合乡",
    "parentId" : 500243
},{
    "code" : 500243208,
    "name" : "石柳乡",
    "parentId" : 500243
},{
    "code" : 500243209,
    "name" : "龙溪乡",
    "parentId" : 500243
},{
    "code" : 500243210,
    "name" : "走马乡",
    "parentId" : 500243
},{
    "code" : 500243211,
    "name" : "芦塘乡",
    "parentId" : 500243
},{
    "code" : 500243213,
    "name" : "乔梓乡",
    "parentId" : 500243
},{
    "code" : 500243216,
    "name" : "梅子垭乡",
    "parentId" : 500243
},{
    "code" : 500243217,
    "name" : "诸佛乡",
    "parentId" : 500243
},{
    "code" : 500243218,
    "name" : "小厂乡",
    "parentId" : 500243
},{
    "code" : 500243219,
    "name" : "桐楼乡",
    "parentId" : 500243
},{
    "code" : 500243223,
    "name" : "双龙乡",
    "parentId" : 500243
},{
    "code" : 500243224,
    "name" : "石盘乡",
    "parentId" : 500243
},{
    "code" : 500243225,
    "name" : "大垭乡",
    "parentId" : 500243
},{
    "code" : 500243226,
    "name" : "润溪乡",
    "parentId" : 500243
},{
    "code" : 500243227,
    "name" : "朗溪乡",
    "parentId" : 500243
},{
    "code" : 500243228,
    "name" : "龙塘乡",
    "parentId" : 500243
},{
    "code" : 659001005,
    "name" : "东城街道办事处",
    "parentId" : 659001
},{
    "code" : 659002002,
    "name" : "幸福路街道办事处",
    "parentId" : 659002
},{
    "code" : 659002003,
    "name" : "青松路街道办事处",
    "parentId" : 659002
},{
    "code" : 659002004,
    "name" : "南口街道办事处",
    "parentId" : 659002
},{
    "code" : 659002200,
    "name" : "托喀依乡",
    "parentId" : 659002
},{
    "code" : 659003001,
    "name" : "齐干却勒街道办事处",
    "parentId" : 659003
},{
    "code" : 659003002,
    "name" : "前海街道办事处",
    "parentId" : 659003
},{
    "code" : 659004001,
    "name" : "军垦路街道办事处",
    "parentId" : 659004
},{
    "code" : 659004003,
    "name" : "人民路街道办事处",
    "parentId" : 659004
}];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(5)
var ieee754 = __webpack_require__(9)
var isArray = __webpack_require__(10)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports


// module
exports.push([module.i, "\n.ProvCityBoxBg{\n    background: rgba(0,0,0,.35);\n    z-index: 200;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\n.ProvCityBox{\n    position: fixed;\n    z-index: 300;\n    background: #fff;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\n.ProvCityHeader{\n    background-color: #eee;\n    height: 44px;\n    line-height: 44px;\n    overflow: hidden;\n    text-align: center;\n    font-size: 16px!important;\n}\n.ProvCityHeaderCancle{\n    float: left;\n    padding: 0 20px;\n    color: #ff5657;\n    font-size: 16px!important;\n}\n.ProvCityHeaderConfirm{\n    float: right;\n    padding: 0 20px;\n    color: #ff5657;\n    font-size: 16px!important;\n}\n.ProvCityContent{\n    width: 100%;\n    margin: 0 auto;\n    background: #fff;\n    overflow: hidden;\n    height: 245px;\n    overflow: hidden;\n}\n.ProvCityContentList{\n    float: left;\n    width: 33.333333%;\n    text-align: center;\n}\n.ProvCityContentList ul{\n    -webkit-transition: all .3s ease;\n        transition: all .3s ease;\n}\n.ProvCityContentList ul.province_dragging,\n.ProvCityContentList ul.city_dragging,\n.ProvCityContentList ul.area_dragging{\n    -webkit-transition: none;\n        transition: none;\n}\n.ProvCityContentList li{\n    line-height: 35px;\n    height: 35px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 14px!important;\n}\n.ProvCityContentList li.current{\n    font-size: 16px!important;\n    font-weight: bold;\n}\n.ProvCityContentList li.node1{\n    font-size: 15px!important;\n    opacity: .7;\n}\n.ProvCityContentList li.node2{\n    font-size: 14px!important;\n    opacity: .5;\n}\n.ProvCityContentList li.node3{\n    font-size: 12px!important;\n    opacity: .3;\n}\n.ProvCitySelectedTop{\n    width: 100%;\n    border: none;\n    border-top: 1px solid #eee;\n    position: absolute;\n    bottom: 105px;\n    margin: 0;\n    height: 0;\n}\n.ProvCitySelectedBottom{\n    width: 100%;\n    border: none;\n    border-top: 1px solid #eee;\n    position: absolute;\n    bottom: 140px;\n    margin: 0;\n    height: 0;\n}\n.fade-enter-active, .fade-leave-active{\n  transition: all .2s ease\n}\n.fade-enter, .fade-leave-active{\n  opacity: 0\n}\n.select-enter-active, .select-leave-active {\n    transition: all .3s ease;\n}\n.select-enter, .select-leave-active {\n    transform: translate(0, 289px);\n}\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(3)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(0),
  /* template */
  __webpack_require__(2),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\vue-area\\src\\vue-area.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vue-area.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58282748", Component.options)
  } else {
    hotAPI.reload("data-v-58282748", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(13)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});