const imgModel = require('../models/img');

async function add_img(req, res){
        await imgModel.create(
            {
                img: req.body.img,
            }
        );

        res.status(200).json({
            status: 'success',
            message: '成功',
        })
}

module.exports = add_img;
