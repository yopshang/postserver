const PostModal = require('../models/post');

async function get_all_post(req, res){
    console.log('進到controllor');
    try{
        const all_post = await PostModal.find({});
        console.log(all_post);
        res.status(200).json({
            status: 'success',
            all_post
        })
    }catch(err){
        res.status(200).json({status: 'fail'})
    }
}

module.exports = get_all_post;
