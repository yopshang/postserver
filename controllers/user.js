// models
const userModel = require('../models/user');
// service
const successHandler = require('../service/successHangler')

const userController = {
    sign_in:async function (req, res){
            const users = await userModel.find({email:req.body.email});
            const token = await jwt.
            res.status(200).json({
                status: 'success',
                token: token
            });
    },
    sign_up: async function(req, res){
        // const password =  await bcrypt.hash(req.body.password, 12);
        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
        })
        successHandler(res, 200, '註冊成功', req.body.name)
        // generateJWT(user, 200, res);
    }
}

module.exports = userController;
