const multer = require('multer');
const path = require('path');
const appError = require('../service/appError')
const handErrorAsync = require('../service/handErrorAsync')

const upload = multer({
    limits: {
        fileSize: 2*1024*1024, // 限制檔案大小
    },
    fileFilter(req, res, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext !== '.jpg' && ext !== '.png' && ext !== 'jpeg'){
            cb(new Error("檔案格式錯誤，請重新上傳jpg, jpeg, png格式")) // 自定義新的錯誤
        }
        cb(null, true) // 這邊就是next
    }
}).any(); //  所有檔案都接收

module.exports = upload;
