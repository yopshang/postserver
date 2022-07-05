const failHandler = require('../service/failHandler');

const checkPassword = function(req, res, next){
    console.log('密碼確認',req.body.password)
    if(req.body.password == undefined || !req.body.password ){
        failHandler(res, 400, "請輸入密碼");
    } else {
        next();
    }
}

module.exports = checkPassword;
