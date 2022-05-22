const express = require('express');
const { param } = require('.');
const router = express.Router();

const get_all_post = require('../controllers/get_all_post');
const postController = require('../controllers/postpost');

router.get('/', function(req, res, next){
    const page = req.query.page;
    const id = req.query.id;
    get_all_post(req, res, page, id);
})
router.post('/', function(req, res, next){
    const id = req.query.id,
          img = req.query.img,
          content = req.query.content,
          post = {
            id, img, content
          }
    postController.postpost(req, res, post);
})
router.patch('/', function(req, res, next){
    postController.edit_post(req, res, req.query);
})
router.delete('/', function(req, res, next){
    postController.delete_post(req, res, req.query);
})

module.exports = router;

