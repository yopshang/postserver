// models
const userModel = require('../models/user');

async function get_my_user(req, res, id){
        const users = await userModel.findById(id);
        res.status(200).json({
            status: 'success',
            data: users
        });
}

module.exports = get_my_user;
