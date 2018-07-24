var express = require('express');
var router = express.Router();

var Event = require('../models/event');

var { verifyToken } = require('../utils/token.utils');


router.post('/addEvent',function(req, res) {

  var name = req.body.name;
  var park_id = req.body.park_id;
  var start = req.body.start;
  var end = req.body.end;
  var sport = req.body.sport;
  var description = req.body.description;
  var max_people = req.body.max_people;
  var attending = [];
  var host_id = req.body.host;

  var newEvent = new Event({
    name: name,
    park_id: park_id,
    start: start,
    end: end,
    sport: sport,
    description: description,
    max_people: max_people,
    attending: attending,
    host_id: host_id
  });

  Event.addEvent(newEvent, function(err, newEvent){
    if(err) throw err;
    console.log('event has been added to database', newEvent);
    result = {
      status: "success",
      newEvent: newEvent
    };
    res.json(result);
  });

});

router.get('/', function(req, res) {
	Event.find({})
	.exec(function(err, events){
		if(err){
			console.log("Error retrieving events");
		} else {
			res.json(events);
		}
	});
});


//get event by id page
router.get('/getEventById', function(req, res) {
	Event.getEventById(req.query.eventId, function(err, event){
		if(err)
			throw err;
		res.json(event);
	})
});

router.get('/getUsersAttendingEvent', function(req, res) {
  Event.getEventById(req.query.eventId, function(err, event){
		if(err)
			throw err;
		res.json(event.attending);
	})
});

router.get('/getMultipleEventsById', function(req, res) {
	Event.getMultipleEventsByIds(req.query.eventIds, function(err, events){
		if(err)
			throw err;
		res.json(events);
	})
});


/* given a user Id, he can join the event
   if he is already attending, he shlouldnt be able to join*/
router.post('/joinEvent', function(req, res) {
  Event.joinEvent(req.query.eventId, req.query.userId, function(err, response){
    if(err)
      throw err;
    //console.log(response);
    var result = {
      ok: response.ok
    };
    res.json(result);
  })
});


/* gets all the events at park
   given a park id
 */
router.get('/getEventsAtPark', function(req, res) {
  res.json("not implemented yet");
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
