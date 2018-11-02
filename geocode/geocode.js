const request = require('request');
const key = process.env.KEY;

const geocodeAddress = (address) => {
  const encoded = encodeURIComponent(address);
  const locationUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encoded}`;
  const locationObj = { url: locationUrl, json: true };

  request(locationObj, (err, resp, body) => {
    if (!body.results || err) {
      console.log(`Error: unable to connect to mapquest servers`);
    } else if (!body.results[0].locations[0].latLng) {
      console.log(`Error: unable to find latitude and longitude`);
    } else {
      const { locations } = body.results[0];
      const { street, latLng } = locations[0];

      console.log(JSON.stringify(`Address: ${street !== "" ? street : "not found"}`, undefined, 2));
      console.log(JSON.stringify(`Latitude: ${latLng.lat}`, undefined, 2));
      console.log(JSON.stringify(`Longitude: ${latLng.lng}`, undefined, 2));
    }

  });
}

module.exports = {
  geocodeAddress
}
