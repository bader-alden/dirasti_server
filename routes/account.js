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
  if(resultts.length!=0){                                              
   var json_data = JSON.parse(JSON.stringify(resultts[0]));            
  if (json_data['secret_code']=='restart'){  
        connection.query("UPDATE user SET secret_code='"+queryData['secret_code']+"' WHERE mobile_id='"+queryData['mobile_id']+"' ",function(error,results,fields){
   
      if(!error){
   connection.query("UPDATE user SET `gsm_token`='"+queryData['gsm_token']+"',`gsm_token2`='"+queryData['gsm_token2']+"' WHERE mobile_id='"+queryData['mobile_id']+"'",function(error,resultte,fields){
   });   } 
         res.json(resultts);
            });    }
  if (queryData['secret_code']==json_data['secret_code']){
      
      if(!error){
   connection.query("UPDATE user SET `gsm_token`='"+queryData['gsm_token']+"',`gsm_token2`='"+queryData['gsm_token2']+"' WHERE mobile_id='"+queryData['mobile_id']+"'",function(error,resultte,fields){
       
   });  
   }   res.json(resultts);
     }if  (queryData['secret_code']!=json_data['secret_code']&&json_data['secret_code']!='restart'){
        res.json('error1');
      }
 }else{   
         res.json('error2');
 }
    
     });
    });
router.post('/login_id', function(req, res, next) {
  var queryData=url.parse(req.url,true).query;
      connection.query("SELECT * FROM user WHERE user_id='"+queryData['user_id']+"' ",function(error,resultts,fields){
  if(resultts.length!=0){                                              
   var json_data = JSON.parse(JSON.stringify(resultts[0]));           
    
      if (json_data['secret_code']==queryData['secret_code']){  
      
         res.json(resultts);
      }
     if  (queryData['secret_code']!=json_data['secret_code']&&json_data['secret_code']!='restart'){
        
        res.json('error1');
      }
 }else{   
         res.json('error2');
 }
    
     });
    });
router.post('/update_account', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("UPDATE user SET name ='"+queryData['name']+"', mobile_id='"+queryData['mobile_id']+"', is_male= '"+queryData['is_male']+"',grade= '"+queryData['grade']+"' WHERE secret_code='"+queryData['secret_code']+"' ",function(error,results,fields){
     
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
router.post('/signin',async function(req, res, next) {
    var queryData=url.parse(req.url,true).query;  
  await  connection.query("SELECT mobile_id FROM user WHERE mobile_id='"+queryData['mobile_id']+"' ",async function(error,results,fields){
                                           
  if(results.length==0 ){ 
  await connection.query("INSERT INTO user (`name`, `is_male`, `course_file`,`grade`,`mobile_id`,`secret_code`,`gsm_token`, `gsm_token2`) VALUES ('"+queryData['name']+"','"+queryData['is_male']+"',' ','"+queryData['grade']+"', '"+queryData['mobile_id']+"', '"+queryData['secret_code']+"','"+queryData['gsm_token']+"','"+queryData['gsm_token2']+"')",async function(error,resullts,fields){
      
  });
    await connection.query("SELECT `user_id` FROM user WHERE mobile_id='"+queryData['mobile_id']+"'",function(error,result,fields){
    
        var json_data = JSON.parse(JSON.stringify(result))[0]['user_id'];             
         res.json(json_data)
         //res.json('welcome in dirasty app');
    });
    
 
  }else {
    res.json('error3');
  }
    });
});
 
module.exports = router;
