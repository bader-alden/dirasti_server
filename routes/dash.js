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

router.post('/Frequently_questions', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("INSERT INTO Frequently_questions (`questions`, `answer`) VALUES ('"+queryData['questions']+"','"+queryData['answer']+"')" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.post('/Frequently_questions', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("INSERT INTO Frequently_questions (`questions`, `answer`) VALUES '"+queryData['questions']+"','"+queryData['answer']+"')" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })

router.post('/Frequently_questions', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("INSERT INTO Frequently_questions (`questions`, `answer`) VALUES ('"+queryData['questions']+"','"+queryData['answer']+"')" ,function(error,results) {
      console.log(results);
       res.send(results);
      });
  })
module.exports = router;
