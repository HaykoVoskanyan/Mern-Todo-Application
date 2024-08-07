const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

const mongoose = require("mongoose")
const models = require("./Model")
const services = require("./Services")
require('dotenv').config()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.models = {
  users:models.users
}
app.services ={
  users:new services.users(app.models)
}


app.use(function(req, res, next) {
  next(createError(404));
});

const URL =process.env.TODO_APP_URL

mongoose
  .connect(URL)
  .then(()=>console.log('Connected'))
  .catch((err) => console.log(err));

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
