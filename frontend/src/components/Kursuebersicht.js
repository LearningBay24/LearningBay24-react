import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowHeader} from "./Kopfzeile";
import {Link} from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {getMyCourses, getTakenCourses, Moderator,
  postNewCourse, roleId} from "../api";
import {ShowCourse} from "../components/Kurs";

import "../css/Overlay.css";
import "../css/Kursübersicht.css";


export class Kursuebersicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NewCourseID: 0,
      MyCourses: [],
      CoursesTaken: [],
      createCourse: false,

      NewBio: "", // Defaultvalue for creating new Course
      NewKey: "", // Defaultvalue for creating new Course
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onCreateCourse = this.onCreateCourse.bind(this);
  }

  toggleCreateCourse = () => {
    this.setState({createCourse: !this.state.createCourse});
  };


  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async onCreateCourse() {
    const NewCourse = {
      name: this.state.NewName,
      description: this.state.NewBio,
      enroll_key: this.state.NewKey,
    };

    await postNewCourse(this, NewCourse);
    this.toggleCreateCourse();
    getMyCourses(this);
    this.componentDidMount();
  }


  componentDidMount() {
    getMyCourses(this);
    getTakenCourses(this);
  }


  render() {
    const MyCourseslist = [];
    if (this.state.MyCourses != null) {
      for (const Course of this.state.MyCourses) {
        MyCourseslist.push(
            <Link to={"/kursansicht/" + Course.id} className="Course">
              <ShowCourse name={Course.name}
                owner={Course.CourseOwner} description={Course.description}
                created_at={Course.created_at} id={Course.id}
                callback={null} /></Link>);
      }
    }

    const CoursesTakenlist = [];
    if (this.state.CoursesTaken != null) {
      for (const Course of this.state.CoursesTaken) {
        CoursesTakenlist.push(
            <Link to={"/kursansicht/" + Course.id} className="Course">
              <ShowCourse name={Course.name}
                owner={Course.CourseOwner} description={Course.description}
                created_at={Course.created_at} id={Course.id}
                callback={null} /></Link>);
      }
    }

    return (
      <div className="Kursuebersicht">
        <ShowHeader />
        <div className="Body">
          <Container fluid className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col className="ColContent" >
                <Row className="SectionContainer">
                  <h1>Kursübersicht</h1>
                  <div className="AdminArea">
                    <button hidden={roleId > Moderator}
                      className="btnCreateCourse"
                      onClick={this.toggleCreateCourse}>
                      Kurs erstellen
                    </button>
                  </div>
                  <Row className="Section" hidden={roleId > Moderator}>
                    <h2>Meine Kurse</h2>
                    <div className="CourseList">
                      {MyCourseslist}
                    </div>

                    <Dialog open={this.state.createCourse}
                      onClose={this.toggleCreateCourse}
                      className="CreateCourseDialog">
                      <DialogTitle>Kurs erstellen</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Hier können Sie einen Kurs erstellen.
                          <br />
                          <label htmlFor="CreateCourseName">Kursname:</label>
                          <input type="text" id="CreateCourseNameId"
                            placeholder='Kursname'
                            name="NewName" onChange={this.onInputchange} />
                          <br />
                          <label htmlFor="CreateCourseBioId">
                            Kursbeschreibung:</label>
                          <input type="text" id="CreateCourseBioId"
                            placeholder='Kursbeschreibung'
                            name="NewBio" onChange={this.onInputchange} />
                          <br />
                          <label htmlFor="CreateCourseKeyId">
                            Einschreibeschlüssel:</label>
                          <input type="text" id="CreateCourseKeyId"
                            placeholder='Einschreibeschlüssel'
                            name="NewKey" onChange={this.onInputchange} />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <button onClick={this.onCreateCourse}>
                          Kurs erstellen</button>
                        <button onClick={this.toggleCreateCourse}>
                          Abbrechen</button>
                      </DialogActions>
                    </Dialog>

                  </Row>
                  <Row className="Section">
                    <h2>Belegte Kurse</h2>
                    <div className="CourseList">
                      {CoursesTakenlist}
                    </div>
                  </Row>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Kursuebersicht;
