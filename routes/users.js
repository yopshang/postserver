var  express = require('express');
var router = express.Router();

// controller
const handleErrorAsync = require('../service/handErrorAsync');
const userController = require('../controllers/user');

// middeleware
const checkId = require('../middleware/checkId');
const checkEmail = require('../middleware/checkEmail');
const checkPassword = require('../middleware/checkPassword');
const ifPasswordCorrect = require('../middleware/ifPasswordCorrect');

// route
router.get('/',checkId , (req, res, next)=>{
    handleErrorAsync(sign_in(req, res));
});
router.post('/sign_up', checkEmail, checkPassword, (req, res, next)=>{
    handleErrorAsync(userController.sign_up(req, res, next));
});
router.post('/sign_in', checkEmail, checkPassword, ifPasswordCorrect,(req, res, next)=>{
    handleErrorAsync(userController.sign_up(req, res, next));
});

module.exports = router;
