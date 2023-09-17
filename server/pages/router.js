const express = require('express');
const router = express.Router();

const Genres = require('../Genres/Genres');
const Users = require('../auth/Users');
const Countries = require('../Countries/Countries');
const Films = require('../Films/Films');
const Rates = require('../Rates/Rates');


const sumRates = (rates) => {
    let res = 0;
    for (let rate of rates) {
        res += rate.rate;
    }
    return res;
}


router.get('/', async(req, res) => {
    const options = {};
    if (req.query.genre) {
        const selectedGenre = await Genres.findOne({key: req.query.genre});
        options.genre = selectedGenre._id;
        res.locals.genre = req.query.genre;
    }
    if (req.query.search && req.query.search.length > 0) {
        options.$or = [
            { titleRu: new RegExp(req.query.search, 'i') },   // the     The
            { titleOrig: new RegExp(req.query.search, 'i') },   // i - ignorecase
        ];
        res.locals.search = req.query.search;
    }

    let limit = 3;
    let page = req.query.page ? req.query.page : 1;

    const genres = await Genres.find();
    const films = await Films.find(options).limit(limit).skip((page-1)*limit)
                        .populate('genre').populate('country');
    const totalFilmsLength = await Films.count(options);

    const data = {
        genres: genres,
        films: films,
        user: req.user ? req.user : {},
        pages: Math.ceil(totalFilmsLength / limit),    //  5 / 3 = 1.6      1.6 -> 2    [3 2]
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
    try {
        const film = await Films.findById(req.params.id)
                                .populate('country').populate('genre');
        const rates = await Rates.find({film: film._id}).populate('author');
        let avgRate = 2 * sumRates(rates) / rates.length;


        data = {
            user: req.user ? req.user : {},
            film: film,
            rates: rates,
            avgRate: avgRate.toFixed(1),
        }
    
        res.render('filmDetails', data);
    } catch (e) {
        res.redirect('/not-found');
    }
    
});


module.exports = router;