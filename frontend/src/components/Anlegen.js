import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";

import "../css/Overlay.css";
import "../css/Anlegen.css";

export class Anlegen extends Component {
  render() {
    return (
      <div className="Anlegen">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                <h1>Anlegen</h1>
                <input type="submit" value="Neuen Nutzer anlegen" />
                <br />
                <input type="submit" value="Neuen Endnutzer anlegen" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Anlegen;
