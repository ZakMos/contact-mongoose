var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const  Boom = require ('boom');

var addressRouter = require('./routes/addresses');
var contactRouter = require('./routes/contacts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/address', addressRouter);
app.use('/api/v1/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(Boom.notFound(`Sorry, cannot find: ${req.path}`));
});

// error handler
app.use(function(err, req, res, next) {
  let status, message;
  if(err.output){
    status = err.output.statusCode;
    message = err.output.payload;
  } else {
    status = err.status || 500;
    message = {
      message: err.message || 'Oops, somthing bad happend'
    };
  }
  res
  .status(staus)
  .json(message);

});

module.exports = app;
