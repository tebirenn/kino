const mongoose = require('mongoose');


const FilmsSchema = mongoose.Schema({
    titleRu: String,
    titleOrig: String,
    year: Number,
    time: Number,
    poster: String,
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'countries' },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'genres' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});


module.exports = mongoose.model('films', FilmsSchema);