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
	attending: [{
		type: String
	}]
});


var Event = module.exports = mongoose.model('events', EventSchema);

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
module.exports.getEventsAtPark = function (parkId, callback) {

}


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
