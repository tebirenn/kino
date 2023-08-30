const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongooseStore = require('connect-mongo');

require('./server/config/db');
require('./server/config/passport');


const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(session({
    name: 'kinopoisk.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 12,
    store: mongooseStore.create({mongoUrl: 'mongodb://127.0.0.1:27017'})
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./server/pages/router'));
app.use(require('./server/Genres/router'));
app.use(require('./server/Countries/router'));
app.use(require('./server/auth/router'));
app.use(require('./server/Films/router'));


const PORT = 8005;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});