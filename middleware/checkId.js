const mongoose = require('mongoose');
const appError = require('../service/appError');

const checkId = function(req, res, next){
    if(req.body.id == undefined || req.body.id.length == 0){
        return appError(400, "你沒有填寫id", next);
    } else if(!mongoose.isObjectIdOrHexString(req.body.id)){
        return appError(400, "id格式錯誤", next);
    } else {
        next();
    }
}

module.exports = checkId;
