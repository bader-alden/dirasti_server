const util = require("util");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024 *1024;
global.__basedir = __dirname;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,   "./public/file/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
