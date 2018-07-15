var jwt = require('jsonwebtoken');

/* I feel like this should be changed somehow */
var createToken = function(auth) {
  return jwt.sign({
    id: auth.id
  }, 'my-secret', 
  {
    expiresIn: '1d'
  });
};

module.exports = {
  generateToken: function(req, res, next) {
    req.token = createToken(req.auth);
    return next();
  },
  sendToken: function(req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
  verifyToken: function(token) {
    var result = jwt.verify(token,'my-secret', function(err, decoded) {
      if (err) {
        return { success: false, expired: true, message: 'Failed to authenticate token.' };    
      } else {
        // if everything is good, save to request for use in other routes
        var dateNow = new Date();

        if (decoded.exp > dateNow.getTime()) {
          return {success: false, expired: true};
        }
      }
      return {success: true, expired: false};
    });
    return result;
  }
};