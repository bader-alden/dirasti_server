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
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT grade FROM  user WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
  var json_data = JSON.parse(JSON.stringify(results));
      connection.query('SELECT * FROM subject WHERE grade="'+json_data[0]['grade']+'"', function (error, result) {
          console.log(result);
          res.json(result);
      });
  })
  });

router.get('/teatcher', function(req, res, next) {
    var queryData = url.parse(req.url, true).query;
          connection.query("SELECT * FROM  teatcher WHERE subject='"+queryData['subject']+"' and grade='"+queryData['grade']+"'", function (error, resulte) {
       console.log(resulte);
       res.json(resulte);
    });
})
router.get('/course', function(req, res, next) {
    var queryData = url.parse(req.url, true).query
    connection.query("SELECT * FROM course WHERE subject='"+queryData['subject']+"' and grade='"+queryData['grade']+"'and teacher_name='"+queryData['teacher_name']+"'", function (error, result) {
       console.log(error);
       console.log(result);
       res.json(result);
    });
})
router.get('/part', function(req, res, next) {
    var queryData = url.parse(req.url, true).query
    connection.query("SELECT * FROM part WHERE subject='"+queryData['subject']+"' and grade='"+queryData['grade']+"'and teacher_name='"+queryData['teacher_name']+"' and course='"+queryData['course']+"'", function (error, result) {
   //    console.log(error);
  //     console.log(result);
   connection.query("SELECT `course_file` FROM user WHERE id='"+queryData['id']+"'", function (error, resultt) {
      console.log(resultt);
   //  var json_data = JSON.parse(JSON.stringify(resultt))
     var json_data = JSON.parse(JSON.stringify(resultt))[0]['course_file']
     var t = json_data.toString().split(",")
     for(var i=0 ;i<t.length ; i++){
      console.log(t);
       var m=t[0].split("|")
       if(m[0]==queryData['course'] &&
         m[1]==queryData['grade'] && 
         m[2]==queryData['subject'] && 
         m[3]==queryData['teacher_name'] && 
         m[4]==queryData['course']
       ){
         
         
         
         
      
       }
      var m=t[0].split("|")[0]
      console.log(m)
     }
      res.json(m);
    });        
})
  });






//ملك خاص ل اسراء 🧿
module.exports = router;
