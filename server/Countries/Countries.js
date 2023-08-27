const mongoose = require('mongoose');


const CountriesSchema = new mongoose.Schema({
    name: String,
    key: Number
});


module.exports = mongoose.model('countries', CountriesSchema);