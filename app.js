var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerConfig = require('./config/swagger-config');
var swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const mysqldb = require('./models/mysql-models/index');
const mongoose = require('mongoose');
var cors = require('cors')
require('./nodemailer');
require('./passport');

// including routers
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// enabling cors
app.use(cors({credentials: true, origin: true}));

// serve static files
app.use('/api/uploads', express.static('public/uploads'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(passport.initialize());

// Catch mysql connection error
app.use(function(req, res, next) {
  mysqldb
  .sequelize
  .authenticate()
  .then(next())
  .catch(err => {
    res.status(500).json({errors: "Can't connect to database!"});
  });
})
// Mongo db connection
mongoose.connect(require('./config/migrate-mongo-config').fullPath, { useNewUrlParser: true }, err => {
  if (err) return console.error("[ERROR] Unable to connect to mongodb!\n" + err);
  console.log("Successfully connected to mongodb");
})

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerConfig)));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
