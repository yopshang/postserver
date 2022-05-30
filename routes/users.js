var  express = require('express');
var router = express.Router();

const get_my_user = require('../controllers/get_my_user');
const appError = require('../error/appError');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.query.id == undefined || req.query.id.length == 0){
        return appError(400, "你沒有填寫id", next);
    } else {
        const id = req.query.id;
        console.log('user id:', id);
        get_my_user(req, res, id);
    }
});

module.exports = router;
