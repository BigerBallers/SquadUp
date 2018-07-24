
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
	event_id: [{
		type: String
	}],
	geo: {
		type: [Number],
		index: '2dsphere',
		required: true

	}
  /* add fields if neccessary */
});


var ParkQueue = module.exports = mongoose.model('parkqueues', ParkSchema);


/* might want to check if the park alread exists in our Park collection.
	 If not, add it to the queue
 */
module.exports.addParkToQueue = function(newPark, callback) {
	ParkQueue.findOne({
		address : newPark.address
	},
	function(err, park) {
		if (err)
			throw err;

		if (!park) {
			var msg = "new park added";
			newPark.save();
			callback(null, msg, newPark);
		}
		else if (err) {
			throw err;
		}
		else {
			var msg = "park already exists";
			callback(null, msg, park);
		}
	});
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

//input for now is a string of the following format:
// "park_id","park_id", "park_id"
module.exports.getMultipleParksbyId = function(parkIds, callback) {
	console.log('getting multiple parks by ids');
	parkIds = parkIds.replace(/\s+/g, ''); //clear whitespace
	var ids = parkIds.split(",");
	for(i =0; i< ids.length; i++ ){
		ids[i] = ids[i].replace(/^"(.*)"$/, '$1');
		console.log("i is" , i,"id is", ids[i]);
		if( ids[i] == ""){ //removes empty elements
			delete ids[i];
			ids.length--;
		}
	}
	ParkQueue.find({ "_id": { "$in": ids } })
	.exec(function(err, parks){
		if(err){
			console.log("Error retrieving list of parks");
			callback(err, null);
		} else {
			console.log("events are ", parks);
			callback(null, parks);
		}
	})
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

module.exports.addEventPark = function(parkId, eventId, callback){
  ParkQueue.update(
    { _id: parkId },
    { $push:  {event_id : eventId }},
    callback
  );
}

// write a module to check if the park exists
