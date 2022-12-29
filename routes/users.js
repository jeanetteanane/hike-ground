const express = require('express');
const router = express.Router();
const asyncCatch = require('../utilities/asyncCatch');
const passport = require('passport');
const users = require('../controllers/users');
const {checkingReturnTo} = require('../middleware')

router.route('/register')
    .get(users.registrationForm)
    .post(asyncCatch(users.register));

router.route('/login')
    .get(users.loginForm)
    .post(checkingReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login);

router.get('/logout', users.logout);

module.exports = router;