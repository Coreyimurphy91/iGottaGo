'use strict';

require('dotenv').config();

const axios = require('axios');
const APIKEY = process.env.APIKEY;
const HOST = process.env.RAPIDHOST;

module.exports = {
  async up(queryInterface, Sequelize) {
    const seedDate = new Date().toISOString();

    // http axios config for first request to fetch all available airlines
    const fetchRestConfig = {
      method: 'GET',
      url: 'https://yellow-page-us.p.rapidapi.com/',
      params: { ypkeyword: 'Los Angelese Restaurant', yplocation: 'California', yppage: '1' },
      headers: {
        'X-RapidAPI-Key': APIKEY,
        'X-RapidAPI-Host': HOST
      }
    }

    // array to hold our airline json models to be upload to psotgres with queryGenerator(queryInterface)
    const restaurantsToUpload = [];

    // our response for fetching all available airlines
    const restaurantResponse = await axios.request(fetchRestConfig);

    // if we succeeded in fetching all of our airlines, we will continue to fetch each individual airline's details
    if (restaurantResponse.status === 200 &&
      restaurantResponse?.data) {

      const restaurants = restaurantResponse.data.business_listings;
      // check if we got any airline details back, this will be an array of response objects
      if (Array.isArray(restaurants) &&
        restaurants.length) {
        // iterate thorugh our responses and for each response, check that the request was successful and that there is data to add to db
        restaurants.forEach(restaurant => {
          let imgurl = '';
          if(restaurant.img_paths) {
            imgurl = restaurant.img_paths[0].full_image_path
          } else {
            imgurl = ''
          }
          // adding a json object for each row to be added to our airlines table
          restaurantsToUpload.push({
            name: restaurant.name,
            longitude: restaurant.longitude,
            latitude: restaurant.latitude,
            type: restaurant.heading_text,
            address: `${restaurant.address}, ${restaurant.city}, ${restaurant.state} ${restaurant.zip}`,
            hours: restaurant.description?.op_hours,
            imageURL: imgurl,
            createdAt: seedDate,
            updatedAt: seedDate
          })

        });
        // pushing our models to the db
        // using queryInterface to bulk add all of our airlines
        await queryInterface.bulkInsert('Restaurants', restaurantsToUpload, {})
      } else {
        console.log('FAILED to fetch individual restaurant data');
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null, {truncate: true, cascade: true});
  }
};
