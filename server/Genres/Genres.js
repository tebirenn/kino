const mongoose = require('mongoose');


const GenresSchema = new mongoose.Schema({
    name: String,
    key: Number
});


module.exports = mongoose.model('genres', GenresSchema);