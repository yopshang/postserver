const imgModel = require('../models/img');

async function add_img(req, res){
    try{
        await imgModel.create(
            {
                img: req.query.img,
            }
        );

        res.status(200).json({
            status: 'success',
            message: '成功',
        })
    }catch(err){
        res.status(200).json({
            status: 'fail',
            message: '請上傳圖片'
        })
    }
}

module.exports = add_img;
