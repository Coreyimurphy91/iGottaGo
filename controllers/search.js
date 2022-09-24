'use strict';

const axios = require('axios');
const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig')
const db = require('../models');

router.get('/', (req, res) => {
    res.render('search');
})

router.get('/results', async (req, res) => {
    //get back search item
    console.log('search data -->', req.query)
    //use axios to find results
    const options = {
        method: 'GET',
        url: 'https://yellow-page-us.p.rapidapi.com/',
        params: { ypkeyword: req.query.ypkeyword, yplocation: req.query.yplocation, yppage: 1 },
        headers: {
          'X-RapidAPI-Key': process.env.APIKEY,
          'X-RapidAPI-Host': process.env.RAPIDHOST
        }
      };
      await axios.request(options).then(function (response) {
        console.log(response.data);
        //render results page
        res.render('results', { restaurant: response.data.business_listings })
    }).catch(function (error) {
        console.log(error);
        
    });
})

module.exports = router;

