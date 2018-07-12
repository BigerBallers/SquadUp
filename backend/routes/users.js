var express = require('express');
var router = express.Router();

var { generateToken, sendToken } = require('../utils/token.utils');

var auth = require('../config/auth');
var request = require('request');
var passport = require('passport');
require('../config/passport')();

var googleToken = passport.authenticate('google-token', {session: false});


router.post('/auth/google', googleToken, function(req, res, next) {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
    id: req.user.id
  };
  console.log('req.user: ', req.user);
  next();
}, generateToken, sendToken);


module.exports = router;