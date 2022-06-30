// models
const userModel = require('../models/user');
// service
const successHandler = require('../service/successHangler')

async function get_my_user(req, res){
        const users = await userModel.findById(req.body.id);
        successHandler(res, 200, '成功取得使用者資料', users)
}

module.exports = get_my_user;
