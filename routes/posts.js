const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

const checkId = require('../middleware/checkId');
const checkPage = require('../middleware/checkPage');
const handleErrorAsync = require('../service/handErrorAsync')

router.get('/', checkId, checkPage, function(req, res, next){
    handleErrorAsync(postController.get_all_post(req, res, next))
})

module.exports = router;

