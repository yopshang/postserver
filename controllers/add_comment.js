// models
const commentModel = require('../models/comment');

async function add_comment(req, res, query){
        const comments = await commentModel.create({
            postby: query.id,
            content: query.content
        });
        console.log('新增評論');
        res.status(200).json({
            status: 'success',
            data: comments
        });
}

module.exports = add_comment;
