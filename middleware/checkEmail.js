const appError = require('../service/appError');
// const validator = require('validator');
const userModal = require('../models/user')

const checkEmail = async function(req, res, next){
    await userModal.countDocuments({email: req.body.email}, function (err, count){ 
        if(count>0){
            appError('400', 'email已存在', next)
        } 
        // else if(!validator.isEmail(req.body.email)){
        //     appError('400', 'email格式錯誤', next)
        // } 
        else {
            next();
        }
    }); 
}

module.exports = checkEmail;