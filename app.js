const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const yargOptions = {
  a: {
    demand: true,
    describe: 'Address to get weather data for',
    string: true,
    alias: 'address'
  }
}

const argv = yargs.options(yargOptions).help().argv;

geocode.geocodeAddress(argv.address, (err, results) => {
  if (err) {
    console.log(err)
  } else {
    console.log(results.address);
    
    weather.getWeather(results.latitude, results.longitude, (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`It is currently ${results.temperature}. It feels like ${results.apparentTemperature}.`);
      }
    });
  }
});
