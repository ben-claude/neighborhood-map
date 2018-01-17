// eslint config:
/* global $ */

import ListView from './ListView';
import MapView from './MapView';
import AdminView from './AdminView';

class ViewModel {
  constructor(ko, config, model, googleMapsPromise) {
    this.config = config;
    this.model = model;
    this.listView = new ListView(ko);
    this.adminView = new AdminView(ko, config);
    //
    this.shouldShowMenu = ko.observable($('.menu-btn').is(':visible') ? false : true);
    this.onMenuClick = () => {
      this.shouldShowMenu(!this.shouldShowMenu());
    };
    //
    this.model.init(locations => {
      this.listView.render(locations);
    });
    this.listView.init(filteredLocations => {
      if (this.mapView)
        this.mapView.render(filteredLocations);
    }, clickedLocation => {
      if (this.mapView)
        this.mapView.onLocationClick(clickedLocation);
    });
    this.adminView.init(location => {
      this.model.addLocation(location);
    }, locationLabel => {
      this.model.removeLocation(locationLabel);
    });
    googleMapsPromise
      .then(() => {
        this.mapView = new MapView(ko, config);
        this.mapView.init();
        /*
        dynamically add the binding: data-bind="with: mapView"
        on html element: <main class="mapview">:
        */
        ko.applyBindings(this.mapView, $('.mapview')[0]);
        this.mapView.render(this.listView.filteredLocations());
      })
      .catch(() => {
        window.alert('Google Maps API load failure');
      });
  }
}

export default ViewModel;

