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
	}
});


var Event = module.exports = mongoose.model('events', EventSchema);

/* also make it so that the user who created it is automatically insterted
		added to the envent list
	*/
module.exports.addEvent = function(event, callback) {
	event.save(callback);
}

/* get events user is attending
	 eventIds is an array of ids
 */
module.exports.getUserAttendingEvents = function(eventIds, callback) {

}



/* get all events at a park under a category
   should return all events at a park with a category being a ristriction
   if category is empty, return all events
   Note: Probably wont need this function
 */

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

module.exports.joinEvent = function (eventId, userId, callback) {
	Event.update(
		{_id: eventId },
		{ $push: {attending : userId }},
		callback
	);
}

//input for now is a string of the following format:
// "event_id","event_id", "event_id"
module.exports.getMultipleEventsByIds = function(eventIds, callback) {
	console.log('getting multiple events by ids');
	var ids = eventIds.split(",");
	for(i =0; i< ids.length; i++ ){
		ids[i] = ids[i].replace(/^"(.*)"$/, '$1');
		console.log("i is" , i,"id is", ids[i]);
	}
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
