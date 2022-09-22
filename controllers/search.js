'use strict';

const axios = require("axios");
const express = require('express');
const router = express.Router();
const db = require('../models');

// router.get('/search', (req, res) => {
//     db.restaurant.findOne({
//         where: {
//           name: req.params.name
//         }
//     })
//     .then((restaurant) => {
//         res.render('search')
//     })

// });

router.get('/', (req, res) => {
    res.render('search');
})

module.exports = router;

