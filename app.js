var express           = require('express');
var path              = require('path');
var cookieParser      = require('cookie-parser');
var logger            = require('morgan');
const Boom            = require('boom');

const addressRouter   = require('./routes/addresses');
const contactsRouter  = require('./routes/contacts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/address', addressRouter);
app.use('/api/v1/contact', contactsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(Boom.notFound(`Sorry, cannot find: ${req.path}`));
});

// error handler
app.use((err, req, res, next) => {
  let status, message;
  if(err.output){
    status = err.output.statusCode;
    message = err.output.payload;
  } else {
    status = err.status || 500;
    message = {
      message: err.message || 'Oops, something bad happened'
    };
  }

  res
    .status(status)
    .json(message);
});

module.exports = app;
