var express = require('express');
var router = express.Router();

var ParkQueue = require('../models/parkQueue');
var Park = require('../models/park');



router.post('/addPark', function(req, res) {
		console.log(req.body);

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


router.post('/test', function(req, res) {
	res.send({ express: 'Hello From Express' });
});

function checkAuthentication(req,res,next){
 	var token = req.body.token || req.query.token || req.headers['x-access-token'];
 	// if no token return 
	if (!token) {
		return res.status(400).send({ 
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
