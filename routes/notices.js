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

router.get('/', function(req, res, next) {
   var queryData=url.parse(req.url,true).query;
connection.query("SELECT * FROM notices WHERE user_id='"+queryData['user_id']+"' or user_id='public' ",function(error,results,fields){
  console.log(error);
   console.log(results);
  res.json(results);
});
});

router.post('/', function(req, res, next) {
   var queryData=url.parse(req.url,true).query;
connection.query("INSERT INTO notices (`title`, `body`,`user_id`) VALUES ('"+queryData['title']+"','"+queryData['body']+"','"+queryData['user_id']+"')" ,function(error,results,fields){
  console.log(error);
   console.log(results);
  res.json(results);
});
});


module.exports = router;