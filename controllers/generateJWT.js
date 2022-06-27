// plugin
const jwt = require('jsonwebtoken')
// models
const userModel = require('../models/user');

const generateJWT = async function(user, statuscode, res){
    console.log('generateJWT');
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY
    })
    user.password = undefined;
    res.status(statuscode).json({
        token,
        name: user.name
    })
}

module.exports = generateJWT;
