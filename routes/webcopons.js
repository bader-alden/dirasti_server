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
 connection.query("SELECT `id`, `list_cours`, `is_open`, `add_by`, `name_copon`, `uid_copon`, `price`, `grade` FROM copon  ",function(error,resullt,fields){ 
  var json_data = JSON.parse(JSON.stringify(resullt))[0]['list_cours'];
   console.log(resullt);
   if(check_course(t,json_data)){
      console.log(json_data)
      res.send('error1');
    }else { 
   if (json_datta==json_dat){
        console.log(resullt)
         res.send(resullt)
     }else{
        res.send('error10')
    }
    }
   });
   
   });         

function check_file(list , queryData){
  for(var i=0 ;i<list.length ; i++){
      console.log(list);
       var m=list[i].split("|")
     if(m[0]==queryData['is_course'] &&
         m[1]==queryData['grade'] && 
         m[2]==queryData['subject'] && 
         m[3]==queryData['teacher_name'] && 
         m[4]==queryData['file']
       ){
       return true;
       }
     }
  return false;
}

  
   }); 
   }); 





module.exports = router;