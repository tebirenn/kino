const Rates = require('./Rates');


const saveRate = async(req, res) => {
    if (req.body.author && req.body.film && req.body.rate) {
        await new Rates({
            rate: req.body.rate,
            text: req.body.text,
            film: req.body.film,
            author: req.body.author,
        }).save();

        res.status(200).send(true);
    } else {
        res.redirect('/not-found');
    }
}


module.exports = { saveRate };