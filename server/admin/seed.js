const Users = require('../auth/Users');
const bcrypt = require('bcrypt');


const createAdmin = async() => {
    let findAdmin = await Users.find({isAdmin: true}).count();

    if (!findAdmin) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('qwerty', salt, (err, hash) => {
                new Users({
                    email: 'admin@gmail.com',
                    full_name: 'Admin Alan',
                    password: hash,
                    isAdmin: true,
                }).save();
    
            }); 
        });
    }
}


module.exports = createAdmin;