module.exports = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Internal server error';
  if (process.env.NODE_ENV === 'Development') {
    return res.status(errStatus).json({
      status: 'Failed',
      message: errMsg,
      stackTrace: err.stack,
    });
  } else {
    if (err.isOperational) {
      return res.status(errStatus).json({
        status: 'Failed',
        message: errMsg,
      });
    } else {
      return res.status(500).json({
        status: 'Failed',
        message: 'Internal server error',
      });
    }
  }
};
