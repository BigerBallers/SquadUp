/* handles DB logic for users*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({

  followedParks: [{
    type: String
  }],
  events: [{
    type: String
  }],
  endorsment: {
    type : Array,
    "default" : []
  },
  googleProvider: {
    id: {
      type: String,
    },
    email: {
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    profilePic: {
      type: String
    },
    name: {
      type: String
    },
    given_name: {
      type: String
    },
    family_name: {
      type: String
    }
  }
  /* add fields if neccessary */
});

UserSchema.set('toJSON', {getters: true, virtuals: true});


UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  var that = this;
  return this.findOne({
    'googleProvider.id': profile.id
    },
    function(err, user) {
    // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({ // might be problem idk what 'that' is
          googleProvider: {
            id: profile._json.id,
            profilePic: profile._json.picture,
            name: profile._json.name,
            given_name: profile._json.given_name,
            family_name: profile._json.family_name,
            email: profile._json.email,
          }
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
          return cb(err, user);
        }
    }
  );
};


var User = module.exports = mongoose.model('user', UserSchema);



module.exports.getUserById = function(id, callback) {
  console.log('searching db for user');
	User.findById(id)
	.exec(function(err, user){
		if(err){
			console.log("Error retrieving user");
			callback(err, null);
		} else {
			console.log(user);
			callback(null, user);
		}
	})
}

//input for now is a string of the following format:
// "user_id","user_id","user_id"
module.exports.getMultipleUsersByIds = function(userIds, callback) {
	console.log('getting multiple users by ids');
  userIds = userIds.replace(/\s+/g, ''); //clear whitespace
	var ids = userIds.split(","); //clear commas
	for(i =0; i< ids.length; i++ ){
		ids[i] = ids[i].replace(/^"(.*)"$/, '$1'); //clear quotes
		console.log("i is" , i,"id is", ids[i]);
    if( ids[i] == ""){ //removes empty elements
			delete ids[i];
			ids.length--;
		}
	}
	User.find({ "_id": { "$in": ids } })
	.exec(function(err, users){
		if(err){
			console.log("Error retrieving list of users");
			callback(err, null);
		} else {
			console.log("users are ", users);
			callback(null, users);
		}
	})
}

module.exports.addEvent = function (userId, eventId, callback) {
  User.update(
    { _id: userId },
    { $push:  {events : eventId }},
    callback
  );
}


module.exports.followPark = function (userId, parkId, callback) {
  User.update(
    { _id: userId },
    { $push:  {followedParks : parkId }},
    callback
  );
}

/* does nothing */
module.exports.setSession = function (user, req, callback) {
    req.session.user = user;
    callback(true);
}
