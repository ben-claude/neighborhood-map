// eslint config:
/* global google, $, window */

import '../styles/MapView.css';
import MapsApi from './MapsApi';
import LocationView from './LocationView';

class MapView {
  constructor(ko, config) {
    this.ko = ko;
    this.mapsApi = new MapsApi(config);
    this.config = config;
    this.locations = new Map();
    this.map = null;
    this.bounds = null;
    this.currentLocation = null;
  }
  init() {
  }
  render(locations) {
    this.map = new google.maps.Map($('#map')[0], {
      center: this.config.mapCenter,
      zoom: this.config.mapZoom,
    });
    this.bounds = new google.maps.LatLngBounds();
    this.locations.clear();
    for (const location of locations) {
      this.locations.set(location.label, new LocationView(location));
    }
    const locationValues = Array.from(this.locations.values());
    locationValues.forEach(location => {
      const marker = new google.maps.Marker({
        map: this.map,
        position: {
          lat: location.lat,
          lng: location.lng,
        },
      });
      location.marker = marker;
      this.bounds.extend(marker.position);
      location.marker.addListener('click', () => {
        if (this.closeCurrentLocation(location))
          return;
        location.openInfowindow(this);
      });
    });
    this.map.fitBounds(this.bounds);
  }
  onLocationClick({ label }) {
    const location = this.locations.get(label);
    if (this.closeCurrentLocation(location))
      return;
    if (location.marker) {
      location.openInfowindow(this);
    }
  }
  closeCurrentLocation(location) {
    let same = location === this.currentLocation;
    if (this.currentLocation) {
      this.currentLocation.closeInfowindow(this);
    }
    return same;
  }

}

export default MapView;

