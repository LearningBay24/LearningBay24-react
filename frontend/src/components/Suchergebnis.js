import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";

import {getCoursesByQuery} from "../api";
import {ShowCourse} from "../components/Kurs";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "../css/Overlay.css";
import "../css/Kursübersicht.css";
import "../css/Suchergebnis.css";


export class Suchergebnis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MatchedCourses: [{
        name: "test1", owner: "Peter", description: "das ist mein Kurs",
        created_at: "19.04.2022", id: "1",
      },
      {
        name: "test1", owner: "Peter", description: "das ist mein Kurs",
        created_at: "19.04.2022", id: "1",
      }],
      NoResult: true,
      EnrollCourse: false,
    };
    this.onEnrollCourse = this.onEnrollCourse.bind(this);
    this.courseOnClickHandler = this.courseOnClickHandler.bind(this);
  }

  toggleEnrollCourse = () => {
    this.setState({enrollCourse: !this.state.enrollCourse});
  };

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    getCoursesByQuery(this, "test");
  }

  onEnrollCourse() {
    console.log("send to backend");
  }

  courseOnClickHandler() {
    this.toggleEnrollCourse();
  }


  render() {
    let noResultText = (<p className="NoResultText">
          Keine Treffer gefunden</p>);
    if (!this.state.NoResult) {
      noResultText = "";
    }

    const MatchedCourseslist = [];
    if (this.state.MatchedCourses != null) {
      for (const Course of this.state.MatchedCourses) {
        MatchedCourseslist.push(<div className="Course">
          <ShowCourse name={Course.name}
            owner={Course.CourseOwner} description={Course.description}
            created_at={Course.created_at} id={Course.id}
            callback={this.courseOnClickHandler}/></div>);
      }
    }

    return (
      <div className="Suchergebnis">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>

                <Dialog open={this.state.enrollCourse}
                  onClose={this.toggleEnrollCourse}
                  className="EnrollDialog">
                  <DialogTitle>Kurs einschreiben</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Hier können Sie sich in einen Kurs einschreiben.
                      <label htmlFor="CreateCourseName">Kursname:</label>
                      <label htmlFor="CreateCourseBioId">
                        Kursbeschreibung:</label>
                      <label htmlFor="CreateCourseKeyId">
                        Einschreibeschlüssel:</label>
                      <input type="text" id="CreateCourseKeyId"
                        placeholder='Einschreibeschlüssel'
                        name="NewKey" onChange={this.onInputchange} />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <button onClick={this.onCreateCourse}
                      className="DialogButton">
                      Einschreiben</button>
                    <button onClick={this.toggleEnrollCourse}
                      className="DialogButton">
                      Abbrechen</button>
                  </DialogActions>
                </Dialog>

                <Row className="SectionContainer">
                  <h1>Suchergebnis</h1>
                  <Row className="Section">
                    {noResultText}
                    <div className="ResultList">
                      {MatchedCourseslist}
                    </div>
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
export default Suchergebnis;
