const PostModal = require('../models/post');

async function get_all_post(req, res, page, id){
        const all_post = await PostModal.find({
            "postby": id
        }).sort({"createdAt": -1}).limit(page*10);
        console.log('取得所有貼文:',all_post);
        res.status(200).json({
            status: 'success',
            all_post: all_post
        })
}

module.exports = get_all_post;
