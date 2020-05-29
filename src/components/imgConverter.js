import React, { Component } from "react";
import "../App.css";
import { ClipLoader } from "react-spinners";
import { Alert, FormGroup, CustomInput } from "reactstrap";
var Tesseract = window.Tesseract;

class ImgConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      patterns: [],
      valueDanger: "",
      documents: [],
      loading: false
    };
  }
  alertDanger = dont => {
    this.setState({ valueDanger: dont });
    document.getElementById("visibDanger").style.display = "block";
    setTimeout(function() {
      document.getElementById("visibDanger").style.display = "none";
    }, 2000);
  };
  handleChange = event => {
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        uploads.push(URL.createObjectURL(upload));
      }
      this.setState({
        uploads: uploads
      });
    } else {
      this.setState({
        uploads: []
      });
    }
  };
  newGenerate = () => {
    window.location.reload();
  };
  generateText = () => {
    let uploads = this.state.uploads;
    if (this.state.uploads.length !== 0) {
      this.setState({ loading: true });
      for (var i = 0; i < uploads.length; i++) {
        Tesseract.recognize(uploads[i], {
          lang: "eng"
        })
          .catch(err => {
            console.error(err);
          })
          .then(result => {
            // Get Confidence score
            let confidence = result.confidence;

            // Get full output
            let text = result.text;

            // Get codes
            let pattern = /\b\w{10,10}\b/g;
            let patterns = result.text.match(pattern);

            // Update state
            this.setState({
              patterns: this.state.patterns.concat(patterns),
              documents: this.state.documents.concat({
                pattern: patterns,
                text: text,
                confidence: confidence
              })
            });
            this.setState({ loading: false });
          });
      }
    } else {
      this.alertDanger("You did not upload the file!");
    }
  };
  render() {
    return (
      <div className="container">
        <Alert
          color="danger"
          onClick={() => {
            document.getElementById("visibDanger").style.display = "none";
          }}
          id="visibDanger"
          style={{ display: "none", cursor: "pointer" }}
        >
          {this.state.valueDanger}
        </Alert>
        <header>
          <h1 style={{ marginTop: "30px", textAlign: "center" }}>
            Convert Image to Text
          </h1>
        </header>
        {/* File uploader */}
        <div className="col-md-12" style={{ marginTop: "30px" }}>
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser"
                  name="customFile"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <button
                onClick={this.generateText}
                style={{ width: "100%" }}
                className="btn btn-primary"
              >
                Generate
              </button>
            </div>
            <div className="col-md-3">
              <button
                onClick={this.newGenerate}
                style={{ width: "100%" }}
                className="btn btn-success"
              >
                Generate New
              </button>
              <div></div>
            </div>
          </div>{" "}
          <div
            style={{
              marginLeft: "50%",
              marginRight: "50%",
              marginTop: "50px"
            }}
            className="sweet-loading"
          >
            <ClipLoader
              size={60}
              color={"#1E90FF"}
              loading={this.state.loading}
            />
          </div>
        </div>
        {/* Results */}
        {this.state.documents
          ? this.state.documents.map((value, index) => {
              return (
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src={this.state.uploads[index]}
                        style={{ width: "50%" }}
                        alt="ErrImage"
                      />
                    </div>
                    <div className="col-md-6">
                      <textarea
                        rows="20"
                        cols="53"
                        placeholder="Text Converted"
                      >
                        {value.text}
                      </textarea>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default ImgConverter;
