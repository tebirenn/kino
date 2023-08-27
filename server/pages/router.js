const express = require('express');
const router = express.Router();

const Genres = require('../Genres/Genres');

router.get('/', async(req, res) => {
    const genres = await Genres.find();

    const data = {
        genres: genres,
        user: req.user ? req.user : {}
    }

    res.render('index', data);
});

router.get('/login', (req, res) => {
    const data = {
        user: req.user ? req.user : {}
    }

    res.render('login', data);
});

router.get('/register', (req, res) => {
    const data = {
        user: req.user ? req.user : {}
    }

    res.render('register', data);
});

router.get('/profile', (req, res) => {
    const data = {
        user: req.user ? req.user : {}
    }

    if (!data.user) {
        res.redirect('/login');
    }

    res.render('profile', data);
});

router.get('/admin', (req, res) => {
    const data = {
        user: req.user ? req.user : {}
    }

    res.render('adminProfile', data);
});

router.get('/new', async(req, res) => {
    const genres = await Genres.find();

    const data = {
        genres: genres,
        user: req.user ? req.user : {}
    } 

    res.render('newFilm', data);
});

router.get('/edit', async(req, res) => {
    const genres = await Genres.find();

    const data = {
        genres: genres,
        user: req.user ? req.user : {}
    }

    res.render('editFilm', data);
});


module.exports = router;