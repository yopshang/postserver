var  express = require('express');
var router = express.Router();

// controller
const get_my_user = require('../controllers/get_my_user');
const handleErrorAsync = require('../error/handErrorAsync');
const userController = require('../controllers/user');

// middeleware
const checkId = require('../middleware/checkId');
const checkEmail = require('../middleware/checkEmail');

// route
router.get('/',checkId , (req, res, next)=>{
    handleErrorAsync(get_my_user(req, res));
});
router.post('/add_user', checkEmail, (req, res, next)=>{
    handleErrorAsync(userController.add_user(req, res, next));
});

module.exports = router;
