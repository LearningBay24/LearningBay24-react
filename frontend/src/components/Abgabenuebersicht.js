import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";

import "../css/Overlay.css";
import "../css/Abgabenuebersicht.css";

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
                <h1>Abgabenübersicht</h1>
                <div className="AdminArea">
                  <button className="btnCreateCourse"
                    onClick={this.toggleCreateCourse}>
                    Bearbeiten
                  </button>
                </div>
                <Row className="Section">
                  <h2>Abgaben fällig</h2>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                </Row>
                <Row className="Section">
                  <h2>Abgegeben</h2>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                </Row>
                <Row className="Section">
                  <h2>Bewertet</h2>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
                  <div className="AssignmentWrapper"><ShowAssignment /></div>
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
    <div className="Assignment">
      <div className="AssignmentCourseInfo">
        <p className="AssignmentName">Abgabename</p>
        <p className="AssignmentCourse">Kursname</p>
        <p className="AssignmentOwner">Abgabeersteller</p>
        <p className="AssignmentDegree">Studiengang</p>
      </div>
      <div className="AssignmentInfo">
        <div className="AssignmentInfoTop">
          <p className="AssignmentDate">Datum</p>
          <p className="AssignmentTime">Uhrzeit</p>
          <p className="AssignmentDeadline">Deadline</p>
        </div>
        <div className="AssignmentInfoComment">
          <input type="text" className="AssignmentComment"
            placeholder="Kommentar" />
        </div>
      </div>
    </div>
    /*
    <div className="Exercise">
      <table>
        <tr>
          <td>
          </td>
          <td>
          </td>
        </tr>
      </table>
    </div>
    */
  );
}

export default Abgabenuebersicht;
