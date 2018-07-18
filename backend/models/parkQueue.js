
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


var ParkQueue = module.exports = mongoose.model('parkqueues', ParkSchema);


/* might want to check if the park alread exists in our Park collection.
	 If not, add it to the queue
 */
module.exports.addParkToQueue = function(newPark, callback) {
   newPark.save(callback);
}


module.exports.getParkById = function(id, callback) {
	console.log('searching by ID');
	ParkQueue.findById(id)
	.exec(function(err, parkQueue){
		if(err){
			console.log("Error retrieving park");
			callback(err, null);
		} else {
			console.log(parkQueue);
			callback(null, parkQueue);
		}
	})
}


module.exports.getParkInRadius = function(coord, radiusMiles, callback) {
	// converting miles to meters
	var mileToKilometer = 1.60934;
	var kilometerToMeter = 1000;
	var maxDist = mileToKilometer * radiusMiles;
	maxDist *= kilometerToMeter;

	var query = ParkQueue.find( {
		geo: {
			$nearSphere: {
      	$geometry: {
          type: "Point",
          coordinates: coord
        },
        $maxDistance: maxDist // in meters
			}
		}
	});

	query.exec(callback);
}


module.exports.getUserFollowedParks = function(parkIds, callback) {

}


module.exports.getParkByCategory = function(category, callback) {
	console.log('getting parks by category', category);
	ParkQueue.find({ sports: category })
	.exec(function(err, parkData){
		if(err){
			console.log("error retrieving park");
			callback(err, null);
		} else {
			console.log(parkData);
			callback(null, parkData);
		}
	})
}

// write a module to check if the park exists
