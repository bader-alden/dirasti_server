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


const admin= function (req, res, next) {
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


// router.get('/test' , admin , function(req, res, next) {
  
//       res.json("results");

//    });
router.post('/signin',  function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query( "SELECT * FROM dashboard WHERE name= '"+queryData['name']+"' AND password= '"+queryData['password']+"'" ,function(error,results,fields){
      
      res.json(results);
  });
   });


router.post('/signid', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query( "SELECT * FROM dashboard WHERE id= '"+queryData['id']+"'" ,function(error,results,fields){
      
       res.json(results);
  });
   });


router.post('/user',admin , function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("DELETE from user WHERE id='"+queryData['id']+"'" ,function(error,results,fields){
    if(!error){
      
       res.json(results);
    }else{
       res.json(error);
    }
  });
});

router.get('/all_user', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("SELECT * FROM user " ,function(error,results,fields){
    if(!error){
      
       res.json(results);
    }else{
       res.json(error);
    }
  });
});

router.post('/signin', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query( "SELECT * FROM dashboard WHERE name= '"+queryData['name']+"' AND password= '"+queryData['password']+"'" ,function(error,results,fields){
      
      res.json(results);
  });
   });


router.post('/signid', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query( "SELECT * FROM dashboard WHERE id= '"+queryData['id']+"'" ,function(error,results,fields){
      
       res.json(results);
  });
   });

router.post('/change_pass', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query( "SELECT * FROM dashboard WHERE id= '"+queryData['id']+"' AND password= '"+queryData['password']+"'" ,function(error,results,fields){
      
     if(results.length >0){
        connection.query("UPDATE dashboard SET password= '"+queryData['new_password']+"' WHERE id='"+queryData['id']+"'",function(error,results,fields){
          if(!error){
            res.send("yes")
          }
        });
     }else{
       res.send("no")
     }
  });
   });

router.post('/select', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("SELECT "+queryData['sql']+" from "+queryData['table'] ,function(error,results,fields){
    if(!error){
      
       res.json(results);
    }else{
       res.json(error);
    }
  });
});

router.post('/select_id', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("SELECT "+queryData['sql']+" from "+queryData['table']+" WHERE id='"+queryData['id']+"'" ,function(error,results,fields){
    if(!error){
      
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/insert',admin, function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
 connection.query("INSERT INTO "+queryData['table']+" ("+queryData['sql_key']+") VALUES ("+queryData['sql_value']+")  ",function(error,results,fields){
    if(!error){
 
       res.json(results);
    }else{
       res.json(error);
    }
  });
});

router.post('/insert_id', admin,function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
 connection.query("INSERT INTO "+queryData['table']+" ("+queryData['sql_key']+") VALUES ("+queryData['sql_value']+") WHERE id='"+queryData['id']+"'",function(error,results,fields){
    if(!error){
      
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/update_id',admin, function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
 connection.query("UPDATE "+queryData['table']+" SET "+queryData['sql_key']+" WHERE id='"+queryData['id']+"'",function(error,results,fields){
    if(!error){
      
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/update_id_user',admin, function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
 connection.query("UPDATE "+queryData['table']+" SET "+queryData['sql_key']+" WHERE user_id='"+queryData['id']+"'",function(error,results,fields){
    if(!error){
     
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/delet_id',admin, function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("DELETE  from "+queryData['table']+" WHERE id='"+queryData['id']+"'" ,function(error,results,fields){
    if(!error){
     
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/delet_id_user',admin, function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("DELETE  from "+queryData['table']+" WHERE user_id='"+queryData['id']+"'" ,function(error,results,fields){
    if(!error){
    
       res.json(results);
    }else{
       res.json(error);
    }
  });
});



router.post('/calendar', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("INSERT INTO `calendar`(`grade`, `subject`, `photo`) VALUES ('"+queryData['grade']+"','"+queryData['subject']+"','"+queryData['photo']+"') " ,function(error,results) {
       if(!error){
    
       res.json(results);
    }else{
       res.json(error);
    }
  })
  });







module.exports = router;
