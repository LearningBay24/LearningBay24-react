/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {useParams} from "react-router-dom";
import {ShowHeader} from "./Kopfzeile";

import "../css/Overlay.css";
import "../css/Kursansicht.css";

import {
  getCourse, getFiles, updateCourse, createExam, registerToExam,
  uploadFile, getFileByID, uploadLink, getExamsFromCourse, getSubmissionById,
  createAppointment, deleteAppointment, editExam, getAppointments,
  deleteExam, roleId, Admin, courseRoleId, User,
} from "../api";

import PropTypes from "prop-types";

export class Kursansicht extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(props.id),
      CourseEdit: false, // true if admin is editing course

      // ______________________________________________________________________

      // variables for editing course
      ChangeAppointmentId: "-1",
      ChangeExamId: "-1",

      // _______________________________________________________________________
      // actual structs from DB these get filled by the api call and should be
      // updated and send back to the server if a user made changes
      // _______________________________________________________________________
      user_id: 0,
      CurrentCourse: {
        id: 0,
        name: "",
        description: "",
        enroll_key: "",
        forum_id: 0,
        created_at: "",
        updated_at: "",
      },


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

      Material: [],

      NewExamName: "",
      NewExamDescription: "",
      NewExamDate: "",
      NewExamOnline: "0",
      NewExamLocation: "",

      NewAppointmentDate: "",
      NewAppointmentDuration: "90",
      NewAppointmentLocation: "",
      NewAppointmentOnline: "0",

    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSaveDescriptionChange = this.onSaveDescriptionChange.bind(this);
    this.onSaveAppointmentChange = this.onSaveAppointmentChange.bind(this);
    this.onDeleteAppointment = this.onDeleteAppointment.bind(this);
    this.onSaveExam = this.onSaveExam.bind(this);
  }


  async componentDidMount() {
    await getCourse(this, this.state.id);
    getFiles(this, this.state.id);
    getAppointments(this, null);


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
    this.setState({successCourse: 0});
    this.setState({successAppointment: 0});
    this.setState({successDelAppointment: 0});
    this.setState({successFile: 0});
    this.setState({successDelFile: 0});
    this.setState({successExam: 0});
    this.setState({successDelExam: 0});
  }

  onFileChange(event) {
    this.setState({
      newFile: event.target.files[0],
    });
    this.setState({success: 0});
  }

  async onSaveDescriptionChange() {
    let description = this.state.description;
    let key = this.state.key;
    let name = this.state.name;
    if (name == null) {
      name = this.state.CurrentCourse.name;
    }
    if (description == null) {
      description = this.state.CurrentCourse.description;
    }
    if (key == null) {
      key = this.state.CurrentCourse.enroll_key;
    }
    const newCourse = {
      id: this.state.CurrentCourse.id,
      name: name,
      description: this.state.description,
      enroll_key: key,
      forum_id: this.state.CurrentCourse.forum_id,
      created_at: this.state.CurrentCourse.created_at,
      updated_at: this.state.CurrentCourse.updated_at,
    };
    await updateCourse(this, newCourse, this.state.id);
    this.componentDidMount();
  }

  async onSaveAppointmentChange() {
    if (this.state.ChangeAppointmentId === "-1") {
      const Appointment = {
        date: new Date(this.state.NewAppointmentDate)
            .toISOString().split(".")[0] + "Z",
        duration: (this.state.NewAppointmentDuration * 60).toString(),
        location: this.state.NewAppointmentLocation,
        online: this.state.NewAppointmentOnline,
        courseId: this.state.CurrentCourse.id.toString(),
      };
      await createAppointment(this, Appointment);
      this.componentDidMount();
    }
  }

  async onDeleteAppointment() {
    if (this.state.ChangeAppointmentId !== "-1") {
      await deleteAppointment(this, this.state.ChangeAppointmentId);
      this.componentDidMount();
    }
  }

  async onSaveExam() {
    let online_ = 0;
    if (this.state.NewExamOnline != null) {
      online_ = this.state.NewExamOnline;
    }
    if (this.state.ChangeExamId === "-1") {
      if (this.state.NewExamName === undefined) {
        alert("Feld 'Name' darf nicht leer sein");
        return;
      }
      if (this.state.NewExamDate === undefined) {
        alert("Feld 'Datum' darf nicht leer sein");
        return;
      }
      if (this.state.NewExamDuration === undefined) {
        alert("Feld 'Dauer' darf nicht leer sein");
        return;
      }
      if (this.state.NewExamRegister === undefined) {
        alert("Feld 'Deadline Anmeldung' darf nicht leer sein");
        return;
      }
      if (this.state.NewExamDeregister === undefined) {
        alert("Feld 'Deadline Abmeldung' darf nicht leer sein");
        return;
      }
      const Exam = {
        name: this.state.NewExamName,
        description: this.state.NewExamDescription,
        date: new Date(
            this.state.NewExamDate)
            .toISOString().split(".")[0] + "Z",
        duration: (this.state.NewExamDuration * 60).toString(),
        location: this.state.NewExamLocation,
        online: online_,
        course_id: this.state.CurrentCourse.id.toString(),
        register_deadline: new Date(this.state.NewExamRegister)
            .toISOString().split(".")[0] + "Z",
        deregister_deadline: new Date(this.state.NewExamDeregister)
            .toISOString().split(".")[0] + "Z",
      };
      await createExam(this, Exam);
      this.componentDidMount();
    } else {
      let dateStr = "";
      let registerStr = "";
      let deregisterStr = "";
      if (this.state.NewExamDate != null) {
        dateStr =
            new Date(this.state.NewExamDate)
                .toISOString().split(".")[0] + "Z";
      }
      if (this.state.NewExamRegister != null) {
        registerStr =
            new Date(this.state.NewExamRegister)
                .toISOString().split(".")[0] + "Z";
      }
      if (this.state.NewExamDeregister != null) {
        deregisterStr =
            new Date(this.state.NewExamDeregister)
                .toISOString().split(".")[0] + "Z";
      }
      const object = {
        id: this.state.ChangeExamId,
        name: this.state.NewExamName,
        description: this.state.NewExamDescription,
        date: dateStr,
        duration: (this.state.NewExamDuration * 60).toString(),
        online: this.state.NewExamOnline,
        location: this.state.NewExamLocation,
        register_deadline: registerStr,
        deregister_deadline: deregisterStr,
      };
      await editExam(this, object);
      this.componentDidMount();
    }
  }


  render() {
    // ________________________________________________________________________
    // Lists for general view
    // ________________________________________________________________________

    const Generallist = [];
    if (this.state.Appointments != null) {
      Generallist.push(<h2 hidden={this.state.CourseEdit}>
        Termine</h2>);
      for (const Appointment of this.state.Appointments) {
        if (Appointment.course_id == this.state.id) {
          Generallist.push(<h3 hidden={this.state.CourseEdit}>
          Datum: {new Date(Appointment.date).toLocaleString()} Dauer
          : {Appointment.duration / 60} Minuten
          Raum: {Appointment.location}</h3>);
        }
      }
    }

    Generallist.push(<h2 hidden={this.state.CourseEdit}>
      Beschreibung</h2>);
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
    if (this.state.Assignments != null) {
      for (const Assignment of this.state.Assignments) {
        Assignmentlist.push(<ShowAssignment Name={Assignment.Name}
          Content={Assignment.Content} Date={Assignment.Date}
          Deadline={Assignment.Deadline} className="Assignment" />);
      }
    }

    const Examlist = [];
    if (this.state.Exams != null) {
      for (const Exam of this.state.Exams) {
        if (Exam.id != -1) {
          Examlist.push(<Col xs={6} ><ShowUnregisteredExam
            component={this}
            Exam={Exam}/></Col>);
        }
      }
    }


    // ________________________________________________________________________
    // lists for edit course view
    // ________________________________________________________________________
    const EditAppointments = [];
    EditAppointments.push(<option value="-1">Neuer Termin</option>);
    if (this.state.Appointments != null) {
      for (const Appointment of this.state.Appointments) {
        if (Appointment.course_id == this.state.id) {
          EditAppointments.push(<option value={Appointment.id}>
            {new Date(Appointment.date).toLocaleString()} {Appointment.location}
          </option>);
        }
      }
    }

    const EditMaterial = [];
    EditMaterial.push(<option value="-1">Material hinzufügen</option>);
    if (this.state.Material != null) {
      for (const Mat of this.state.Material) {
        EditMaterial.push(<option value={Mat.id}>{Mat.name}</option>);
      }
    }

    const EditAssignment = [];
    EditAssignment.push(<option value="-1">Neue Aufgabe</option>);
    if (this.state.Assignments != null) {
      for (const Assignment of this.state.Assignments) {
        EditAssignment.push(<option value={Assignment.id}>
          {Assignment.name} {""}
          {new Date(Assignment.date).toLocaleString()}</option>);
      }
    }

    const EditExam = [];
    EditExam.push(<option value="-1">Neue Prüfung</option>);
    if (this.state.Exams != null) {
      for (const Exam of this.state.Exams) {
        if (Exam.id != -1) {
          EditExam.push(<option value={Exam.id}>
            {Exam.name} {new Date(Exam.date).toLocaleString()}
          </option>);
        }
      }
    }

    // ________________________________________________________________________

    console.log(roleId);
    return (
      <div className="Kursansicht">
        <ShowHeader />
        <div className="Body">
          <Container fluid className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col className="ColContent" >
                <h1>{this.state.CurrentCourse.name}</h1>
                <div className="AdminArea"
                  hidden={roleId != Admin && courseRoleId == User}>
                  <button className="btnCreateCourse"
                    onClick={() =>
                      this.setState({CourseEdit: !this.state.CourseEdit})}>
                    {!this.state.CourseEdit?
                    "Kurs bearbeiten" : "Zurück zum Kurs"}
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
                        Speichern</button>
                    </div>
                    <label id="successId">
                      {this.state.successCourse? "erfolgreich gespeichert":""}
                    </label>
                    <h2>Kursinformationen</h2>
                    <label>Kursname:</label>
                    <input type="text" id="EditCourseNameId" name="name"
                      placeholder={this.state.CurrentCourse.name}
                      onChange={this.onInputChange} />
                    <label>Beschreibung:</label>
                    <input type="text" id="EditCourseBioId" name="description"
                      placeholder={this.state.CurrentCourse.description}
                      onChange={this.onInputChange} />
                    <label>Einschreibeschlüssel:</label>
                    <input type="text" id="EditCourseKeyId" name="key"
                      placeholder={this.state.CurrentCourse.enroll_key}
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
                    <label id="successId">
                      {this.state.successAppointment?
                        "erfolgreich gespeichert":""}
                    </label>
                    <label id="successId">
                      {this.state.successDelAppointment?
                        "erfolgreich gelöscht":""}
                    </label>
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
                    <label id="successId">
                      {this.state.successFile? "erfolgreich hochgeladen":""}
                    </label>
                    <label id="successDelId">
                      {this.state.successDelFile? "erfolgreich gelöscht":""}
                    </label>
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
                      <button className="EditButton"
                        onClick={() => {
                          deleteExam(this, this.state.ChangeExamId);
                        }}>
                        Löschen
                      </button>
                      <button className="EditButton" onClick={this.onSaveExam}>
                        Speichern
                      </button>
                    </div>
                    <label id="successId">
                      {this.state.successExam?
                        "erfolgreich gespeichert":""}
                    </label>
                    <label id="successId">
                      {this.state.successDelExam?
                        "erfolgreich gelöscht":""}
                    </label>
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
                    <label htmlFor="EditExamDuration">Dauer (in min):</label>
                    <input type="number" pattern="[0-9]*" id="EditExamDuration"
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

                <h2 hidden={this.state.CourseEdit}>Klausuren</h2>
                <div className="ExamSection"
                  hidden={this.state.CourseEdit}>
                  {Examlist}
                </div>

              </Col>
            </Row>
          </Container>
        </div>
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
    <a href={props.uri? props.uri:null} download className='MaterialContainer'>
      <h6 onClick={props.uri? null:() => getFileByID(this, props.courseid,
          props.fileid, props.name)}>
        {props.name}</h6>
      <p>{props.uri}</p>
    </a>);
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
  const actual = (new Date().getTime());
  const register = (new Date(props.Exam.register_deadline).getTime());
  return (
    <div className="Exam">
      <h4 className="ExamName">{props.Exam.name}</h4>
      <p className="ExamDescription">{props.Exam.description}</p>
      <p className="Examduration">Dauer: {props.Exam.duration / 60}min.</p>
      <p className="ExamDate">Datum: {new Date(props.Exam.date)
          .toLocaleString()}</p>
      <p className="ExamRoom">Raum: {props.Exam.location}</p>
      <p className="ExamRegister">Deadline Anmeldung: {
        new Date(props.Exam.register_deadline).toLocaleString()}</p>
      <button hidden={actual > register} onClick={() => {
        registerToExam(props.component, props.Exam.id);
        props.component.componentDidMount();
      }}>Anmelden</button>
    </div>
  );
}

function Wrapper(props) {
  const params = useParams();
  return <Kursansicht id={params.id} />;
}


export default Wrapper;
