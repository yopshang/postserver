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
const imgRouter = require('./routes/img');

const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});
const dburl = process.env.DBURL;
const db_varified = dburl.replace(
    '<password>', process.env.DBPASSWORD
    )
//db
const mongoose = require('mongoose');
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
app.use('/posts', postsRouter);
app.use('/imgs', imgRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
