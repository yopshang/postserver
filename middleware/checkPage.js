const appError = require('../error/appError');

const checkPage = function(req, res, next){
    if(req.query.page == undefined || req.query == 0){
        return appError(400, "找不到該頁資料", next);
    } else {
        next();
    }
}

module.exports = checkPage;
