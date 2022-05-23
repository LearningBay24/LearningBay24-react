import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";

import "../css/Overlay.css";

export class Abgabenuebersicht extends Component {
  render(test) {
    return (
      <div className="Abgabenuebersicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                <Row className="Section">
                  <h1>Abgaben fällig</h1>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                </Row>
                <Row className="Section">
                  <h1>Abgegeben</h1>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                </Row>
                <Row className="Section">
                  <h1>Bewertet</h1>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                  <Col xs={4} fluid> <ShowAssignment /></Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <ShowFooter/>
      </div>
    );
  }
}

function ShowAssignment() {
  return (
    <div className="Exercise">
      <table>
        <tr>
          <td>
            <p className="AssignmentName">Klausurname</p>
            <p className="AssignmentCourse">Kursname</p>
            <p className="AssignmentOwner">Klausurersteller</p>
            <p className="AssignmentDegree">Studiengang</p>
          </td>
          <td>
            <p className="AssignmentDate">Datum</p>
            <p className="AssignmentTime">Uhrzeit</p>
            <p className="AssignmentDeadline">Deadline</p>
            <input type="text" className="AssignmentComment"
              placeholder="Kommentar" />
          </td>
        </tr>
      </table>

    </div>
  );
}

export default Abgabenuebersicht;
