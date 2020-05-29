let express = require("express"),
  multer = require("multer"),
  uuidv4 = require("uuid/v4"),
  router = express.Router();
const mongoose = require("mongoose");
//var fs = require("fs");
const DIR = "./files/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, uuidv4() + "-" + fileName);
  }
});

var upload = multer({
  storage: storage
});

let PDFList = require("./pdfModel");

router.post("/uploadpdf", upload.single("pdffile"), (req, res, next) => {
  console.log("ups");
  const url = req.protocol + "://" + req.get("host");
  const user = new PDFList({
    _id: new mongoose.Types.ObjectId(),
    nameFound: req.body.searchName,
    pdffile: url + "/files/" + req.file.filename
  });
  user
    .save()
    .then(result => {
      res.status(201).json({
        message: "User registered successfully!",
        userCreated: {
          _id: result._id,
          pdffile: result.pdffile,
          nameFound: result.searchName
        }
      });
    })
    .catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    });
});

router.route("/").get(function(req, res) {
  PDFList.find(function(err, pos) {
    if (err) {
      console.log(err);
    } else {
      res.json(pos);
    }
  });
});
module.exports = router;
