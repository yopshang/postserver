const appError = require('../service/appError');

const checkPage = function(req, res, next){
    if(req.body.page == undefined || req.body == 0){
        return appError(400, "找不到該頁資料", next);
    } else {
        next();
    }
}

module.exports = checkPage;
