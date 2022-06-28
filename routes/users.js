var  express = require('express');
var router = express.Router();

// controller
const get_my_user = require('../controllers/get_my_user');
const handleErrorAsync = require('../error/handErrorAsync');
const userController = require('../controllers/user');

// middeleware
const checkId = require('../middleware/checkId');
const checkEmail = require('../middleware/checkEmail');

router.get('/',checkId , async function(req, res, next) {
    const id = req.query.id;
    get_my_user(req, res, id);
});
router.post('/add_user', checkEmail, (req, res, next)=>{
    handleErrorAsync(userController.add_user(req, res, next))
});

module.exports = router;
