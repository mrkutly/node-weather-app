const request = require('request');
const key = process.env.KEY;

const geocodeAddress = (address, callback) => {
  const encoded = encodeURIComponent(address);
  const locationUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encoded}`;
  const locationObj = { url: locationUrl, json: true };

  request(locationObj, (err, resp, body) => {
    if (!body.results || err) {
      callback(`Error: unable to connect to mapquest servers`);
    } else if (!body.results[0].locations[0]) {
      callback(`Error: unable to find address`);
    } else if (!body.results[0].locations[0].latLng) {
      callback(`Error: unable to find latitude and longitude`);
    } else {
      const { locations } = body.results[0];
      const { street, latLng } = locations[0];

       callback(undefined, {
        address: (street !== "" ? street : "not found"),
        latitude: latLng.lat,
        longitude: latLng.lng,
      })
    }

  });
}

module.exports = { geocodeAddress };
