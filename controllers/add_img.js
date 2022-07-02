const imgModel = require('../models/img');
// service
const successHandler = require('../service/successHangler')

async function add_img(req, res){
        await imgModel.create(
            {
                img: req.body.img,
            }
        );
        successHandler(res, 200, '新增成功', req.body.img)
}

module.exports = add_img;
