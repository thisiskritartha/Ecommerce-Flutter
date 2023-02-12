const AppError = require('../utlis/appError');

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDb = (err) => {
  const value = err.errmsg.match(/(["'])(.*?[^\\])\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value !`;
  return new AppError(message, 400);
};

const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  //Programming or unknown error: don't leak error detail
  else {
    // 1) log the error
    console.error('ERROR ! 💥', err);

    // 2) Send the generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

//built-in error Constructor
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') error = handleCastErrorDb(err);
    if (err.code === 11000) error = handleDuplicateErrorDb(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDb(err);
    if (err.name === 'JsonWebTokenError') error = handleJwtError();
    if (err.name === 'TokenExpiredError') error = handleTokenExpire();

    sendErrorProd(error, res);
  }
};
