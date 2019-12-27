var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var common = require('./lib/common');
var setttings = require('./config/mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var cartRouter = require('./routes/cart');
var addressRouter = require('./routes/address');
var orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: setttings.cookieSecret,
  key: setttings.db,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 1 //一天过期
  },
  store: new mongoStore({
    url: setttings.url
  })
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});

// app.use(common.checkLogin);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);

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
