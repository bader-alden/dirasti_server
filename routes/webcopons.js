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
   for(var ii=0 ;ii<json_dat[i].length ; ii++){
 //  var l= ii.split("|")
   if(ii[3]==queryData['id']) //id teatcher
   console.log(ii);
   }
    }
    
 
// function check_file(list , queryData){
//   for(var i=0 ;i<list.length ; i++){
//       console.log(list);
//        var m=list[i].split("|")
// 

  
   }); 
   }); 





module.exports = router;