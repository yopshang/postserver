const mongoose = require('mongoose');

const commentSchema = {
    postby:{
        type: String,
        required: [true, '請輸入發佈人'],
        rel: 'User'
    },
    content:{
        type: String,
        required: [true, '請上傳圖片']
    }
}
const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;
