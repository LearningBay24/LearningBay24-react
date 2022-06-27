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
          <Container className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col className="ColContent" >
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
