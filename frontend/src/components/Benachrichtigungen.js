import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";

import "../css/Overlay.css";
import "../css/Benachrichtigungen.css";

export class Benachrichtigungen extends Component {
  render() {
    return (
      <div className="Benachrichtigungen">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                <h1>Benachrichtigungen</h1>
              </Col>
            </Row>
          </Container>
        </div>
        <ShowFooter />
      </div>
    );
  }
}


export default Benachrichtigungen;
