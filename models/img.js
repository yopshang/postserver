const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema(
    {
        img:{
            type: String,
            required: [true, '請上傳圖片']
        }
    },
    {
        versionKey: false
    }

)
const imgModel = mongoose.model('imgs', imgSchema);

module.exports = imgModel;
