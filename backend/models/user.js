/* handles DB logic for users*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  followedParks: [{
    parkID: Number
  }],
  endorsment: [{
    userID: Number,
    stars: { type: Number, minimum: 1, maximum: 5 , exclusiveMaximum: false },
  }],
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
          fullName: profile.displayName,
          email: profile.emails[0].value,
          googleProvider: {
            id: profile.id,
            token: accessToken
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


module.exports.getParkByAddress = function(address, callback) {

}


module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}


module.exports.setSession = function (user, req, callback) {
    req.session.user = user;
    callback(true);
}