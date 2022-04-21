import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'


import '../css/App.css';

export class Kursansicht extends Component {
  constructor(props) {
    super(props)

    this.state = {

      CourseAdmin: true, // true if active user has adminrights
      CourseEdit: false, // true if admin is editing course

      CourseName: "Beispielkurs",

      CourseOwner: { LastName: "Mustermann", FirstName: "Max", id: "" },
      CourseParticipants: [{ FirstName: "", LastName: "", Role: "", id: "" }],
      CourseTutors: [{ FirstName: "", LastName: "", Role: "", id: "" }],


      CourseAppointments: [{ Day: "Montag", Time: "11:00", Duration: "1:30h", Content: "Vorlesung", Location: "Raum A123" },
      { Day: "Freitag", Time: "8:00", Duration: "1:30h", Content: "Praktikum", Location: "Raum A123" }],

      CourseBio: "Das ist ein Beispielkurs",
      CourseCreatedAt: "17.04.2022",
      CourseForum: "",


      CourseMaterial: [{ Name: "mat1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }],
      CourseAssignments: [{
        Name: "Abgabe1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        Date: "17.04.2022", Deadline: "25.04.2022 0:00"
      }],

      CourseSurveys: [{ Name: "Umfrage1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }],
      CourseExams: [{ Name: "Klausur1", Date: "30.4.2022", Duration: "1:30h", Location: "Raum A123" }]
    }
  }




  render() {

    // ____________________________________________________________________________________________________________________________________
    // Lists for general view
    // ____________________________________________________________________________________________________________________________________

    var Generallist = [<h1>{this.state.CourseName}</h1>,
    <button hidden={!this.state.CourseAdmin} onClick={() => this.setState({ CourseEdit: !this.state.CourseEdit })}>
      Kurs bearbeiten</button>]

    Generallist.push(<p hidden={this.state.CourseEdit}>{this.state.CourseOwner.FirstName} {this.state.CourseOwner.LastName}</p>)
    for (const Appointment of this.state.CourseAppointments) {
      Generallist.push(<h3 hidden={this.state.CourseEdit}>{Appointment.Day} {Appointment.Time} {Appointment.Duration} {Appointment.Content}
        {Appointment.Location}</h3>)
    }
    Generallist.push(<p hidden={this.state.CourseEdit}>{this.state.CourseBio}</p>)

    var Materiallist = []
    for (const Mat of this.state.CourseMaterial) {
      Materiallist.push(<ShowMaterial Name={Mat.Name} Content={Mat.Content} />)
    }

    var Assignmentlist = []
    for (const Assignment of this.state.CourseAssignments) {
      Assignmentlist.push(<ShowAssignment Name={Assignment.Name} Content={Assignment.Content} Date={Assignment.Date}
        Deadline={Assignment.Deadline} />)
    }

    var Surveylist = []
    for (const Survey of this.state.CourseSurveys) {
      Surveylist.push(<ShowSurvey Name={Survey.Name} Content={Survey.Content} />)
    }

    var Examlist = []
    for (const Exam of this.state.CourseExams) {
      Examlist.push(<ShowExam Name={Exam.Name} Content={Exam.Content} Date={Exam.Date} Duration={Exam.Duration}
        Location={Exam.Location} />)
    }


    // ____________________________________________________________________________________________________________________________________
    // lists for edit course view
    // ____________________________________________________________________________________________________________________________________
    var EditAppointments = [<option>Veranstaltung hinzufügen</option>]
    for (const Appointment of this.state.CourseAppointments) {
      EditAppointments.push(<option>{Appointment.Day} {Appointment.Time} {Appointment.Content} {Appointment.Location}</option>)
    }

    var EditParticipants = []
    for (const Participant of this.state.CourseParticipants) {
      EditParticipants.push(<option>{Participant.FirstName} {Participant.LastName} {Participant.Role}</option>)
    }

    var EditMaterial = [<option>Material hinzufügen</option>]
    for (const Mat of this.state.CourseMaterial) {
      EditMaterial.push(<option>{Mat.Name}</option>)
    }

    var EditAssignment = [<option>Abgabe hinzufügen</option>]
    for (const Assignment of this.state.CourseAssignments) {
      EditAssignment.push(<option>{Assignment.Name} {Assignment.Date}</option>)
    }

    var EditSurvey = [<option>Umfrage hinzufügen</option>]
    for (const Survey of this.state.CourseSurveys) {
      EditSurvey.push(<option>{Survey.Name}</option>)
    }

    var EditExam = [<option>Klausur hinzufügen</option>]
    for (const Exam of this.state.CourseExams) {
      EditExam.push(<option>{Exam.Name} {Exam.Date}</option>)
    }



    return (
      <div className="Kursansicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Row" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                {Generallist}

                <div className="editSection Section" hidden={!this.state.CourseEdit}>
                  <h2>Kurs Bearbeiten</h2>
                  <input type="text" id="EditCourseBioId" placeholder={this.state.CourseBio} />
                  <button>Beschreibung speichern</button>
                  <br />
                  <select>{EditAppointments}</select>
                  <label for="EditCourseWeekday">Wochentag:</label>
                  <input type="Text" id="EditCourseWeekday" placeholder="Wochentag"></input>
                  <label for="EditCourseTime">Uhrzeit:</label>
                  <input type="Time" id="EditCourseTime" ></input>
                  <label for="EditCourseContent">Inhalt:</label>
                  <input type="Text" id="EditCourseduration" placeholder="Dauer"></input>
                  <label for="EditCourseLocation">Raum:</label>
                  <input type="Text" id="EditLocation" placeholder="Raum"></input>
                  <br />
                  <select>{EditParticipants}</select>
                  <button>Tutorenrechte geben/entziehen</button>
                  <button>Ausschreiben</button>
                  <br />
                  <select>{EditMaterial}</select>
                  <label for="EditMaterialName">Name:</label>
                  <input type="Text" id="EditMaterialName" placeholder="Materialname"></input>
                  // TODO add material
                  <button>Löschen</button>
                  <button>Speichern</button>
                  <br />
                  <select>{EditAssignment}</select>
                  <label for="EditAssignmentName">Name:</label>
                  <input type="Text" id="EditAssignmentName" placeholder="Abgabename"></input>
                  <label for="EditAssignmentDate">Datum:</label>
                  <input type="Date" id="EditAssignmentDate" ></input>
                  <label for="EditAssignmentTime">Uhrzeit:</label>
                  <input type="Time" id="EditAssignmentTime" ></input>
                  // TODO add material
                  <button>Löschen</button>
                  <button>Speichern</button>
                  <br />
                  <select>{EditSurvey}</select>
                  <label for="EditSurveyName">Name:</label>
                  <input type="Text" id="EditSurveyName" placeholder="Umfragename"></input>
                  <label for="EditSurveyLink">Link:</label>
                  <input type="Text" id="EditSurveyLink" placeholder="Umfragelink"></input>
                  <button>Löschen</button>
                  <button>Speichern</button>
                  <br />
                  <select>{EditExam}</select>
                  <label for="EditExamName">Name:</label>
                  <input type="Text" id="EditExamName" placeholder="Klausurname"></input>
                  <label for="EditExamDate">Datum:</label>
                  <input type="Date" id="EditExamDate"></input>
                  <label for="EditExamTime">Uhrzeit:</label>
                  <input type="Time" id="EditExamTime"></input>
                  <label for="EditExamDuration">Dauer:</label>
                  <input type="Text" id="EditExamDuration" placeholder="Dauer"></input>

                  // TODO add material
                  <button>Löschen</button>
                  <button>Speichern</button>
                  <br />

                </div>

                <div className="MaterialSection Section" hidden={this.state.CourseEdit}>
                  <h2>Material</h2>
                  {Materiallist}
                </div>

                <div className="AssignmentSection Section" hidden={this.state.CourseEdit}>
                  <h2>Abgaben</h2>
                  {Assignmentlist}
                </div>

                <div className="SurveySection Section" hidden={this.state.CourseEdit}>
                  <h2>Umfragen</h2>
                  {Surveylist}
                </div>

                <div className="ExamSection Section" hidden={this.state.CourseEdit}>
                  <h2>Klausuren</h2>
                  {Examlist}
                </div>

              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }


}
function ShowMaterial(props) {
  return (
    <div className='MaterialContainer'>
      <h6>{props.Name}</h6>
      <a href={props.Content} target='_blank' rel='noopener noreferrer'>{props.content}</a>
    </div>)
}

function ShowAssignment(props) {
  return (
    <div className='AssignmentContainer'>
      <h6>{props.Name}</h6>
      <a href={props.Content} target='_blank' rel='noopener noreferrer'>{props.Content}</a>
      <p className='AssignmentDate'>{props.Date}</p>
      <p className='AssignmentDeadline'>{props.Deadline}</p>
      <br />
      <input type="submit" value="Datei abgeben" />
    </div>)
}

function ShowExam(props) {
  return (
    <div className='ExamContainer'>
      <h6>{props.Name}</h6>
      <a href={props.Content} target='_blank' rel='noopener noreferrer'>{props.Content}</a>
      <p>Zeit: {props.Duration}</p>
      <p>Datum: {props.Date}</p>
      <p>Ort: {props.Location}</p>
      <br />
      <input type="submit" value="zur Prüfung anmelden" />
    </div>)
}

function ShowSurvey(props) {
  return (
    <div className='SurveyContainer'>
      <h6>{props.Name}</h6>
      <a href={props.Content} target='_blank' rel='noopener noreferrer'>{props.Content}</a>
    </div>)
}

export default Kursansicht
