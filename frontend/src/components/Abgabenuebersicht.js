import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";
import {getSubmissionFromUser} from "../api/index";
import {ShowSubmission} from "./Abgabe";

import "../css/Overlay.css";
import "../css/Abgabenuebersicht.css";

export class Abgabenuebersicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AllSub: [{}],
      DueSubmission: [{
        submissionname: "name", coursename: "kurs", owner: "peter",
        subject: "AI",
        created_at: "19.04.2022", time: "15:00", deadline: "27.04.2022",
        comment: "kommentar",
      }],
      SubmittedSubmission: [{
        submissionname: "name", coursename: "kurs", owner: "peter",
        subject: "AI",
        created_at: "19.04.2022", time: "15:00", deadline: "27.04.2022",
        comment: "kommentar",
      }],
      EvalSubmission: [{
        submissionname: "name", coursename: "kurs", owner: "peter",
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
    const DueSubmissionList = [];
    if (this.state.DueSubmission != null) {
      let i = 0;
      for (const Submission of this.state.DueSubmission) {
        DueSubmissionList.push(<div>
          <ShowSubmission submissionname={Submission.submissionname}
            coursename={Submission.coursename}
            owner={Submission.owner}
            subject={Submission.subject}
            created_at={Submission.created_at}
            time={Submission.time}
            deadline={Submission.deadline}
            key={i}
            comment={Submission.comment} /></div>);
        i++;
      }
    }

    const SubmittedSubmissionList = [];
    if (this.state.SubmittedSubmission != null) {
      let i = 0;
      for (const Submission of this.state.SubmittedSubmission) {
        SubmittedSubmissionList.push(<div>
          <ShowSubmission submissionname={Submission.submissionname}
            coursename={Submission.coursename}
            owner={Submission.owner}
            subject={Submission.subject}
            created_at={Submission.created_at}
            time={Submission.time}
            deadline={Submission.deadline}
            key={i}
            comment={Submission.comment} /></div>);
        i++;
      }
    }

    const EvalSubmissionList = [];
    if (this.state.EvalSubmission != null) {
      let i = 0;
      for (const Submission of this.state.EvalSubmission) {
        EvalSubmissionList.push(<div>
          <ShowSubmission
            submissionname={Submission.submissionname}
            coursename={Submission.coursename}
            owner={Submission.owner}
            subject={Submission.subject}
            created_at={Submission.created_at}
            time={Submission.time}
            deadline={Submission.deadline}
            key={i}
            comment={Submission.comment} /></div>);
        i++;
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
                <Row key={1} className="Section">
                  <h2>Abgaben fällig</h2>
                  {DueSubmissionList}
                </Row>
                <Row key={2} className="Section">
                  <h2>Abgegeben</h2>
                  {SubmittedSubmissionList}
                </Row>
                <Row key={3} className="Section">
                  <h2>Bewertet</h2>
                  {EvalSubmissionList}
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
