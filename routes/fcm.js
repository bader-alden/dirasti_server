var express = require('express');
var router = express.Router();
var url=require('url');
var admin = require("firebase-admin");

/* GET home page. */ 

/// created_at

var mysql=require('mysql');
var connection = mysql.createConnection({
host:'db4free.net',
user :'tatbeky',
password:'aaatatbeky',
database:'tatbeky'
});
connection.connect();

//const registrationToken = 'cijAcgXuTHmYhsDn89XvJ2:APA91bHleFKQHPCxuB0KSZnNdmV7x9eE0OmwutScoV7yo4qtOB8yj1GuNUNAMTMX5ZbjkQzi7oXicO_pCKZ6UDJhV2ii3UrDuko6wdsezMe7gugqSzHLK5QpHyfgtLDbubdUcGXv0G0f';
  router.get('/', function(req, res, next) {
var queryData=url.parse(req.url,true).query;
connection.query("SELECT `gsm_token`,`gsm_token2` FROM users WHERE id="+queryData['id']+"", function(error,results,fields){
  console.log("fcm",results)
  if(results != "" &&results != " " &&results != "[]" &&results != undefined&&results != null) {
    var json_data = JSON.parse(JSON.stringify(results))[0]
    var t = json_data['gsm_token']+":"+json_data['gsm_token2'];
  const message = {
     'android': {
      "notification": {
        "title":  "أوكشن السعودية",
        "body": queryData["body"],
        "sound": "mysound",
        "tag": "alerts",
        "priority": "high",
        "icon": "myicon",
        "channelId": "high_importance_channel",
      }}, 
  token: t 
};
 admin.messaging().send(message)
  .then((response) => {
   res.json(response)
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
      res.json(error)
    console.log('Error sending message:', error);
  });
  }
  });
  });


module.exports = router;
  