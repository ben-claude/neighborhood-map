// eslint config:
/* global $ */

import ViewModel from './ViewModel';
import Model from './Model';
import '../styles/common.css';

const config = {
  googleMapsApiKey: 'AIzaSyCZkjL847cY6nQvRo2zhSdVYlMnC59JijA',
  modelResolveDelayAsMillis: 1000,
  localStorageKey: 'neighborhood-map',
  mapCenter: {  lat: 48.856614, lng: 2.3522219000000177 }, // Paris
  mapZoom: 11,
  
};

// add the 'initialize()' function below to the global scope, then use it as async callback for google maps api
window.initialize = function initialize() {
  window.ko.applyBindings(new ViewModel(window.ko, config, new Model(config)));
};

// to be sure that the DOM is ready (needed to knockout.js to be used in initialize())
$(() => {
  // dynamically inserted scripts execute asynchronously by default, keep the attribute to see it in the html
  const apiUrl = 'https://maps.googleapis.com/maps/api/js';
  const scriptTag = `<script async src="${apiUrl}?key=${config.googleMapsApiKey}&v=3&callback=${window.initialize.name}"></script>`;
  $('body').append(scriptTag);
});

