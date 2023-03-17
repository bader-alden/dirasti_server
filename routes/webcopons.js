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
 connection.query("SELECT * FROM copon WHERE is_open ='0' ",function(error,resullt,fields){ 
   var all=[]
var json_data = JSON.parse(JSON.stringify(resullt));
    for(var i=0 ;i<json_data.length ; i++){
   var json_dat = JSON.parse(JSON.stringify(resullt))[i]['list_cours'];
        var m=json_dat.split("|")
       console.log(m)
      if(m[3]==queryData['id']) {//id teatcher
        console.log(m[3]);
        all.push(JSON.parse(JSON.stringify(resullt))[i])
       }
   }
    
 
// functialln check_file(list , queryData){
//   for(var i=0 ;i<list.length ; i++){
//       console.log(list);
//        var m=list[i].split("|")
// 

  
   }); 
   }); 





module.exports = router;