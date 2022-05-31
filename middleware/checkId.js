const appError = require('../error/appError');

const checkId = function(req, res, next){
    if(req.query.id == undefined || req.query.id.length == 0){
        return appError(400, "你沒有填寫id", next);
    } else {
        next();
    }
}

module.exports = checkId;
