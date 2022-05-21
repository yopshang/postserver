// models
const postModel = require('../models/post');
const userModel = require('../models/user');

async function postpost(req, res, post){
    try{
        if(post.id){
            await postModel.create(
                    {
                        postby: post.id,
                        img: post.img || '',
                        contents: post.contents
                    }
                );

            const myposts =  await postModel.find({postby: post.id});
            var myposts_updated = [];
            myposts.forEach(item=>{
                myposts_updated.push(item._id)
            })
            await userModel.updateOne(
                {
                    _id: post.id
                },
                {
                    $set:{
                        myposts: myposts
                    }
                }
                )
            // 接下來要把新的 myposts updateOne 到 該 user 的 myposts 裡面
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
