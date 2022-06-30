const appError = require('../service/appError');

const checkContent = function(req, res, next){
    if(req.query.content == undefined || req.query.content == ''){
        return appError(400, "你不能發布一則空白貼文", next);
    } else {
        next();
    }
}

module.exports = checkContent;
