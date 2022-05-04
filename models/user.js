const mongoose = require('mongoose');

const userSchema = {
    name:{
        type: String,
        required: [true, '請輸入姓名']
    },
    myposts: {
        type: Array,
        default:[]
    },
    myfollows: {
        type: Array,
        default:[]
    },
    mylikes: {
        type: Array,
        default: []
    },
    mypicture: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: [true, '請輸入E-mail']
    }
    
}
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
