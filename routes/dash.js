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
  connection.query("INSERT INTO Coupon_points _of_sale (`address`, `lat`, `lang`) VALUES ('"+queryData['address']+"','"+queryData['lat']+"','"+queryData['lang']+"')" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.delete('/Coupon_points_of_sale', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("DELETE FROM Coupon_points _of_sale WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.put('/Coupon_points_of_sale', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("UPDATE Coupon_points _of_sale SET `address`='"+queryData['address']+"',`lat`='"+queryData['lat']+"' ,`lang`='"+queryData['lang']+"' WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })
router.post('/Social_Media', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("INSERT INTO Social Media (`name`, `photo`, `link`) VALUES ('"+queryData['name']+"','"+queryData['photo']+"','"+queryData['link']+"')" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.delete('/Social_Media', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("DELETE FROM Social Media WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.put('/Social_Media', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("UPDATE Social Media SET `name`='"+queryData['name']+"',`photo`='"+queryData['photo']+"' ,`link`='"+queryData['link']+"' WHERE id='"+queryData['id']+"'" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.post('/', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;

   });



















module.exports = router;
