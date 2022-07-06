const imgModel = require('../models/img');
// service
const successHandler = require('../service/successHandler')

async function add_img(req, res){
    const client = new ImgurClient({
        clientId:process.env.IMGUR_CLIENTID,
        clientSecret:process.env.IMGURL_CLIENT_SECRET,
        refreshToken:process.env.IMGUR_REFREASH_TOKEN
    })
        await imgModel.create(
            {
                img: req.body.img,
            }
        );
        successHandler(res, 200, '新增成功', req.body.img)
}

module.exports = add_img;
