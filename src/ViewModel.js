// eslint config:
/* global $ */

import ListView from './ListView';
import MapView from './MapView';
import AdminView from './AdminView';

class ViewModel {
  constructor(ko, config, model) {
    this.config = config;
    this.model = model;
    this.listView = new ListView(ko);
    this.mapView = new MapView(ko, config);
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
      this.mapView.render(filteredLocations);
    }, clickedLocation => {
      this.mapView.onLocationClick(clickedLocation);
    });
    this.mapView.init();
    this.adminView.init(location => {
      this.model.addLocation(location);
    }, locationLabel => {
      this.model.removeLocation(locationLabel);
    });
  }
}

export default ViewModel;

