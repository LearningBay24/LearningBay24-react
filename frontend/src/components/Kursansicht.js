import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'
import { useParams } from 'react-router-dom';


import '../css/App.css';
import { getCourse } from '../api';

export class Kursansicht extends Component {
  constructor(props) {
    super(props)

    

    this.state = {
      id : props.id,

      CourseAdmin: true, // true if active user has adminrights
      CourseEdit: false, // true if admin is editing course
      Course: {

        CourseName: "Beispielkurs",

        CourseOwner: { LastName: "Mustermann", FirstName: "Max", id: "" },
        CourseParticipants: [{ FirstName: "", LastName: "", Role: "", id: "" }],
        CourseTutors: [{ FirstName: "", LastName: "", Role: "", id: "" }],


        CourseAppointments: [{ Day: "Montag", Time: "11:00", Duration: "1:30h", Content: "Vorlesung", Location: "Raum A123", id: "1" },
        { Day: "Freitag", Time: "8:00", Duration: "1:30h", Content: "Praktikum", Location: "Raum A123", id: "2" }],

        CourseBio: "Das ist ein Beispielkurs",
        CourseCreatedAt: "17.04.2022",
        CourseForum: "",


        CourseMaterial: [{ Name: "mat1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", id: "" }],
        CourseAssignments: [{
          Name: "Abgabe1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          Date: "17.04.2022", Deadline: "25.04.2022 0:00", id: ""
        }],

        CourseSurveys: [{ Name: "Umfrage1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", id: "" }],
        CourseExams: [{ Name: "Klausur1", Date: "30.4.2022", Duration: "1:30h", Location: "Raum A123", id: "" }]
      },


      //variables for editing course
      ChangeAppointmentId : -1

    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onSaveAppointmentChange = this.onSaveAppointmentChange.bind(this);
  }


  componentDidMount() {
    getCourse(this, this.state.id);
  }

  

  

  // save inputs to extravariables in state until user commits them to Course object by clicking save button 
  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSaveAppointmentChange() {
    
    if(this.state.ChangeAppointmentId == -1) {
      console.log(this.state.ChangeAppointmentId)
      this.state.Course.CourseAppointments.push({
        
        Day: this.state.NewWeekDay,
        Time: this.state.NewCourseTime,
        Duration: this.state.NewCourseDuration,
        Content: this.state.NewCourseContent,
        Location: this.state.NewCourseLocation
      })
    }else {
    for (const Appointment of this.state.Course.CourseAppointments) {
      if (Appointment.id === this.state.ChangeAppointmentId) {
        Appointment.Day = this.state.NewWeekDay
        Appointment.Time = this.state.NewCourseTime
        Appointment.Duration = this.state.NewCourseDuration
        Appointment.Content = this.state.NewCourseContent
        Appointment.Location = this.state.NewCourseLocation
      }
    }
  }
  console.log(this.state.Course.CourseAppointments)
}




  render() {
    

  

    
    // ____________________________________________________________________________________________________________________________________
    // Lists for general view
    // ____________________________________________________________________________________________________________________________________

    var Generallist = [<h1>{this.state.Course.CourseName}</h1>,
    <button hidden={!this.state.CourseAdmin} onClick={() => this.setState({ CourseEdit: !this.state.CourseEdit })}>
      Kurs bearbeiten</button>]

    Generallist.push(<p hidden={this.state.CourseEdit}>{this.state.Course.CourseOwner.FirstName} {this.state.Course.CourseOwner.LastName}</p>)
    for (const Appointment of this.state.Course.CourseAppointments) {
      Generallist.push(<h3 hidden={this.state.CourseEdit}>{Appointment.Day} {Appointment.Time} {Appointment.Duration} {Appointment.Content}
        {Appointment.Location}</h3>)
    }
    Generallist.push(<p hidden={this.state.CourseEdit}>{this.state.Course.CourseBio}</p>)

    var Materiallist = []
    for (const Mat of this.state.Course.CourseMaterial) {
      Materiallist.push(<ShowMaterial Name={Mat.Name} Content={Mat.Content} />)
    }

    var Assignmentlist = []
    for (const Assignment of this.state.Course.CourseAssignments) {
      Assignmentlist.push(<ShowAssignment Name={Assignment.Name} Content={Assignment.Content} Date={Assignment.Date}
        Deadline={Assignment.Deadline} />)
    }

    var Surveylist = []
    for (const Survey of this.state.Course.CourseSurveys) {
      Surveylist.push(<ShowSurvey Name={Survey.Name} Content={Survey.Content} />)
    }

    var Examlist = []
    for (const Exam of this.state.Course.CourseExams) {
      Examlist.push(<ShowExam Name={Exam.Name} Content={Exam.Content} Date={Exam.Date} Duration={Exam.Duration}
        Location={Exam.Location} />)
    }


    // ____________________________________________________________________________________________________________________________________
    // lists for edit course view
    // ____________________________________________________________________________________________________________________________________
    var EditAppointments = [<option value={-1}>Veranstaltung hinzufügen</option>]
    for (const Appointment of this.state.Course.CourseAppointments) {
      EditAppointments.push(<option value={Appointment.id}>{Appointment.Day} {Appointment.Time} {Appointment.Content} {Appointment.Location}</option>)
    }

    var EditParticipants = []
    for (const Participant of this.state.Course.CourseParticipants) {
      EditParticipants.push(<option value={Participant.id}>{Participant.FirstName} {Participant.LastName} {Participant.Role}</option>)
    }

    var EditMaterial = [<option value={-1}>Material hinzufügen</option>]
    for (const Mat of this.state.Course.CourseMaterial) {
      EditMaterial.push(<option value={Mat.id}>{Mat.Name}</option>)
    }

    var EditAssignment = [<option value={-1}>Abgabe hinzufügen</option>]
    for (const Assignment of this.state.Course.CourseAssignments) {
      EditAssignment.push(<option value={Assignment.id}>{Assignment.Name} {Assignment.Date}</option>)
    }

    var EditSurvey = [<option value={-1}>Umfrage hinzufügen</option>]
    for (const Survey of this.state.Course.CourseSurveys) {
      EditSurvey.push(<option value={Survey.id}>{Survey.Name}</option>)
    }

    var EditExam = [<option value={-1}>Klausur hinzufügen</option>]
    for (const Exam of this.state.Course.CourseExams) {
      EditExam.push(<option value={Exam.id}>{Exam.Name} {Exam.Date}</option>)
    }

    // ____________________________________________________________________________________________________________________________________

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
                  <div className="Section">
                    <input type="text" id="EditCourseBioId" name="NewBio" placeholder={this.state.Course.CourseBio} onChange={this.onInputchange} />
                    <button onClick={this.state.Course.CourseBio = this.state.NewBio} >Beschreibung speichern</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select name="ChangeAppointmentId" onChange={this.onInputchange}>{EditAppointments}</select>
                    <label htmlFor="EditCourseWeekday" >Wochentag:</label>
                    <input type="Text" id="EditCourseWeekday" name="NewWeekDay" placeholder="Wochentag" onChange={this.onInputchange}></input>
                    <label htmlFor="EditCourseTime">Uhrzeit:</label>
                    <input type="Time" id="EditCourseTime" name="NewCourseTime" onChange={this.onInputchange}></input>
                    <label htmlFor="EditCourseDuration">Dauer:</label>
                    <input type="Text" id="EditCourseduration" name="NewCourseDuration" placeholder="Dauer" onChange={this.onInputchange}></input>
                    <label htmlFor="EditCourseContent">Veranstaltung:</label>
                    <input type="Text" id="EditCourseContent" name="NewCourseContent" placeholder="Veranstaltung" onChange={this.onInputchange}></input>
                    <label htmlFor="EditCourseLocation">Raum:</label>
                    <input type="Text" id="EditLocation" name="NewCourseLocation" placeholder="Raum" onChange={this.onInputchange}></input>
                    <br />
                    <button>Löschen</button>
                    <button onClick={this.onSaveAppointmentChange}>Speichern</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select>{EditParticipants}</select>
                    <br />
                    <button>Tutorenrechte geben/entziehen</button>
                    <button>Ausschreiben</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select>{EditMaterial}</select>
                    <label htmlFor="EditMaterialName">Name:</label>
                    <input type="Text" id="EditMaterialName" placeholder="Materialname"></input>
                  {
                    // TODO add material
                  }
                    <br />
                    <button>Löschen</button>
                    <button>Speichern</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select>{EditAssignment}</select>
                    <label htmlFor="EditAssignmentName">Name:</label>
                    <input type="Text" id="EditAssignmentName" placeholder="Abgabename"></input>
                    <label htmlFor="EditAssignmentDate">Datum:</label>
                    <input type="Date" id="EditAssignmentDate" ></input>
                    <label htmlFor="EditAssignmentTime">Uhrzeit:</label>
                    <input type="Time" id="EditAssignmentTime" ></input>
                  {
                    // TODO add material
                  }
                    <br />
                    <button>Löschen</button>
                    <button>Speichern</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select>{EditSurvey}</select>
                    <label htmlFor="EditSurveyName">Name:</label>
                    <input type="Text" id="EditSurveyName" placeholder="Umfragename"></input>
                    <label htmlFor="EditSurveyLink">Link:</label>
                    <input type="Text" id="EditSurveyLink" placeholder="Umfragelink"></input>
                    <br />
                    <button>Löschen</button>
                    <button>Speichern</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select>{EditExam}</select>
                    <label htmlFor="EditExamName">Name:</label>
                    <input type="Text" id="EditExamName" placeholder="Klausurname"></input>
                    <label htmlFor="EditExamDate">Datum:</label>
                    <input type="Date" id="EditExamDate"></input>
                    <label htmlFor="EditExamTime">Uhrzeit:</label>
                    <input type="Time" id="EditExamTime"></input>
                    <label htmlFor="EditExamDuration">Dauer:</label>
                    <input type="Text" id="EditExamDuration" placeholder="Dauer"></input>

                  {
                    // TODO add material
                  }
                    <br />
                    <button>Löschen</button>
                    <button>Speichern</button>
                  </div>
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

function Wrapper(props) {
  const params = useParams();
  return <Kursansicht id={params.id} />
}



export default Wrapper
