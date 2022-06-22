import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";

import "../css/Overlay.css";
import "../css/Dashboard.css";

export class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" ><h1>Dashboard</h1></Col>
            </Row>
          </Container>
        </div>
        <ShowFooter />
      </div>
    );
  }
}

export default Dashboard;
