const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	park_id: {
		type: String,
		required:true
	},
	start: {
		type: String,
		required: true
	},
	end: {
		type: String,
		required: true
	},
	sport: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	max_people: {
		type: Number,
		required: true
	},
	attending: {
		type: Array,
		"default" : []
	},
	host_id: {
		type: String,
		required: true
	}
});


var Event = module.exports = mongoose.model('events', EventSchema);

/* adds event to database */
module.exports.addEvent = function(event, callback) {
	event.save(callback);
}

/* returns either event object or error */
module.exports.getEventById = function(id, callback) {
  console.log('searching db for event');
	Event.findById(id)
	.exec(function(err, event){
		if(err){
			console.log("Error retrieving event");
			callback(err, null);
		} else {
			console.log(event);
			callback(null, event);
		}
	})
}

/* returns list of event objects given array of event id's */
module.exports.getMultipleEventsByIds = function(eventIds, callback) {
	console.log('getting multiple events by ids');
	eventIds = eventIds.replace(/\s+/g, ''); //clears whitespace
	var ids = eventIds.split(",");					//clears commas

	for(i =0; i< ids.length; i++ ){					// for each element in array
		ids[i] = ids[i].replace(/^"(.*)"$/, '$1'); //remove quotes from id
		console.log("i is" , i,"id is", ids[i]);   //see index
		if( ids[i] == ""){ // if empty element removes it
			delete ids[i];
			ids.length--;    //shrinks array
		} //end if
	} //end for

	Event.find({ "_id": { "$in": ids } })
	.exec(function(err, events){
		if(err){
			console.log("Error retrieving list of events");
			callback(err, null);
		} else {
			console.log("events are ", events);
			callback(null, events);
		}
	})
}

/* adds user id to attending field */
module.exports.joinEvent = function (eventId, userId, callback) {
	Event.update(
		{_id: eventId },
		{ $push: {attending : userId }},
		callback
	);
}
