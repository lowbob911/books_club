var express = require('express');
var router = express.Router();


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('Birds home page');
});

router.get('/booksclub/test', function(req, res) {
  res.send('Birds home page1');
});

router.get('/test', function(req, res) {
  res.send('Birds home page');
});

module.exports = router;
