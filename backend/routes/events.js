var express = require('express');
var router = express.Router();

var Event = require('../models/event');

router.post('/addEvent',function(req, res) {

  var name = req.body.name;
  var park_id = 'test';
  var start = req.body.start;
  var end = req.body.end;
  var sport = req.body.sport;
  var description = req.body.description;
  var max_people = req.body.max_people;
  var attending = [1234];

  var newEvent = new Event({
    name: name,
    park_id: park_id,
    start: start,
    end: end,
    sport: sport,
    description: description,
    max_people: max_people,
    attending: attending
  });

  Event.addEvent(newEvent, function(err, newEvent){
    if(err) throw err;
    console.log('event has been added', newEvent);
  });

  var result = {
    message : 'event has been added to db'
  };

  res.send(result);
});

//get event page
router.get('/', function(req, res) {
	console.log('Get request for events');
	Event.find({})
	.exec(function(err, Event){
		if(err){
			console.log("Error retrieving events");
		} else {
			res.json(Event);
		}
	});
});

module.exports = router;
