var express = require('express');
var router = express.Router();

var Park = require('../models/park');


// Get Homepage
router.post('/addPark', function(req, res) {
	console.log('req.body: ', req.body);


	var name = req.body.name;
	var address = req.body.address;
	var description = req.body.description;
	var sports = ['soccer', 'basketball', 'tenis'];
	var rating = [];
	var geo = [111, 130];

	// validate the params. should be checked on the front end
	// backend validation stuff

	// if no error create new park

	var newPark = new Park({
		name: name,
		address: address,
		description: description,
		sports: sports,
		rating: rating,
		geo: geo
	});

	var park;

  Park.addParkToQueue(newPark, function(err, newPark){
   	if (err) throw err;
   		console.log(park);
   		park = newPark;
  });

  var result = {
  	'park' : park
  };

	res.send(result);
});

module.exports = router;
