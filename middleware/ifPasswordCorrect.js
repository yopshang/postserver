// service
const failHandler = require('../service/failHandler');
// model
const user = require('../models/user');

const ifPasswordCorrect = async function(req, res, next){
    // console.log('密碼確認',req.body.password)
    const user_data = await user.find({password:req.body.password})
    if(user_data){
        next();
    } else {
        failHandler(res, 400, '密碼錯誤，請重新輸入')
    }
}

module.exports = ifPasswordCorrect;
