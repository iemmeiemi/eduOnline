const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (id, email, role) => jwt.sign({id, email, role}, process.env.JWT_SECRET, {expiresIn: '2d'});


module.exports = {
    generateAccessToken,

}