const appError = require('../error/appError');

const chdckIfToken = function(req, res, next){
    console.log('token mdiddleware', req.get('token'));
    if(req.get('token') == undefined || req.get('token').length == 0){
        return appError(400, "你沒有填寫id", next);
    } else {
        next();
    }
}

module.exports = chdckIfToken;
