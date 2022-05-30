const express = require('express');
const router = express.Router();

const get_all_post = require('../controllers/get_all_post');
const postController = require('../controllers/postpost');

const appError = require('../error/appError');

router.get('/', function(req, res, next){
    if(req.query.page == undefined || req.query == 0){
        return appError(400, '找不到該頁資料', next);
    } else if (req.query.id == undefined || req.query.id == ''){
        return appError(400, '找不到此id', next);
    } else{
        const page = req.query.page;
        const id = req.query.id;
        get_all_post(req, res, page, id);
    }
})
router.post('/', function(req, res, next){
    if(req.query.id == undefined || req.query.id == ''){
        return appError(400, '找不到此id', next);
    } else if(req.query.content == undefined || req.query.content == ''){
        return appError(400, '你不能發布一則空白貼文', next);
    } else {
        const id = req.query.id,
              img = req.query.img || '',
              content = req.query.content,
              post = {
                id, img, content
              }
        postController.postpost(req, res, post);
    }
})
router.patch('/', function(req, res, next){
    postController.edit_post(req, res, req.query);
})
router.delete('/', function(req, res, next){
    postController.delete_post(req, res, req.query);
})

module.exports = router;

