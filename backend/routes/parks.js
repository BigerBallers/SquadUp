var express = require('express');
var router = express.Router();

var ParkQueue = require('../models/parkQueue');
var Park = require('../models/park');

var { verifyToken } = require('../utils/token.utils');



router.post('/addPark', function(req, res) {
		console.log(req.body);

	var name = req.body.name;
	var address = req.body.address;
	var description = req.body.description;
	var sports = req.body.sports;
	var rating = [];
	var geo = req.body.geo;

	// validate the params. should be checked on the front end
	// backend validation stuff

	var newPark = new ParkQueue({
		name: name,
		address: address,
		description: description,
		sports: sports,
		rating: rating,
		geo: geo
	});


  ParkQueue.addParkToQueue(newPark, function(err, msg, park){
		if (err) throw err;
		var result = {
		msg : msg,
		park: park
	};
		res.json(result);
	});
});


//get park by id page
router.get('/getParkById', function(req, res) {
	ParkQueue.getParkById(req.query.parkId, function(err, park){
		if(err)
			throw err;
		res.json(park);
	})
});

//get park by id page
router.get('/getParkEvents', function(req, res) {
	ParkQueue.getParkById(req.query.parkId, function(err, park){
		if(err)
			throw err;
		res.json(park.event_id);
	})
});


//get parks in a given radius
router.get('/getParksInRadius', function(req, res) {

	var lng = Number(req.query.lng);
	var lat = Number(req.query.lat);
	var radius = Number(req.query.radius);

	var coord = [lng, lat];
	var radius = radius;

	ParkQueue.getParkInRadius(coord, radius, function(err, parks){
		if(err)
			throw err;
		res.json(parks);
	})
});


router.get('/getMultipleParksbyId', function(req, res) {
	ParkQueue.getMultipleParksbyId(req.query.parkIds, function(err, parks){
		if(err)
			throw err;
		res.json(parks);
	})
});

router.get('/getParkByCategory', function(req, res) {
	ParkQueue.getParkByCategory(req.query.category, function(err, parkData){
		if(err)
			throw err;
		res.send(parkData);
	})
});

router.get('/test', function( req, res) {
	res.json("test get route and variables");
});


/*needs to be implemented and tested*/
router.get('/ratePark', function(req, res) {
	res.json('not yet implemented');
	/* create a json:
		rating : {  currRating: Number,
								UserRate: [{user, score}]
							}
	*/
});


// dont need then function
//get park page
router.get('/', function(req, res) {
	ParkQueue.find({})
	.exec(function(err, ParkQueue){
		if(err){
			console.log("Error retrieving parks");
		} else {
			res.json(ParkQueue);
		}
	});
});

router.post('/addEventPark', function(req, res) {
  ParkQueue.addEventPark(req.body.parkId, req.body.eventId, function(err, response){
    if(err)
      throw err;
    console.log('event added to park');
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
		return res.status(400).json({
	    	success: false,
	    	message: 'No token provided.',
    	});
  	}

    var result = verifyToken(token);
    // if expired/failed
    if (!result.success)
    	return res.status(401).json(result);
    next();
}

module.exports = router;
