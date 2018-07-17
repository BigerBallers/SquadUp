var express = require('express');
var router = express.Router();

var ParkQueue = require('../models/parkQueue');
var Park = require('../models/park');


// Get Homepage
router.post('/addPark', function(req, res) {
		console.log("body: ", req.body);

	var name = req.body.name;
	var address = req.body.address;
	var description = req.body.description;
	var sports = req.body.sports;
	var rating = [];
	var geo = req.body.geo;

	// validate the params. should be checked on the front end
	// backend validation stuff

	// if no error create new park

	var newPark = new ParkQueue({
		name: name,
		address: address,
		description: description,
		sports: sports,
		rating: rating,
		geo: geo
	});


  ParkQueue.addParkToQueue(newPark, function(err, newPark){
   	if (err) throw err;
   	console.log('park has been inserted', newPark);
  });

  var result = {
  	message : 'park has been added to queue'
  };

	res.send(result);
});


//get park page
router.get('/', function(req, res) {
	console.log('Get request for all parks');
	ParkQueue.find({})
	.exec(function(err, ParkQueue){
		if(err){
			console.log("Error retrieving parks");
		} else {
			res.json(ParkQueue);
		}
	});
});


module.exports = router;
