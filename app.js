var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const postRouter = require('./routes/post');
const imgRouter = require('./routes/upload');
const commentRouter = require('./routes/comments');

const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});
const dburl = process.env.DBURL;
const db_varified = dburl.replace(
    '<password>', process.env.DBPASSWORD
    )

// error
const appError = require('./service/appError')

//db
const mongoose = require('mongoose');
const res = require('express/lib/response');
try{
  // mongoose.connect('mongodb://localhost:27017/meta').then(()=>{
  mongoose.connect(db_varified).then(()=>{
    console.log('資料庫連接成功');
  })
}catch(err){
  console.log('資料庫連接錯誤',err);
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/imgs', imgRouter);
app.use('/comments', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(appError(404, '找不到該頁面，請重新搜尋', next));
});


// 錯誤管理
app.use(function(err, req, res, next) {
  if(process.env.NODE_ENV == 'dev') { // 開發區，這區才回傳stack
    if (err.isOperational){
      res.status(400).json({
        status: 'error',
        massage: err.message,
        stack: err.stack
      })
    } else {
      res.status(400).json({
        status: 'error',
        massage: '出現不明錯誤'
      })
    }
  } else {
    if (err.isOperational){
      res.status(400).json({
        status: 'error',
        massage: err,
      })
    } else {
      res.status(400).json({
        status: 'error',
        massage: '出現不明錯誤'
      })
    }
  }
});

// 未捕捉到的 catch 
process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', reason);
  // 記錄於 log 上
});

process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
	console.error('Uncaughted Exception！')
	console.error(err);
	process.exit(1);
});

module.exports = app;
