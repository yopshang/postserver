const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

const checkId = require('../middleware/checkId');
const checkPage = require('../middleware/checkPage');
const checkContent = require('../middleware/checkContent');

router.get('/', checkId, checkPage, function(req, res, next){
    const page = req.query.page;
    const id = req.query.id;
    postController.get_all_post(req, res, page, id, next);
})
router.post('/', checkId, checkContent, function(req, res, next){
    // const id = req.body.id,
    // img = req.body.img || '',
    // content = req.body.content,
    // post = {
    //     id, img, content
    // }
    postController.add_post(req, res, post);
})
router.patch('/', checkId, function(req, res, next){
    postController.edit_post(req, res, req.body, next);
})
router.delete('/', checkId, function(req, res, next){
    postController.delete_post(req, res, req.query);
})

module.exports = router;

