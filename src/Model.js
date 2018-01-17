// eslint config:
/* global window */

import Location from './Location';

class Model {
  constructor(config) {
    this.config = config;
    this.onLocations = null;
  }
  init(onLocations) {
    this.onLocations = onLocations;
    if (!localStorage[this.config.localStorageKey]) {
      this.initStorage();
    }
    //
    const locations = JSON.parse(localStorage[this.config.localStorageKey]);
    // simulate async storage api:
    new Promise(resolve => {
      window.setTimeout(() => {
        resolve(locations);
      }, this.config.modelResolveDelayAsMillis);
    }).then(locations => {
      this.onLocations(locations);
    });
  }
  initStorage() {
    const locations = [
      new Location('Paris', 48.856614, 2.3522219000000177),
      new Location('Strasbourg', 48.5734053, 7.752111300000024),
      new Location('Marseille', 43.296482, 5.369779999999992),
      new Location('Lyon', 45.764043, 4.835658999999964),
      new Location('Bordeaux', 44.837789, -0.5791799999999512),
      new Location('Brest', 48.390394, -4.4860760000000255),
    ];
    localStorage[this.config.localStorageKey] = JSON.stringify(locations);
  }
  addLocation(location) {
    let locations = JSON.parse(localStorage[this.config.localStorageKey]);
    if (locations.filter(l => l.label == location.label).length) {
      console.log(`addLocation label ${location.label} already exists`);
      return;
    }
    locations.push(location);
    localStorage[this.config.localStorageKey] = JSON.stringify(locations);
    this.onLocations(locations);
  }
  removeLocation(locationLabel) {
    let locations = JSON.parse(localStorage[this.config.localStorageKey]);
    locations = locations.filter(location => location.label != locationLabel);
    localStorage[this.config.localStorageKey] = JSON.stringify(locations);
    this.onLocations(locations);
  }

}

export default Model;

