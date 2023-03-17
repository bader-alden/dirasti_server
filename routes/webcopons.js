 const express = require('express');
const router = express.Router();
const url = require('url');


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'derasti',
  password: 'derasty123#',
  database: 'derasti'
});
connection.connect();

router.get('/', function(req, res, next) {
   var queryData=url.parse(req.url,true).query;
 connection.query("SELECT * FROM copon  ",function(error,resullt,fields){ 
var json_data = JSON.parse(JSON.stringify(resullt));
    for(var i=0 ;i<json_data.length ; i++){
   var json_dat = JSON.parse(JSON.stringify(resullt))[i]['list_cours'];
     var l= json_dat.split("|")
     }  for(var i=0 ;i<l.length ; i++){
   if(i[3]==queryData['id']) //id teatcher
   console.log(i);
       
   connection.query("SELECT `id`, `list_cours`, `is_open`, `add_by`, `name_copon`, `uid_copon`, `price`, `grade` FROM copon WHERE 1 ",function(error,resullt,fields){
   }); 
   }
    
 
// function check_file(list , queryData){
//   for(var i=0 ;i<list.length ; i++){
//       console.log(list);
//        var m=list[i].split("|")
// 

  
   }); 
   }); 





module.exports = router;