var express = require('express');
var router = express.Router();

var { generateToken, sendToken, verifyToken } = require('../utils/token.utils');

var auth = require('../config/auth');
var request = require('request');
var passport = require('passport');
require('../config/passport')();

var User = require('../models/user');

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


router.post('/test', function(req, res) {
	res.send({ express: 'Hello From Express' });
});

//get user by id page
router.get('/:id', function(req, res) {
	User.getUserById(req.params.id, function(err, user){
		if(err)
			throw err;
		res.send(user);
	})
});

/* should get all the events he is attending */
router.get('attendingEvents', function(req, res) {

});


/* should get all the events at the parks that he follows */
router.get('suggestedEvents', function(req, res) {

});

router.post('/addEvent', function(req, res) {
  User.addEvent(req.body.userId, req.body.eventId, function(err, response){
    if(err)
      throw err;
    console.log(response);
    var result = {
      ok: response.ok
    };
    res.send(result);
  })
});

router.post('/followPark', function(req, res) {
  User.followPark(req.body.userId, req.body.parkId, function(err, response){
    if(err)
      throw err;
    console.log(response);
    var result = {
      ok: response.ok
    };
    res.send(result);
  })
});

router.get('', function(req, res) {

});

function checkAuthentication(req,res,next){
 	var token = req.body.token || req.query.token || req.headers['x-access-token'];
 	// if no token return
	if (!token) {
		return res.status(403).send({
	    	success: false,
	    	message: 'No token provided.',
    	});
  	}

    var result = verifyToken(token);
    // if expired/failed
    if (!result.success)
    	return res.status(401).send(result);
    next();
}

module.exports = router;
