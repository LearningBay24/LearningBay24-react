import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";
import {
  getSubmissionFromUser,
  getAllSubmissions,
} from "../api/index";
import {SubmissionContext} from "./submissions/SubmissionContext";
import {Submission} from "./submissions/Submission";
// import {EditContext} from "./submissions/EditContext";

import "../css/Overlay.css";
import "../css/Abgabenuebersicht.css";

export class Abgabenuebersicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Submissions: [],
      AllAdminSub: [],
      AllEnrolledSub: [],
      AllUserSub: [],
      isAdmin: false,
      UserSubsFromSub: [],
      openUserSubView: false,
    };
  }

  componentDidMount() {
    if (this.state.isAdmin) {
      getSubmissionFromUser(this);
    } else {
      getAllSubmissions(this);
    }
  }


  render() {
    const SubmissionList = [];
    if (this.state.Submissions != null) {
      for (const Sub of this.state.Submissions) {
        SubmissionList.push(
            <SubmissionContext isAdmin={this.state.isAdmin}>
              <Submission submission={
                {
                  id: Sub.id,
                  subname: Sub.name,
                  coursename: Sub.coursename,
                  // owner: this.state.Course.CourseOwner.LastName,
                  createdAt: Sub.date,
                  deadline: Sub.deadline,
                }
              }
              isAdmin={this.state.CourseAdmin}
              />
            </SubmissionContext>,
        );
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
                {SubmissionList}
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
