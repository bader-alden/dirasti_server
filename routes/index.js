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

router.get('/version', function(req, res, next) {
   var queryData=url.parse(req.url,true).query;
 connection.query("SELECT * FROM version WHERE id ='1'",function(error,resullt,fields){ 
  res.send(resullt);
   }); 
   }); 

router.get('/calendar', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
    connection.query("SELECT grade FROM  user WHERE user_id='"+queryData['user_id']+"'" ,function(error,results) {

  var json_datas = JSON.parse(JSON.stringify(results));
  connection.query("SELECT `subject`, `photo` FROM calendar WHERE grade='"+json_datas[0]['grade']+"'" ,function(error,results) {
       if(!error){
    
       res.json(results);
    }else{
       res.json(error);
    }
  })
    })
  });

router.get('/banner', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT `banner` FROM privacy_policy WHERE id='1'" ,function(error,results) {
 //     console.log(results);
    res.send(results)
  })
  });
router.get('/subject', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT grade FROM  user WHERE user_id='"+queryData['user_id']+"'" ,function(error,results) {
    
  var json_data = JSON.parse(JSON.stringify(results));
      connection.query('SELECT * FROM subject WHERE grade="'+json_data[0]['grade']+'"', function (error, result) {
         
          res.json(result);
      });
  })
  });
router.get('/all_grade', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT * FROM grade" ,function(error,results) {
    
       res.send(results);
      });
  })


router.get('/teatcher', function(req, res, next) {
    var queryData = url.parse(req.url, true).query;
          connection.query("SELECT * FROM  teatcher WHERE subject='"+queryData['subject']+"' and grade='"+queryData['grade']+"'", function (error, resulte) {
     
       res.json(resulte);
    });
})
router.get('/course', function(req, res, next) {
    var queryData = url.parse(req.url, true).query
    connection.query("SELECT * FROM course WHERE subject='"+queryData['subject']+"' and grade='"+queryData['grade']+"'and teacher_name='"+queryData['teacher_name']+"'", function (error, result) {
      
       res.json(result);
    });
})
router.get('/part', function(req, res, next) {
    var queryData = url.parse(req.url, true).query
connection.query("SELECT * FROM part WHERE subject='"+queryData['subject']+"' and grade='"+queryData['grade']+"'and teacher_name='"+queryData['teacher_name']+"' and course='"+queryData['course']+"'", function (error, result) {
   
connection.query("SELECT `is_free` FROM course WHERE id='"+queryData['course']+"' ", function (error, resul) {
    var json_dat = JSON.parse(JSON.stringify(resul))[0];

    if(json_dat['is_free']=='1'){
     
      res.send(result);
    }else{ 
  connection.query("SELECT `course_file` FROM user WHERE user_id='"+queryData['user_id']+"'", function (error, resultt) {
    var json_data = JSON.parse(JSON.stringify(resultt))[0]['course_file']
     
  var t = json_data.toString().split(",")
    if(check_course(t,queryData)){
      res.send(result);
       
    }else {
      res.send("notfound");
    }
         });
    }
 
      
})
  });
});

function check_course(list , queryData){
  for(var i=0 ;i<list.length ; i++){
     
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
 connection.query('SELECT course_file FROM user WHERE user_id="'+queryData['user_id']+'"', function (error, resulte) {
  
    var json_data = JSON.parse(JSON.stringify(resulte))[0]['course_file']
    var my = json_data.toString().split(",")
    var all = []     
    var num_of_course = 0
    var num_of_file = 0
    if(json_data.toString() ==" "){
      res.send("notfound10");
       return ;
    }
      for(var i=0 ;i<my.length ; i++){
    //  console.log(my);
    var m=my[i].split("|")
    var type = m[0]
    var num = m[4] 
   
      if (parseInt(m[0])==1){
       num_of_course++
      }else if (parseInt(m[0])==0) {
        num_of_file++
      }
         if(m==" "){
    
       continue;
    }
    if(queryData['is_course']==1 && parseInt(m[0])==1){
    connection.query('SELECT * FROM course WHERE  id="'+num+'"', function (error, resulte) {
      
      if(resulte!=[]){
         all.push(resulte);
      }
      if( num_of_course == all.length ){
    
        
         res.send(all)
      }
    });
    }else if(queryData['is_course']==0 &&parseInt(m[0])==0){
     
     connection.query('SELECT * FROM file WHERE    id="'+num+'"', function (error, results) {
      
       
       all.push(results);
       if( num_of_file == all.length ){
        
         res.send(all)
      }
      });
    }else{
      
    //    res.send("notfound10");
      }
        if(queryData['is_course']==1 && num_of_course==0 &&i+1==my.length  ){
           res.send("notfound10");
        }
         if(queryData['is_course']==0 && num_of_file==0&& i+1==my.length){
           res.send("notfound10");
        }
       
      }   
    }); 
    }); 
router.get('/exam', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
 connection.query("SELECT * FROM exam  WHERE grade='"+queryData['grade']+"' and subject='"+queryData['subject']+"' ",function(error,resullt,fields){          
  
     res.json(resullt);
 });
 });
 
router.get('/all_tests', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
 connection.query("SELECT * FROM all_tests WHERE exam='"+queryData['exam']+"' and grade='"+queryData['grade']+"'and subject='"+queryData['subject']+"'",function(error,result,fields){ 
    
     res.json(result);
 });
 });
router.get('/file', function(req, res, next) {
    var queryData = url.parse(req.url, true).query
    connection.query("SELECT `teacher_name`, `price`, `photo`, `number_of_pages`, `name`, `des` ,`ordero` ,`id` FROM file WHERE subject='"+queryData['subject']+"' and grade='"+queryData['grade']+"'and teacher_name='"+queryData['teacher_name']+"'", function (error, result) {
  
      res.json(result) //nice
    });
    });



router.get('/my_file', function(req, res, next) {
  var queryData = url.parse(req.url, true).query
connection.query("SELECT * FROM file WHERE subject='"+queryData['subject']+"' and grade='"+queryData['grade']+"'and teacher_name='"+queryData['teacher_name']+"'", function (error, result) {
 
   var json_dataa = JSON.parse(JSON.stringify(result))[0];
    if(json_dataa['is_free']=='1'){
      
      res.send(result);
   }else{
    connection.query("SELECT `course_file` FROM user WHERE user_id='"+queryData['user_id']+"'", function (error, resultt) {        
     var json_data = JSON.parse(JSON.stringify(resultt))[0]['course_file']
     
     var t = json_data.toString().split(",")
    if(check_file(t,queryData)){
     
      res.send(result);
    }else {
      
      res.send("notfound");
    }
       });
      }
   });
});

function check_file(list , queryData){
  for(var i=0 ;i<list.length ; i++){
     
       var m=list[i].split("|")
     if(m[0]==queryData['is_course'] &&
         m[1]==queryData['grade'] && 
         m[2]==queryData['subject'] && 
         m[3]==queryData['teacher_name'] && 
         m[4]==queryData['file']
       ){
       return true;
       }
     }
  return false;
}


module.exports = router;
