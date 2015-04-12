var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var myueditor = require('./routes/ueditor');
//公共文档路由
var publicDoc = require('./routes/publicDoc');
var content = require('./routes/content');
var edit = require('./routes/edit');
var addArticle = require('./routes/addArticle');
var updateArticle = require("./routes/updateArticle");
var search = require("./routes/search");
var profile = require("./routes/profile");
//项目路由
var projectDoc = require("./routes/projectDoc");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/edit',edit);
app.use('/users', users);
app.use('/ueditor/ue',myueditor);
app.use('/doc',publicDoc);
app.use('/content',content);
app.use('/addArticle',addArticle);
app.use('/updateArticle',updateArticle);
app.use('/search',search);
//项目文档
app.use('/projectDoc',projectDoc);
app.use('/profile',profile);

//创建服务
var server = app.listen(3000,function(){
  console.log("Listening on port %d", server.address().port);
})
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
});



module.exports = app;
