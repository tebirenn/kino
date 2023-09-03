const express = require('express');
const router = express.Router();
const { createFilm, editFilm, deleteFilm, saveToWatch, unsaveToWatch } = require('./controller');
const { upload } = require('./multer');
const { isAdmin, isAuth } = require('../auth/middlewares');


router.post('/api/films/new', isAdmin, upload.single('poster'), createFilm);
router.post('/api/films/edit', isAdmin, upload.single('poster'), editFilm);
router.delete('/api/films/delete/:id', isAdmin, deleteFilm);
router.post('/api/films/save', isAuth, saveToWatch);
router.delete('/api/films/save/:id', isAuth, unsaveToWatch);


module.exports = router;