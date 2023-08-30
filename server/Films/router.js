const express = require('express');
const router = express.Router();
const { createFilm } = require('./controller');
const { upload } = require('./multer');
const { isAuth } = require('../auth/middlewares');


router.post('/api/films/new', isAuth, upload.single('poster'), createFilm);


module.exports = router;