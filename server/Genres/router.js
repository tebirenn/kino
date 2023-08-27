const express = require('express');
const router = express.Router();
const Genres = require('./Genres');
const { getAllGenres } = require('./controller');
const writeAllGenres = require('./seed');


writeAllGenres();

router.get('/api/genres', getAllGenres);


module.exports = router;