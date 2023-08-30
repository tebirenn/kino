const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    isAdmin: Boolean,
});


module.exports = mongoose.model('users', UsersSchema);