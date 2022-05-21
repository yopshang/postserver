const mongoose = require('mongoose')

const postSchema = {
    postby:{
        type: String,
        required: [true, '請輸入發布人'],
        rel: 'User'
    },
    img: {
        type: String,
        default: ''
    },
    contents: {
        type: String,
        required: [true, '請輸入內容']
    },
    comments: {
        id: {
            type: String,
            comment: String,
            createAt: {
                type: Date,
                default: Date.now,
            },
            rel: 'User'
        }
    },
    likes: {
        type: Array,
        default: []
    }
}

const PostModal = mongoose.model('posts', postSchema);

module.exports = PostModal;