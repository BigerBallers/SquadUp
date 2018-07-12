
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
var Park = module.exports = mongoose.model('parks', ParkSchema);

module.exports.getParkByAddress = function(address, callback) {

}


module.exports.getParkById = function(id, callback) {

}
