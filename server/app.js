var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
const cors = require('cors');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


// Routes
var indexRouter = require('./routes/index');
var getArticlesRouter = require('./routes/getArticles');
var testRouter = require('./routes/testRouter');
var createUser = require('./routes/createUser');
var createArticle = require('./routes/createArticle');
var loginRouter = require('./routes/loginUser');

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

app.use('/', indexRouter);
app.use('/fetch/articles', getArticlesRouter);
app.use('/test', testRouter);
app.use('/create/', createUser);
app.use('/create/', createArticle);
app.use('/login', loginRouter);

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
