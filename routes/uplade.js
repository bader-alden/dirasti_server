var express = require('express');
var router = express.Router();
var uploadFile = require ('./middleware.js')
router.post('/uplode' , async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "http://31.220.50.200:3000/file/" + req.file.originalname,
    });
    } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: "aaa". ${err}`,
    });
  }
});

module.exports = router;


