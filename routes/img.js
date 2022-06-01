var  express = require('express');
var router = express.Router();

const add_img = require('../controllers/add_img');
const checkImg = require('../middleware/checkImg');
const checkId = require('../middleware/checkId');

router.post('/',checkId, checkImg, function(req, res, next) {
    add_img(req, res);
});

module.exports = router;
