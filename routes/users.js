var  express = require('express');
var router = express.Router();

const get_my_user = require('../controllers/get_my_user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    const id = req.params.id;
    console.log('user id:', id);
    get_my_user(req, res, id);
  }catch(err){
    console.log(err);
  }
});
// router.get('/myfollows/:id', async function(req, res, next) {
//   try{
//     const id = await req.params.id;
//     get_myfollows(res, req, id);
//   }catch(err){
//     console.log(err);
//   }
// });

module.exports = router;
