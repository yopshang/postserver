// models
const userModel = require('../models/user');

async function get_my_user(req, res){
        const users = await userModel.findById(req.body.id);
        res.status(200).json({
            status: 'success',
            data: users
        });
}

module.exports = get_my_user;
