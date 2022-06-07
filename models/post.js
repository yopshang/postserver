const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        postby:{
            type: String,
            required: [true, '請輸入發布人'],
            rel: 'User'
        },
        img: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            required: [true, '請輸入內容']
        },
        comments: {
            type: Object,
            default: ()=>[
                {
                    id: '',
                    comment: '',
                    createAt: {
                        type: Date,
                        default: Date.now,
                    },
                }
            ]
        },
        likes: {
            type: Array,
            default: []
        },
        tags: {
            type: Array,
            default: ()=>[]
        },
    },
    {
        versionKey: false
    }

)

const PostModal = mongoose.model('posts', postSchema);

module.exports = PostModal;