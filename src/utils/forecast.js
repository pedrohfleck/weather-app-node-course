const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/31ef609ebe1d5e764d4eaaf80da3b0fe/" +
    long +
    "," +
    lat +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        forecast:
          body.currently.summary +
          ". " +
          body.daily[0].temperatureHigh +
          "-" +
          body.daily[0].temperatureHigh +
          ". It is " +
          body.currently.temperature +
          " degress celcius outside. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      });
    }
  });
};

module.exports = forecast;
