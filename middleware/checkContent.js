const appError = require('../error/appError');

const checkContent = function(req, res, next){
    if(req.query.page == undefined || req.query == 0){
        return appError(400, "你不能發布一則空白貼文", next);
    } else {
        next();
    }
}

module.exports = checkContent;
