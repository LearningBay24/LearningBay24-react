/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {
  getAttendedExams, getCreatedExams, deleteExam, editExam, getFileFromExam,
  getPassedExams, getRegisteredExams, getUnregisteredExams, registerToExam,
  deregisterFromExam, uploadSolutionExam, uploadFileExam,
} from "../api";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


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

      editExamBool: false,
      editExamId: -1,
    };
    this.toggleEditExam = this.toggleEditExam.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  toggleEditExam = (id) => {
    this.setState({editExamBool: !this.state.editExamBool});
    this.setState({editExamId: id});
  };

  onFileChange(event) {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
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
            date={Exam.date} solution={null}
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
            duration={Exam.duration / 60}
            toggle = {this.toggleEditExam} />
          </Col>);
        }
      }
    }
    return (
      <div className="Klausurenuebersicht">
        <ShowHeader />

        <Dialog open={this.state.editExamBool}
          onClose={() => this.toggleEditExam(-1)}>
          <DialogTitle>Kurs erstellen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <label htmlFor="EditExamName">Name:</label>
              <input type="Text" id="EditExamName"
                placeholder="Klausurname" onChange={this.onInputChange}
                name="NewExamName">
              </input>
              <label htmlFor="EditExamDescription">Beschreibung:</label>
              <input type="Text" id="EditExamDescription"
                placeholder="Klausurbeschreibung"
                onChange={this.onInputChange}
                name="NewExamDescription">
              </input>
              <label htmlFor="EditExamDate">Datum:</label>
              <input type="Datetime-local" id="EditExamDate"
                onChange={this.onInputChange}
                name="NewExamDate">
              </input>
              <label htmlFor="EditExamDuration">Dauer(in min):</label>
              <input type="Text" id="EditExamDuration"
                placeholder="Dauer" onChange={this.onInputChange}
                name="NewExamDuration">
              </input>
              <label>Offline/Online</label>
              <select onChange={this.onInputChange}
                name="NewExamOnline">
                <option value="0">Offline</option>
                <option value="1">Online</option>
              </select>
              <label>Datei auswählen</label>
              <input type="file" name="newExamFile"
                onChange={this.onFileChange} />
              <label htmlFor="EditExamLocation">
                Raum(Zoomlink falls online):</label>
              <input type="Text" id="EditExamLocation"
                placeholder="Raum" onChange={this.onInputChange}
                name="NewExamLocation"></input>
              <label htmlFor="EditExamRegDate">Deadline Anmeldung:</label>
              <input type="Datetime-local" id="EditExamRegDate"
                onChange={this.onInputChange}
                name="NewExamRegister">
              </input>
              <label htmlFor="EditExamDeregDate">
                Deadline Abmeldung:</label>
              <input type="Datetime-local" id="EditExamDeregDate"
                onChange={this.onInputChange}
                name="NewExamDeregister">
              </input>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={() => this.toggleEditExam(-1)}>
              Abbrechen
            </button>
            <button onClick={() => {
              const object = {
                id: this.state.editExamId,
                name: this.state.NewExamName,
                description: this.state.NewExamDescription,
                date: new Date(
                    (new Date(this.state.NewExamDate).getTime() + 3600000 * 2))
                    .toISOString().split(".")[0]+"Z",
                duration: (this.state.NewExamDuration*60).toString(),
                online: this.state.NewExamOnline,
                location: this.state.NewExamLocation,
                register_deadline: new Date(
                    (new Date(this.state.NewExamRegister).getTime() +
                    3600000 * 2)).toISOString().split(".")[0]+"Z",
                deregister_deadline: new Date(
                    (new Date(this.state.NewExamDeregister).getTime() +
                    3600000 * 2)).toISOString().split(".")[0]+"Z",
              };
              editExam(this, object);
              if (this.state.newExamFile != null) {
                uploadFileExam(this, object.id, this.state.newExamFile);
              }
            }}>
              Speichern
            </button>
          </DialogActions>
        </Dialog>

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
  let solution_ = props.solution;
  console.log(new Date(props.date) + props.duration);
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
      <div hidden={new Date(Date.UTC(props.date)).getTime() >
        new Date().getTime() ||
        new Date().getTime() < (new Date(Date.UTC(props.date)).getTime() +
          props.duration*60*1000)}>
        <input type="file" name="solution" onChange={() => {
          solution_=event.target.files[0];
        }} />
        <button onClick={() => {
          getFileFromExam(this, props.id, props.name);
        }}>
          Klausur herunterladen
        </button>
        <button onClick={() => {
          uploadSolutionExam(this, props.id, solution_);
        }}>
          Lösung hochladen
        </button>
      </div>
    </div>
  );
}

function ShowCreatedExam(props) {
  const toggleEdit = props.toggle;
  return (
    <div className="Exam">
      <h4 className="ExamName">{props.name}</h4>
      <p className="ExamDescription">{props.description}</p>
      <p className="Examduration">Dauer :{props.duration}min</p>
      <p className="ExamDate">{props.date}</p>
      <p className="ExamRoom">{props.location}</p>

      <button onClick={() => {
        toggleEdit(props.id);
      }}>bearbeiten</button>
      <button onClick={() => {
        deleteExam(this, props.id);
      }}>Löschen</button>
    </div>
  );
}

export default Klausurenuebersicht;
