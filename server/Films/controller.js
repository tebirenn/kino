const Films = require('./Films');
const fs = require('fs');
const path = require('path');
const Users = require('../auth/Users');


const createFilm = async(req, res) => {
    if (req.file && req.body.titleRu.length > 0 &&
        req.body.titleOrig.length > 0 &&
        req.body.country.length > 0 &&
        req.body.genre.length > 0 &&
        req.body.year.length > 0 &&
        req.body.time.length > 0) {

        await new Films({
            titleRu: req.body.titleRu,
            titleOrig: req.body.titleOrig,
            year: req.body.year,
            time: req.body.time,
            country: req.body.country,
            genre: req.body.genre,
            author: req.user._id,
            poster: `/images/films/${req.file.filename}`,
        }).save();

        res.redirect(`/admin/${req.user._id}`);
    } else {
        res.redirect('/new?error=1');
    }
}

const editFilm = async(req, res) => {
    if (req.file && req.body.titleRu.length > 0 &&
        req.body.titleOrig.length > 0 &&
        req.body.country.length > 0 &&
        req.body.genre.length > 0 &&
        req.body.year.length > 0 &&
        req.body.time.length > 0) {

        const film = await Films.findById(req.body.id);
        fs.unlinkSync(path.join(__dirname + '/../../public' + film.poster));

        await Films.findByIdAndUpdate(req.body.id, {
            titleRu: req.body.titleRu,
            titleOrig: req.body.titleOrig,
            year: req.body.year,
            time: req.body.time,
            country: req.body.country,
            genre: req.body.genre,
            author: req.user._id,
            poster: `/images/films/${req.file.filename}`,
        });

        res.redirect(`/admin/${req.user._id}`);

    } else {
        res.redirect(`/edit/${req.body.id}?error=1`);
    }
}

const deleteFilm = async(req, res) => {
    try {
        const film = await Films.findById(req.params.id);
        fs.unlinkSync(path.join(__dirname + '/../../public' + film.poster));

        await Films.deleteOne({_id: req.params.id});

        res.status(200).send('film deleted');
    } catch (e) {
        res.status(404).send('film not found');
    }
}

const saveToWatch = async(req, res) => {
    if (req.body.id) {
        const user = await Users.findById(req.user._id);
        let findFilm = user.toWatch.filter((item) => item._id == req.body.id);
        if (findFilm.length == 0) {
            user.toWatch.push(req.body.id);
            user.save();
            res.send('ok');
        } else {
            res.send('error');
        }
    }
}

const unsaveToWatch = async(req, res) => {
    if (req.params.id) {
        const user = await Users.findById(req.user._id);
        for (let i = 0; i < user.toWatch.length; i++) {
            if (user.toWatch[i] == req.params.id) {
                user.toWatch.splice(i, 1);
                user.save();
                console.log('deleted');
                break;
            }
        }
        res.send('ok');
    }
}


module.exports = { 
    createFilm, 
    editFilm, 
    deleteFilm, 
    saveToWatch, 
    unsaveToWatch 
};