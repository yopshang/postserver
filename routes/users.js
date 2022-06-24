var  express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
const handleErrorAsync = require('../error/handErrorAsync');
const chdckIfToken = require('../middleware/checkId');
const checkEmail = require('../middleware/checkEmail');
const loginVarify = require('../middleware/loginVarify');

router.post('/',chdckIfToken ,loginVarify, handleErrorAsync(async function(req, res, next) {
    // const id = req.query.id;
    // console.log('user id:', id);
    userController.login(req, res);
})
);
router.post('/addUser',checkEmail, handleErrorAsync(async function(req, res, next) {
    userController.add_user(req, res, next);
})
);

module.exports = router;
