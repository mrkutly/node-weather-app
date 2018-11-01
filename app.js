const request = require('request');
const yargs = require('yargs');

const key = process.env.KEY;
const secret = process.env.SECRET;

const location = "109 Joralemon St Brooklyn";
const locationUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`

const url = `https://api.darksky.net/forecast/${process.env.SECRET}/40.6932099,-73.9953689`
const requestObj = { url, json: true };

const locationObj = { url: locationUrl, json: true };

const requestCB = (err, resp, body) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(JSON.stringify(body, undefined, 2));
}

request(locationObj, requestCB);
