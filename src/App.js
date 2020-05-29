import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import ImgConverter from "./components/imgConverter";
import PDFConverter from "./components/pdfConverter";
//import ListPDF from "./components/ListPDFile";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" style={{ fontSize: "50px" }}>
            OCR
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/" className="links">
                  PDF Converter
                </Link>{" "}
                {/*  <Link to="/listPDF" className="links">
                  PDF List
  </Link>*/}
              </NavItem>
              <NavItem>
                <Link to="/imgConverter" className="links">
                  Image Converter
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          {" "}
          <Route exact path="/">
            <PDFConverter />
          </Route>
          <Route path="/imgConverter">
            <ImgConverter />
          </Route>
          {/* <Route path="/listPDF">
            {" "}
            <ListPDF />
  </Route>*/}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
