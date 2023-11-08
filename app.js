
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssProtection = require('x-xss-protection');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const blogPostRoutes = require('./routes/blogPostRoutes');


const app = express();

app.use(helmet());


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xssProtection());
app.use(cors());


app.use('/api/v1/blog-post', blogPostRoutes);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);


module.exports = app;