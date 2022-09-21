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

router.get('/:id', (req, res) => {
    db.Restaurant.findOne({
        where: { id: req.params.id },
        // include: [db.name, db.review] 
      })
      .then((restaurant) => {
        if (!restaurant) throw Error()
        console.log(restaurant.name)
        res.render('showRest', { restaurant: restaurant })
      })
      .catch((error) => {
        console.log(error)
        res.status(400).render('404')
      })
})

module.exports = router;