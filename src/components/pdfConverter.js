import React, { Component } from "react";
import axios from "axios";
import { Alert, FormGroup, CustomInput } from "reactstrap";
import { ClipLoader } from "react-spinners";
import { GoSearch } from "react-icons/go";
export default class PDFConverter extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      dis: "none",
      valueSec: "",
      pdffile: "",
      valueDanger: "",
      includeName: "",
      searchName: "",
      auth: false,
      nsd: {},
      loading: false
    };
  }

  onFileChange(e) {
    this.setState({ pdffile: e.target.files[0] });
  }
  /* componentDidMount() {
    axios.get("http://localhost:4000/api").then(res => {
      console.log("ovo je res", res.data);
    });
  }*/
  alertDanger = dont => {
    this.setState({ valueDanger: dont });
    document.getElementById("visibDanger").style.display = "block";
    setTimeout(function() {
      document.getElementById("visibDanger").style.display = "none";
    }, 2000);
  };
  alertShow = succ => {
    this.setState({ valueSec: succ });
    document.getElementById("visib").style.display = "block";
    setTimeout(function() {
      document.getElementById("visib").style.display = "none";
    }, 2000);
  };
  handleChangeInc = e => {
    this.setState({ searchName: e.target.value });
  };
  onSubmit(e) {
    this.setState({ nsd: {} });
    //  alert(this.state.nsd);
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdffile", this.state.pdffile);
    formData.append("searchName", this.state.searchName);
    //alert(JSON.stringify(formData));
    if (this.state.pdffile !== "") {
      axios.post("http://localhost:4000/pdfpost", formData).then(res => {
        console.log(JSON.stringify(res.nis));
      });
      this.alertShow("Success generated!");
    } else {
      this.alertDanger("You did not upload the file!");
      // alert(JSON.stringify(this.state.nsd));
      //alert(this.state.nsd);
    }
  }
  saveDoc = () => {
    if (this.state.auth === true) {
      const formData = new FormData();
      formData.append("pdffile", this.state.pdffile);
      formData.append("searchName", this.state.searchName);
      axios
        .post("http://localhost:4000/pdfList/uploadpdf", formData)
        .then(res => {
          console.log(JSON.stringify(res.nis));
        });
      this.alertShow("Saved!");
    } else {
      this.alertDanger(
        "The file doesn't contain the name you were looking for. You cannot save the document!"
      );
    }
  };
  authDoc = () => {
    if (this.state.searchName !== "") {
      let s = this.state.includeName;
      const auth = s.includes(this.state.searchName);
      if (auth === true) {
        this.setState({ auth: true });
        this.alertShow("this pdf contain the specified name!");
      } else {
        this.alertDanger("this pdf doesn't contain the specified name!");
      }
    } else {
      this.alertDanger("You did not included the name!");
    }
  };
  onShow = () => {
    this.setState({ loading: true });
    axios.get("http://localhost:4000/").then(res => {
      let word = res.data.nis;
      this.setState({ includeName: word });
      // console.log("ovo je res", res.data.nis);
      /* const sr = res.data.nis;
      const niss = [];
      var wordArray = sr.split(/\s+/);
      niss.push(wordArray);
      for (var i = 0; i < niss.length; i++) {
        if (niss[i] === " ") {
          console.log("ima");
        } else {
          console.log("nema");
        }
      }*/
      this.setState({ nsd: res.data });
      this.setState({ loading: false });
    });
  };
  refrash = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="container">
        <Alert
          color="success"
          onClick={() => {
            document.getElementById("visib").style.display = "none";
          }}
          id="visib"
          style={{ display: "none", cursor: "pointer" }}
        >
          {this.state.valueSec}
        </Alert>
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
            Convert PDF to Text
          </h1>
        </header>
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "30px" }}>
            <div className="row" style={{ marginTop: "30px" }}>
              <div className="col-md-6">
                <FormGroup>
                  <CustomInput
                    type="file"
                    id="exampleCustomFileBrowser"
                    name="customFile"
                    onChange={this.onFileChange}
                  />
                </FormGroup>
              </div>{" "}
              <div className="col-md-6">
                <div className="input-group">
                  <input
                    className="form-control"
                    onChange={this.handleChangeInc}
                    placeholder="Name"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{ cursor: "pointer" }}
                      onClick={this.authDoc}
                    >
                      {" "}
                      <GoSearch style={{ width: "15px", height: "15px" }} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={this.onSubmit}
                >
                  Generate
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-warning"
                  style={{ width: "100%" }}
                  onClick={this.onShow}
                >
                  Show
                </button>
              </div>{" "}
              <div className="col-md-2">
                <button
                  className="btn btn-warning"
                  style={{ width: "100%" }}
                  onClick={() => {
                    let blob = new Blob([this.state.pdffile], {
                      type: `${this.state.pdffile.type}`
                    });
                    window.location = URL.createObjectURL(blob);
                  }}
                >
                  Show PDF File
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={this.saveDoc}
                >
                  Save Document
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-success"
                  style={{ width: "100%" }}
                  onClick={this.refrash}
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ marginLeft: "50%", marginRight: "50%" }}
          className="sweet-loading"
        >
          <ClipLoader
            size={60}
            color={"#1E90FF"}
            loading={this.state.loading}
          />
        </div>
        <textArea rows="40" cols="10" className="form-control">
          {this.state.nsd.nis}
        </textArea>
      </div>
    );
  }
}
