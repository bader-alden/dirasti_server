//                                                                  🧿 ملك خاص ل اسراء 🧿
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var noticesRouter = require('./routes/notices');
var coponsRouter = require('./routes/copons');
var app = express();
const mysql = require('mysql');
var server = app.listen((3000),()=>{
    console.log("work in 3000");
});
const connection = mysql.createConnection({
    host:'db4free.net',
    user:'derasti',
    password:'derasty123#',
    database:'derasti'
});
connection.connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/notices', noticesRouter);
app.use('/account', accountRouter);
app.use('/copons', coponsRouter);
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
