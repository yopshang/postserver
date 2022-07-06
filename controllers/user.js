// models
const userModel = require('../models/user');
// service
const successHandler = require('../service/successHandler')
const failHandler = require('../service/failHandler')
const bycript = require('bycript');
// const generateJWT = require('../controllers/generateJWT');
const {isAuth, generateJWT} = require('../service/isAuth');

const userController = {
    sign_in:async function (req, res){ // 登入
            const user = await userModel.find({email:req.body.email});
            const ifMatch = await bycript.compare(users.password, res); // 符合就會給true
            if(ifMatch){
                // 回傳token
                // const token = await jwt.sign({id:users.id}, process.env.JWT_SECRET, {})
                // successHandler(res, 200, '登入成功', token)
                generateJWT(user, 200, res);
            } else {
                failHandler(res, 400, '密碼或是email錯誤')
            }
            // res.status(200).json({
            //     status: 'success',
            //     token: token
            // });
    },
    sign_up: async function(req, res){ // 註冊
        // const password =  await bcrypt.hash(req.body.password, 12);
        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
        })
        successHandler(res, 200, '註冊成功', req.body.name)
        // generateJWT(user, 200, res);
    },
    updatePassword: async function(req, res){ // 重設密碼
        
    },
    get_profile: async function(req, res){ // 取得個人資料

    },
    edit_profile: async function(req, res){ // 更新個人資料

    },
}

module.exports = userController;
