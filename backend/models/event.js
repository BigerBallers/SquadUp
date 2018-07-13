const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required:true
	},
	start: {
		type: number,
		required: true
	},
	end: {
		type: number,
		required: true
	},
	sport: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});


var Event = module.exports = mongoose.model('events', EventSchema);

module.exports.addEvent = function(event, callback) {
	event.save(callback);
}
