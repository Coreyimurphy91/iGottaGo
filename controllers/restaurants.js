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

router.post('/', (req, res) => {
  const createdDate = new Date().toDateString();
  db.restaurant.create({
    name: req.body.name,
    longitude: req.body.longitude, //can i omit these two?
    latitude: req.body.latitude,
    type: req.body.type,
    address: req.body.address,
    hours: req.body.hours,
    updatedAt: createdDate,
    createdAt: createdDate
  })
  .then((post) => {
    res.redirect('/restaurants')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

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
});

router.post('/:id/review', (req, res) => {
    const createdDate = new Date().toISOString();
    db.Restaurant.findOne({
      where: { id: req.params.id }
    })
    .then((restaurant) => {
      if (!restaurant) throw Error()
      console.log(req.body)
      db.Review.create({
        restaurantId: parseInt(req.params.id),
        name: req.body.name,
        cleanlieness: req.body.cleanlieness,
        features: req.body.features,
        comfort: parseInt(req.body.comfort),
        createdAt: createdDate,
        updatedAt: createdDate
      }).then(review => {
        res.redirect(`/restaurants/${req.params.id}`);
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('404')
    })
  })

module.exports = router;