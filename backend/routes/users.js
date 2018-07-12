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


router.get('userData:id', function(req, res, next){
	console.log('query: ', req.query);
	console.log('id: ', id);

	res.send("userData");
});



router.post('/login', googleToken, function(req, res, next) {
  if (!req.user) {
  	console.log('not authenticated');
    return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
    id: req.user.id
  };
  console.log('req.user: ', req.user);
  next();
});


router.post('/test', function(req, res) {
	res.send('nothing');
});

router.get('/test', checkAuthentication, function(req, res) {
	res.send({ express: 'Hello From Express' });
});


function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        console.log('is authenticated!');
        next();
    } else{
        console.log('is not authenticated');
    }
}

module.exports = router;