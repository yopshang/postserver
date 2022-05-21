const express = require('express');
const { param } = require('.');
const router = express.Router();

const get_all_post = require('../controllers/get_all_post');

router.get('/', function(req, res, next){
    const page = req.query.page;
    const id = req.query.id;
    console.log('id:', id);
    get_all_post(req, res, page, id);
})

module.exports = router;

