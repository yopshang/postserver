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
    edit_post:async function(req, res, next){
        const that = this,
              body = req.body,
              id = body.id;
            const ifPostExist = await postModel.findById(id);
            if(ifPostExist == "" ){
                next(appError(404,'此使用者id不存在', next));
            }
            await postModel.updateOne(
                {
                    _id: body.id
                },
                {
                    $set: body
                }
            )
            res.status(200).json({
                status: 'success',
                message: '成功',
                body: body
            })
    },
    delete_post:async function(req, res, next){
            await postModel.findByIdAndDelete(req.body.id)
            res.status(200).json({
                status: 'success',
                message: '成功',
                id: req.body.id
            })
    },
    get_all_post:async function (req, res, next){
        const page = req.body.page;
        const id = req.body.id;
        const all_post = await postModel.find({
            "postby": id
        }).sort({"createdAt": -1}).limit(page*10);
        if(!all_post || all_post == ""){
            next(appError(404, '查無此id', next));
        }
        res.status(200).json({
            status: 'success',
            all_post: all_post
        })
    }
}


module.exports = postController;
