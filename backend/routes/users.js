var express = require('express');
var router = express.Router();

var { generateToken, sendToken, verifyToken} = require('../utils/token.utils');

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
  console.log('user: ', req.user);
  next();
}, generateToken, sendToken);


router.post('/test', googleToken, function(req, res, next) {
  console.log('inside post test!');
	res.send('nothing');
  next();
});

router.get('/test', checkAuthentication, function(req, res) {
	res.send({ express: 'Hello From Express' });
});

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google-token'), (req, res) => {
  console.log("authenticated!");
    res.send(req.user);
});

function checkAuthentication(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('token: ', token);
  if (token) {
    verifyToken;
    next();
  } 
  else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
  /*
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        console.log('is authenticated!');
        next();
    } else{
        console.log('is not authenticated');
        console.log('req', req);
        console.log('headders', req.headers);
        console.log('cookies: ', req.cookies);
        console.log('pquery: ', req.query);
    }
    */
}

module.exports = router;
