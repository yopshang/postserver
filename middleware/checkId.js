const mongoose = require('mongoose');
const appError = require('../error/appError');

const checkId = function(req, res, next){
    console.log('這是傳進來的 body id',req.body.id,'這是傳進來的 query id' ,req.query.id);
    if(req.query.id == undefined || req.query.id.length == 0){
        return appError(400, "你沒有填寫id", next);
    } 
    // else if(mongoose.isObjectIdOrHexString(req.body.id)){
    //     return appError(400, "id格式錯誤", next);
    // } 
    else {
        next();
    }
}

module.exports = checkId;
