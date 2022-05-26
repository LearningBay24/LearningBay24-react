import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";

import "../css/Overlay.css";
import "../css/Klausurenuebersicht.css";

export class Klausurenuebersicht extends Component {
  render() {
    return (
      <div className="Klausurenuebersicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                <Row className="Section">
                  <h1>Angemeldete Klausuren</h1>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
                </Row>
                <Row className="Section">
                  <h1>Anmelden</h1>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
                </Row>
                <Row className="Section">
                  <h1>Vergangene Klausuren</h1>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
                  <Col xs={4} fluid> <ShowExam /></Col>
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

function ShowExam() {
  return (
    <div className="Exam">
      <table>
        <tr>
          <td>
            <p className="ExamName">Klausurname</p>
            <p className="ExamCourse">Kursname</p>
            <p className="ExamOwner">Klausurersteller</p>
            <p className="ExamDegree">Studiengang</p>
            <p> </p>
          </td>
          <td>
            <p className="ExamDate">Datum</p>
            <p className="ExamTime">Uhrzeit</p>
            <p className="ExamRoom">Raum</p>
            <p className="Examduration">Dauer</p>
          </td>
        </tr>
      </table>

    </div>
  );
}

export default Klausurenuebersicht;
