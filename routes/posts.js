const express = require('express');
const { param } = require('.');
const router = express.Router();

const get_all_post = require('../controllers/get_all_post');
const post_post = require('../controllers/postpost');

router.get('/', function(req, res, next){
    const page = req.query.page;
    const id = req.query.id;
    get_all_post(req, res, page, id);
})
router.post('/', function(req, res, next){
    const id = req.query.id,
          img = req.query.img,
          contents = req.query.contents,
          post = {
            id, img, contents
          }
    post_post(req, res, post);
})


module.exports = router;

