/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./public/javascripts/server');

var app = express();*/
/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/
var app = require('http').createServer(index);
var io = require('socket.io').listen(app);
var fs = require('fs');
var url = require('url');

app.listen(3000, function(){
  console.log("Servidor rodando!");
});

function index(req, res){
  var myPath = url.parse(req.url).pathname;
  var myPath = myPath.split(".");

  if(myPath.length > 1){
    fs.readFile(__dirname + myPath[0] + "." + myPath[1], function(err, data){
      res.end(data);
    });
  }else{
    fs.readFile(__dirname + '/index.html', function(err, data){
      res.end(data);
    });
  }
}


io.on('connection', function(socket){
  socket.on('mensagem', function(mensagem){
    socket.broadcast.emit('mensagem', mensagem);
  });
});

module.exports = app;
