// models
const postModel = require('../models/post');
const userModel = require('../models/user');

const postController = {
    // 新增貼文
    async postpost(req, res, post){
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
    },
    // 編輯貼文
    async edit_post(req, res, query){
        const that = this;
            const returnSet = await that.returnSet(query);
            // console.log('returnset', returnSet);

            await postModel.updateOne(
                {
                    _id: query.id
                },
                {
                    $set: returnSet
                }
            )
            res.status(200).json({
                status: 'success',
                message: '成功',
                query: query
            })
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
            var comments_new = myposts.comments;
            comments_new.push(JSON.parse(body.comments));
            result.comments = comments_new;
        }
        if(body.tags){
            const myposts =  await postModel.findById(body.id);
            const tags_new  = myposts.tags;
            tags_new.push(JSON.parse(body.tags));

            result.tags = body.tags_new;
        }
        return result;
    },
    async delete_post(req, res, query){
        const that = this;

            await postModel.findByIdAndDelete(query.id)
            res.status(200).json({
                status: 'success',
                message: '成功',
                id: query.id
            })
    },

}


module.exports = postController;
