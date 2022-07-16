var  express = require('express');
var router = express.Router();
// service
const appError = require('../service/appError')
const handleErrorAsync = require('../service/handErrorAsync');
const successHandler = require('../service/successHandler')
// plugin
const sizeOf = require('image-size')
const { ImgurClient } = require('imgur');
const {isAuth, generateJWT} = require('../service/isAuth')
// middleware
const upload = require('../middleware/upload')

// isAuth
router.post('/', upload, handleErrorAsync(async (req, res, next)=>{
    if(!req.files.length){ // 擋無上傳檔案
        return next(appError(400, '尚未上傳檔案', next))
    }
    // const dimensions = sizeOf(req.files[0].buffer); //    取得上傳的的圖片資訊
    // if(dimensions.width !== dimensions.height){
    //     return next(appError(400, '圖片不符合1:1尺寸', next))
    // }
    const client = new ImgurClient({ // 建立一個新的imgur 物件 帶入資料
        clientId: process.env.IMGUR_CLIENTID,
        clientSecret: process.env.IMGURL_CLIENT_SECRET,
        refreshToken: process.env.IMGUR_REFRESH_TOKEN
    })
    const response = await client.upload({ //  上傳到imgur圖床
        image: req.files[0].buffer.toString('base64'),
        type4: 'base64',
        album:  process.env.IMGUR_ALBUM_ID
    })
    console.log( 'clientId:', process.env.IMGUR_CLIENTID,'clientSecret', process.env.IMGURL_CLIENT_SECRET,
        'refreshToken:', process.env.IMGUR_REFRESH_TOKEN);
    successHandler(res, 200, '上傳成功', response.data.link) //   回傳link給前端塞入img src
}));

module.exports = router;
