import React, {useState, useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";
import {useNavigate, useLocation} from "react-router-dom";

import {checkIfUserEnrolledCourse, enrollUserIntoCourse} from "../api";
import {ShowCourse} from "../components/Kurs";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "../css/Overlay.css";
import "../css/Kursübersicht.css";
import "../css/Suchergebnis.css";

function Suchergebnis(props) {
  const [MatchedCourses, setMatchedCourses] = useState([]);
  const [NoResultText, setNoResultText] = useState("Keine Treffer gefunden");
  const [EnrollCourse, setEnrollCourse] = useState(false);
  const [CurrentEnrollkey, setCurrentEnrollkey] = useState("");
  const [FocusedCourseID, setFocusedCourseID] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();


  // --- Search-Query ---

  /*
  const doSearchRequest = () => {
    const query = location.Query;
    console.log("(doSearchRequest) Query: " + query);
    getCoursesByQuery(query, onAPICallFinished);
  };

  const updateQueryString = (query) => {
    setQuery(query.target.value);
  };*/

  const onAPICallFinished = (result) => {
    setMatchedCourses(result);
    if (MatchedCourses.length == 0) {
      setNoResultText("Keine Treffer gefunden");
    } else {
      setNoResultText("");
    }
  };


  // ---


  // --- Course ---

  const courseOnClickHandler = (courseId) => {
    setFocusedCourseID(courseId);

    // check if user is already enrolled in that course
    checkIfUserEnrolledCourse(courseId, isEnrolledCallback,
        isNotEnrolledCallback);
  };

  const isEnrolledCallback = (courseId) => {
    navigate("/kursansicht/" + courseId);
  };

  const isNotEnrolledCallback = () => {
    toggleEnrollCourse();
  };

  // ---


  // --- Enrollment ---

  const toggleEnrollCourse = () => {
    setEnrollCourse(!EnrollCourse);
  };

  const onEnrollKeyChange = (event) => {
    // console.log("(onEnrollKeyChange): " + event.target.value);
    setCurrentEnrollkey(event.target.value);
  };

  const onEnrollCourse = () => {
    enrollUserIntoCourse(
        FocusedCourseID, CurrentEnrollkey, onEnrollCourseFinished);
    toggleEnrollCourse();
  };

  const onEnrollCourseFinished = () => {
    console.log("User enrolled into course");

    // navigate to enrolled course
    navigate("courses/" + FocusedCourseID.toString());
  };


  // ---

  const MatchedCourseslist = [];
  if (MatchedCourses != null && MatchedCourses.length > 0) {
    for (const Course of MatchedCourses) {
      MatchedCourseslist.push(<div className="Course">
        <ShowCourse name={Course.name}
          owner={Course.CourseOwner} description={Course.description}
          created_at={Course.created_at} id={Course.id}
          callback={courseOnClickHandler}/></div>);
    }
  }

  useEffect(() => {
    onAPICallFinished(location.state.Result);
  });

  return (
    <div className="Suchergebnis">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" >
          <Row className="Content" >
            <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" >

              <Dialog open={EnrollCourse}
                onClose={toggleEnrollCourse}
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
                      name="NewKey" onChange={onEnrollKeyChange} />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <button onClick={onEnrollCourse}
                    className="DialogButton">
                    Einschreiben</button>
                  <button onClick={toggleEnrollCourse}
                    className="DialogButton">
                    Abbrechen</button>
                </DialogActions>
              </Dialog>

              <Row className="SectionContainer">
                <h1>Suchergebnis</h1>
                <Row className="Section">
                  <p className="NoResultText">{NoResultText}</p>
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
export default Suchergebnis;
