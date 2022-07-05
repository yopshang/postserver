const failHandler = require('../service/failHandler');
const successHandler = require('../service/successHandler');
const validator = require('validator');
const userModal = require('../models/user');
const e = require('express');

const checkEmail = async function(req, res, next){
    const ifExecuted = await userModal.countDocuments({email: req.body.email});
    if(ifExecuted>0){
        failHandler(res, '400', 'email已存在')
    } else if(!validator.isEmail(req.body.email)){
        failHandler(res, '400', 'email格式不符')
    } else {
        next()
    }
}

module.exports = checkEmail;
