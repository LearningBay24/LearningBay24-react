import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";

import "../css/Overlay.css";
import "../css/Institution.css";

export class Institution extends Component {
  render() {
    return (
      <div className="Institution">
        <ShowHeader />
        <div className="Body">
          <Container fluid className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col className="ColContent" >
                <h1>Institution</h1>
                <div className="AdminArea">
                  <button className="btnCreateCourse"
                    onClick={this.toggleCreateCourse}>
                    Bearbeiten
                  </button>
                  <button className="btnCreateCourse"
                    onClick={this.toggleCreateCourse}>
                    Abschluss hinzufügen
                  </button>
                </div>
                <h3 className="InstitutionType">Art der Institution</h3>

                <div className="UserArea">
                  <div className="AdminuserArea">
                    <p> Anzahl der Nutzer:</p><p>xy</p>
                  </div>
                  <div className="EnduserArea">
                    <p> Anzahl der Endnutzer:</p><p>xy</p>
                  </div>
                </div>
                <div className="SubjectArea">
                  <h3> Angebotene Fachrichtungen:</h3>
                </div>
                <div className="DegreeArea">
                  <h3> Abschlüsse:</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <ShowFooter />
      </div>
    );
  }
}

export default Institution;
