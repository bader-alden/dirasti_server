var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  SELECT `id`, `title`, `body` FROM `notices` WHERE 1
  res.send('respond with a resource');
});















module.exports = router;
