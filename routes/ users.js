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
connection.query("SELECT * FROM notices WHERE id='"+queryData['id']+"'",function(error,results,fields){
  console.log(error);
  res.jeon(results);
});
});



module.exports = router;
