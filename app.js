const request = require('request');
const yargs = require('yargs');

const yargOptions = {
  a: {
    demand: true,
    describe: 'Address to get weather data for',
    string: true,
    alias: 'address'
  }
}

const argv = yargs.options(yargOptions).help().argv;
const address = encodeURIComponent(argv.address);

const key = process.env.KEY;
const locationUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}`

// const secret = process.env.SECRET;
//
// const url = `https://api.darksky.net/forecast/${process.env.SECRET}/40.6932099,-73.9953689`
// const requestObj = { url, json: true };
//
const locationObj = { url: locationUrl, json: true };
//
const requestCB = (err, resp, body) => {
  if (!body.results || err) {
    console.log(`error: unable to connect to mapquest servers`);
  } else if (!body.results[0].locations[0].latLng) {
    console.log(`unable to find latitude and longitude`);
  } else {
    const { locations } = body.results[0];
    const { street, latLng } = locations[0];

    console.log(JSON.stringify(`Address: ${street !== "" ? street : "not found"}`, undefined, 2));
    console.log(JSON.stringify(`Latitude: ${latLng.lat}`, undefined, 2));
    console.log(JSON.stringify(`Longitude: ${latLng.lng}`, undefined, 2));
  }

}

request(locationObj, requestCB);
