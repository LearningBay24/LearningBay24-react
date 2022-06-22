import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";
import {getSubmissionFromUser} from "../api/index";
import {ShowAssignment} from "./Abgabe";

import "../css/Overlay.css";
import "../css/Abgabenuebersicht.css";

export class Abgabenuebersicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DueAssign: [{
        assignname: "name", coursename: "kurs", owner: "peter",
        subject: "AI",
        created_at: "19.04.2022", time: "15:00", deadline: "27.04.2022",
        comment: "kommentar",
      }],
      SubmittedAssign: [{
        assignname: "name", coursename: "kurs", owner: "peter",
        subject: "AI",
        created_at: "19.04.2022", time: "15:00", deadline: "27.04.2022",
        comment: "kommentar",
      }],
      EvalAssign: [{
        assignname: "name", coursename: "kurs", owner: "peter",
        subject: "AI",
        created_at: "19.04.2022", time: "15:00", deadline: "27.04.2022",
        comment: "kommentar",
      }],
    };
  }

  componentDidMount() {
    getSubmissionFromUser(this);
  }

  render() {
    const DueAssignList = [];
    if (this.state.DueAssign != null) {
      for (const Assign of this.state.DueAssign) {
        DueAssignList.push(<div>
          <ShowAssignment assignname={Assign.assignname}
            coursename={Assign.coursename}
            owner={Assign.owner}
            subject={Assign.subject}
            created_at={Assign.created_at}
            time={Assign.time}
            deadline={Assign.deadline}
            comment={Assign.comment} /></div>);
      }
    }

    const SubmittedAssignList = [];
    if (this.state.SubmittedAssign != null) {
      for (const Assign of this.state.SubmittedAssign) {
        SubmittedAssignList.push(<div>
          <ShowAssignment assignname={Assign.assignname}
            coursename={Assign.coursename}
            owner={Assign.owner}
            subject={Assign.subject}
            created_at={Assign.created_at}
            time={Assign.time}
            deadline={Assign.deadline}
            comment={Assign.comment} /></div>);
      }
    }

    const EvalAssignList = [];
    if (this.state.EvalAssign != null) {
      for (const Assign of this.state.EvalAssign) {
        EvalAssignList.push(<div>
          <ShowAssignment assignname={Assign.assignname}
            coursename={Assign.coursename}
            owner={Assign.owner}
            subject={Assign.subject}
            created_at={Assign.created_at}
            time={Assign.time}
            deadline={Assign.deadline}
            comment={Assign.comment} /></div>);
      }
    }

    return (
      <div className="Abgabenuebersicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" >
                <h1>Abgabenübersicht</h1>
                <div className="AdminArea">
                  <button className="btnCreateCourse"
                    onClick={this.toggleCreateCourse}>
                    Bearbeiten
                  </button>
                </div>
                <Row className="Section">
                  <h2>Abgaben fällig</h2>
                  {DueAssignList}
                </Row>
                <Row className="Section">
                  <h2>Abgegeben</h2>
                  {SubmittedAssignList}
                </Row>
                <Row className="Section">
                  <h2>Bewertet</h2>
                  {EvalAssignList}
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
export default Abgabenuebersicht;
