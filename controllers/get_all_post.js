const PostModal = require('../models/post');

async function get_all_post(req, res, page, id){
        const all_post = await PostModal.findById(id).sort({"createdAt": -1}).limit(page*10);;
        console.log('all_post:',all_post);
        res.status(200).json({
            status: 'success',
            all_post: JSON.stringify(all_post)
        })
}

module.exports = get_all_post;
