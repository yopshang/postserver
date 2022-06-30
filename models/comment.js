const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        postby:{
            type: String,
            required: [true, '請輸入發佈人'],
            rel: 'User'
        },
        content:{
            type: String,
            required: [true, '請上傳內容']
        }
    },
    {
        versionKey: false
    }
)
const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;
