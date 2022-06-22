// plugins
const bcrypt = require('bcrypt');
// const validated = require('validated');
// const jwt = require('jsonwebtoken')

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
    add_user:async function (req, res){
        // console.log('密碼加密', req.body);
        var hash;
        const that = this;
        bcrypt.hash('test', 12).then(res => {
            console.log('密碼加密', res); // 這樣寫就能夠接到加密後的值了
            that.hash = res;
        });
        // bcrypt.hash(newUser.password, salt , (err, hash) => { 
        //     console.log('hash',  hash);
        // })

        // console.log('加密過的密碼', password);
        res.status(200).json({
            status: 'success',
        });
    }

}

module.exports = userController;
