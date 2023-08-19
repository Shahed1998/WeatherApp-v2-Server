require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000;
const schedule = require('node-schedule');
const cachingUtils = require('./utils/caching');

// -------------------------------------------------------------------------------
// Scheduler
// scheduled jobs will only fire as long as your script is running
// After every 24hrs at 0:0:0 am the redis data will be truncated
// -------------------------------------------------------------------------------
schedule.scheduleJob('0 0 0 * * *', () => {
  (async () => {
    await cachingUtils.flushDb();
  })();
});
// -------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
