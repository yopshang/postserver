// models
const userModel = require('../models/user');

async function get_myfollows(res, req){
    const users = await userModel.find({});

    res.status(200).json(users);
    console.log('取得follows');
}

module.exports = get_myfollows;
