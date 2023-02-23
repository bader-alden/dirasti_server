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

router.post('/update_account', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query("INSERT INTO copon(`id`, `list_cours`, `is_open`, `add_by`,`name`) VALUES ('"+queryData['id']+"','"+queryData['list_cours']+"','"+queryData['is_open']+"','"+queryData['add_by']+"','"+queryData['name']+"') WHERE secret_code="+queryData['secret_code']+" ",function(error,results,fields){
        if(!error){
          res.json(true);
        }else{
          res.json(false);
        }
   });
   });








































module.exports = router;
