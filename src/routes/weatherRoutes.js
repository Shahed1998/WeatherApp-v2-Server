const express = require('express');
const dataValidationHandler = require('../middlewares/dataValidationHandler');
const cacheHandler = require('../middlewares/cacheHandler');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

router
  .route('/device-location')
  .post(
    dataValidationHandler.validateLongitudeAndLatitude,
    cacheHandler.checkDeviceInCache,
    weatherController.getDataUsingLongitudeAndLatitude
  );

module.exports = router;
