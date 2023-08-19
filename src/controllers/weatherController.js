const axios = require('axios');
const cachingUtils = require('../utils/caching');
const AppError = require('../utils/AppError');

exports.getDataUsingLongitudeAndLatitude = async (req, res, next) => {
  try {
    const apiData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );

    // Converting to UTC time
    let sunrise = new Date(apiData.data.sys.sunrise * 1000);
    let sunset = new Date(apiData.data.sys.sunset * 1000);

    // Sunrise
    apiData.data.sys.sunrise = `${
      sunrise.getHours() < 10 ? '0' + sunrise.getHours() : sunrise.getHours()
    }:${
      sunrise.getMinutes() < 10
        ? '0' + sunrise.getMinutes()
        : sunrise.getMinutes()
    }`;

    // Sunset
    apiData.data.sys.sunset = `${
      sunset.getHours() < 10 ? '0' + sunset.getHours() : sunset.getHours()
    }:${
      sunset.getMinutes() < 10 ? '0' + sunset.getMinutes() : sunset.getMinutes()
    }`;

    // Saving data to redis
    await cachingUtils.saveDevice(
      `${req.body.latitude},${req.body.longitude}`,
      apiData.data
    );

    return res.status(200).json({
      status: 'Success',
      data: apiData.data,
    });
  } catch (ex) {
    next(new AppError('Address not found', '404'));
  }
};
