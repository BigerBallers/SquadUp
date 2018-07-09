var express = require('express');
var router = express.Router();

var ParkQueue = require('../models/parkQueue');
var Park = require('../models/park');


// Get Homepage
router.post('/addPark', function(req, res) {


	var name = req.body.name;
	var address = req.body.address;
	var description = req.body.description;
	var sports = ['soccer', 'basketball', 'tenis'];
	var rating = [];
	var geo = [0, 0];

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

	var park;

  ParkQueue.addParkToQueue(newPark, function(err, newPark){
   	if (err) throw err;
   		console.log('park has been inserted', newPark);
   		park = newPark;
  });

  var result = {
  	'park' : park
  };

	res.send(result);
});

module.exports = router;
