import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";

import "../css/Overlay.css";
import "../css/Institution.css";

export class Institution extends Component {
  render() {
    return (
      <div className="Institution">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
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
