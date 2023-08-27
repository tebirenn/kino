const Genres = require('./Genres');


const getAllGenres = async(req, res) => {
    const data = await Genres.find();
    // console.log(data);
    res.send({data});
}


module.exports = { getAllGenres };