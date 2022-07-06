// models
const userModel = require('../models/user');
// service
const successHandler = require('../service/successHandler')
const failHandler = require('../service/failHandler')
const bycript = require('bycript');
const {isAuth, generateJWT} = require('../service/isAuth');
const bcrypt = require('bcrypt');

const userController = {
    sign_in:async function (req, res){ // 登入
            const user = await userModel.find({email:req.body.email});
            const ifMatch = await bycript.compare(users.password, res); // 符合就會給true
            if(ifMatch){
                // 回傳token
                generateJWT(user, 200, res);
            } else {
                failHandler(res, 400, '密碼或是email錯誤')
            }
    },
    sign_up: async function(req, res){ // 註冊
        // const password =  await bcrypt.hash(req.body.password, 12);
        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
        })
        successHandler(res, 200, '註冊成功', req.body.name)
    },
    updatePassword: async function(req, res){ // 重設密碼{
        const new_password = await bcrypt.hash(req.body.password)
        await userModel.updateOne({
            email: req.body.email
        },{
            $set:{
                password:new_password
            }
        })
    },
    get_profile: async function(req, res){ // 取得個人資料
        const user = await userModel.find({
            email:req.body.email
        })
        if(user){
            successHandler(res, 200, '取得個人資料', user)
        } else {
            failHandler(res, 400, '取得個人資料失敗')
        }
    },
    edit_profile: async function(req, res){ // 更新個人資料
        const user = await userModel.updateOne({
            email:req.body.email
        },{
            $set:{
                name: req.body.name,
            }
        })
    },
}

module.exports = userController;
