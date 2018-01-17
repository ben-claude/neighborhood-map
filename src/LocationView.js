// eslint config:
/* global google, window, $ */

import '../styles/LocationView.css';
import WikiApi from './WikiApi';

class LocationView {
  constructor(ko, { label, lat, lng }) {
    this.ko = ko;
    this.label = label;
    this.lat = lat;
    this.lng = lng;
    this.marker = null;
    this.infowindow = null;
    this.timeoutId = 0;
    this.panorama = null;
    this.wikiApi = new WikiApi();
    this.isInfoWindowLoaded = false;
    this.streetViewContent = null;
    this.wikimediaContent = null;
    this.domReady = null;
  }
  openInfowindow(view) {
    this.streetViewContent = this.ko.observable('');
    this.wikimediaContent = this.ko.observable('');
    const infowindow = new google.maps.InfoWindow();
    infowindow.addListener('closeclick', () => {
      this.closeInfowindow(view);
    });
    // implement knockout data-binding on infowindow (from https://jsfiddle.net/SittingFox/nr8tr5oo/)
    infowindow.setContent(`<div class="locationview" data-bind="template: { name: 'locationview-template' }">
                           </div>`);
    const domReady = new Promise((resolve) => {
      // when the info window opens, bind it to knockout. only do this once
      google.maps.event.addListener(infowindow, 'domready', () => {
        if (!this.isInfoWindowLoaded) {
          this.ko.applyBindings(this, $('.locationview')[0]);
          this.isInfoWindowLoaded = true;
          resolve();
        }
      });
    });
    this.openStreetView(domReady);
    this.openNearbyPlaces(domReady);
    view.currentLocation = this;
    infowindow.open(view.map, this.marker);
    //
    this.infowindow = infowindow;
    this.marker.setAnimation(google.maps.Animation.BOUNCE);
    this.timeoutId = window.setTimeout(() => this.marker.setAnimation(null), 750);
  }
  closeInfowindow(view) {
    this.panorama = null;
    view.currentLocation = null;
    window.clearTimeout(this.timeoutId);
    this.timeoutId = 0;
    this.marker.setAnimation(null);
    this.infowindow.close();
    this.infowindow = null;
    this.isInfoWindowLoaded = false;
    this.streetViewContent = null;
    this.wikimediaContent = null;
    view.map.fitBounds(view.bounds);
  }
  openStreetView(domReady) {
    const streetViewService = new google.maps.StreetViewService();
    const radius = 50;
    const getStreetView = (data, status) => {
      if (status == google.maps.StreetViewStatus.OK) {
        const nearStreetViewLocation = data.location.latLng;
        const heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, this.marker.position);
        const panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading,
            pitch: 0,
          }
        };
        domReady.then(() => {
          if (this.isInfoWindowLoaded) {
            // width/height of the panorama <div> are set through a CSS rule
            this.panorama = new google.maps.StreetViewPanorama($('#street-view')[0], panoramaOptions);
          }
        });
      }
      else {
        domReady.then(() => {
          if (this.isInfoWindowLoaded) {
            this.streetViewContent(`StreetView error (status ${status})`);
          }
        });
      }
    };
    streetViewService.getPanoramaByLocation(this.marker.position, radius, getStreetView);
  }
  openNearbyPlaces(domReady) {
    this.wikiApi.geosearchLocation(this.marker.position.lat(), this.marker.position.lng())
      .then(results => {
        const pageIds = results.query.geosearch.map(item => item.pageid);
        return this.wikiApi.searchPageIds(pageIds);
      })
      .then(results => {
        let content = `<h2>Nearby Wikis:</h2>
                         <span><a href="https://www.wikimedia.org/"><small>Powered by Wikimedia</small></a><span>
                         <ul>`;
        $.each(results.query.pages, (key, value) => {
          content +=
            `<li>
               <h3>${value.title}</h3>
               <p>${value.extract}</p>
             </li>`;
        });
        content += '</ul>';
        domReady.then(() => {
          if (this.isInfoWindowLoaded) {
            this.wikimediaContent(content);
          }
        });
      })
      .catch(error => {
        domReady.then(() => {
          if (this.isInfoWindowLoaded) {
            this.wikimediaContent(`Wikimedia errror (${error})`);
          }
        });
      });
  }

}

export default LocationView;

