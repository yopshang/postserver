// plugins
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// models
const userModel = require('../models/user');
// const { use } = require('../routes');

const userController = {
    login:async function (req, res){
            const users = await userModel.find({email:req.body.email});
            console.log('取得user',users);
            res.status(200).json({
                status: 'success',
                data: users
            });
    },
    add_user:async function (req, res){
        const that = this;
        const password =  await bcrypt.hash(req.body.password, 12);
        console.log('密碼加密', password);

        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        })
        that.generateJWT(user, 200, res);
    },
    generateJWT: function(user, statuscode, res){
        console.log('新增成功');
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_DAY
        })
        user.password = undefined;
        res.status(statuscode).json({
            token,
            name: user.name
        })
}

}

module.exports = userController;
