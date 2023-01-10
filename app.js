var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var Index = require('./routes/index');
var GetTokenRouter = require('./routes/Get_Token');
var GetMusicInfoRouter = require('./routes/Get_Music_Info');

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',Index);
app.use('/Get_Token', GetTokenRouter);
app.use('/Music_Info', GetMusicInfoRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.render('error');
});

module.exports = app;
