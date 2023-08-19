const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

// Open redis connection
const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    if (process.env.NODE_ENV === 'Development')
      console.log('Connected to Redis');
  } catch (err) {
    if (process.env.NODE_ENV === 'Development') console.log(err.message);
  }
};

// Close redis connection
const disconnectRedis = async () => {
  try {
    if (redisClient.isOpen) {
      await redisClient.disconnect();
      if (process.env.NODE_ENV === 'Development') {
        console.log('Disconnected from Redis');
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'Development') {
      console.log(err.message);
    }
  }
};

// Empty redis Database
exports.flushDb = async () => {
  try {
    await connectRedis();
    await redisClient.flushDb();
    await disconnectRedis();
  } catch (err) {
    // throw new Error(err);
    if (process.env.NODE_ENV === 'Development') console.log(err);
  }
};

// -----------------------------------------------------------
// Device
// -----------------------------------------------------------
exports.saveDevice = async (loc, data) => {
  await connectRedis();
  await redisClient.set(loc + process.env.APP_NAME, JSON.stringify(data));
  // TTL set to 1h
  await redisClient.expire(loc + process.env.APP_NAME, 1 * 60 * 60);
  await disconnectRedis();
};

exports.getDevice = async (loc) => {
  await connectRedis();
  const device = await redisClient.get(loc + process.env.APP_NAME);
  await disconnectRedis();
  return device;
};

// --------------------------------------------------------
// Countries
// --------------------------------------------------------
exports.saveCountries = async () => {
  // {
  //   countries: {
  //     bangladesh: {},
  //     india: {}
  //   }
  // }

  const countries = await redisClient.get('countries');
  if (!countries) {
    // use hash to store in the
    await redisClient.set('countries', JSON.stringify({}));
  }
  return JSON.parse(countries);
};
