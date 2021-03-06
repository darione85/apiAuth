var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var winston = require('winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/config.js')

var db = mongoose.connect(config.database,{ useMongoClient: true });


winston.add(winston.transports.File, {filename: 'log/apps.log'});


var users = require('./routes/users');
var customers = require('./routes/customers');
var index = require('./routes/index');


var app = express();

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var middleware = require('./middleware/middleware')

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//mi converrea usare ejs
app.set('view engine', 'jade');

app.set('superSecret', config.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.locals()

//app.use('/users',middleware.verifyToken);


app.use('/', index);
app.use('/users', users);
app.use('/customers',customers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.use(middleware.verifyToken)

module.exports = app;
