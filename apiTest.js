require('dotenv').config()
const axios = require('axios');
// async function testApi() 
// const fetchRestConfig = {
//       method: 'GET',
//       url: 'https://yellow-page-us.p.rapidapi.com/',
//       params: { ypkeyword: 'Los Angelese Restaurant', yplocation: 'California', yppage: '1' },
//       headers: {
//         'X-RapidAPI-Key': process.env.APIKEY,
//         'X-RapidAPI-Host': process.env.RAPIDHOST
//       }
//     }

// const restaurantResponse = await axios.request(fetchRestConfig);
// console.log(request);

// const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://yellow-page-us.p.rapidapi.com/',
  params: {ypkeyword: 'dentist', yplocation: '20832', yppage: '1'},
  headers: {
    'X-RapidAPI-Key': process.env.APIKEY,
    'X-RapidAPI-Host': process.env.RAPIDHOST
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

// const restaurants = restaurantResponse.data.business_listings;
//       // check if we got any airline details back, this will be an array of response objects
//       if (Array.isArray(restaurants) &&
//         restaurants.length) {
//         // iterate thorugh our responses and for each response, check that the request was successful and that there is data to add to db
//         restaurants.forEach(restaurant => {
//           // looking for image path below
//           // let imgurl = '';
//           // if(restaurant.img_paths) {
//           //   imgurl = restaurant.img_paths[0].full_image_path
//           // } else {
//           //   imgurl = ''
//           // }
//         });
// }}

// testApi()