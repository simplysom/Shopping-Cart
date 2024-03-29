var createError = require('http-errors');
var express = require('express');
var expressHbs=require("express-handlebars");
var Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
var path = require('path');
var cookieParser = require('cookie-parser');
var session=require("express-session");
var logger = require('morgan');
var mongoose=require("mongoose");
var passport=require("passport");
var flash=require("connect-flash");
var validator=require("express-validator");
var MongoStore=require("connect-mongo")(session);



var indexRouter = require('./routes/index');
var UserRouter=require('./routes/user')

var app = express();

//Connecting to mongo db
mongoose.connect("mongodb+srv://som:som12345@cluster0.udaht.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser:true});
db=mongoose.connection;
require("./config/passport");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHbs({defaultLayout:'layout', extname:'.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session(
  {secret:'mysupersecret',
  resave:false,
  saveUninitialized:false,
  store:new MongoStore({mongooseConnection:mongoose.connection}),
  cookie:{maxAge:180*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.login=req.isAuthenticated();
  res.locals.session=req.session;
  next();
})

app.use('/user',UserRouter);
app.use('/', indexRouter);

//app.use('/users', usersRouter);

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
