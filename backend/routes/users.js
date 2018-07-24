var express = require('express');
var router = express.Router();
var { generateToken, sendToken, verifyToken } = require('../utils/token.utils');
var auth = require('../config/auth');
var request = require('request');
var passport = require('passport');
require('../config/passport')();
var User = require('../models/user');
var googleToken = passport.authenticate('google-token', {session: false});

/* backend page to get all users */
router.get('/', function(req, res) {
	User.find({})
	.exec(function(err, user){
		if(err){
			console.log("Error retrieving users");
		} else {
			res.json(user);
		}
	});
});

/* create account or login in if account is found*/
router.post('/auth/google', googleToken, function(req, res, next) {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
    id: req.user.id
  };
  next();
}, generateToken, sendToken);

/* backend page for getting a user object by id */
router.get('/getUserById', function(req, res) {
  console.log("searching for user id: ", req.query.userId)
	User.getUserById(req.query.userId, function(err, user){
		if(err)
			throw err;
		res.json(user);
	})
});

/* backend page for getting list of user Objects by array of ids*/
router.get('/getMultipleUsersById', function(req, res) {
	User.getMultipleUsersByIds(req.query.userIds, function(err, users){
		if(err)
			throw err;
		res.json(users);
	})
});

/* backend page gets all the events user is attending */
router.get('/getEventsId', function(req, res) {
  User.getUserById(req.query.userId, function(err, user){
		if(err)
			throw err;
		res.json(user.events);
	})
});

/* gets all park ids the user is following */
router.get('/getFollowedParksId', function (req, res) {
  User.getUserById(req.query.userId, function(err, user){
		if(err)
			throw err;
		res.json(user.followedParks);
	})
});

/* backend page udates user's event field by eventId*/
router.post('/addEventById', function(req, res) {
  User.addEvent(req.body.userId, req.body.eventId, function(err, response){
    if(err)
      throw err;
    console.log(response);
    var result = {
      ok: response.ok
    };
    res.json(result);
  })
});

/* backend page adds park id to user field: followed parks  */
router.post('/followParkById', function(req, res) {
  User.followPark(req.query.userId, req.query.parkId, function(err, response){
    if(err)
      throw err;
    console.log(response);
    var result = {
      ok: response.ok
    };
    res.json(result);
  })
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
