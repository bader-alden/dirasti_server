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
    connection.query("SELECT * FROM copon WHERE name_copon='"+queryData['name_copon']+"' ",function(error,results,fields){
      if(!error){
       console.log(results)
     var json_data = JSON.parse(JSON.stringify(results[0]));         
      console.log(json_data['is_open']) 
      if (json_data['is_open']=='0'){
    connection.query("INSERT INTO user (`course_file`) VALUES (course_file + "," + '"+queryData['list_cours']+"') WHERE id='"+queryData['id']+"' ",function(error,resullts,fields){
         console.log(resullts)
    });   
      connection.query("UPDATE copon SET `is_open`='1'  WHERE id='"+json_data['id']+"' ",function(error,resullts,fields){
       });                               //هي كيف حطا 
      connection.query("INSERT INTO copon ( `add_by`) VALUES ('"+queryData['id']+"')",function(error,resullts,fields){
     });
     }else{
         res.json('error4');
      }
        
    }else{
          res.json('error5');
        }
   });
   });








































module.exports = router;
