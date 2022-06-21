/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {useParams} from "react-router-dom";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";

import "../css/Overlay.css";
import "../css/Kursansicht.css";

import {
  getCourse, getFiles, updateCourse, createExam, registerToExam,
  uploadFile, getFileByID, uploadLink, getExamsFromCourse, getSubmissionById,
  createAppointment, deleteAppointment,
  getAppointments,
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
        duration: "",
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

      NewAppointmentDate: "",
      NewAppointmentDuration: "90",
      NewAppointmentLocation: "",
      NewAppointmentOnline: "0",

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
    this.onDeleteAppointment = this.onDeleteAppointment.bind(this);
    this.onSaveExam = this.onSaveExam.bind(this);
  }


  async componentDidMount() {
    getCourse(this, this.state.id);
    getFiles(this, this.state.id);
    // getAppointments(this, null);


    // get Submission for current course
    getSubmissionById(this, this.state.id);
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
      const Appointment = {
        date: new Date(this.state.NewAppointmentDate)
            .toISOString().split(".")[0]+"Z",
        duration: (this.state.NewAppointmentDuration * 60).toString(),
        location: this.state.NewAppointmentLocation,
        online: this.state.NewAppointmentOnline,
        courseId: this.state.CurrentCourse.id.toString(),
      };
      createAppointment(this, Appointment);
    }
  }

  onDeleteAppointment() {
    if (this.state.ChangeAppointmentId !== "-1") {
      deleteAppointment(this, this.state.ChangeAppointmentId);
    }
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

    const Generallist = [];
    for (const Appointment of this.state.Appointments) {
      Generallist.push(<h3 hidden={this.state.CourseEdit}>
        Datum: {Appointment.date} Dauer
        : {Appointment.duration / 60} Minuten
        Raum: {Appointment.location}</h3>);
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
    for (const Appointment of this.state.Appointments) {
      EditAppointments.push(<option value={Appointment.id}>
        {Appointment.date} {Appointment.location}
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
                <h1>{this.state.CurrentCourse.name}</h1>
                <div className="AdminArea" hidden={!this.state.CourseAdmin}>
                  <button className="btnCreateCourse"
                    onClick={() =>
                      this.setState({CourseEdit: !this.state.CourseEdit})}>
                    Kurs Bearbeiten
                  </button>
                </div>

                <div className="EditSection"
                  hidden={!this.state.CourseEdit}>
                  <h2 className="EditHeader">
                    [Kursbearbeitung]</h2>
                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton"
                        onClick={this.onSaveDescriptionChange}>
                        Beschreibung speichern</button>
                    </div>
                    <h2>Kursinformationen</h2>
                    <input type="text" id="EditCourseBioId" name="description"
                      placeholder={this.state.CurrentCourse.description}
                      onChange={this.onInputChange} />
                  </div>
                  <br />
                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton"
                        onClick={this.onDeleteAppointment}>Löschen</button>
                      <button className="EditButton"
                        onClick={this.onSaveAppointmentChange}>
                        Speichern
                      </button>
                    </div>
                    <h2>Termin</h2>
                    <select name="ChangeAppointmentId"
                      onChange={this.onInputChange}>
                      {EditAppointments}</select>
                    <label htmlFor="EditCoursedate" >Datum:</label>
                    <input type="datetime-local" id="EditCoursedate"
                      name="NewAppointmentDate"
                      placeholder="Wochentag"
                      onChange={this.onInputChange}></input>
                    <label htmlFor="EditCourseDuration">Dauer:</label>
                    <input type="number" min="0" id="EditAppointmentDuration"
                      name="NewAppointmentDuration"
                      placeholder="Dauer" onChange={this.onInputChange}></input>
                    <label htmlFor="EditCourseLocation">Raum:</label>
                    <input type="Text" id="EditLocation"
                      name="NewAppointmentLocation"
                      placeholder="Raum" onChange={this.onInputChange}></input>
                    <label htmlFor="EditCourseOnline">Online/Offline:</label>
                    <select id="EditCourseOnline"
                      name="NewAppointmentOnline" onChange={this.onInputChange}>
                      <option value="0">Offline</option>
                      <option value="1">Online</option>
                    </select>
                    <br />
                  </div>
                  <br />
                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton">
                        Tutorenrechte geben/entziehen</button>
                      <button className="EditButton">Ausschreiben</button>
                    </div>
                    <h2>Tutoren</h2>
                    <select>{EditParticipants}</select>
                    <br />
                  </div>
                  <br />
                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton" type="submit"
                        onClick={() => uploadFile(this, this.state.newFile,
                            this.state.CurrentCourse.id)}>
                        File Speichern</button>
                      <button className="EditButton">Löschen</button>
                      <button className="EditButton" type="submit"
                        onClick={() => uploadLink(this, this.state.uri,
                            this.state.uriName, this.state.CurrentCourse.id)}>
                        Link Speichern</button>
                    </div>
                    <h2>Material</h2>
                    <select>{EditMaterial}</select>
                    <label>Datei auswählen</label>
                    <input type="file" onChange={this.onFileChange} />
                    <br />
                    <label>Link Name</label>
                    <input type="text" onChange={this.onInputChange}
                      name="uriName" />

                    <label>Link einfügen</label>
                    <input type="text" onChange={this.onInputChange}
                      name="uri" />
                  </div>
                  <br />
                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton">Löschen</button>
                      <button className="EditButton">Speichern</button>
                    </div>
                    <h2>Abgaben</h2>
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
                  </div>
                  <br />
                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton">Löschen</button>
                      <button className="EditButton">Speichern</button>
                    </div>
                    <h2>Umfrage</h2>
                    <select>{EditSurvey}</select>
                    <label htmlFor="EditSurveyName">Name:</label>
                    <input type="Text" id="EditSurveyName"
                      placeholder="Umfragename"></input>
                    <label htmlFor="EditSurveyLink">Link:</label>
                    <input type="Text" id="EditSurveyLink"
                      placeholder="Umfragelink"></input>
                    <br />
                  </div>
                  <br />
                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton">Löschen</button>
                      <button className="EditButton">Speichern</button>
                    </div>
                    <h2>Klausur</h2>

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

                <div className="InfoSection">
                  {Generallist}
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
