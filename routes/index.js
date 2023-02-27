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
  connection.query("SELECT grade FROM  user WHERE user_id='"+queryData['user_id']+"'" ,function(error,results) {
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
      connection.query("SELECT `course_file` FROM user WHERE user_id='"+queryData['user_id']+"'", function (error, resultt) {
   //  var json_data = JSON.parse(JSON.stringify(resultt))
     var json_data = JSON.parse(JSON.stringify(resultt))[0]['course_file']
     var t = json_data.toString().split(",")
    if(check_course(t,queryData)){
      res.send(result);
    }else {
      res.send(false);
    }
   });      
})
  });


function check_course(list , queryData){
  for(var i=0 ;i<list.length ; i++){
      console.log(list);
       var m=list[i].split("|")
     if(m[0]==queryData['is_course'] &&
         m[1]==queryData['grade'] && 
         m[2]==queryData['subject'] && 
         m[3]==queryData['teacher_name'] && 
         m[4]==queryData['course']
       ){
       return true;
       }
     }
  return false;
}
router.get('/my_course', function(req, res, next) {
    var queryData = url.parse(req.url, true).query
 connection.query("SELECT `course_file` FROM user WHERE user_id='"+queryData['user_id']+"' ", function (error, resulte) {
   var json_data = JSON.parse(JSON.stringify(resulte))[0]['course_file']
     var my = json_data.toString().split(",")
    if(mycourse_myfile(my,queryData)){
   var ll = (resulte)['course']  
      if(queryData['is_course']==1){
       connection.query('SELECT  `teacher_name`, `subject`, `price`, `photo`, `grade`, `part`, `number_hours` FROM course WHERE "'+queryData['is_course']+'"', function (error, resulte) {
     });
      }else{
  connection.query('SELECT `teacher_name`, `subject`, `price`, `photo`, `grade` FROM course WHERE is_course="'+queryData['is_course']+'"', function (error, resulte) {
     res.send(resulte);
  });
      }
      //res.send(resulte);
    }else {
      res.send(false);
    }
   
   
   
    }); 

    }); 

function mycourse_myfile(list , queryData){
  for(var i=0 ;i<list.length ; i++){
      console.log(list);
       var m=list[i].split("|")
     if(m[0]==queryData['is_course'] &&
         m[1]==queryData['grade'] && 
         m[2]==queryData['subject'] && 
         m[3]==queryData['teacher_name'] && 
         m[4]==queryData['course']
       ){
       return true;
       }
     }
  return false;
}
  //                                                               🧿 ملك خاص ل اسراء 🧿
module.exports = router;
