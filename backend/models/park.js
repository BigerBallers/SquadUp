
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
/* feilds:
		name: string
		address: string
		description: string
		sports: [string]
		rating: [int] (1-5)
		geo: {
			lat:
			lng:
		}


*/

});



// create separate colections
const ParkQueue = mongoose.model('parkqueue', UserSchema); 
const Park = mongoose.model('park', UserSchema);

module.exports = {
	parkQueue : ParkQueue,
	park : park
};