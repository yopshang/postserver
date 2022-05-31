const express = require('express');
const router = express.Router();

const get_all_post = require('../controllers/get_all_post');
const postController = require('../controllers/postpost');

const appError = require('../error/appError');
const checkId = require('../middleware/checkId');
const checkPage = require('../middleware/checkPage');
const checkContent = require('../middleware/checkContent');

router.get('/', checkId, checkPage, function(req, res, next){
    const page = req.query.page;
    const id = req.query.id;
    get_all_post(req, res, page, id);
})
router.post('/',checkId, checkContent, function(req, res, next){
    const id = req.query.id,
            img = req.query.img || '',
            content = req.query.content,
            post = {
            id, img, content
            }
    postController.postpost(req, res, post);
})
router.patch('/', function(req, res, next){
    if(req.query.id == undefined || req.query.id == ''){
        return appError(400, '請輸入id', next)
    } else {
        postController.edit_post(req, res, req.query);
    }
})
router.delete('/', function(req, res, next){
    if(req.query.id == undefined || req.query.id == ''){
        return appError(400, '找不到此id', next);
    } else {
        postController.delete_post(req, res, req.query);
    }
})

module.exports = router;

