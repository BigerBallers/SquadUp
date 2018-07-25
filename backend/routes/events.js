var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var { verifyToken } = require('../utils/token.utils');

/* gets all event objects on backend page */
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

/* add event page for backend */
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

/* backend page for getting an event by it's id, params are query's eventId */
router.get('/getEventById', function(req, res) {
	Event.getEventById(req.query.eventId, function(err, event){
		if(err)
			throw err;
		res.json(event);
	})
});

/* backend page for getting multiple events by ids, query's eventIds */
router.get('/getMultipleEventsById', function(req, res) {
  console.log('event ids: ', req.query.eventIds);
	Event.getMultipleEventsByIds(req.query.eventIds, function(err, events){
		if(err)
			throw err;
		res.json(events);
	})
});

/* backend page shows userIds for attending the event */
router.get('/getUsersAttendingEvent', function(req, res) {
  Event.getEventById(req.query.eventId, function(err, event){
		if(err)
			throw err;
		res.json(event.attending);
	})
});

/* given a user Id, updates attending field*/
router.post('/joinEvent', function(req, res) {
  Event.joinEvent(req.body.eventId, req.body.userId, function(err, response){
    if(err)
      throw err;
    //console.log(response);
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
