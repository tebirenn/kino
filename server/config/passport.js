const passport = require('passport');
const localStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const Users = require('../auth/Users');


passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    (email, password, done) => {
        Users.findOne({email: email})
        .then((user) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) { return done(err); }
                if (res) { return done(null, user); }
            })
        })
        .catch((err) => {
            return done(err);
        });
    }
));


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    Users.findById(userId)
    .then((user, err) => {
        done(err, user);
    })
});