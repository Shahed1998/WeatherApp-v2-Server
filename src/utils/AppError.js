module.exports = class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // calls parent constructor similar to Error(message)
    this.statusCode = Number(statusCode);
    this.status = String(statusCode).startsWith('4')
      ? 'Failed'
      : 'Internal server error';
    this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
    // It gives us a stack that helps us to find the location of that error in the code
    // at which new Error() was Called.
    Error.captureStackTrace(this, this.constructor);
  }
};
