import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";

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
                <p> Anzahl der Nutzer:</p><p>xy</p>
                <p> Anzahl der Endnutzer:</p><p>xy</p>
                <p> Angebotene Fachrichtungen:</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Institution;
