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

/* returns a user object based off userId*/
module.exports.getUserById = function(userId, callback) {
  console.log('searching db for user');
	User.findById(userId)
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

/* returns list of user objects based on array of ids */
module.exports.getMultipleUsersByIds = function(userIds, callback) {
	console.log('getting multiple users by ids');
  userIds = userIds.replace(/\s+/g, ''); //clear whitespace
	var ids = userIds.split(","); //clear commas

  for(i =0; i< ids.length; i++ ){					// for each element in array
		ids[i] = ids[i].replace(/^"(.*)"$/, '$1'); //remove quotes from id
		console.log("i is" , i,"id is", ids[i]);   //see index
		if( ids[i] == ""){ // if empty element removes it
			delete ids[i];
			ids.length--;    //shrinks array
		} //end if
	} //end for

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

/* updates user object's event field with eventId */
module.exports.addEvent = function (userId, eventId, callback) {
  User.update(
    { _id: userId },
    { $push:  {events : eventId }},
    callback
  );
}

/* updates user object's followedParks field with parkId */
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
