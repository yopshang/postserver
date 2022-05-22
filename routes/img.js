var  express = require('express');
var router = express.Router();

const add_img = require('../controllers/add_img');

router.post('/', function(req, res, next) {
    add_img(req, res);
});

module.exports = router;
