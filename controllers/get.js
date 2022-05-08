// models
const userModel = require('../models/user');

async function getAll(req, res){
    const users = await userModel.find({});
    res.status(200).json(users);
    console.log('取得users');
}

module.exports = getAll;
