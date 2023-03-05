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

  router.post('/signin', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query( "SELECT * FROM dashboard WHERE user= '"+queryData['user']+"' AND pass= '"+queryData['pass']+"'" ,function(error,results,fields){
      console.log(results);
      res.json(results);
  });
   });


router.post('/signid', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  console.log(queryData);
  connection.query( "SELECT * FROM dashboard WHERE id= '"+queryData['id']+"'" ,function(error,results,fields){
      console.log(results);
       res.json(results);
  });
   });

router.post('/change_pass', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query( "SELECT * FROM dashboard WHERE id= '"+queryData['id']+"' AND pass= '"+queryData['pass']+"'" ,function(error,results,fields){
      console.log(results);
     if(results.length >0){
        connection.query("UPDATE dashboard SET pass = '"+queryData['new_pass']+"' WHERE id='"+queryData['id']+"'",function(error,results,fields){
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
      console.log(results);
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
      console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/insert', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
 connection.query("INSERT INTO "+queryData['table']+" ("+queryData['sql_key']+") VALUES ("+queryData['sql_value']+")  ",function(error,results,fields){
    if(!error){
   //   console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
});

router.post('/insert_id', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
 connection.query("INSERT INTO "+queryData['table']+" ("+queryData['sql_key']+") VALUES ("+queryData['sql_value']+") WHERE id='"+queryData['id']+"'",function(error,results,fields){
    if(!error){
      console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/update_id', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
 connection.query("UPDATE "+queryData['table']+" SET "+queryData['sql_key']+" WHERE id='"+queryData['id']+"'",function(error,results,fields){
    if(!error){
      console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/delet_id', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("DELETE  from "+queryData['table']+" WHERE id='"+queryData['id']+"'" ,function(error,results,fields){
    if(!error){
      console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
});

router.post('/create_table', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("CREATE  TABLE  "+queryData['table']+" (id int NOT NULL AUTO_INCREMENT ,created_at varchar(255) ,photo varchar(255) , photos varchar(255) , num_add varchar(255) , min_price varchar(255),price varchar(255),name varchar(255),log varchar(255),kind varchar(255),sub varchar(255),des varchar(255),text_slot_1 varchar(255),text_slot_2 varchar(255),text_slot_3 varchar(255),file_slot_1 varchar(255),file_slot_2 varchar(255),file_slot_3 varchar(255),location varchar(255),city varchar(255),user_id varchar(255),status varchar(255),end_in varchar(255),main_data varchar(255) ,PRIMARY KEY (ID));" ,function(error,results,fields){
    if(!error){
      console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
});
router.post('/drop_tb', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("DROP TABLE "+queryData['table'] ,function(error,results,fields){
    if(!error){
  connection.query("DELETE  from mains WHERE id='"+queryData['id']+"'" ,function(error,results,fields){
    if(!error){
      console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
    }else{
       res.json(error);
    }
  });
});
   




module.exports = router;
