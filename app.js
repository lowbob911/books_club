var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/booksclub/books', indexRouter);

app.use(function(req, res, next) {
  res.sendStatus(404);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});

module.exports = app;
