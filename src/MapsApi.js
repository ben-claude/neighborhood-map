// eslint config:
/* global google */

class MapsApi {
  constructor() {
    this.geocoder = null;
  }
  getGeocoder() {
    if (!this.geocoder)
      this.geocoder = new google.maps.Geocoder();
    return this.geocoder;
  }
  geocode(queryKey, queryValue) {
    return new Promise((resolve, reject) => {
      this.getGeocoder().geocode( { [queryKey]: queryValue }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(`status ${status}`);
        }
      });
    });
  }
  geocodeAddress(address) {
    return this.geocode('address', address);
  }
  geocodePlaceId(placeId) {
    return this.geocode('placeId', placeId);
  }

}

export default MapsApi;

