const express = require('express');
const app = express();
const axios = require("axios");
// dot env goes here
require('dotenv').config();

const encodedParams = new URLSearchParams();
encodedParams.append("language", "en_US");
encodedParams.append("limit", "30");
encodedParams.append("location_id", "297704");
encodedParams.append("currency", "USD");

const options = {
  method: 'POST',
  url: 'https://worldwide-restaurants.p.rapidapi.com/search',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': process.env.apiKEY,
    'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
  },
  data: encodedParams
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

app.listen(8000);