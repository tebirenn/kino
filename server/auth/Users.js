const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    isAdmin: Boolean,
    toWatch: [{type: mongoose.Schema.Types.ObjectId, ref: 'films'}],
    watched: [{type: mongoose.Schema.Types.ObjectId, ref: 'films'}],
});


module.exports = mongoose.model('users', UsersSchema);