const express = require('express');
const router = express.Router();
const Countries = require('./Countries');
const { getAllCountries } = require('./controller');
const writeAllCountries = require('./seed');


writeAllCountries();

router.get('/api/countries', getAllCountries);


module.exports = router;