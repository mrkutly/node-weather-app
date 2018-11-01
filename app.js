const request = require('request');
const url = `https://api.darksky.net/forecast/${process.env.SECRET}/40.6932099,-73.9953689`
const requestObj = { url, json: true };

const requestCB = (err, resp, body) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(JSON.stringify(body, undefined, 2));
}

request(requestObj, requestCB);
