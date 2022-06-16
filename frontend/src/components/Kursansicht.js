/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {useParams} from "react-router-dom";
import {ShowFooter} from "./Footer";

import "../css/Overlay.css";
import "../css/Kursansicht.css";

import {
  getCourse, getFiles, updateCourse, createExam, registerToExam,
  uploadFile, getFileByID, uploadLink, getExamsFromCourse,
} from "../api";

import PropTypes from "prop-types";

export class Kursansicht extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(props.id),

      // ______________________________________________________________________
      // this is temporary example data
      // ______________________________________________________________________

      CourseAdmin: true, // true if active user has adminrights
      CourseEdit: false, // true if admin is editing course
      Course: {

        name: "Beispielkurs",

        CourseOwner: {LastName: "Mustermann", FirstName: "Max", id: ""},
        CourseParticipants: [{FirstName: "", LastName: "", Role: "", id: ""}],
        CourseTutors: [{FirstName: "", LastName: "", Role: "", id: ""}],


        CourseAppointments: [
          {
            Day: "Montag", Time: "11:00", Duration: "1:30h",
            Content: "Vorlesung", Location: "Raum A123", id: "1",
          },
          {
            Day: "Freitag", Time: "8:00", Duration: "1:30h",
            Content: "Praktikum", Location: "Raum A123", id: "2",
          }],

        CourseBio: "Das ist ein Beispielkurs",
        CourseCreatedAt: "17.04.2022",
        CourseForum: "",


        CourseMaterial: [
          {Name: "mat1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", id: ""}],
        CourseAssignments: [{
          Name: "Abgabe1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          Date: "17.04.2022", Deadline: "25.04.2022 0:00", id: "",
        }],

        CourseSurveys: [
          {Name: "Umfrage1", Content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", id: ""}],
        CourseExams: [
          {
            Name: "Klausur1", Date: "30.4.2022", Duration: "1:30h",
            Location: "Raum A123", id: "",
          }],
      },
      // ______________________________________________________________________

      // variables for editing course
      ChangeAppointmentId: "-1",
      ChangeExamId: "-1",

      // _______________________________________________________________________
      // actual structs from DB these get filled by the api call and should be
      // updated and send back to the server if a user made changes
      // _______________________________________________________________________
      CurrentCourse: {
        id: 0,
        name: "",
        description: "",
        enroll_key: "",
        forum_id: 0,
        created_at: "",
        updated_at: "",
      },

      Users: [{
        id: 0,
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role_id: "",
        graduation_level: "",
        semester: "",
        phone_number: "",
        residence: "",
        profile_picture: "",
        biography: "",
        preferred_language_id: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      }],

      Appointments: [{
        id: 0,
        date: "",
        location: "",
        online: "",
        course_id: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      }],

      Submission: [{
        id: 0,
        name: "",
        deadline: "",
        course_id: "",
        max_filesize: "",
        visible_from: "",
        created_at: "",
        updated_at: "",
        graded_at: "",
        deleted_at: "",
      }],

      Material: [{
      }],

      NewExamName: "",
      NewExamDescription: "",
      NewExamDate: "",
      NewExamOnline: "0",
      NewExamLocation: "",

      // Exams: [{
      //   id: -1,
      //   name: "",
      //   description: "",
      //   date: "",
      //   duration: "",
      //   online: "",
      //   location: "",
      //   course_id: "",
      //   creator_id: "",
      //   graded: "",
      //   register_deadline: "",
      //   deregister_deadline: "",
      //   created_at: "",
      //   updated_at: "",
      //   deleted_at: "",
      // }],

    };


    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSaveDescriptionChange = this.onSaveDescriptionChange.bind(this);
    this.onSaveAppointmentChange = this.onSaveAppointmentChange.bind(this);
    this.onSaveExam = this.onSaveExam.bind(this);
  }


  componentDidMount() {
    getCourse(this, this.state.id);
    getFiles(this, this.state.id);
    getExamsFromCourse(this, this.state.id);
  }


  // save inputs to extravariables in state until user
  // commits them to Course object by clicking save button
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onFileChange(event) {
    this.setState({
      newFile: event.target.files[0],
    });
  }

  onSaveDescriptionChange() {
    const newCourse = {
      id: this.state.CurrentCourse.id,
      name: this.state.CurrentCourse.name,
      description: this.state.description,
      enroll_key: this.state.CurrentCourse.enroll_key,
      forum_id: this.state.CurrentCourse.forum_id,
      created_at: this.state.CurrentCourse.created_at,
      updated_at: this.state.CurrentCourse.updated_at,
    };
    updateCourse(this, newCourse, this.state.id);
  }

  onSaveAppointmentChange() {
    if (this.state.ChangeAppointmentId === "-1") {
      console.log(this.state.ChangeAppointmentId);
      this.state.Course.CourseAppointments.push({

        Day: this.state.NewWeekDay,
        Time: this.state.NewCourseTime,
        Duration: this.state.NewCourseDuration,
        Content: this.state.NewCourseContent,
        Location: this.state.NewCourseLocation,
      });
    } else {
      for (const Appointment of this.state.Course.CourseAppointments) {
        if (Appointment.id === this.state.ChangeAppointmentId) {
          this.setState({
            Appointment: {
              Day: this.state.NewWeekDay,
              Time: this.state.NewCourseTime,
              Duration: this.state.NewCourseDuration,
              Content: this.state.NewCourseContent,
              Location: this.state.NewCourseLocation,
            },
          });
        }
      }
    }
    console.log(this.state.Course.CourseAppointments);
  }

  onSaveExam() {
    if (this.state.ChangeExamId === "-1") {
      let online_ = 0;
      if (this.state.NewExamOnline != null) {
        online_ = this.state.NewExamOnline;
      }
      const Exam = {
        name: this.state.NewExamName,
        description: this.state.NewExamDescription,
        date: new Date(
            (new Date(this.state.NewExamDate).getTime() +
            3600000 * 2)).toISOString().split(".")[0]+"Z",
        duration: (this.state.NewExamDuration * 60).toString(),
        location: this.state.NewExamLocation,
        online: online_,
        course_id: this.state.CurrentCourse.id.toString(),
        register_deadline: new Date(
            (new Date(this.state.NewExamRegister).getTime() +
            3600000 * 2)).toISOString().split(".")[0]+"Z",
        deregister_deadline: new Date(
            (new Date(this.state.NewExamDeregister).getTime() +
            3600000 * 2)).toISOString().split(".")[0]+"Z",
      };
      createExam(this, Exam);
    }
  }


  render() {
    // ________________________________________________________________________
    // Lists for general view
    // ________________________________________________________________________

    const Generallist = [
      <h1 key="0">{this.state.CurrentCourse.name}</h1>,
      <button hidden={!this.state.CourseAdmin} key="1"
        onClick={() => this.setState({CourseEdit: !this.state.CourseEdit})}>
        Kurs bearbeiten
      </button>,
    ];

    for (const Appointment of this.state.Course.CourseAppointments) {
      Generallist.push(<h3 hidden={this.state.CourseEdit}>
        {Appointment.Day} {Appointment.Time} {Appointment.Duration}
        {Appointment.Content} {Appointment.Location}</h3>);
    }
    Generallist.push(<p hidden={this.state.CourseEdit}>
      {this.state.CurrentCourse.description}</p>);

    const Materiallist = [];
    if (this.state.Material != null) {
      for (const Mat of this.state.Material) {
        Materiallist.push(<ShowMaterial name={Mat.name} uri={Mat.uri}
          fileid={Mat.id} courseid={this.state.CurrentCourse.id}
          className="Material" />);
      }
    }

    const Assignmentlist = [];
    for (const Assignment of this.state.Course.CourseAssignments) {
      Assignmentlist.push(<ShowAssignment Name={Assignment.Name}
        Content={Assignment.Content} Date={Assignment.Date}
        Deadline={Assignment.Deadline} className="Assignment" />);
    }

    const Surveylist = [];
    for (const Survey of this.state.Course.CourseSurveys) {
      Surveylist.push(<ShowSurvey Name={Survey.Name}
        Content={Survey.Content} className="Survey" />);
    }

    const Examlist = [];
    if (this.state.Exams != null) {
      for (const Exam of this.state.Exams) {
        if (Exam.id != -1) {
          Examlist.push(<Col xs={4} fluid><ShowUnregisteredExam
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


    // ________________________________________________________________________
    // lists for edit course view
    // ________________________________________________________________________
    const EditAppointments = [];
    EditAppointments.push(<option value="-1">Neuer Termin</option>);
    for (const Appointment of this.state.Course.CourseAppointments) {
      EditAppointments.push(<option value={Appointment.id}>{Appointment.Day}
        {Appointment.Time} {Appointment.Content} {Appointment.Location}
      </option>);
    }

    const EditParticipants = [];
    for (const User of this.state.Users) {
      EditParticipants.push(<option value={User.id}>{User.first_name}
        {User.last_name} {User.role_id}</option>);
    }

    const EditMaterial = [];
    EditMaterial.push(<option value="-1">Material hinzufügen</option>);
    for (const Mat of this.state.Course.CourseMaterial) {
      EditMaterial.push(<option value={Mat.id}>{Mat.Name}</option>);
    }

    const EditAssignment = [];
    EditAssignment.push(<option value="-1">Neue Aufgabe</option>);
    for (const Assignment of this.state.Course.CourseAssignments) {
      EditAssignment.push(<option value={Assignment.id}>
        {Assignment.Name} {Assignment.Date}</option>);
    }

    const EditSurvey = [];
    EditSurvey.push(<option value="-1">Neue Umfrage</option>);
    for (const Survey of this.state.Course.CourseSurveys) {
      EditSurvey.push(<option value={Survey.id}>{Survey.Name}</option>);
    }

    const EditExam = [];
    EditExam.push(<option value="-1">Neue Prüfung</option>);
    for (const Exam of this.state.Course.CourseExams) {
      EditExam.push(<option value={Exam.id}>{Exam.Name} {Exam.Date}</option>);
    }

    // ________________________________________________________________________

    return (
      <div className="Kursansicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                {Generallist}

                <div className="editSection Section"
                  hidden={!this.state.CourseEdit}>
                  <h2>Kurs Bearbeiten</h2>
                  <div className="Section">
                    <input type="text" id="EditCourseBioId" name="description"
                      placeholder={this.state.CurrentCourse.description}
                      onChange={this.onInputChange} />
                    <button onClick={this.onSaveDescriptionChange}>
                      Beschreibung speichern</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select name="ChangeAppointmentId"
                      onChange={this.onInputChange}>
                      {EditAppointments}</select>
                    <label htmlFor="EditCourseWeekday" >Wochentag:</label>
                    <input type="Text" id="EditCourseWeekday" name="NewWeekDay"
                      placeholder="Wochentag"
                      onChange={this.onInputChange}></input>
                    <label htmlFor="EditCourseTime">Uhrzeit:</label>
                    <input type="Time" id="EditCourseTime" name="NewCourseTime"
                      onChange={this.onInputChange}></input>
                    <label htmlFor="EditCourseDuration">Dauer:</label>
                    <input type="Text" id="EditCourseduration"
                      name="NewCourseDuration"
                      placeholder="Dauer" onChange={this.onInputChange}></input>
                    <label htmlFor="EditCourseContent">Veranstaltung:</label>
                    <input type="Text" id="EditCourseContent"
                      name="NewCourseContent"
                      placeholder="Veranstaltung"
                      onChange={this.onInputChange}></input>
                    <label htmlFor="EditCourseLocation">Raum:</label>
                    <input type="Text" id="EditLocation"
                      name="NewCourseLocation"
                      placeholder="Raum" onChange={this.onInputChange}></input>
                    <br />
                    <button>Löschen</button>
                    <button onClick={this.onSaveAppointmentChange}>
                      Speichern
                    </button>
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
                    <label>Datei auswählen</label>
                    <input type="file" onChange={this.onFileChange} />
                    <br />
                    <button type="submit"
                      onClick={() => uploadFile(this, this.state.newFile,
                          this.state.CurrentCourse.id)}>
                      File Speichern</button>
                    <button>Löschen</button>

                    <label>Link Name</label>
                    <input type="text" onChange={this.onInputChange}
                      name="uriName" />

                    <label>Link einfügen</label>
                    <input type="text" onChange={this.onInputChange}
                      name="uri" />
                    <button type="submit"
                      onClick={() => uploadLink(this, this.state.uri,
                          this.state.uriName, this.state.CurrentCourse.id)}>
                      Link Speichern</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select>{EditAssignment}</select>
                    <label htmlFor="EditAssignmentName">Name:</label>
                    <input type="Text" id="EditAssignmentName"
                      placeholder="Abgabename"></input>
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
                    <input type="Text" id="EditSurveyName"
                      placeholder="Umfragename"></input>
                    <label htmlFor="EditSurveyLink">Link:</label>
                    <input type="Text" id="EditSurveyLink"
                      placeholder="Umfragelink"></input>
                    <br />
                    <button>Löschen</button>
                    <button>Speichern</button>
                  </div>
                  <br />
                  <div className="Section">
                    <select onChange={this.onInputChange} name="ChangeExamId">
                      {EditExam}
                    </select>
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

                    {
                      // TODO add material
                    }
                    <br />
                    <button>Löschen</button>
                    <button onClick={this.onSaveExam}>Speichern</button>
                  </div>
                  <br />

                </div>

                <div className="MaterialSection"
                  hidden={this.state.CourseEdit}>
                  <h2>Material</h2>
                  {Materiallist}
                </div>

                <div className="AssignmentSection"
                  hidden={this.state.CourseEdit}>
                  <h2>Abgaben</h2>
                  {Assignmentlist}
                </div>

                <div className="SurveySection"
                  hidden={this.state.CourseEdit}>
                  <h2>Umfragen</h2>
                  {Surveylist}
                </div>

                <div className="ExamSection"
                  hidden={this.state.CourseEdit}>
                  <h2>Klausuren</h2>
                  {Examlist}
                </div>

              </Col>
            </Row>
          </Container>
        </div>
        <ShowFooter />
      </div>
    );
  }
}
Kursansicht.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};


function ShowMaterial(props) {
  return (
    <div className='MaterialContainer'>
      <h6 onClick={() => getFileByID(this, props.courseid,
          props.fileid, props.name)}>
        {props.name}</h6>
      <a href={props.uri} download>{props.uri}</a>
    </div>);
}
ShowMaterial.propTypes = {
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  fileid: PropTypes.string.isRequired,
  courseid: PropTypes.string.isRequired,
};

function ShowAssignment(props) {
  return (
    <div className='AssignmentContainer'>
      <h6>{props.Name}</h6>
      <a href={props.Content} target='_blank'
        rel='noopener noreferrer'>{props.Content}</a>
      <p className='AssignmentDate'>{props.Date}</p>
      <p className='AssignmentDeadline'>{props.Deadline}</p>
      <br />
      <input type="submit" value="Datei abgeben" className="SubmitButton" />
    </div>);
}
ShowAssignment.propTypes = {
  Name: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
  Date: PropTypes.string.isRequired,
  Deadline: PropTypes.string.isRequired,
};

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

function ShowSurvey(props) {
  return (
    <div className='SurveyContainer'>
      <h6>{props.Name}</h6>
      <a href={props.Content} target='_blank'
        rel='noopener noreferrer'>{props.Content}</a>
    </div>);
}
ShowSurvey.propTypes = {
  Name: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
};

function Wrapper(props) {
  const params = useParams();
  return <Kursansicht id={params.id} />;
}


export default Wrapper;
