
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


/* adds new park to parkQueue db */
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

/* returns park from park id */
module.exports.getParkById = function(parkId, callback) {
	console.log('searching by ID');
	ParkQueue.findById(parkId)
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

/* returns list of park objects based off array of ids */
module.exports.getMultipleParksbyId = function(parkIds, callback) {
	console.log('getting multiple parks by ids');
	parkIds = parkIds.replace(/\s+/g, ''); //clear whitespace
	var ids = parkIds.split(","); 				//clear commas

	for(i =0; i< ids.length; i++ ){					// for each element in array
		ids[i] = ids[i].replace(/^"(.*)"$/, '$1'); //remove quotes from id
		console.log("i is" , i,"id is", ids[i]);   //see index
		if( ids[i] == ""){ // if empty element removes it
			delete ids[i];
			ids.length--;    //shrinks array
		} //end if
	} //end for

	ParkQueue.find({ "_id": { "$in": ids } })
	.exec(function(err, parks){
		if(err){
			console.log("Error retrieving list of parks");
			callback(err, null);
		} else {
			console.log("parks are ", parks);
			callback(null, parks);
		}
	})
}

/* returns list of parks within radius*/
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

/* returns park objects with this specific sport category */
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

/* updates event to a park's event_id field*/
module.exports.addEventPark = function(parkId, eventId, callback){
  ParkQueue.update(
    { _id: parkId },
    { $push:  {event_id : eventId }},
    callback
  );
}
