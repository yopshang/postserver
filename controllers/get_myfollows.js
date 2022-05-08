// models
const userModel = require('../models/user');

async function get_myfollows(res, req, id){
    try{
        const users = await userModel.findById(id);
        console.log(users);
        res.status(200).json({
            status: 'success',
            myfollows: [...users.myfollows]
        });
    }catch(err){
        console.log({status: 'fail', err});
    }
    console.log('取得follows');
}

module.exports = get_myfollows;
