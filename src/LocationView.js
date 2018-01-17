// eslint config:
/* global google, window, $ */

import '../styles/LocationView.css';
import WikiApi from './WikiApi';

class LocationView {
  constructor({ label, lat, lng }) {
    this.label = label;
    this.lat = lat;
    this.lng = lng;
    this.marker = null;
    this.infowindow = null;
    this.timeoutId = 0;
    this.panorama = null;
    this.wikiApi = new WikiApi();
    this.streetViewDivId = 'street-view'; // same as in styles/LocationView.css
    this.wikiDivId = 'wikimedia'; // same as in styles/LocationView.css
  }
  openInfowindow(view) {
    const infowindow = new google.maps.InfoWindow();
    infowindow.addListener('closeclick', () => {
      this.closeInfowindow(view);
    });
    infowindow.setContent(
      `<div id="info-window">
         <h1>${this.label}</h1>
         <div id="${this.streetViewDivId}"></div>
         <div id="${this.wikiDivId}"></div>
       </div>`
    );
    view.currentLocation = this;
    // open infowindow before calling third-party apis (this <div> are needed for success/error handling)
    infowindow.open(view.map, this.marker);
    //
    this.openStreetView();
    this.openNearbyPlaces();
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
  }
  openStreetView() {
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
        // IMPORTANT width/height of the panorama <div> are set through a CSS rule
        this.panorama = new google.maps.StreetViewPanorama($(`#${this.streetViewDivId}`)[0], panoramaOptions);
      }
      else {
        $(`#${this.streetViewDivId}`).text(`StreetView error (status ${status})`);
      }
    };
    streetViewService.getPanoramaByLocation(this.marker.position, radius, getStreetView);
  }
  openNearbyPlaces() {
    this.wikiApi.geosearchLocation(this.marker.position.lat(), this.marker.position.lng())
      .then(results => {
        const pageIds = results.query.geosearch.map(item => item.pageid);
        return this.wikiApi.searchPageIds(pageIds);
      })
      .then(results => {
        const wm = $(`#${this.wikiDivId}`);
        wm.append(`<h2>Nearby Wikis:</h2>
                   <span><a href="https://www.wikimedia.org/"><small>Powered by Wikimedia</small></a><span>
                   <ul></ul>`);
        const ul = wm.find('ul');
        $.each(results.query.pages, (key, value) => {
          ul.append(
            `<li>
              <h3>${value.title}</h3>
              <p>${value.extract}</p>
            </li>`);
        });
      })
      .catch(error => {
        $(`#${this.wikiDivId}`).text(`Wikimedia errror (${error})`);
      });
  }

}

export default LocationView;

