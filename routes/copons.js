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
    connection.query("SELECT * FROM copon WHERE uid_copon='"+queryData['uid_copon']+"' ",function(error,results,fields){
      if(!error){
       console.log(results)
     var json_data = JSON.parse(JSON.stringify(results))[0];         
      console.log(json_data['is_open']) 
      if (json_data['is_open']=='1'){
    connection.query("UPDATE user SET course_file = CONCAT(course_file ,'" + "," + json_data['list_cours'] + " ') WHERE id='"+queryData['id']+"' ",function(error,resullts,fields){
         console.log(resullts)                                 //شيل هي              وهدول //الكوتيشن غلط 
         console.log(error)//دقيقة لجرب
    });   
      connection.query("UPDATE copon SET `is_open`='0' , `add_by`='"+queryData['user_id']+"' WHERE id='"+json_data['id']+"' ",function(error,resullts,fields){          
        res.json('تم تفعيل الكورس ');                    // يس هي 
        console.log(resullts)                         //اشتغل    
         console.log(error)
      });
     }else{
         res.json('error4');
      }
        
    }else{
          res.json('error5');
        }
   });
   });

router.get('/', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
 connection.query("SELECT  `name_copon`, `is_open`, `uid_copon`, `price` FROM copon  WHERE uid_copon='"+queryData['uid_copon']+"' ",function(error,resullt,fields){          
 console.log(resullt)
if(resullt.length != 0){
  res.json(resullt)
}else{
  res.send("notfound")
}
    });

   });




module.exports = router;
