const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Check for the token being sent in a header or as a query parameter
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      // If valid token, req.user will be the user obj in the token's payload
      // If invalid token, req.user will be null
      req.user = err ? null : decoded.user;    
      return next();
    });
  } else {
    req.user = null;
    return next();
  }
};