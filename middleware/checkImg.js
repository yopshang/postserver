const appError = require('../error/appError');

const checkImg = function(req, res, next){
    if(req.query.img== undefined || req.query.img.length == 0){
        return appError(400, "你不能上傳一個空的圖片", next);
    } else {
        next();
    }
}

module.exports = checkImg;
