const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const weatherRouter = require('./routes/weatherRoutes');
const AppError = require('./utils/AppError');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
const corsOption = {
  origin: ['https://shahed-weather-app-v2.netlify.app/'],
  methods: 'POST',
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Route middleware
app.use('/api/weather', weatherRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(errorHandler);

module.exports = app;
