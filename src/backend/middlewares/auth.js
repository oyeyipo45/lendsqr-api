const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    //the token

    const jwtToken = req.headers.authorization.split(' ')[1];
    if (!jwtToken) {
      return res.status(403).json({ message: 'Authorization Denied', status_code : 403, success :false });
    }

    const payload = jwt.verify(jwtToken, process.env.SECRET);

    req.username = payload.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid please reauthenticate user' , status_code : 401, success :false});
  }
};
