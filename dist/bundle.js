/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint config:
/* global google */

var MapsApi = function () {
  function MapsApi() {
    _classCallCheck(this, MapsApi);

    this.geocoder = null;
  }

  _createClass(MapsApi, [{
    key: 'getGeocoder',
    value: function getGeocoder() {
      if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
      return this.geocoder;
    }
  }, {
    key: 'geocode',
    value: function geocode(queryKey, queryValue) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.getGeocoder().geocode(_defineProperty({}, queryKey, queryValue), function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            reject('status ' + status);
          }
        });
      });
    }
  }, {
    key: 'geocodeAddress',
    value: function geocodeAddress(address) {
      return this.geocode('address', address);
    }
  }, {
    key: 'geocodePlaceId',
    value: function geocodePlaceId(placeId) {
      return this.geocode('placeId', placeId);
    }
  }]);

  return MapsApi;
}();

exports.default = MapsApi;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint config:
/* global $ */

var WikiApi = function () {
  function WikiApi() {
    _classCallCheck(this, WikiApi);

    this.url = 'http://en.wikipedia.org/w/api.php';
  }

  _createClass(WikiApi, [{
    key: 'geosearchLocation',
    value: function geosearchLocation(lat, lng) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: _this.url,
          data: { format: 'json', action: 'query', list: 'geosearch', 'gsradius': 10000, gscoord: lat + '|' + lng },
          dataType: 'jsonp'
        }).done(function (results, textStatus, request) {
          if (request.status == 200) {
            resolve(results);
          } else {
            reject('status ' + request.status);
          }
        }).fail(function (request) {
          return reject('status ' + request.status);
        });
      });
    }
  }, {
    key: 'searchPageIds',
    value: function searchPageIds(pageIds) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: _this2.url,
          data: { format: 'json', action: 'query', prop: 'extracts', 'exintro': '', pageids: pageIds.join('|') },
          dataType: 'jsonp'
        }).done(function (results, textStatus, request) {
          if (request.status == 200) {
            resolve(results);
          } else {
            reject('status ' + request.status);
          }
        }).fail(function (request) {
          return reject('status ' + request.status);
        });
      });
    }
  }]);

  return WikiApi;
}();

exports.default = WikiApi;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = function Location(label, lat, lng) {
  _classCallCheck(this, Location);

  this.label = label;
  this.lat = lat;
  this.lng = lng;
};

exports.default = Location;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ViewModel = __webpack_require__(4);

var _ViewModel2 = _interopRequireDefault(_ViewModel);

var _Model = __webpack_require__(13);

var _Model2 = _interopRequireDefault(_Model);

__webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  googleMapsApiKey: 'AIzaSyCZkjL847cY6nQvRo2zhSdVYlMnC59JijA',
  modelResolveDelayAsMillis: 1000,
  localStorageKey: 'neighborhood-map',
  mapCenter: { lat: 48.856614, lng: 2.3522219000000177 }, // Paris
  mapZoom: 11

};

// add the 'initialize()' function below to the global scope, then use it as async callback for google maps api
// eslint config:
/* global $ */

window.initialize = function initialize() {
  window.ko.applyBindings(new _ViewModel2.default(window.ko, config, new _Model2.default(config)));
};

// to be sure that the DOM is ready (needed to knockout.js to be used in initialize())
$(function () {
  // dynamically inserted scripts execute asynchronously by default, keep the attribute to see it in the html
  var apiUrl = 'https://maps.googleapis.com/maps/api/js';
  var scriptTag = '<script async src="' + apiUrl + '?key=' + config.googleMapsApiKey + '&v=3&callback=' + window.initialize.name + '"></script>';
  $('body').append(scriptTag);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ListView = __webpack_require__(5);

var _ListView2 = _interopRequireDefault(_ListView);

var _MapView = __webpack_require__(7);

var _MapView2 = _interopRequireDefault(_MapView);

var _AdminView = __webpack_require__(11);

var _AdminView2 = _interopRequireDefault(_AdminView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // eslint config:
/* global $ */

var ViewModel = function ViewModel(ko, config, model) {
  var _this = this;

  _classCallCheck(this, ViewModel);

  this.config = config;
  this.model = model;
  this.listView = new _ListView2.default(ko);
  this.mapView = new _MapView2.default(ko, config);
  this.adminView = new _AdminView2.default(ko, config);
  //
  this.shouldShowMenu = ko.observable($('.menu-btn').is(':visible') ? false : true);
  this.onMenuClick = function () {
    _this.shouldShowMenu(!_this.shouldShowMenu());
  };
  //
  this.model.init(function (locations) {
    _this.listView.render(locations);
  });
  this.listView.init(function (filteredLocations) {
    _this.mapView.render(filteredLocations);
  }, function (clickedLocation) {
    _this.mapView.onLocationClick(clickedLocation);
  });
  this.mapView.init();
  this.adminView.init(function (location) {
    _this.model.addLocation(location);
  }, function (locationLabel) {
    _this.model.removeLocation(locationLabel);
  });
};

exports.default = ViewModel;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListView = function () {
  function ListView(ko) {
    _classCallCheck(this, ListView);

    this.ko = ko;
  }

  _createClass(ListView, [{
    key: 'init',
    value: function init(onFilteredLocations, onLocationClick) {
      var _this = this;

      this.locations = this.ko.observableArray([]);
      this.locationFilter = this.ko.observable('');
      this.onLocationClick = onLocationClick;
      this.filteredLocations = this.ko.computed(function () {
        if (!_this.locationFilter()) {
          return _this.locations();
        } else {
          try {
            var regexp = new RegExp(_this.locationFilter());
            return _this.ko.utils.arrayFilter(_this.locations(), function (location) {
              return location.label.search(regexp) >= 0;
            });
          } catch (err) {
            return _this.locations();
          }
        }
      });
      this.filteredLocations.subscribe(onFilteredLocations);
    }
  }, {
    key: 'render',
    value: function render(locations) {
      var sortedLocations = locations.sort(function (l1, l2) {
        return l1.label.localeCompare(l2.label);
      });
      this.locations(sortedLocations);
      this.locations.valueHasMutated(); // needed to re-render the ListView
    }
  }]);

  return ListView;
}();

exports.default = ListView;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint config:
/* global google, $, window */

__webpack_require__(8);

var _MapsApi = __webpack_require__(0);

var _MapsApi2 = _interopRequireDefault(_MapsApi);

var _LocationView = __webpack_require__(9);

var _LocationView2 = _interopRequireDefault(_LocationView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapView = function () {
  function MapView(ko, config) {
    _classCallCheck(this, MapView);

    this.ko = ko;
    this.mapsApi = new _MapsApi2.default(config);
    this.config = config;
    this.locations = new Map();
    this.map = null;
    this.bounds = null;
    this.currentLocation = null;
  }

  _createClass(MapView, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'render',
    value: function render(locations) {
      var _this = this;

      this.map = new google.maps.Map($('#map')[0], {
        center: this.config.mapCenter,
        zoom: this.config.mapZoom
      });
      this.bounds = new google.maps.LatLngBounds();
      this.locations.clear();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = locations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var location = _step.value;

          this.locations.set(location.label, new _LocationView2.default(location));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var locationValues = Array.from(this.locations.values());
      locationValues.forEach(function (location) {
        var marker = new google.maps.Marker({
          map: _this.map,
          position: {
            lat: location.lat,
            lng: location.lng
          }
        });
        location.marker = marker;
        _this.bounds.extend(marker.position);
        location.marker.addListener('click', function () {
          if (_this.closeCurrentLocation(location)) return;
          location.openInfowindow(_this);
        });
      });
      this.map.fitBounds(this.bounds);
    }
  }, {
    key: 'onLocationClick',
    value: function onLocationClick(_ref) {
      var label = _ref.label;

      var location = this.locations.get(label);
      if (this.closeCurrentLocation(location)) return;
      if (location.marker) {
        location.openInfowindow(this);
      }
    }
  }, {
    key: 'closeCurrentLocation',
    value: function closeCurrentLocation(location) {
      var same = location === this.currentLocation;
      if (this.currentLocation) {
        this.currentLocation.closeInfowindow(this);
      }
      return same;
    }
  }]);

  return MapView;
}();

exports.default = MapView;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint config:
/* global google, window, $ */

__webpack_require__(10);

var _WikiApi = __webpack_require__(1);

var _WikiApi2 = _interopRequireDefault(_WikiApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocationView = function () {
  function LocationView(_ref) {
    var label = _ref.label,
        lat = _ref.lat,
        lng = _ref.lng;

    _classCallCheck(this, LocationView);

    this.label = label;
    this.lat = lat;
    this.lng = lng;
    this.marker = null;
    this.infowindow = null;
    this.timeoutId = 0;
    this.panorama = null;
    this.wikiApi = new _WikiApi2.default();
    this.streetViewDivId = 'street-view'; // same as in styles/LocationView.css
    this.wikiDivId = 'wikimedia'; // same as in styles/LocationView.css
  }

  _createClass(LocationView, [{
    key: 'openInfowindow',
    value: function openInfowindow(view) {
      var _this = this;

      var infowindow = new google.maps.InfoWindow();
      infowindow.addListener('closeclick', function () {
        _this.closeInfowindow(view);
      });
      infowindow.setContent('<div id="info-window">\n         <h1>' + this.label + '</h1>\n         <div id="' + this.streetViewDivId + '"></div>\n         <div id="' + this.wikiDivId + '"></div>\n       </div>');
      view.currentLocation = this;
      // open infowindow before calling third-party apis (this <div> are needed for success/error handling)
      infowindow.open(view.map, this.marker);
      //
      this.openStreetView();
      this.openNearbyPlaces();
      this.infowindow = infowindow;
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
      this.timeoutId = window.setTimeout(function () {
        return _this.marker.setAnimation(null);
      }, 750);
    }
  }, {
    key: 'closeInfowindow',
    value: function closeInfowindow(view) {
      this.panorama = null;
      view.currentLocation = null;
      window.clearTimeout(this.timeoutId);
      this.timeoutId = 0;
      this.marker.setAnimation(null);
      this.infowindow.close();
      this.infowindow = null;
    }
  }, {
    key: 'openStreetView',
    value: function openStreetView() {
      var _this2 = this;

      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;
      var getStreetView = function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, _this2.marker.position);
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 0
            }
          };
          // IMPORTANT width/height of the panorama <div> are set through a CSS rule
          _this2.panorama = new google.maps.StreetViewPanorama($('#' + _this2.streetViewDivId)[0], panoramaOptions);
        } else {
          $('#' + _this2.streetViewDivId).text('StreetView error (status ' + status + ')');
        }
      };
      streetViewService.getPanoramaByLocation(this.marker.position, radius, getStreetView);
    }
  }, {
    key: 'openNearbyPlaces',
    value: function openNearbyPlaces() {
      var _this3 = this;

      this.wikiApi.geosearchLocation(this.marker.position.lat(), this.marker.position.lng()).then(function (results) {
        var pageIds = results.query.geosearch.map(function (item) {
          return item.pageid;
        });
        return _this3.wikiApi.searchPageIds(pageIds);
      }).then(function (results) {
        var wm = $('#' + _this3.wikiDivId);
        wm.append('<h2>Nearby Wikis:</h2>\n                   <span><a href="https://www.wikimedia.org/"><small>Powered by Wikimedia</small></a><span>\n                   <ul></ul>');
        var ul = wm.find('ul');
        $.each(results.query.pages, function (key, value) {
          ul.append('<li>\n              <h3>' + value.title + '</h3>\n              <p>' + value.extract + '</p>\n            </li>');
        });
      }).catch(function (error) {
        $('#' + _this3.wikiDivId).text('Wikimedia errror (' + error + ')');
      });
    }
  }]);

  return LocationView;
}();

exports.default = LocationView;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(12);

var _MapsApi = __webpack_require__(0);

var _MapsApi2 = _interopRequireDefault(_MapsApi);

var _WikiApi = __webpack_require__(1);

var _WikiApi2 = _interopRequireDefault(_WikiApi);

var _Location = __webpack_require__(2);

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminView = function () {
  function AdminView(ko, config) {
    _classCallCheck(this, AdminView);

    this.ko = ko;
    this.config = config;
    this.mapsApi = new _MapsApi2.default(config);
    this.wikiApi = new _WikiApi2.default();
  }

  _createClass(AdminView, [{
    key: 'init',
    value: function init(addLocation, removeLocation) {
      var _this = this;

      this.contentDisplayed = this.ko.observable(false);
      //
      this.addressToGeocode = this.ko.observable('');
      this.placeIdToGeocode = this.ko.observable('');
      this.geocodeAddress = function () {
        if (_this.addressToGeocode()) {
          var label = _this.addressToGeocode();
          _this.mapsApi.geocodeAddress(_this.addressToGeocode()).then(function (results) {
            if (!results || !results[0]) {
              console.log('invalid response content');
              return;
            }
            console.log(results);
            var latLng = results[0].geometry.location;
            var latLngStr = JSON.stringify({
              lat: latLng.lat(),
              lng: latLng.lng()
            });
            _this.label(label);
            _this.latLng(latLngStr);
            _this.latLngToGeosearch(latLngStr);
          }).catch(function (errorMsg) {
            return console.log(errorMsg);
          });
          //
          _this.addressToGeocode('');
        }
      };
      this.geocodePlaceId = function () {
        if (_this.placeIdToGeocode()) {
          _this.mapsApi.geocodePlaceId(_this.placeIdToGeocode()).then(function (results) {
            return console.log(results);
          }).catch(function (errorMsg) {
            return console.log(errorMsg);
          });
          //
          _this.placeIdToGeocode('');
        }
      };
      //
      this.latLngToGeosearch = this.ko.observable('');
      this.goesearchLatlng = function () {
        if (_this.latLngToGeosearch()) {
          var location = JSON.parse(_this.latLngToGeosearch());
          _this.wikiApi.geosearchLocation(location.lat, location.lng).then(function (results) {
            console.log(results);
            console.log('pageId ' + results.query.geosearch[0].pageid);
            var pageIds = results.query.geosearch.map(function (item) {
              return item.pageid;
            });
            _this.pageIdsToQuery(JSON.stringify(pageIds));
          }).catch(function (err) {
            return console.log(err);
          });
          //
          _this.latLngToGeosearch('');
        }
      };
      this.pageIdsToQuery = this.ko.observable('');
      this.queryPageIds = function () {
        if (_this.pageIdsToQuery()) {
          var pageIds = JSON.parse(_this.pageIdsToQuery());
          _this.wikiApi.searchPageIds(pageIds).then(function (results) {
            console.log(results);
          }).catch(function (err) {
            return console.log(err);
          });
          //
          _this.pageIdsToQuery('');
        }
      };
      //
      this.label = this.ko.observable('');
      this.latLng = this.ko.observable('');
      this.addLocation = function () {
        if (_this.label() && _this.latLng()) {
          var latLng = JSON.parse(_this.latLng());
          addLocation(new _Location2.default(_this.label(), latLng.lat, latLng.lng));
          _this.label('');
          _this.latLng('');
        }
      };
      this.removeLocation = function () {
        if (_this.label()) {
          removeLocation(_this.label());
          _this.label('');
        }
      };
    }
  }]);

  return AdminView;
}();

exports.default = AdminView;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint config:
/* global window */

var _Location = __webpack_require__(2);

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model(config) {
    _classCallCheck(this, Model);

    this.config = config;
    this.onLocations = null;
  }

  _createClass(Model, [{
    key: 'init',
    value: function init(onLocations) {
      var _this = this;

      this.onLocations = onLocations;
      if (!localStorage[this.config.localStorageKey]) {
        this.initStorage();
      }
      //
      var locations = JSON.parse(localStorage[this.config.localStorageKey]);
      // simulate async storage api:
      new Promise(function (resolve) {
        window.setTimeout(function () {
          resolve(locations);
        }, _this.config.modelResolveDelayAsMillis);
      }).then(function (locations) {
        _this.onLocations(locations);
      });
    }
  }, {
    key: 'initStorage',
    value: function initStorage() {
      var locations = [new _Location2.default('Paris', 48.856614, 2.3522219000000177), new _Location2.default('Strasbourg', 48.5734053, 7.752111300000024), new _Location2.default('Marseille', 43.296482, 5.369779999999992), new _Location2.default('Lyon', 45.764043, 4.835658999999964), new _Location2.default('Bordeaux', 44.837789, -0.5791799999999512), new _Location2.default('Brest', 48.390394, -4.4860760000000255)];
      localStorage[this.config.localStorageKey] = JSON.stringify(locations);
    }
  }, {
    key: 'addLocation',
    value: function addLocation(location) {
      var locations = JSON.parse(localStorage[this.config.localStorageKey]);
      if (locations.filter(function (l) {
        return l.label == location.label;
      }).length) {
        console.log('addLocation label ' + location.label + ' already exists');
        return;
      }
      locations.push(location);
      localStorage[this.config.localStorageKey] = JSON.stringify(locations);
      this.onLocations(locations);
    }
  }, {
    key: 'removeLocation',
    value: function removeLocation(locationLabel) {
      var locations = JSON.parse(localStorage[this.config.localStorageKey]);
      locations = locations.filter(function (location) {
        return location.label != locationLabel;
      });
      localStorage[this.config.localStorageKey] = JSON.stringify(locations);
      this.onLocations(locations);
    }
  }]);

  return Model;
}();

exports.default = Model;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);