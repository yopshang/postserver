// models
const postModel = require('../models/post');
const userModel = require('../models/user');
// service
const appError = require('../service/appError')
const successHandler = require('../service/successHangler')

const postController = {
    // 新增貼文
    add_post:async function (req, res){
        const post = {
            id: req.body.id,
            img: req.body.img || '',
            content: req.body.content
        }
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
        successHandler(res, 200, '發布成功', post)
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
            successHandler(res, 200, '修改貼文成功', body)
    },
    delete_post:async function(req, res, next){
            await postModel.findByIdAndDelete(req.body.id)
            successHandler(res, 200, '刪除成功', req.body.id)
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
        successHandler(res, 200, '取得貼文成功', all_post)
    }
}


module.exports = postController;
