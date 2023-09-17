const passport = require('passport');
const localStrategy = require('passport-local');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
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


passport.use(new GoogleStrategy(
    {
        clientID:     '237289685380-1cc03s4u3u0km2oo6635ge3dfht1c66t.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL:  'http://localhost:8005/api/auth/google',
        passReqToCallback   : true,
        scope: ['openid', 'email', 'profile'],
    },
    async(request, accessToken, refreshToken, profile, done) => {
        const user = await Users.findOne({ googleId: profile.id });

        if (user) {
            return done(null, user);
        }

        const newUser = await new Users({
            googleId: profile.id,
            full_name: profile.displayName,
            email: profile.emails[0].value,
        }).save();

        return done(null, newUser);
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