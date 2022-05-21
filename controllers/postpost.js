// models
const postModel = require('../models/post');
const userModel = require('../models/user');

async function postpost(req, res, post){
    try{
        if(post.id){
            console.log('post', post);
            // const users = await postModel.findById(id);
            await postModel.create(
                    {
                        postby: post.id,
                        img: post.img || '',
                        contents: post.contents
                    }
                );

            res.status(200).json({
                status: 'success',
                message: '發布成功',
                data: post
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: '請輸入id'
            })
        }
    }catch(err){
        res.status(200).json({
            status: 'fail',
            message: '查無此id'
        })
    }
}

module.exports = postpost;
