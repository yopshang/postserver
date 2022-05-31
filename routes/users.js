var  express = require('express');
var router = express.Router();

const get_my_user = require('../controllers/get_my_user');
const handleErrorAsync = require('../error/handErrorAsync');
const checkId = require('../middleware/checkId');

router.get('/',checkId , handleErrorAsync(async function(req, res, next) {
    const id = req.query.id;
    console.log('user id:', id);
    get_my_user(req, res, id);
})
);

module.exports = router;
