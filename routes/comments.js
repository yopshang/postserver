const express = require('express');
const router = express.Router();
// controller
const add_comment = require('../controllers/add_comment')
// error
const handleErrorAsync = require('../service/handErrorAsync');
// middleware
const checkId = require('../middleware/checkId');
const checkContent = require('../middleware/checkContent');
// route
router.post('/', checkId, checkContent, function(req, res, next){
    handleErrorAsync(add_comment(req, res, next))
})

module.exports = router;

