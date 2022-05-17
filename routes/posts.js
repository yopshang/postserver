const express = require('express')
const router = express.Router();

const get_all_post = require('../controllers/get_all_post');

router.get('/', function(req, res, next){
    get_all_post(req, res);
})

module.exports = router;

