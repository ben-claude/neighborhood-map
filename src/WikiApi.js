// eslint config:
/* global $ */

class WikiApi {
  constructor() {
    this.url = 'http://en.wikipedia.org/w/api.php';
  }
  geosearchLocation(lat, lng) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.url,
        data: { format: 'json', action: 'query', list: 'geosearch', 'gsradius': 10000, gscoord: `${lat}|${lng}` },
        dataType: 'jsonp',
      })
        .done((results, textStatus, request) => {
          if (request.status == 200) {
            resolve(results);
          }
          else {
            reject(`status ${request.status}`);
          }
        })
        .fail(request => reject(`status ${request.status}`));
    });
  }
  searchPageIds(pageIds) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.url,
        data: { format: 'json', action: 'query', prop: 'extracts', 'exintro': '', pageids: pageIds.join('|') },
        dataType: 'jsonp',
      })
        .done((results, textStatus, request) => {
          if (request.status == 200) {
            resolve(results);
          }
          else {
            reject(`status ${request.status}`);
          }
        })
        .fail(request => reject(`status ${request.status}`));
    });
  }

}

export default WikiApi;

