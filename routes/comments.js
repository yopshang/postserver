const express = require('express');
const router = express.Router();

const add_comment = require('../controllers/add_comment')

const checkId = require('../middleware/checkId');
const checkContent = require('../middleware/checkContent');

router.post('/', checkId, checkContent, function(req, res, next){
    add_comment(req, res, req.query)
})

module.exports = router;

