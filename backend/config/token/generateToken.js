const jwt = require('jsonwebtoken')
//require('dotenv').config()

const generateToken = id => {
  return jwt.sign({ id },process.env.JWT_KEY, { expiresIn: "20d" });
};

module.exports = generateToken;