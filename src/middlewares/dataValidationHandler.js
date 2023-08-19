const AppError = require('../utils/AppError');

exports.validateLongitudeAndLatitude = (req, res, next) => {
  try {
    if (!req.body.longitude || !req.body.latitude) {
      return next(new AppError('Invalid request body', 400));
    } else if (!Number(req.body.latitude) || !Number(req.body.longitude)) {
      return next(new AppError('Invalid request body', 400));
    }

    // converting to number
    req.body.latitude = Number(req.body.latitude);
    req.body.longitude = Number(req.body.longitude);
    return next();
  } catch (ex) {}
};
