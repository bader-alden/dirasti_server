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

router.post('/', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("SELECT * FROM `copon` WHERE name="+queryData['name']+" ",function(error,results,fields){
        if(!error){
          console.log(results)
          res.json(true);
    connection.query("INSERT INTO `user`(`course_file`) VALUES ('json_data['name']') ",function(error,results,fields){
         });
    }else{
          res.json(false);
        }
   });
   });








































module.exports = router;
