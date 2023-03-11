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
// hi
router.post('/Frequently_questions', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("INSERT INTO Frequently_questions (`questions`, `answer`) VALUES ('"+queryData['questions']+"','"+queryData['answer']+"')" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.delete('/Frequently_questions', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("DELETE FROM Frequently_questions WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.put('/Frequently_questions', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("UPDATE Frequently_questions SET `questions`='"+queryData['questions']+"',`answer`='"+queryData['answer']+"' WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })// there is no function named update 
// rename it to put and the error will be gone 
// ok ??
//have a good day best
// very good best
// go and fix all mistake 
//ok😀   👍😁 🔥🔥🔥
router.put('/privacy_policy', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("UPDATE privacy_policy SET `text`='"+queryData['text']+"' WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })
router.post('/Coupon_points_of_sale', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("INSERT INTO Coupon_points_of_sale (`address`, `lat`, `lang`) VALUES ('"+queryData['address']+"','"+queryData['lat']+"','"+queryData['lang']+"')" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.delete('/Coupon_points_of_sale', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("DELETE FROM Coupon_points_of_sale WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.put('/Coupon_points_of_sale', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("UPDATE Coupon_points_of_sale SET `address`='"+queryData['address']+"',`lat`='"+queryData['lat']+"' ,`lang`='"+queryData['lang']+"' WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })
router.post('/Social_Media', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("INSERT INTO Social_Media (`name`, `photo`, `link`) VALUES ('"+queryData['name']+"','"+queryData['photo']+"','"+queryData['link']+"')" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.delete('/Social_Media', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("DELETE FROM Social_Media WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.put('/Social_Media', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("UPDATE Social_Media SET `name`='"+queryData['name']+"',`photo`='"+queryData['photo']+"' ,`link`='"+queryData['link']+"' WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })


router.post('/user', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("DELETE from user WHERE id='"+queryData['id']+"'" ,function(error,results,fields){
    if(!error){
      console.log(results);
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
      console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
});

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
router.post('/update_id_user', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
 connection.query("UPDATE "+queryData['table']+" SET "+queryData['sql_key']+" WHERE user_id='"+queryData['id']+"'",function(error,results,fields){
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
router.post('/delet_id_user', function(req, res, next) {
var queryData=url.parse(req.url,true).query; 
  connection.query("DELETE  from "+queryData['table']+" WHERE user_id='"+queryData['id']+"'" ,function(error,results,fields){
    if(!error){
      console.log(results);
       res.json(results);
    }else{
       res.json(error);
    }
  });
});










module.exports = router;
