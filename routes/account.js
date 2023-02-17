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
      connection.query("SELECT * FROM users WHERE mobile_id="+queryData['mobile_id']+" ",function(error,resultts,fields){
  if(resultts!=null){
//           var json_data = JSON.parse(JSON.stringify(resultts));
//     if (json_data['secret_code']=='restart'){  
//        connection.query("UPDATE users SET secret_code="+queryData['secret_code']+" WHERE mobile_id="+queryData['mobile_id']+" ",function(error,results,fields){
//         console.log(results);
//        console.log(200);
//             });
//     }
//     if (queryData['secret_code']==json_data['secret_code']){
//         console.log(200);
//     } if  (queryData['secret_code']!=json_data['secret_code']){
//         console.log(404);
//       }
//  }else{  
//          console.log(404);
//          res.json(404);
// }
    
   });
    });
router.post('/update_account', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("UPDATE users SET email ="+queryData['email']+", mobile_id="+queryData['mobile_id']+", is_male= '"+queryData['is_male']+"',grade= '"+queryData['grade']+"' WHERE secret_code="+queryData['secret_code']+" ",function(error,results,fields){
        if(!error){
          res.json(true);
        }else{
          res.json(false);
        }
   });
   });

router.post('/delete_account', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("DELETE FROM  user  WHERE secret_code="+queryData['secret_code']+" ",function(error,results,fields){
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
    connection.query("INSERT INTO user (`name`, `email`, `is_male`,`grade`,'mobile_id','secret_code') VALUES ('"+queryData['name']+"','"+queryData['email']+"','"+queryData['is_male']+"','"+queryData['grade']+"', '"+queryData['mobile_id']+"', '"+queryData['secret_code']+"',' ',' ')",function(error,results,fields){
         console.log(error)
         console.log(results) 
    });
    });

module.exports = router;
