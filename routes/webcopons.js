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
 connection.query("SELECT `version` FROM version WHERE id ='1'",function(error,resullt,fields){ 
  console.log(resullt);
   }); 
   }); 
