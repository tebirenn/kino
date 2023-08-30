const Films = require('./Films');


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


module.exports = { createFilm };