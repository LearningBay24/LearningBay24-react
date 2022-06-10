import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";

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
                <h1>Klausurenübersicht</h1>
                <div className="AdminArea">
                  <button className="btnCreateCourse"
                    onClick={this.toggleCreateCourse}>
                    Kurs erstellen
                  </button>
                  <button className="btnCreateCourse"
                    onClick={this.toggleCreateCourse}>
                    Benoten
                  </button>
                </div>
                <Row className="Section">
                  <h2>Angemeldete Klausuren</h2>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
                </Row>
                <Row className="Section">
                  <h2>Anmelden</h2>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
                </Row>
                <Row className="Section">
                  <h2>Vergangene Klausuren</h2>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
                  <div className="ExamWrapper"> <ShowExam /></div>
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
      <div className="ExamHeader">
        <p className="ExamName">Klausurname</p>
      </div>
      <div className="ExamBody">
        <div className="ExamCourseInfo">
          <p className="ExamCourse">Kursname</p>
          <p className="ExamDegree">Studiengang</p>
          <p className="ExamOwner">Klausurersteller</p>
        </div>
        <div className="ExamInfo">
          <p className="ExamDate">Datum</p>
          <p className="ExamTime">Uhrzeit</p>
          <p className="ExamDuration">Dauer</p>
          <p className="ExamRoom">Raum</p>
        </div>
      </div>
    </div>
  );
}

export default Klausurenuebersicht;
