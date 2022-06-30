// models
const commentModel = require('../models/comment');

async function add_comment(req, res){
        const comments = await commentModel.create({
            postby: req.body.id,
            content: req.body.content
        });
        res.status(200).json({
            status: 'success',
            data: comments
        });
}

module.exports = add_comment;
