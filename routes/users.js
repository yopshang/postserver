var  express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const handleErrorAsync = require('../error/handErrorAsync');
const checkId = require('../middleware/checkId');
const checkEmail = require('../middleware/checkEmail');


router.get('/',checkId , handleErrorAsync(async function(req, res, next) {
    const id = req.query.id;
    console.log('user id:', id);
    userController.get_my_user(req, res, id);
})
);
router.post('/addUser',checkEmail, handleErrorAsync(async function(req, res, next) {
    userController.add_user(req, res, next);
})
);

module.exports = router;
