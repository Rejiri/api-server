const jwToken = require('jsonwebtoken');
const config = require('../config');

module.exports.verify = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'Error: Forbidden - No Token' });
  }

  jwToken.verify(token, config.secret, (error, result) => {
    if (error) {
      return res.status(401).send({ message: "Error: Unauthorized" });
    }
    req.userId = result.id;
    next();
  });
};
