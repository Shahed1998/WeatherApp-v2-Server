const AppError = require('../utils/AppError');
const cachingUtils = require('../utils/caching');

exports.checkDeviceInCache = async (req, res, next) => {
  try {
    // checking if device is available in cache
    const device = await cachingUtils.getDevice(
      `${req.body.latitude},${req.body.longitude}`
    );

    // If device is already saved, no need to call api
    if (device !== null) {
      return res.status(200).json({
        status: 'Success',
        data: JSON.parse(device),
      });
    }
    return next();
  } catch (ex) {
    return next(new AppError('Internal server error', 500));
  }
};
