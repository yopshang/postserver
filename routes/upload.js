var  express = require('express');
var router = express.Router();
// controller
const add_img = require('../controllers/upload');
// middleware
const isAuth = require('../service/isAuth');
const checkImg = require('../middleware/checkImg');
// const checkId = require('../middleware/checkId');
// error
const handleErrorAsync = require('../service/handErrorAsync');

router.post('/', checkImg,isAuth ,function(req, res, next) {
    handleErrorAsync(add_img(req, res))
});

module.exports = router;
