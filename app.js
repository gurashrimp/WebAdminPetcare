var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const { initializeApp } = require('firebase-admin/app');


const mongoose = require('mongoose');


var router = require('./routes/router');
var api = require('./routes/api');

var app = express();

app.use(express.static('public'));

// require('./components/employee/model');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
  secret: 'mykey',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

const connectDB = async()=>{mongoose.connect('mongodb+srv://phpmongodb:dunghoitao1@testmongo.rmuwr.mongodb.net/graduation_BE?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('DB Connected !'))
  .catch(err => console.log('DB Error: ', err));}
connectDB();
app.use('/', router);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.use('/public', express.static('public'));
app.use(express.static('public'))


module.exports = app;
