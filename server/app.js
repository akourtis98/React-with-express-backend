var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


// Routes
var articlesRouter = require('./routes/api/articles');
var profileRouter = require('./routes/api/profile');
var postsRouter = require('./routes/api/posts');
var userRouter = require('./routes/api/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// use routes
app.use('/routes/api/articles/', articlesRouter);
app.use('/routes/api/posts/', postsRouter);
app.use('/routes/api/profile/', profileRouter);
app.use('/routes/api/user/', userRouter);

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
