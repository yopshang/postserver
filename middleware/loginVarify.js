const appError = require('../error/appError')
// const jwt = reuqire('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModal = require('../models/user')

const loginVarify = async function(req, res, next){
    const users= await userModal.find({})
    users.forEach(user=>{
            bcrypt.compare(user.password, req.header.token,  (err, ans)=>{
                if(ans){
                    next();
                } else {
                    return appError(400, "帳號密碼錯誤或無此帳號", next);
            }
        })
    })

}

module.exports = loginVarify;