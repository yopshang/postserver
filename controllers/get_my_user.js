// models
const userModel = require('../models/user');

async function get_my_user(req, res, id){
    try{
        const users = await userModel.findById(id);
        console.log('取得user',users);
        res.status(200).json({
            status: 'success',
            data: users
        });
    }catch(err){
        res.status(200).json({
            status: 'fail',
        });
    }
}

module.exports = get_my_user;
