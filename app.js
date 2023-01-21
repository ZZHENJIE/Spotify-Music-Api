var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var GetTokenRouter = require('./routes/Get_Token');
var GetMusicInfoRouter = require('./routes/Get_Music_Info');
var GetSearchRouter = require('./routes/Search');
var GetMusicUrlRouter = require('./routes/Get_Music_Url');
var GetAlbumInfoRouter = require('./routes/Get_Album_Info');
var GetAlbumMusicRouter = require('./routes/Get_Album_Music');
var UserData = require('./routes/User_Data');

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Get_Token', GetTokenRouter);
app.use('/Music_Info', GetMusicInfoRouter);
app.use('/Search', GetSearchRouter);
app.use('/Music_Url', GetMusicUrlRouter);
app.use('/Album_Info', GetAlbumInfoRouter);
app.use('/Album_Music', GetAlbumMusicRouter);
app.use('/User', UserData);

app.use('/',express.Router().get('/', function(req, res, next) {
  res.render('index');
}));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.render('error');
});

module.exports = app;
