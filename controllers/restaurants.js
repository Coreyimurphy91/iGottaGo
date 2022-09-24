'use strict';

const axios = require("axios");
const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn')

router.get('/', isLoggedIn, (req, res) => {
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

router.post('/', isLoggedIn, async (req, res) => {
  console.log('-----------', req.body)
  const createdDate = new Date().toDateString();
  const newRestaurant = await db.Restaurant.create({
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    type: req.body.type,
    address: req.body.address,
    hours: req.body.hours,
    imageURL: req.body.imageURL,
    updatedAt: createdDate,
    createdAt: createdDate
  });
  console.log(newRestaurant.toJSON());
  res.redirect(`/restaurants/${newRestaurant.id}`);
  // const createdDate = new Date().toDateString();
  // db.restaurant.create({
  //   name: req.body.name,
  //   longitude: req.body.longitude, //can i omit these two?
  //   latitude: req.body.latitude,
    // type: req.body.type,
    // address: req.body.address,
    // hours: req.body.hours,
    // imageURL: req.body.imageURL,
    // updatedAt: createdDate,
    // createdAt: createdDate
  // })
  // .then((post) => {
  //   res.redirect('/restaurants')
  // })
  // .catch((error) => {
  //   res.status(400).render('main/404')
  // })
})

router.get('/:id', isLoggedIn, (req, res) => {
    db.Restaurant.findOne({
        where: { id: req.params.id },
        include: [db.Review] 
      })
      .then((restaurant) => {
        if (!restaurant) throw Error()
        console.log(restaurant.imageURL)
        res.render('showRest', { restaurant: restaurant })
      })
      .catch((error) => {
        console.log(error)
        res.status(400).render('404')
      })
});

router.post('/:id/review', isLoggedIn, (req, res) => {
    const createdDate = new Date().toISOString();
    db.Restaurant.findOne({
      where: { id: req.params.id }
    })
    .then((restaurant) => {
      if (!restaurant) throw Error()
      console.log(req.body)
      db.Review.create({
        RestaurantId: parseInt(req.params.id),
        UserId: req.user.id,
        name: req.body.name,
        cleanliness: req.body.cleanliness,
        features: req.body.features,
        imageURL: req.body.imageURL,
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