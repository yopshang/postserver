const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

const checkId = require('../middleware/checkId');
const checkPage = require('../middleware/checkPage');
const checkContent = require('../middleware/checkContent');
const handleErrorAsync = require('../service/handErrorAsync')

router.post('/', checkId, checkContent, function(req, res, next){
    handleErrorAsync(postController.add_post(req, res));
})
router.patch('/', checkId, function(req, res, next){
    handleErrorAsync(postController.edit_post(req, res, next))
})
router.delete('/', checkId, function(req, res, next){
    handleErrorAsync(postController.delete_post(req, res, next))
})

module.exports = router;

