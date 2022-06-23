import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {useParams} from "react-router-dom";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";
import {ShowSubmission, ShowSubmissionEdit} from "./Abgabe";
import {cutDateStringToDate} from "../api/helperfunctions";
import {ShowConfirmation} from "./DialogComponent";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "../css/Overlay.css";
import "../css/Kursansicht.css";
/*
import {
  getCourse, getFiles, updateCourse,
  uploadFile, getFileByID, uploadLink,
  getSubmissionById,
} from "../api";
*/
import {
  getCourse, updateCourse, getFiles,
  uploadFile, getFileByID, uploadLink,
  getSubmissionsFromCourse,
  createSubmission, deleteSubmission,
  createExam, registerToExam,
  getExamsFromCourse, getSubmissionById,
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

        name: "",

        CourseOwner: {LastName: "", FirstName: "", id: ""},
        CourseParticipants: [{FirstName: "", LastName: "", Role: "", id: ""}],
        CourseTutors: [{FirstName: "", LastName: "", Role: "", id: ""}],


        CourseAppointments: [],

        CourseBio: "",
        CourseCreatedAt: "",
        CourseForum: "",

        CourseMaterial: [],

        CourseSurveys: [],
        CourseExams: [],
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

      Submissions: [
        {
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
        },
      ],

      Material: [],

      NewExamName: "",
      NewExamDescription: "",
      NewExamDate: "",
      NewExamOnline: "0",
      NewExamLocation: "",

      // for editing and adding submissions
      FocusedSubId: -1,
      EditedSubmissionIds: [],
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

      // bools for Dialogs
      OpenAddSubDialog: false,
      OpenSubDeleteConfirmation: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSaveDescriptionChange = this.onSaveDescriptionChange.bind(this);
    this.onSaveAppointmentChange = this.onSaveAppointmentChange.bind(this);
    this.onSubmissionEditedCallback =
      this.onSubmissionEditedCallback.bind(this);
    this.onSubmissionSaveClick = this.onSubmissionSaveClick.bind(this);
    this.toggleAddSubDialog = this.toggleAddSubDialog.bind(this);
    this.addSubmissionHandler = this.addSubmissionHandler.bind(this);
    this.toggleSubDeleteConfirmation =
      this.toggleSubDeleteConfirmation.bind(this);
    this.onDeleteAppointment = this.onDeleteAppointment.bind(this);
    this.onSaveExam = this.onSaveExam.bind(this);
  }


  async componentDidMount() {
    getCourse(this, this.state.id);
    getFiles(this, this.state.id);
    getAppointments(this, null);

    getSubmissionsFromCourse(this, this.state.id);
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


  // Submission functions
  toggleAddSubDialog() {
    this.setState({OpenAddSubDialog: !this.state.OpenAddSubDialog});
  }

  addSubmissionHandler(event) {
    event.preventDefault();
    let subid;
    if (this.state.Submissions == null) {
      subid = 0;
    } else {
      const subLen = this.state.Submissions.length;
      subid = this.state.Submissions[subLen-1].id + 1;
      console.log(subid);
    }
    const newSubmission = {
      id: subid,
      name: event.target.SubName.value,
      deadline: event.target.SubDate.value + "T" +
      event.target.SubTime.value + ":05Z",
      course_id: this.state.CurrentCourse.id,
      max_filesize: "5",
      visible_from: event.target.SubVisDate.value + "T" +
        event.target.SubVisTime.value + ":05Z",
    };
    console.log(cutDateStringToDate(newSubmission.deadline));

    console.log("posting...");
    console.log(newSubmission);

    const file = event.target.SubFile.files[0];

    createSubmission(this, newSubmission, file);
  }

  // called when any Submission is edited
  onSubmissionEditedCallback(submissionId) {
    // check if already contained
    if (this.state.EditedSubmissionIds.length > 0) {
      for (const id of this.state.EditedSubmissionIds) {
        if ((id == submissionId)) {
          return;
        }
      }
      this.setState({EditedSubmissionIds:
        [...this.state.EditedSubmissionIds, submissionId]});
    } else {
      this.setState({EditedSubmissionIds:
        [...this.state.EditedSubmissionIds, submissionId]});
    }
  }

  onSubmissionSaveClick() {
    for (const id of this.state.EditedSubmissionIds) {
      console.log(id);
      // call editSubmissionById
    }
  }

  toggleSubDeleteConfirmation() {
    this.setState({OpenSubDeleteConfirmation:
      !this.state.OpenSubDeleteConfirmation});
  }


  render() {
    // ________________________________________________________________________
    // Lists for general view
    // ________________________________________________________________________

    const Generallist = [];
    if (this.state.Appointments != null) {
      for (const Appointment of this.state.Appointments) {
        Generallist.push(<h3 hidden={this.state.CourseEdit}>
          Datum: {Appointment.date} Dauer
          : {Appointment.duration / 60} Minuten
          Raum: {Appointment.location}</h3>);
      }
    }
    Generallist.push(
        <div>
          <p hidden={this.state.CourseEdit}>
            {this.state.CurrentCourse.description}</p>
          <p hidden={this.state.CourseEdit}>Kursersteller:
            {this.state.CourseOwner}</p>
        </div>,
    );

    const Materiallist = [];
    if (this.state.Material != null) {
      for (const Mat of this.state.Material) {
        Materiallist.push(<ShowMaterial name={Mat.name} uri={Mat.uri}
          fileid={Mat.id} courseid={this.state.CurrentCourse.id}
          className="Material" />);
      }
    }

    const Submissionlist = [];
    for (const Submission of this.state.Submissions) {
      Submissionlist.push(<ShowSubmission
        id={Submission.id}
        submissionname={Submission.name}
        coursename={this.state.Course.name}
        owner={this.state.Course.CourseOwner.LastName}
        link={Submission.content}
        created_at={Submission.date}
        deadline={Submission.deadline}
        time={Submission.time}/>);
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
          Examlist.push(<Col xs={4} ><ShowUnregisteredExam
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
    if (this.state.Appointments != null) {
      for (const Appointment of this.state.Appointments) {
        EditAppointments.push(<option value={Appointment.id}>
          {Appointment.date} {Appointment.location}
        </option>);
      }
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

    const SubmissionEditList = [];
    for (const Submission of this.state.Submissions) {
      SubmissionEditList.push(
          <ShowSubmissionEdit
            id={Submission.id}
            submissionname={Submission.name}
            coursename={this.state.Course.name}
            owner={this.state.Course.CourseOwner.LastName}
            link={Submission.content}
            created_at={Submission.date}
            deadline={Submission.deadline}
            callback={this.onSubmissionEditedCallback}
            state={this}
          />,
      );
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
          <Container className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" >
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

                  {/* Material */}

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

                  {/* Submissions */}

                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton"
                        onClick={this.toggleSubDeleteConfirmation}>
                        Löschen</button>
                      <button className="EditButton"
                        onClick={this.onSubmissionSaveClick}>
                        Speichern</button>
                      <button className="EditButton"
                        onClick={this.toggleAddSubDialog}
                      >Hinzufügen</button>
                    </div>
                    <h2>Abgaben</h2>

                    <div className="CreateSubDialog">
                      <Dialog open={this.state.OpenAddSubDialog}
                        onClose={this.toggleAddSubDialog}
                        className="CreateSubmission">
                        <DialogTitle>Abgabe Hinzufügen</DialogTitle>
                        <DialogContent className="CreateSubmissionContent">
                          <DialogContentText>
                            Hier können Sie eine neue Abgabe erstellen.
                            <div className="AddSubmissionDiv">
                              <form id="AddSubmissionForm"
                                onSubmit={this.addSubmissionHandler}>
                                <label htmlFor="SubName">Abgabenname:
                                </label>
                                <input type="Text" id="SubName"
                                  placeholder="Abgabenname" required></input>
                                <label htmlFor="SubDate">
                                  Abgabendatum:</label>
                                <input type="Date" id="SubDate" required>
                                </input>
                                <label htmlFor="SubTime">
                                  Abgabenuhrzeit:</label>
                                <input type="Time" id="SubTime" required>
                                </input>
                                <div className="SubVisibilityContainer">
                                  <label htmlFor="SubVisCB">
                                    Sichbarkeitsdatum</label>
                                  <input type="checkbox"
                                    value="Abgabe sichtbar ab:"
                                    id="SubVisCB">
                                  </input>
                                  <div
                                    className="SubVisibilityDate">
                                    <input type="Date" id="SubVisDate">
                                    </input>
                                    <input type="Time" id="SubVisTime">
                                    </input>
                                  </div>
                                  <label htmlFor="SubAfterDeadline">
                                    Abgabe nach Ablauf möglich</label>
                                  <input type="checkbox"
                                    id="SubAfterDeadline">
                                  </input>
                                  <label htmlFor="SubFile">
                                    Aufgabenblatt</label>
                                  <input type="file"
                                    id="SubFile" accept="application/pdf"/>
                                </div>
                              </form>
                            </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <button
                            type="submit"
                            form="AddSubmissionForm"
                            className="DialogButton">
                            Erstellen</button>
                          <button
                            onClick={this.toggleAddSubDialog}
                            className="DialogButton">
                            Abbrechen</button>
                        </DialogActions>
                      </Dialog>
                    </div>

                    {SubmissionEditList}
                  </div>
                  <br />
                  <div className="EditSectionPart">
                    <div className="EditArea">
                      <button className="EditButton">Löschen</button>
                      <button className="EditButton">Speichern</button>
                    </div>
                  {/* Exams */}

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

                <div className="SubmissionSection"
                  hidden={this.state.CourseEdit}>
                  <h2>Abgaben</h2>
                  {Submissionlist}
                </div>

                <div className="ExamSection"
                  hidden={this.state.CourseEdit}>
                  <h2>Klausuren</h2>
                  {Examlist}
                </div>

              </Col>
            </Row>
          </Container>
          <ShowConfirmation
            open={this.state.OpenSubDeleteConfirmation}
            onCloseCallback={this.toggleSubDeleteConfirmation}
            displayText="Sie löschen Abgabe"
            onAcceptCallback={() =>{
              deleteSubmission(this, this.state.CurrentCourse.id,
                  this.state.FocusedSubId);
            }
            }
            onDeclineCallback={this.toggleSubDeleteConfirmation}/>
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

function ShowUnregisteredExam(props) {
  return (
    <div className="Exam">
      <h4 className="ExamName">{props.name}</h4>
      <p className="ExamDescription">{props.description}</p>
      <p className="Examduration">Dauer: {props.duration}min.</p>
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
