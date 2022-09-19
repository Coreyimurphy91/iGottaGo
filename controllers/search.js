'use strict';

const axios = require("axios");
const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/search', (req, res) => {
    res.render('search')
});

module.exports = router;

