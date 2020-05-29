const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PDFList = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    pdffile: {
      type: String
    },
    nameFound: {
      type: String
    }
  },
  {
    collection: "pdflist"
  }
);
module.exports = mongoose.model("PDFList", PDFList);
