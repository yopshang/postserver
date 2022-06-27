// plugins
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// models
const userModel = require('../models/user');
// controllers
const generateJWT = require('../controllers/generateJWT');

const userController = {
    login:async function (req, res){
            const users = await userModel.find({email:req.body.email});
            const token = await jwt.
            res.status(200).json({
                status: 'success',
                token: token
            });
    },
    add_user:async function (req, res){
        const password =  await bcrypt.hash(req.body.password, 12);
        console.log('密碼加密', password);

        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        })
        generateJWT(user, 200, res);
    }

}

module.exports = userController;
