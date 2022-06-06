const express = require('express');
const router = express.Router();

const postController = require('../controllers/postpost');

const checkId = require('../middleware/checkId');
const checkPage = require('../middleware/checkPage');
const checkContent = require('../middleware/checkContent');

router.get('/', checkId, checkPage, function(req, res, next){
    const page = req.query.page;
    const id = req.query.id;
    postController.get_all_post(req, res, page, id, next);
})
router.post('/', checkId, checkContent, function(req, res, next){
    const id = req.body.id,
    img = req.body.img || '',
    content = req.body.content,
    post = {
        id, img, content
    }
    console.log('這是我的body', post);
    postController.add_post.postpost(req, res, post);
})
router.patch('/', checkId, function(req, res, next){
    postController.add_post.edit_post(req, res, req.body);
})
router.delete('/', checkId, function(req, res, next){
    postController.add_post.delete_post(req, res, req.query);
})

module.exports = router;

