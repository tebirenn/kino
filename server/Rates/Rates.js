const mongoose = require('mongoose');


const RatesSchema = new mongoose.Schema({
    rate: Number,
    text: String,
    film: { type: mongoose.Schema.Types.ObjectId, ref: 'films' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: { type: 'date', default: Date.now() },
});


module.exports = mongoose.model('rates', RatesSchema);