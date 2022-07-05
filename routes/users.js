var  express = require('express');
var router = express.Router();

// controller
const handleErrorAsync = require('../service/handErrorAsync');
const userController = require('../controllers/user');

// middeleware
const checkId = require('../middleware/checkId');
const checkEmail = require('../middleware/checkEmail');
const checkPassword = require('../middleware/checkPassword')

// route
router.get('/',checkId , (req, res, next)=>{
    handleErrorAsync(sign_in(req, res));
});
router.post('/sign_up', checkEmail, checkPassword, (req, res, next)=>{
    handleErrorAsync(userController.sign_up(req, res, next));
});

module.exports = router;
