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
//تسجيل دخول 
router.post('/login', function(req, res, next) {
  var queryData=url.parse(req.url,true).query;
      connection.query("SELECT * FROM user WHERE mobile_id='"+queryData['mobile_id']+"' ",function(error,resultts,fields){
        console.log(resultts);                                       
  if(resultts!=null){                                              
   var json_data = JSON.parse(JSON.stringify(resultts[0])); //ليش ما حطيت ال0 هون            
      console.log(json_data['secret_code'])   
      if (json_data['secret_code']=='restart'){  
       connection.query("UPDATE user SET secret_code='"+queryData['secret_code']+"' WHERE mobile_id='"+queryData['mobile_id']+"' ",function(error,results,fields){
        console.log(results);
        console.log(200);
        // res.json("bravvvvvo best🔥🔥🔥")
         res.json(resultts['user_id']);
            });
      }
      if (queryData['secret_code']==json_data['secret_code']){
        console.log(200);
         res.json(resultts);
            console.log(json_data[0]['secret_code']) 
     }if  (queryData['secret_code']!=json_data['secret_code']&&json_data['secret_code']!='restart'){
        console.log(404);
        res.json('error1');
      }
 }else{  
        
         res.json('error2');
 }
    
     });
    });
router.post('/update_account', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("UPDATE user SET email ='"+queryData['email']+"', mobile_id='"+queryData['mobile_id']+"', is_male= '"+queryData['is_male']+"',grade= '"+queryData['grade']+"' WHERE secret_code="+queryData['secret_code']+" ",function(error,results,fields){
        if(!error){
          res.json(true);
        }else{
          res.json(false);
        }
   });
   });

router.post('/delete_account', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("DELETE FROM  user  WHERE secret_code='"+queryData['secret_code']+"' ",function(error,results,fields){
        if(!error){
          res.json(true);
        }else{
          res.json(false);
        }
   });
   });
//انشاء حساب 
router.post('/signin', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;  
    connection.query("SELECT mobile_id FROM user WHERE mobile_id='"+queryData['mobile_id']+"' ",function(error,results,fields){
        console.log(results.length==0);                                       
        console.log(results);                                       
  if(results.length==0){ 
    connection.query("INSERT INTO user (`name`, `email`, `is_male`, `course_file`,`grade`,`mobile_id`,`secret_code`) VALUES ('"+queryData['name']+"','"+queryData['email']+"','"+queryData['is_male']+"',' ','"+queryData['grade']+"', '"+queryData['mobile_id']+"', '"+queryData['secret_code']+"')",function(error,results,fields){
         console.log(error)
         console.log(results)
         res.json('welcome in dirasty app');
    });
  }else {
    res.json('error3');
  }
    });
});
 
module.exports = router;
