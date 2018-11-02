const request = require('request');

const getWeather = (lat, long, callback) => {
  const secret = process.env.SECRET;
  const url = `https://api.darksky.net/forecast/${secret}/${lat},${long}`;
  const requestObj = { url, json: true };

  request(requestObj, (err, resp, body) => {
    if (!err && resp.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback(`Unable to fetch weather`);
    }
  })
}

module.exports = { getWeather };
