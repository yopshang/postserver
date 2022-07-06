const jwt = require('jsonwebtoken');
const handErrorAsync = require('../service/handErrorAsync')
const appError = require('../service/appError');
const userController = require('../controllers/user');

const isAuth = handErrorAsync(async (req, res, next) => { // 驗證登入會以middleware使用 
  // 確認token是否存在
  let token;
  if(res.headers.authorization && req.headers.authorization.startWith('Auth')) {// 確認是否token用Auth
    token = req.headers.authorization.split('')[1]; // 取得token後拿第[1]個, 有取到代表有登入，沒取到代表沒登入
  }
  if(!token){ // token不存在代表未登入 next到錯誤回報
    return next(appError(401, '您尚未登入!', next));
  }
  // 建立一個promise用來驗證token正確性
  const decode = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
      if(err){
        reject(err)
      } else {
        resolve(payload)
      }
    })
  })
  const currentUser = await userController.findById(decode.id); // 使用解碼出來的id去db撈目前使用者帳號

  req.user = currentUser; // 字定義req中的User為目前撈到的user
  next();
})

const generateJWT = (user, statusCode, res)=>{
  // 產生JWT token
  // 使用id去簽發一個token
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_DAY // 設定token到期天數
  })
  user.password = undefined; // 設為undefined? 不要讓前台看到?
  res.status(statusCode).json({ // 回傳東西給前台
    status: 'success',
    user: {
      token,
      user: user.name
    }
  })
}

module.exports = { // 驗證登入與簽發jwt 個別匯出
  isAuth,
  generateJWT
}
