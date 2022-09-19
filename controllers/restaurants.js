'use strict';

const axios = require("axios");
const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Restaurant.findAll()
    .then(restaurants => {
        res.render('restaurants', { restaurants })
    })
    .catch(error => {
        console.log('**************Error');
        console.log(error);
        req.flash('error', 'Failed to find restaurants.');
        res.redirect('/');
    })
});

module.exports = router;