var express = require('express');
var router = express.Router();

// models
const userModel = require('../models/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    const users = await userModel.find({});
    res.status(200).json(users);
    console.log('取得users');
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
