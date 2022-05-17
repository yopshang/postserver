const express = require('express');
const { param } = require('.');
const router = express.Router();

const get_all_post = require('../controllers/get_all_post');

router.get('/', function(req, res, next){
    const page = req.query.page;
    get_all_post(req, res, page);
})

module.exports = router;

