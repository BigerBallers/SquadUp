
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ParkSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true, 
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	sports: [{
		type: String
	}],
	rating: [{
		userID: Number,
    	stars: { type: Number, minimum: 1, maximum: 5 , exclusiveMaximum: false },
	}],
	geo: {
		type: [Number],
		index: '2dsphere',
		required: true

	}
  /* add fields if neccessary */
});



// create separate colections
var ParkQueue = module.exports = mongoose.model('parkqueue', ParkSchema); 
var Park = module.exports = mongoose.model('park', ParkSchema);



module.exports.getParkByAddress = function(address, callback) {

}

// tyler: todo
module.exports.addParkToQueue = function(newPark, callback) {
	console.log('addpark: ', newPark);

	// need to add the park to the db and check for errors
	// look at mongoose documents for example on inserting and error handeling

}

module.exports.getParkById = function(id, callback) {
	
}