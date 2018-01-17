import '../styles/AdminView.css';
import MapsApi from './MapsApi';
import WikiApi from './WikiApi';
import Location from './Location';

class AdminView {
  constructor(ko, config) {
    this.ko = ko;
    this.config = config;
    this.mapsApi = new MapsApi(config);
    this.wikiApi = new WikiApi();
  }
  init(addLocation, removeLocation) {
    this.contentDisplayed = this.ko.observable(false);
    //
    this.addressToGeocode = this.ko.observable('');
    this.placeIdToGeocode = this.ko.observable('');
    this.geocodeAddress = () => {
      if (this.addressToGeocode()) {
        const label = this.addressToGeocode();
        this.mapsApi.geocodeAddress(this.addressToGeocode())
          .then(results => {
            if (!results || !results[0]) {
              console.log('invalid response content');
              return;
            }
            console.log(results);
            const latLng = results[0].geometry.location;
            const latLngStr = JSON.stringify({
              lat: latLng.lat(),
              lng: latLng.lng(),
            });
            this.label(label);
            this.latLng(latLngStr);
            this.latLngToGeosearch(latLngStr);
          })
          .catch(errorMsg => console.log(errorMsg));
        //
        this.addressToGeocode('');
      }
    };
    this.geocodePlaceId = () => {
      if (this.placeIdToGeocode()) {
        this.mapsApi.geocodePlaceId(this.placeIdToGeocode())
          .then(results => console.log(results))
          .catch(errorMsg => console.log(errorMsg));
        //
        this.placeIdToGeocode('');
      }
    };
    //
    this.latLngToGeosearch = this.ko.observable('');
    this.goesearchLatlng = () => {
      if (this.latLngToGeosearch()) {
        const location = JSON.parse(this.latLngToGeosearch());
        this.wikiApi.geosearchLocation(location.lat, location.lng)
          .then(results => {
            console.log(results);
            console.log(`pageId ${results.query.geosearch[0].pageid}`);
            const pageIds = results.query.geosearch.map(item => item.pageid);
            this.pageIdsToQuery(JSON.stringify(pageIds));
          })
          .catch(err => console.log(err));
        //
        this.latLngToGeosearch('');
      }
    };
    this.pageIdsToQuery = this.ko.observable('');
    this.queryPageIds = () => {
      if (this.pageIdsToQuery()) {
        const pageIds = JSON.parse(this.pageIdsToQuery());
        this.wikiApi.searchPageIds(pageIds)
          .then(results => {
            console.log(results);
          })
          .catch(err => console.log(err));
        //
        this.pageIdsToQuery('');
      }
    };
    //
    this.label = this.ko.observable('');
    this.latLng = this.ko.observable('');
    this.addLocation = () => {
      if (this.label() && this.latLng()) {
        const latLng = JSON.parse(this.latLng());
        addLocation(new Location(this.label(), latLng.lat, latLng.lng));
        this.label('');
        this.latLng('');
      }
    };
    this.removeLocation = () => {
      if (this.label()) {
        removeLocation(this.label());
        this.label('');
      }
    };
  }

}

export default AdminView;

