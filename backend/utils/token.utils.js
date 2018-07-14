var jwt = require('jsonwebtoken');

/* I feel like this should be changed somehow */
var createToken = function(auth) {
  return jwt.sign({
    id: auth.id
  }, 'my-secret', 
  {
    expiresIn: 5
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
  verifyToken: function(req, res, next) {
    // verify token
    console.log('verifying token');
    jwt.verify(req.token,'my-secret', {MaxAge: "5s"}, function(err, decoded) {      
      if (err) {
        return res.status(200).send({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  }
};