// models
const postModel = require('../models/post');
const userModel = require('../models/user');
// error
const appError = require('../error/appError')

const postController = {
    // 新增貼文
    add_post:async function (req, res){
        const post = {
            id: req.body.id,
            img: req.body.img || '',
            content: req.body.content
        }
        console.log('post', post);
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
    edit_post:async function(req, res, query, next){
        const that = this;
        const id = Number(query.id)
            const returnSet = await that.returnSet(query);
            const ifPostExist = await postModel.findById(id);
            if(ifPostExist == "" ){
                next(appError(404,'此使用者id不存在', next));
            }
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
    returnSet: async function(body){
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
        if(body.tags){
            const myposts =  await postModel.findById(body.id);
            const tags_new  = myposts.tags;
            tags_new.push(JSON.parse(body.tags));

            result.tags = body.tags_new;
        }
        return result;
    },
    delete_post:async function(req, res, query){
            await postModel.findByIdAndDelete(query.id)
            res.status(200).json({
                status: 'success',
                message: '成功',
                id: query.id
            })
    },
    get_all_post:async function (req, res, page, id, next){
        const all_post = await postModel.find({
            "postby": id
        }).sort({"createdAt": -1}).limit(page*10);
        if(all_post == ""){
            next(appError(404, '查無此id', next));
        }
        // console.log('取得所有貼文:',all_post);
        res.status(200).json({
            status: 'success',
            all_post: all_post
        })
    }
}


module.exports = postController;
