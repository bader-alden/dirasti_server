var express = require('express');
var router = express.Router();
var url=require('url');
var mysql=require('mysql');
var connection = mysql.createConnection({
        host: 'db4free.net',
        user: 'derasti',
        password: 'derasty123#',
        database: 'derasti'
});
connection.connect();
router.get('/Coupon_points_of_sale', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT * FROM Coupon_points_of_sale" ,function(error,results) {
       res.send(results);
      });
  })

router.get('/privacy_policy', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT * FROM privacy_policy" ,function(error,results) {
       res.send(results);
      });
  })
//hi
router.get('/Frequently_questions', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT `id`, `questions`, `answer` FROM Frequently_questions" ,function(error,results) {
       res.send(results);
      });
  })

router.get('/Social_Media', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT * FROM Social_Media" ,function(error,results) {
       res.send(results);
      });
  })

router.get('/the_support', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT * FROM  the_support " ,function(error,results) {
       res.send(results);
      });
  })



module.exports = router;


