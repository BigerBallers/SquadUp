
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


var ParkQueue = module.exports = mongoose.model('parkqueues', ParkSchema);

module.exports.addParkToQueue = function(newPark, callback) {
   newPark.save(callback);
}



module.exports.getParkById = function(parkId, callback) {

}

// needs to be tested
module.exports.getParkInRadius = function( coord, radiusMiles, callback) {
	var mileToKilometer = 1.60934; // conversion from miles to km
	var kilometerToMeter = 1000;
	var maxDist = mileToKilometer * radiusMiles; 

	// we need to convert the distance to radians
	maxDist *= kilometerToMeter; 
	var query = ParkQueue.find( {
		geo: {
			$nearSphere: {
      	$geometry: {
          type: "Point",
          coordinates: coords
        },
        $maxDistance: maxDist // in meters
			}
		}
	});

	query.exec(callback);
}
