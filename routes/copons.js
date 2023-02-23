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
    connection.query("SELECT * FROM `copon` WHERE name='"+queryData['name']+"' ",function(error,results,fields){
        if(!error){
          console.log(results)
          res.json(true);
    connection.query("INSERT INTO `user`(`course_file`) VALUES ('"+queryData['name']+"') WHERE id='"+queryData['id']+"' ",function(error,resullts,fields){
         console.log(resullts)
    });
          connection.query("UPDATE `copon` SET `id`='[value-1]',`list_cours`='[value-2]',`is_open`='[value-3]',`add_by`='[value-4]',`name`='[value-5]' WHERE 1 WHERE id='"+queryData['id']+"' ",function(error,resullts,fields){

       });
    }else{
          res.json(false);
        }
   });
   });








































module.exports = router;
