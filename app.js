const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');

const yargOptions = {
  a: {
    demand: true,
    describe: 'Address to get weather data for',
    string: true,
    alias: 'address'
  }
}

const argv = yargs.options(yargOptions).help().argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  errorMessage ? console.log(errorMessage) : console.log(JSON.stringify(results, undefined, 2));
});



// const secret = process.env.SECRET;
//
// const url = `https://api.darksky.net/forecast/${process.env.SECRET}/40.6932099,-73.9953689`
// const requestObj = { url, json: true };
//
