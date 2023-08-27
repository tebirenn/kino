const express = require('express');
const passport = require('passport');
const router = express.Router();
const Users = require('./Users');
const { signUp, signIn, signOut } = require('./controller');


router.post('/api/signup', signUp);
router.post('/api/signin', passport.authenticate('local', {failureRedirect: '/api/login?error=1'}), signIn);
router.get('/api/signout', signOut);


module.exports = router;