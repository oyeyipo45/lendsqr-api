const jwt = require('jsonwebtoken');

function jwtGen(id, val) {
  const payload = {
    val : id,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 });
}

module.exports = jwtGen;
