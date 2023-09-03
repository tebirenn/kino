const express = require('express');
const router = express.Router();

const Genres = require('../Genres/Genres');
const Users = require('../auth/Users');
const Countries = require('../Countries/Countries');
const Films = require('../Films/Films');

router.get('/', async(req, res) => {
    const genres = await Genres.find();
    const films = await Films.find().populate('genre').populate('country').populate('author');

    const data = {
        genres: genres,
        films: films,
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

router.get('/profile/:id', async(req, res) => {
    try {
        const user = await Users.findById(req.params.id).populate('toWatch')
        .populate({path: 'toWatch', populate: {path: 'country'}})
        .populate({path: 'toWatch', populate: {path: 'genre'}});

        const data = {
            user: user,
            loginUser: req.user ? req.user : {}
        }
        
        res.render('profile', data);
    } catch (e) {
        res.redirect('/not-found');
    }

});

router.get('/admin/:id', async(req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        const films = await Films.find().populate('country').populate('genre').populate('author');

        const data = {
            user: user,
            loginUser: req.user ? req.user : {},
            films: films,
        }
        
        res.render('adminProfile', data);
    } catch (e) {
        res.redirect('/not-found');
    }
});

router.get('/new', async(req, res) => {
    const genres = await Genres.find();
    const countries = await Countries.find();

    const data = {
        genres: genres,
        countries: countries,
        user: req.user ? req.user : {}
    } 

    res.render('newFilm', data);
});

router.get('/edit/:id', async(req, res) => {
    const genres = await Genres.find();
    const countries = await Countries.find();
    const film = await Films.findById(req.params.id);

    const data = {
        genres: genres,
        countries: countries,
        film: film,
        user: req.user ? req.user : {}
    }

    res.render('editFilm', data);
});

router.get('/not-found', (req, res) => {
    res.render('notFound');
});

router.get('/details/:id', async(req, res) => {
    data = {
        user: req.user ? req.user : {}
    }

    res.render('filmDetails', data);
});


module.exports = router;