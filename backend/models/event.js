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
