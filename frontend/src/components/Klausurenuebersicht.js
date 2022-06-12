/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {
  getAttendedExams, getCreatedExams,
  getPassedExams, getExams,
} from "../api";

import {Link} from "react-router-dom";

import "../css/Overlay.css";
import "../css/Klausurenuebersicht.css";

export class Klausurenuebersicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UnregisteredExams: [{
        id: 1,
        name: "",
        description: "",
        date: "",
        duration: "",
        online: "",
        location: "",
        course_id: "",
        creator_id: "",
        graded: "",
        register_deadline: "",
        deregister_deadline: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      }],

      RegisteredExams: [{
        id: 1,
        name: "",
        description: "",
        date: "",
        duration: "",
        online: "",
        location: "",
        course_id: "",
        creator_id: "",
        graded: "",
        register_deadline: "",
        deregister_deadline: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      }],

      AttendedExams: [{
        id: 1,
        name: "",
        description: "",
        date: "",
        duration: "",
        online: "",
        location: "",
        course_id: "",
        creator_id: "",
        graded: "",
        register_deadline: "",
        deregister_deadline: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      }],

      CreatedExams: [{
        id: 1,
        name: "",
        description: "",
        date: "",
        duration: "",
        online: "",
        location: "",
        course_id: "",
        creator_id: "",
        graded: "",
        register_deadline: "",
        deregister_deadline: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      }],

      PassedExams: [{
        id: 1,
        name: "",
        description: "",
        date: "",
        duration: "",
        online: "",
        location: "",
        course_id: "",
        creator_id: "",
        graded: "",
        register_deadline: "",
        deregister_deadline: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      }],
    };
  }

  componentDidMount() {
    getAttendedExams(this);
    getCreatedExams(this);
    getPassedExams(this);
    getExams(this);
  }
  render() {
    const unregisteredList = [];
    if (this.state.UnregisteredExams != null) {
      for (const Exam of this.state.UnregisteredExams) {
        unregisteredList.push(<Col xs={4} fluid><ShowExam name={Exam.name}
          creator_id={Exam.creator_id}
          description={Exam.description}
          register_deadline={Exam.register_deadline}
          deregister_deadline={Exam.deregister_deadline}
          date={Exam.date} /></Col>);
      }
    }

    const registeredList = [];
    if (this.state.RegisteredExams != null) {
      for (const Exam of this.state.RegisteredExams) {
        registeredList.push(<Col xs={4} fluid><ShowExam name={Exam.name}
          creator_id={Exam.creator_id}
          description={Exam.description}
          register_deadline={Exam.register_deadline}
          deregister_deadline={Exam.deregister_deadline}
          date={Exam.date} /></Col>);
      }
    }


    const attendedList = [];
    if (this.state.AttendedExams != null) {
      for (const Exam of this.state.AttendedExams) {
        let grade = Exam.graded;
        if (grade === 0 || grade === null) {
          grade = "Noch nicht bewertet";
        }
        attendedList.push(<Col xs={4} fluid><ShowAttendedExam name={Exam.name}
          creator_id={Exam.creator_id}
          description={Exam.description}
          graded={grade}
          date={Exam.date} /></Col>);
      }
    }

    const passedList = [];
    if (this.state.PassedExams != null) {
      for (const Exam of this.state.PassedExams) {
        passedList.push(<Col xs={4} fluid><ShowAttendedExam name={Exam.name}
          creator_id={Exam.creator_id}
          description={Exam.description}
          graded={Exam.graded}
          date={Exam.date} /></Col>);
      }
    }
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
                  <h1>Angemeldete Klausuren</h1>
                  {registeredList}
                </Row>
                <Row className="Section">
                  <h1>Anmelden</h1>
                  {unregisteredList}
                </Row>
                <Row className="Section">
                  <h1>Vergangene Klausuren</h1>
                  <Row className="Section">
                    <h1>Teilgenommene Klausuren</h1>
                    {attendedList}
                  </Row>
                  <Row className="Section">
                    <h1>Bestandene Klausuren</h1>
                    {passedList}
                  </Row>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <ShowFooter />
      </div>
    );
  }
}

function ShowAttendedExam(props) {
  return (
    <Link to={"/Klausuransicht/" + props.exam_id}>
      <div className="Exam">
        <h4 className="ExamName">{props.name}</h4>
        <p className="ExamOwner">Prüfer:{props.creator_id}</p>
        <p className="ExamDescription">{props.description}</p>
        <p className="ExamDate">{props.date}</p>
        <p className="ExamGraded">Note: {props.graded}</p>
      </div>
    </Link>
  );
}

function ShowExam(props) {
  return (
    <Link to={"/Klausuransicht/" + props.exam_id}>
      <div className="Exam">
        <h4 className="ExamName">{props.name}</h4>
        <p className="ExamDescription">{props.description}</p>
        <p className="Examduration">Dauer :{props.duration}min</p>
        <p className="ExamDate">{props.date}</p>
        <p className="ExamRoom">{props.location}</p>
      </div>
    </Link>
  );
}

export default Klausurenuebersicht;
