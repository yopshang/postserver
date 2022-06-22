// plugins
const bcrypt = require('bcrypt');
const validator = require('validator');
// const jwt = require('jsonwebtoken')

// error
const appError = require('../error/appError');

// models
const userModel = require('../models/user');

const userController = {
    get_my_user:async function (req, res, id){
            const users = await userModel.findById(id);
            console.log('取得user',users);
            res.status(200).json({
                status: 'success',
                data: users
            });
    },
    add_user:async function (req, res, next){
        if(!validator.isEmail(req.body.email)){
            appError('200', 'email格式錯誤', next)
        }

        const password =  await bcrypt.hash(req.body.password, 12);
        console.log('密碼加密', password);

        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password
        })
        console.log('新增成功');
        res.status(200).json({
            status: 'success',
        });
    }

}

module.exports = userController;
