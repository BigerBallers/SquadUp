var express = require('express');
var router = express.Router();

var Event = require('../routes/event');

router.post('/addEvent',function(req, res) {

  var name = req.body.name;
  var address = req.body.address;
  var start = req.body.address;
  var end = req.body.address;
  var sport = ['soccer','basketball','tennis'];
  var description = req.body.description;

  var newEvent = new Event({
    name: name,
    address: address,
    start: start,
    end: end,
    sport: sport,
    description: description
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

module.exports = router;
