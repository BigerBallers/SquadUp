/* handles DB logic for users*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({

  followedParks: {
    type : Array,
    "default" : []
  },
  events: {
    type : Array,
    "default" : []
  },
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


module.exports.addEvent = function (userId, eventId, callback) {
  var tempEvent = {
    eventID: eventId
  };
  User.update(
    { _id: userId },
    { $push:  {events : tempEvent }},
    callback
  );
}


module.exports.followPark = function (userId, parkId, callback) {
  var tempPark = {
    parkID: parkId
  };
  User.update(
    { _id: userId },
    { $push:  {followedParks : tempPark }},
    callback
  );
}


module.exports.getEvents = function (userId, callback) {
  //User.find();
}


module.exports.getParks = function (userId, callback) {
  // User.find()
}

/* does nothing */
module.exports.setSession = function (user, req, callback) {
    req.session.user = user;
    callback(true);
}
