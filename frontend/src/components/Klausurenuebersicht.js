/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";
import {
  getAttendedExams, getCreatedExams, deleteExam, editExam, getFileFromExam,
  getPassedExams, getRegisteredExams, getUnregisteredExams, registerToExam,
  deregisterFromExam, uploadSolutionExam, uploadFileExam, getExamAttendees,
  gradeExam, getExamRegistered, setAttendency, getExamSubmission,
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

      ExamAttendees: [{
        user_id: -1,
        title: "",
        firstname: "",
        surname: "",
        grade: "",
      }],

      ExamRegistered: [{
        user_id: -1,
        title: "",
        firstname: "",
        surname: "",
      }],


      editExamBool: false,
      editExamId: -1,
      gradeExamBool: false,
      gradeExamId: -1,

      NewExamName: "",
      NewExamDescription: "",
      NewExamDuration: "",
      NewExamOnline: "",
      NewExamLocation: "",

      examAtendeePassed: "0",
      examAtendeeFeedback: "",
      examAtendeeGrade: "",
      examAtendeeId: -1,
      examToGrade: "",
      userToGrade: "",
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

  toggleAttendency = (id) => {
    this.setState({AttendencyBool: !this.state.AttendencyBool});
    this.setState({AttendencyId: id});
    if (id != -1) {
      getExamRegistered(this, id);
    }
  };

  toggleGradeExam = (id, name) => {
    this.setState({gradeExamBool: !this.state.gradeExamBool});
    this.setState({gradeExamId: id});
    if (id != -1) {
      getExamAttendees(this, id);
    }
    this.setState({examToGrade: name});
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
          unregisteredList.push(<Col xs={4} ><ShowUnregisteredExam
            Exam={Exam}/></Col>);
        }
      }
    }

    const registeredList = [];
    if (this.state.RegisteredExams != null) {
      for (const Exam of this.state.RegisteredExams) {
        if (Exam.id != -1) {
          registeredList.push(<Col xs={4} ><ShowRegisteredExam Exam={Exam}
            solution={null}/></Col>);
        }
      }
    }


    const attendedList = [];
    if (this.state.AttendedExams != null) {
      for (const Exam of this.state.AttendedExams) {
        if (Exam.id != -1) {
          let grade = Exam.grade;
          if (grade === 0 || grade === null) {
            grade = "Noch nicht bewertet";
          }
          attendedList.push(<Col xs={4} ><ShowAttendedExam Exam={Exam}
            graded={grade}/></Col>);
        }
      }
    }

    const passedList = [];
    if (this.state.PassedExams != null) {
      for (const Exam of this.state.PassedExams) {
        if (Exam.id != -1) {
          passedList.push(<Col xs={4} >
            <ShowAttendedExam Exam={Exam} graded={Exam.grade}/>
          </Col>);
        }
      }
    }

    const createdList = [];
    if (this.state.CreatedExams != null) {
      for (const Exam of this.state.CreatedExams) {
        if (Exam.id != -1) {
          createdList.push(<Col xs={4} ><ShowCreatedExam Exam={Exam}
            toggleAttendency = {this.toggleAttendency}
            toggleGrade = {this.toggleGradeExam}
            toggleEdit = {this.toggleEditExam} />
          </Col>);
        }
      }
    }

    const examAttendeeList = [];
    examAttendeeList.push(<option value={0}>Teilnehmer auswählen</option>);
    if (this.state.ExamAttendees != null) {
      for (const Attendee of this.state.ExamAttendees) {
        if (Attendee.user_id != -1) {
          examAttendeeList.push(<option value={[Attendee.user_id]}>
            {Attendee.title} {Attendee.firstname} {Attendee.surname},  Punkte:
            {Attendee.grade}
          </option>);
        }
      }
    }

    const examRegisteredList = [];
    examRegisteredList.push(<option value={0}>Teilnehmer auswählen</option>);
    if (this.state.ExamRegistered != null) {
      for (const Attendee of this.state.ExamRegistered) {
        if (Attendee.user_id != -1) {
          examRegisteredList.push(<option value={Attendee.user_id}>
            {Attendee.title} {Attendee.firstname} {Attendee.surname}
          </option>);
        }
      }
    }


    return (
      <div className="Klausurenuebersicht">
        <ShowHeader />

        <Dialog open={this.state.editExamBool}
          onClose={() => this.toggleEditExam(-1)}>
          <DialogTitle>Klausur bearbeiten</DialogTitle>
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
              <label htmlFor="EditExamDuration">Dauer (in min):</label>
              <input type="number" min="0" id="EditExamDuration"
                placeholder="Dauer" onChange={this.onInputChange}
                name="NewExamDuration">
              </input>
              <label>Offline/Online</label>
              <select onChange={this.onInputChange}
                name="NewExamOnline">
                <option></option>
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
              let dateStr = "";
              let registerStr = "";
              let deregisterStr = "";
              if (this.state.NewExamDate != null) {
                dateStr = new Date(
                    (new Date(this.state.NewExamDate).getTime() + 3600000 * 2))
                    .toISOString().split(".")[0]+"Z";
              }
              if (this.state.NewExamRegister != null) {
                registerStr = new Date(
                    (new Date(this.state.NewExamRegister).getTime() +
                    3600000 * 2)).toISOString().split(".")[0]+"Z";
              }
              if (this.state.NewExamDeregister != null) {
                deregisterStr = new Date(
                    (new Date(this.state.NewExamDeregister).getTime() +
                    3600000 * 2)).toISOString().split(".")[0]+"Z";
              }
              const object = {
                id: this.state.editExamId,
                name: this.state.NewExamName,
                description: this.state.NewExamDescription,
                date: dateStr,
                duration: (this.state.NewExamDuration*60).toString(),
                online: this.state.NewExamOnline,
                location: this.state.NewExamLocation,
                register_deadline: registerStr,
                deregister_deadline: deregisterStr,
              };
              editExam(this, object);
              if (this.state.newExamFile != null) {
                uploadFileExam(this, object.id, this.state.newExamFile);
              }
              this.toggleEditExam(-1);
            }}>
              Speichern
            </button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.gradeExamBool}
          onClose={() => this.toggleGradeExam(-1, "")}>
          <DialogTitle>Klausur bewerten</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <select name="examAtendeeId" onChange={this.onInputChange}>
                {examAttendeeList}
              </select>
              <input type="number" min="0" max="100" name="examAtendeeGrade"
                onChange={this.onInputChange}/>
              <input type="text" name="examAtendeeFeedback"
                onChange={this.onInputChange}/>
              <select name="examAtendeePassed" onChange={this.onInputChange}>
                <option value="0">Nicht bestanden</option>
                <option value="1">Bestanden</option>
              </select>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={() => {
              getExamSubmission(this, this.state.examAtendeeId,
                  this.state.gradeExamId, "test");
            }}>Abgabe Herunterladen</button>
            <button onClick={() => this.toggleGradeExam(-1, "")}>
              Schließen
            </button>
            <button onClick={() => {
              const object = {
                grade: this.state.examAtendeeGrade.toString(),
                passed: this.state.examAtendeePassed.toString(),
                feedback: this.state.examAtendeeFeedback,
              };
              gradeExam(this, this.state.examAtendeeId,
                  this.state.gradeExamId, object);
            }}>
              bewerten
            </button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.AttendencyBool}
          onClose={() => this.toggleAttendency(-1)}>
          <DialogTitle>Klausur bewerten</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <select name="examAtendee" onChange={this.onInputChange}>
                {examRegisteredList}
              </select>
              <button onClick={() => {
                setAttendency(this,
                    this.state.examAtendee, this.state.AttendencyId);
              }}>
              ist Anwesend
              </button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={() => this.toggleAttendency(-1)}>
              Schließen
            </button>
          </DialogActions>
        </Dialog>

        <div className="Body">
          <Container className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" >
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
      <h4 className="ExamName">{props.Exam.name}</h4>
      <p className="ExamOwner">Prüfer:{props.Exam.creator_id}</p>
      <p className="ExamDescription">{props.Exam.description}</p>
      <p className="ExamDate">{props.Exam.date}</p>
      <p className="ExamGraded">Punkte: {props.graded}/100</p>
      <p className="ExamFeedback">Feedback: {props.Exam.feedback}</p>
    </div>
  );
}

function ShowUnregisteredExam(props) {
  const actual = (new Date().getTime()+3600000*2);
  const register = (new Date(props.Exam.register_deadline).getTime());
  return (
    <div className="Exam">
      <h4 className="ExamName">{props.Exam.name}</h4>
      <p className="ExamDescription">{props.Exam.description}</p>
      <p className="Examduration">Dauer :{props.Exam.duration / 60}min.</p>
      <p className="ExamDate">{props.Exam.date}</p>
      <p className="ExamRoom">{props.Exam.location}</p>
      <button hidden={actual > register} onClick={() => {
        registerToExam(this, props.Exam.id);
      }}>Anmelden</button>
    </div>
  );
}

function ShowRegisteredExam(props) {
  let solution_ = props.solution;
  const actual = (new Date().getTime()+3600000*2);
  const start = (new Date(props.Exam.date).getTime());
  const end = (new Date(props.Exam.date).getTime() +
    props.duration*1000);
  const deregister = (new Date(props.Exam.deregister_deadline).getTime());

  return (
    <div className="Exam">
      <h4 className="ExamName">{props.Exam.name}</h4>
      <p className="ExamDescription">{props.Exam.description}</p>
      <p className="Examduration">Dauer :{props.Exam.duration / 60}min.</p>
      <p className="ExamDate">{props.Exam.date}</p>
      <p className="ExamRoom">{props.Exam.location}</p>
      <button hidden={actual > deregister} onClick={() => {
        deregisterFromExam(this, props.id);
      }}>Abmelden</button>
      <div hidden={actual < start || actual > end}>
        <input type="file" name="solution" onChange={() => {
          solution_=event.target.files[0];
        }} />
        <button onClick={() => {
          getFileFromExam(this, props.Exam.id, props.Exam.name);
        }}>
          Klausur herunterladen
        </button>
        <button onClick={() => {
          uploadSolutionExam(this, props.Exam.id, solution_);
        }}>
          Lösung hochladen
        </button>
      </div>
    </div>
  );
}

function ShowCreatedExam(props) {
  const toggleEdit = props.toggleEdit;
  const toggleGrade = props.toggleGrade;
  const toggleAttendency = props.toggleAttendency;
  const actual = (new Date().getTime()+3600000*2);
  const start = (new Date(props.Exam.date).getTime());
  const end = (new Date(props.Exam.date).getTime() +
  props.Exam.duration*1000);
  console.log(actual);
  console.log(end);
  return (
    <div className="Exam">
      <h4 className="ExamName">{props.Exam.name}</h4>
      <p className="ExamDescription">{props.Exam.description}</p>
      <p className="Examduration">Dauer :{props.Exam.duration / 60}min</p>
      <p className="ExamDate">{props.Exam.date}</p>
      <p className="ExamRoom">{props.Exam.location}</p>

      <button hidden={actual > start} onClick={() => {
        toggleEdit(props.Exam.id);
      }}>Bearbeiten</button>
      <button onClick={() => {
        deleteExam(this, props.Exam.id);
      }}>Löschen</button>
      <button
        onClick={() => {
          toggleGrade(props.Exam.id, props.Exam.name);
        }}>Bewerten</button>
      <button hidden={actual < start || actual > end} onClick={() => {
        toggleAttendency(props.Exam.id);
      }}>Anwesenheit</button>
    </div>
  );
}

export default Klausurenuebersicht;
