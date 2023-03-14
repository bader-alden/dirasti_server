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

//const registrationToken = 'cijAcgXuTHmYhsDn89XvJ2:APA91bHleFKQHPCxuB0KSZnNdmV7x9eE0OmwutScoV7yo4qtOB8yj1GuNUNAMTMX5ZbjkQzi7oXicO_pCKZ6UDJhV2ii3UrDuko6wdsezMe7gugqSzHLK5QpHyfgtLDbubdUcGXv0G0f';
router.get('/', function(req, res, next) {
var queryData=url.parse(req.url,true).query;
connection.query("SELECT `gsm_token`,`gsm_token2` FROM user WHERE user_id="+queryData['user_id']+"", function(error,results,fields){
  console.log(error)
 if(queryData['user_id']=='public'){
   var topic = "/topics/all";
   //      /topics/all
 }
  if(results != "" &&results != " " &&results != "[]" &&results != undefined&&results != null) 
  {
    var json_data = JSON.parse(JSON.stringify(results))[0]
    var t = json_data['gsm_token']+":"+json_data['gsm_token2'];  //هاد السطر صح
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
   console.log('Successfully sent message:', response);
   var queryDat=url.parse(req.url,true).query;
   connection.query("INSERT INTO notices (`title`, `body`, `user_id`) VALUES ('"+queryDat['title']+"','"+queryDat['body']+"','"+queryDat['user_id']+"')", function(error,results,fields){
   console.log(error)
   console.log(results) 
   });
   //🙃هون بدي اكتبو 
 // yes 
 })
  .catch((error) => {
      res.json(error)
    console.log('Error sending message:', error);
  });
 }
  
});
  });
//شوفي  الinit فوووق

module.exports = router;
  