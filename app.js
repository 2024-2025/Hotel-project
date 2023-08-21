var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt = require('jsonwebtoken')
var ClientRouter = require('./routes/ClientRouter');
var RoomRouter = require('./routes/RoomRouter');
var UserRouter = require('./routes/UserRouter');
var Login = require('./routes/Login');
var Payment = require('./routes/PaymentRouter');
const cors = require('cors')
// require('dot')
// console.log(process.env.ali)

var app = express();
app.use(express.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// app.use((req, res, next) => {

//   try {

//     let token = req.headers["token"]
//     if (!token) return res.send("token ma haysatid")

//     let decode = jwt.decode(token, 'token')
//     if (!decode) return res.send('xogtada waa qalad')
//     let endecode = jwt.verify(token, 'token')
//     next()
//     return endecode
//   } catch (error) {
//     res.send(error.message)

//   }


// })



app.use('/client', ClientRouter);
app.use('/room', RoomRouter);
app.use('/user', UserRouter);
app.use('/login', Login);
app.use('/payment', Payment);

//Connect Mongoose


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/Hotel-Project')
  .then(() => console.log('Connected Mongodb Database'));


//cheecking token



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
