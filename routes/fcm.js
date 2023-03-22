var express = require('express');
var router = express.Router();
var url=require('url');
var admin = require("firebase-admin");

/* GET home page. */ 

/// created_at
var serviceAccount = require("../dirasti-d3528-firebase-adminsdk-avoke-732614516e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'derasti',
  password: 'derasty123#',
  database: 'derasti'
});
connection.connect();
const admind= function (req, res, next) {
  var queryData=url.parse(req.url,true).query; 
connection.query( "SELECT is_read FROM dashboard WHERE id= '"+queryData['user_id_check']+"' AND password= '"+queryData['pass_check']+"'" ,function(error,results,fields){

     var json_data = JSON.parse(JSON.stringify(results))[0];
if(json_data['is_read']==0){

  next()
}else{
  
  res.send('esraa  developed this servar and her best help her >>>  ')
}
});
}
router.post('/all',admind, function(req, res, next) {
var queryData=url.parse(req.url,true).query;
  const message = {
     'android': {
      "notification": {
        "title":  "دراستي",
        "body": queryData["body"],
        "sound": "mysound",
        "tag": "alerts",
        "priority": "high",
        "icon": "myicon",
        "channelId": "high_importance_channel",
      }},
       "topic" : "/topics/all"
};
 admin.messaging().send(message)
  .then((response) => {
   res.json(response)
  
   var queryDat=url.parse(req.url,true).query;
   connection.query("INSERT INTO notices (`title`, `body`, `user_id`) VALUES ('"+queryDat['title']+"','"+queryDat['body']+"','public')", function(error,results,fields){
  
   });
 
 })
  .catch((error) => {
      res.json(error)
    
  });
 
  
});


router.post('/res_one',admind, function(req, res, next) {
var queryData=url.parse(req.url,true).query;
connection.query("SELECT `gsm_token`,`gsm_token2` FROM user WHERE user_id="+queryData['user_id']+"", function(error,results,fields){
 
  if(results != "" &&results != " " &&results != "[]" &&results != undefined&&results != null) 
  {
    var json_data = JSON.parse(JSON.stringify(results))[0]
    var t = json_data['gsm_token']+":"+json_data['gsm_token2']; 
    }
 if(t !=null)
 { const message = {
     'android': {
      "notification": {
        "title":  "دراستي",
        "body": queryData["body"],
        "sound": "mysound",
        "tag": "alerts",
        "priority": "high",
        "icon": "myicon",
        "channelId": "high_importance_channel",
      }}, 
   token: t ?? "",
   // topic:topic ?? ""
   
    //        /topics/all
};
 admin.messaging().send(message)
  .then((response) => {
  
   res.json(response)
  
   var queryDat=url.parse(req.url,true).query;
   connection.query("INSERT INTO notices (`title`, `body`, `user_id`) VALUES ('"+queryDat['title']+"','"+queryDat['body']+"','"+queryDat['user_id']+"')", function(error,results,fields){
  
   });
   
 })
  .catch((error) => {
      res.json(error)
    
  });
 }
  
});
  });

module.exports = router;
  