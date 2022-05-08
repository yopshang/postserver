var express = require('express');
var router = express.Router();

const getAll = require('../controllers/get');
const get_myfollows = require('../controllers/get_myfollows');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    getAll(req, res)
  }catch(err){
    console.log(err);
  }
});
router.get('/myfollows', async function(req, res, next) {
  try{
    get_myfollows(res, req);
  }catch(err){
    console.log(err);
  }
});

module.exports = router;
