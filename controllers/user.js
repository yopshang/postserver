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
    add_user:async function (req, res, id){
        const users = await userModel.findById(id);
        console.log('取得user',users);
        res.status(200).json({
            status: 'success',
            data: users
        });
    }

}

module.exports = userController;
