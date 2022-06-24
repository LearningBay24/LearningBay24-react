import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";
import {
  getSubmissionFromUser,
  getAllSubmissions,
  getUserSubmissionsFromSubmission,
  getAllUserSubmissions,
} from "../api/index";
import {ShowSubmission} from "./Abgabe";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "../css/Overlay.css";
import "../css/Abgabenuebersicht.css";

export class Abgabenuebersicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AllAdminSub: [],
      AllEnrolledSub: [],
      AllUserSub: [],
      isAdmin: false,
      UserSubsFromSub: [],
      openUserSubView: false,
    };

    this.toggleOpenUserSubs = this.toggleOpenUserSubs.bind(this);
  }

  toggleOpenUserSubs() {
    this.setState({openUserSubView: !this.state.openUserSubView});
  }


  onSubmissionClickCallback(id) {
    getUserSubmissionsFromSubmission(this, id);
    this.toggleOpenUserSubs();
  }

  componentDidMount() {
    if (this.state.isAdmin) {
      getSubmissionFromUser(this);
    } else {
      getAllSubmissions(this, this.state.isAdmin);
      getAllUserSubmissions(this, this.state.AllEnrolledSub);
    }
  }


  render() {
    const DueSubmissionList = [];
    if (this.state.AllEnrolledSub != null) {
      for (const Submission of this.state.AllEnrolledSub) {
        DueSubmissionList.push(<div>
          <ShowSubmission
            id={Submission.id}
            submissionname={Submission.name}
            coursename={Submission.coursename}
            owner={Submission.owner}
            subject={Submission.subject}
            created_at={Submission.date}
            deadline={Submission.deadline}
            comment={Submission.comment}
            isAdmin={this.state.isAdmin}
            callback={this.onSubmissionClickCallback}
          /></div>);
      }
    }

    const SubmittedSubmissionList = [];
    if (this.state.AllUserSub != null) {
      for (const Submission of this.state.AllUserSub) {
        SubmittedSubmissionList.push(<div>
          <ShowSubmission
            id={Submission.id}
            submissionname={Submission.submissionname}
            coursename={Submission.coursename}
            owner={Submission.owner}
            subject={Submission.subject}
            deadline={Submission.deadline}
            created_at={Submission.date}
            comment={Submission.comment}
            isAdmin={this.state.isAdmin}
          /></div>);
      }
    }

    const EvalSubmissionList = [];
    if (this.state.AllUserSub != null) {
      for (const Submission of this.state.AllUserSub) {
        EvalSubmissionList.push(<div>
          <ShowSubmission
            id={Submission.id}
            submissionname={Submission.submissionname}
            coursename={Submission.coursename}
            owner={Submission.owner}
            subject={Submission.subject}
            deadline={Submission.deadline}
            created_at={Submission.date}
            comment={Submission.comment}
            isAdmin={this.state.isAdmin}
          /></div>);
      }
    }

    const OwnSubmissionsList = [];
    if (this.state.AllAdminSub != null) {
      for (const Submission of this.state.AllAdminSub) {
        OwnSubmissionsList.push(<div>
          <ShowSubmission
            id={Submission.id}
            submissionname={Submission.submissionname}
            coursename={Submission.coursename}
            owner={Submission.owner}
            subject={Submission.subject}
            created_at={Submission.created_at}
            deadline={Submission.deadline}
            comment={Submission.comment}
            isAdmin={this.state.isAdmin}
          /></div>);
      }
    }

    return (
      <div className="Abgabenuebersicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row key={1} className="Content" fluid>
              <Col key={1} xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col key={2} xs={10} className="ColContent" fluid>
                <h1>Abgabenübersicht</h1>
                <div className="AdminArea">
                  <button className="btnCreateCourse"
                    onClick={this.toggleCreateCourse}>
                    Bearbeiten
                  </button>
                </div>
                <Row key={0} className="Section"
                  hidden={!this.state.isAdmin}>
                  <h2>Meine Abgaben</h2>
                  {OwnSubmissionsList}
                </Row>
                <Row key={1} className="Section"
                  hidden={this.state.isAdmin}>
                  <h2>Abgaben fällig</h2>
                  {DueSubmissionList}
                </Row>
                <Row key={2} className="Section"
                  hidden={this.state.isAdmin}>
                  <h2>Abgegeben</h2>
                  {SubmittedSubmissionList}
                </Row>
                <Row key={3} className="Section"
                  hidden={this.state.isAdmin}>
                  <h2>Bewertet</h2>
                  {EvalSubmissionList}
                </Row>
              </Col>
            </Row>

            <Dialog open={this.state.openUserSubView}
              onClose={this.toggleOpenUserSubs}
              className="DialogUserSubsView">
              <DialogTitle>Nutzerabgaben</DialogTitle>
              <DialogContent className="DConfirmationContent">
                <DialogContentText>
                  <p>Hier finden Sie die Nutzerabgaben</p>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  onClick={this.toggleOpenUserSubs}
                  className="DialogButton">
                  Abbrechen</button>
              </DialogActions>
            </Dialog>

          </Container>
        </div>
        <ShowFooter/>
      </div>
    );
  }
}
export default Abgabenuebersicht;
