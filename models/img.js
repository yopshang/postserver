const mongoose = require('mongoose');

const imgSchema = {
    img:{
        type: String,
        required: [true, '請上傳圖片']
    }
}
const imgModel = mongoose.model('imgs', imgSchema);

module.exports = imgModel;
