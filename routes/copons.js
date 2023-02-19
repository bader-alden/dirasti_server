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
    connection.query("UPDATE user SET email ='"+queryData['email']+"', mobile_id='"+queryData['mobile_id']+"', is_male= '"+queryData['is_male']+"',grade= '"+queryData['grade']+"' WHERE secret_code="+queryData['secret_code']+" ",function(error,results,fields){
        if(!error){
          res.json(true);
        }else{
          res.json(false);
        }
   });
   });








































module.exports = router;
