var  express = require('express');
var router = express.Router();
// controller
const add_img = require('../controllers/add_img');
const checkImg = require('../middleware/checkImg');
const checkId = require('../middleware/checkId');
// error
const handleErrorAsync = require('../error/handErrorAsync');

router.post('/',checkId, checkImg, function(req, res, next) {
    handleErrorAsync(add_img(req, res))
});

module.exports = router;
