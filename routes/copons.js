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

router.post('/', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("SELECT * FROM copon WHERE uid_copon='"+queryData['uid_copon']+"' ",function(error,results,fields){
      if(!error){
       console.log(results)
     var json_data = JSON.parse(JSON.stringify(results))[0];         
      console.log(json_data['is_open']) 
      if (json_data['is_open']=='1'){
    connection.query("UPDATE user SET course_file = CONCAT(course_file ,'"+"," + json_data['list_cours'] + "') WHERE user_id='"+queryData['user_id']+"' ",function(error,resullts,fields){
         console.log(resullts)                                 //شيل هي              وهدول //الكوتيشن غلط 
         console.log(error)//دقيقة لجرب
    });   
      connection.query("UPDATE copon SET `is_open`='0' , `add_by`='"+queryData['user_id']+"' WHERE id='"+json_data['id']+"' ",function(error,resullts,fields){          
        res.json('ok');                  
        console.log(resullts)                         //اشتغل    
         console.log(error)
      });
     }else{
         res.json('error4');
      }
        
    }else{
          res.json('error5');
        }
   });
   });

router.get('/', function(req, res, next) {
   var queryData=url.parse(req.url,true).query;
 connection.query("SELECT `list_cours`,`name_copon`,`grade` ,`is_open`, `uid_copon`, `price` FROM copon  WHERE uid_copon='"+queryData['uid_copon']+"' ",function(error,resullt,fields){          
   var json_data = JSON.parse(JSON.stringify(resullt))[0];
   if(resullt.length != 0){
   connection.query("SELECT `grade`,`course_file`FROM user WHERE user_id='"+queryData['user_id']+"'",function(error,result,fields){ 
     var json_dat = JSON.parse(JSON.stringify(result))[0]['grade']; 
     var json_dataa = JSON.parse(JSON.stringify(result))[0]['course_file']
      console.log(json_dataa)
     var t = json_dataa.toString().split(",")
    if(check_course(t,queryData)){
      res.send('الكورس مفعل مسبقا ');
    }else { //هون فيني هيك حط ؟
   if (json_data['grade']==json_dat['grade']){
        console.log(resullt)
         res.send(resullt)
        res.send('تم تفعيل الكورس')
     }else{
        res.send("الكورس غير  متوافق مو الصف")
    }
    }
   });
   
     
    
   }else{
  res.send("notfound") 
}
   });         
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
  
module.exports = router;
