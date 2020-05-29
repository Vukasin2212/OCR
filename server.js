const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./api/DB.js");
const port = process.env.PORT || 4000;
const cors = require("cors");
const pdfparse = require("pdf-parse");
const pdfList = require("./api/pdfRoute");
var multer = require("multer");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/pdfList", pdfList);
var storage = multer.diskStorage({
  /* destination: (req, file, cb) => {
    cb(null, "./files");
  },*/
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });

var nis;
app.post("/pdfpost", upload.single("pdffile"), (req, res) => {
  const pdffile = fs.readFileSync(req.file.path);
  pdfparse(pdffile).then(function(data) {
    nis = data.text;
  });
});
app.get("/", (req, res, next) => {
  res.status(200).json({ nis });
});
app.listen(port, () => {
  console.log("Server listining on port ", port);
});
