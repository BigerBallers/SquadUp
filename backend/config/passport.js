/* this file handles authentication using google+ */

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const auth = require('./auth');
const User = require('../models/user');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

/* want to change this bc I dont like exporting functions like that.
   want to make it sumilar to how I export ../model/user.js
 */
module.exports = function () {

  passport.use(
    new GoogleTokenStrategy({
      clientID: auth.googleAuth.clientID,
      clientSecret: auth.googleAuth.clientSecret,
    },
    function (accessToken, refreshToken, profile, done) {
      var data = {profile: profile, accessToken: accessToken};
      User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    })
  );
};

  passport.serializeUser((user, done) => {
      done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
          done(null, user);
      });
  });

/*
// LOCAL STRATEGY if we decide to allow users to create an account
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ "local.email": email });

    // If not, handle it
    if (!user) {
      return done(null, false);
    }

    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);

    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));
*/
