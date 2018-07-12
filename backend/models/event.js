const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EventSchema = new Schema({
	/*Fields:
		user_id 
		title
		park_id
		date & time (how do we handle overlapping events? cant create events at the same time?)
		Description
		Sport
		Array of attending users
		Max users
		

		*/
  	/* add fields if neccessary */
});


var Event = module.exports = mongoose.model('events', EventSchema);

module.exports.addEvent = function(event, callback) {
	event.save(callback);
}
