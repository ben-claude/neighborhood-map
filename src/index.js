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

// to be sure that the DOM is ready (needed for knockout.js views)
$(() => {
  window.ko.applyBindings(new ViewModel(window.ko, config, new Model(config), window.googleMapsPromise));
});
