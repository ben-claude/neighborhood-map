import '../styles/ListView.css';

class ListView {
  constructor(ko) {
    this.ko = ko;
  }
  init(onFilteredLocations, onLocationClick) {
    this.locations = this.ko.observableArray([]);
    this.locationFilter = this.ko.observable('');
    this.onLocationClick = onLocationClick;
    this.filteredLocations = this.ko.computed(() => {
      if(!this.locationFilter()) {
        return this.locations();
      } else {
        try
        {
          const regexp = new RegExp(this.locationFilter());
          return this.ko.utils.arrayFilter(this.locations(), location => {
            return location.label.search(regexp) >= 0;
          });
        }
        catch(err) {
          return this.locations();
        }
      }
    });
    this.filteredLocations.subscribe(onFilteredLocations);
  }
  render(locations) {
    const sortedLocations = locations.sort((l1, l2) => l1.label.localeCompare(l2.label));
    this.locations(sortedLocations);
    this.locations.valueHasMutated(); // needed to re-render the ListView
  }
}

export default ListView;

