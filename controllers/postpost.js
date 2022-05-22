// models
const postModel = require('../models/post');
const userModel = require('../models/user');

const postController = {
    // 新增貼文
    async postpost(req, res, post){
        try{
            if(post.id){
                // 更新貼文collection
                await postModel.create(
                        {
                            postby: post.id,
                            img: post.img || '',
                            content: post.content
                        }
                    );
    
                // 更新user 發布的貼文
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
                // 回傳結果
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
    },
    // 編輯貼文
    async edit_post(req, res, query){
        const that = this;
        try{
            console.log('returnset', that.returnSet(query));
            await postModel.updateOne(
                {
                    _id: query.id
                },
                {
                    $set: await that.returnSet(query)
                }
            )
            res.status(200).json({
                status: 'success',
                message: '成功',
                query: query
            })
        }catch(err){
            res.status(200).json({
                status: 'fail',
                message: '查無此id'
            })
        }
    },
    async returnSet(body){
        let result={}
        if(body.postby){
            result.postby = body.postby;
        }
        if(body.img){
            result.img = body.img;
        }
        if(body.content){
            result.content = body.content;
        }
        if(body.likes){
            result.likes = body.likes;
        }
        if(body.comments){
            const myposts =  await postModel.findById(body.id);
            const comments_new = [...myposts.comments,...body.comments]
            result.comments = body.comments_new;
        }
        if(body.tags){
            const myposts =  await postModel.findById(body.id);
            const myposts_new = [...myposts.tags,...body.tags]
            result.tags = body.myposts_new;
        }
        return result;
    }

}


module.exports = postController;
