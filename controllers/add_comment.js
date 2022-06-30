// models
const commentModel = require('../models/comment');
// service
const successHandler = require('../service/successHangler')

async function add_comment(req, res){
        const comments = await commentModel.create({
            postby: req.body.id,
            content: req.body.content
        });
        successHandler(res, 200, '新增成功', comments);
}

module.exports = add_comment;
