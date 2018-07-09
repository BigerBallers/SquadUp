var express = require('express');
var router = express.Router();

var Park = require('../models/park');


// Get Homepage
router.post('/addPark', function(req, res) {
	console.log('req.body: ', req.body);

	// validate the params. should be checked on the front end
	// then add to park

	res.send('Added Park');
});

module.exports = router;
