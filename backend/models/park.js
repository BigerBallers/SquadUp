
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
	sports: {
		type : Array,
		"default" : []
	},
	rating: {
		type : Array,
		"default" : []
	},
	geo: {
		type: [Number],
		index: '2dsphere',
		required: true

	}
  /* add fields if neccessary */
  /**/
});

// create separate colections
var Park = module.exports = mongoose.model('parks', ParkSchema);


module.exports.addPark = function(park, callback) {

}


module.exports.getParkById = function(parkId, callback) {

}


module.exports.getParkInRadius = function( coord, callback) {

}


module.exports.getUserFollowedParks = function(parkIds, callback) {

}
