'use strict';

const axios = require("axios");
const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

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

router.get('/:id/review/:reviewid/edit', isLoggedIn, async (req, res) => {
  db.Review.findOne( {where: { id: req.params.reviewid },
    include: [db.Restaurant]})
    .then(review => {
      const restaurant = review.Restaurant
      res.render('updateReview', {review, restaurant});
    })
    .catch(error => {
      console.log(error)
    })
})

router.post('/', isLoggedIn, async (req, res) => {
  console.log('-----------', req.body)
  const isOne = await db.Restaurant.findOne({
     where: {name: req.body.name, address: req.body.address } })
  if(isOne) {
    res.redirect(`already`)
  } else {
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
}})

router.get('/:id', isLoggedIn, (req, res) => {
    db.Restaurant.findOne({
        where: { id: req.params.id },
        include: [db.Review] 
      })
      .then((restaurant) => {
        if (!restaurant) throw Error()
        console.log(restaurant.imageURL)
        res.render('showRest', { restaurant: restaurant, root: req.get('host') })
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
  
router.delete('/:id/review/:reviewid', async (req, res) => {
  // get review and remove

  let reviewDeleted = await db.Review.destroy({
    where: { id: req.params.reviewid }
  });
  console.log('----DELETE ROUTE------');
  console.log('amount of songs deleted', reviewDeleted);
  // direct user back to page
  res.redirect(`/restaurants/${req.params.id}`);

});

router.put('/:id/review/:reviewid', (req, res) => {
  // get review and edit
  const updatedDate = new Date().toISOString();
  db.Review.update({
    UserId: req.user.id,
    name: req.body.name,
    cleanliness: req.body.cleanliness,
    features: req.body.features,
    imageURL: req.body.imageURL,
    comfort: parseInt(req.body.comfort),
    updatedAt: updatedDate
  },{
    where: { id: req.params.reviewid },
    include: [ db.Restaurant ]
  })
  .then((restaurant) => {
    if (!restaurant) throw Error()
    console.log(req.body)
    res.redirect(`/restaurants/${req.params.id}`);
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('404')
  })
});

module.exports = router;