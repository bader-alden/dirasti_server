var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   var queryData=url.parse(req.url,true).query;
     connection.query("SELECT `id`, `title`, `body` FROM `notices` WHERE 1",function(error,results,fields){
  res.send('respond with a resource');
});


router.post('/', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("SELECT * FROM copon WHERE name_copon='"+queryData['name_copon']+"' ",function(error,results,fields){
      if(!error){
       console.log(results)
     var json_data = JSON.parse(JSON.stringify(results))[0];         
      console.log(json_data['is_open']) 
      if (json_data['is_open']=='1'){
    connection.query("UPDATE user SET course_file = CONCAT(course_file ,'" + "," + json_data['list_cours'] + " ') WHERE id='"+queryData['id']+"' ",function(error,resullts,fields){
         console.log(resull












module.exports = router;
