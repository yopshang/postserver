var express = require('express');
var router = express.Router();

const getAll = require('../controllers/get');

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
    const users = await userModel.find({});

    res.status(200).json(users);
    console.log('取得users');
  }catch(err){
    console.log(err);
  }
});

module.exports = router;
