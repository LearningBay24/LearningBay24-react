/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {
  getAttendedExams, getCreatedExams,
  getPassedExams, getRegisteredExams, getUnregisteredExams, registerToExam,
  deregisterFromExam,
} from "../api";


import "../css/Overlay.css";
import "../css/Klausurenuebersicht.css";

export class Klausurenuebersicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UnregisteredExams: [{
        id: -1,
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
        id: -1,
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
        id: -1,
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
        id: -1,
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
        id: -1,
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
    getPassedExams(this);
    getRegisteredExams(this);
    getUnregisteredExams(this);

    getCreatedExams(this);
  }
  render() {
    const unregisteredList = [];
    if (this.state.UnregisteredExams != null) {
      for (const Exam of this.state.UnregisteredExams) {
        if (Exam.id != -1) {
          unregisteredList.push(<Col xs={4} fluid><ShowUnregisteredExam
            id={Exam.id}
            name={Exam.name}
            creator_id={Exam.creator_id}
            description={Exam.description}
            register_deadline={Exam.register_deadline}
            deregister_deadline={Exam.deregister_deadline}
            date={Exam.date}
            duration={Exam.duration / 60} /></Col>);
        }
      }
    }

    const registeredList = [];
    if (this.state.RegisteredExams != null) {
      for (const Exam of this.state.RegisteredExams) {
        if (Exam.id != -1) {
          registeredList.push(<Col xs={4} fluid><ShowRegisteredExam id={Exam.id}
            name={Exam.name}
            creator_id={Exam.creator_id}
            description={Exam.description}
            register_deadline={Exam.register_deadline}
            deregister_deadline={Exam.deregister_deadline}
            date={Exam.date}
            duration={Exam.duration / 60} /></Col>);
        }
      }
    }


    const attendedList = [];
    if (this.state.AttendedExams != null) {
      for (const Exam of this.state.AttendedExams) {
        if (Exam.id != -1) {
          let grade = Exam.graded;
          if (grade === 0 || grade === null) {
            grade = "Noch nicht bewertet";
          }
          attendedList.push(<Col xs={4} fluid><ShowAttendedExam id={Exam.id}
            name={Exam.name}
            creator_id={Exam.creator_id}
            description={Exam.description}
            graded={grade}
            date={Exam.date} /></Col>);
        }
      }
    }

    const passedList = [];
    if (this.state.PassedExams != null) {
      for (const Exam of this.state.PassedExams) {
        if (Exam.id != -1) {
          passedList.push(<Col xs={4} fluid><ShowAttendedExam id={Exam.id}
            name={Exam.name}
            creator_id={Exam.creator_id}
            description={Exam.description}
            graded={Exam.graded}
            date={Exam.date} /></Col>);
        }
      }
    }

    const createdList = [];
    if (this.state.CreatedExams != null) {
      for (const Exam of this.state.CreatedExams) {
        if (Exam.id != -1) {
          createdList.push(<Col xs={4} fluid><ShowCreatedExam id={Exam.id}
            name={Exam.name}
            creator_id={Exam.creator_id}
            description={Exam.description}
            register_deadline={Exam.register_deadline}
            deregister_deadline={Exam.deregister_deadline}
            date={Exam.date}
            duration={Exam.duration / 60} />
          </Col>);
        }
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
                <Row className="Section" hidden={createdList.length == 0}>
                  <h2>Erstellte Klausuren</h2>
                  {createdList}
                </Row>
                <Row className="Section" hidden={registeredList.length == 0}>
                  <h2>Angemeldete Klausuren</h2>
                  {registeredList}
                </Row>
                <Row className="Section" hidden={unregisteredList.length == 0}>
                  <h2>Anmelden</h2>
                  {unregisteredList}
                </Row>
                <Row className="Section" hidden={attendedList.length == 0 &&
                  passedList.length == 0} >
                  <h2>Vergangene Klausuren</h2>
                  <Row className="Section" hidden={attendedList.length == 0}>
                    <h3>Teilgenommene Klausuren</h3>
                    {attendedList}
                  </Row>
                  <Row className="Section" hidden={passedList.length == 0}>
                    <h3>Bestandene Klausuren</h3>
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
    <div className="Exam">
      <h4 className="ExamName">{props.name}</h4>
      <p className="ExamOwner">Prüfer:{props.creator_id}</p>
      <p className="ExamDescription">{props.description}</p>
      <p className="ExamDate">{props.date}</p>
      <p className="ExamGraded">Note: {props.graded}</p>
    </div>
  );
}

function ShowUnregisteredExam(props) {
  return (
    <div className="Exam">
      <h4 className="ExamName">{props.name}</h4>
      <p className="ExamDescription">{props.description}</p>
      <p className="Examduration">Dauer :{props.duration}min.</p>
      <p className="ExamDate">{props.date}</p>
      <p className="ExamRoom">{props.location}</p>
      <button onClick={() => {
        registerToExam(this, props.id);
      }}>Anmelden</button>
    </div>
  );
}

function ShowRegisteredExam(props) {
  return (
    <div className="Exam">
      <h4 className="ExamName">{props.name}</h4>
      <p className="ExamDescription">{props.description}</p>
      <p className="Examduration">Dauer :{props.duration}min.</p>
      <p className="ExamDate">{props.date}</p>
      <p className="ExamRoom">{props.location}</p>
      <button onClick={() => {
        deregisterFromExam(this, props.id);
      }}>Abmelden</button>
    </div>
  );
}

function ShowCreatedExam(props) {
  return (
    <div className="Exam">
      <h4 className="ExamName">{props.name}</h4>
      <p className="ExamDescription">{props.description}</p>
      <p className="Examduration">Dauer :{props.duration}min</p>
      <p className="ExamDate">{props.date}</p>
      <p className="ExamRoom">{props.location}</p>
    </div>
  );
}

export default Klausurenuebersicht;
