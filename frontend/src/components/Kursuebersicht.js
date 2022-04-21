import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


import '../css/App.css';
import '../css/Kursübersicht.css'


export class Kursuebersicht extends Component {
  constructor(props) {
    super(props)

    this.state = {

      UserRights: true, // true if active user can create courses

      MyCourses: [{ CourseName: "test1", CourseOwner: "Peter", CourseBio: "das ist mein Kurs", CourseDegree: "AI", CourseCreatedAt: "19.04.2022" }],

      CoursesTaken: [{ CourseName: "test2", CourseOwner: "Hans", CourseBio: "das ist ein anderer Kurs", CourseCreatedAt: "19.04.2022" }],

      CoursesSuggested: [{ CourseName: "test3", CourseOwner: "Klaus", CourseBio: "Dieser Kurs könnte ihnen gefallen", CourseCreatedAt: "19.04.2022" }],

      createCourse: false

    }

  }

  toggleCreateCourse = () => {
    this.setState({createCourse : !this.state.createCourse})
}
  


  render() {
    var MyCourseslist = []
    for (const Course of this.state.MyCourses) {
      MyCourseslist.push(<Col xs={4} fluid><ShowCourse CourseName={Course.CourseName}
        CourseOwner={Course.CourseOwner} CourseBio={Course.CourseBio}
        CourseDegree={Course.CourseDegree} CourseCreatedAt={Course.CourseCreatedAt} /></Col>)
    }

    var CoursesTakenlist = []
    for (const Course of this.state.CoursesTaken) {
      CoursesTakenlist.push(<Col xs={4} fluid><ShowCourse CourseName={Course.CourseName}
        CourseOwner={Course.CourseOwner} CourseBio={Course.CourseBio}
        CourseDegree={Course.CourseDegree} CourseCreatedAt={Course.CourseCreatedAt} /></Col>)
    }

    var CoursesSuggestedlist = []
    for (const Course of this.state.CoursesSuggested) {
      CoursesSuggestedlist.push(<Col xs={4} fluid><ShowCourse CourseName={Course.CourseName}
        CourseOwner={Course.CourseOwner} CourseBio={Course.CourseBio}
        CourseDegree={Course.CourseDegree} CourseCreatedAt={Course.CourseCreatedAt} /></Col>)
    }



    return (
      <div className="Kursuebersicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Row" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                <Row className="Section">
                  <h1>Kursübersicht</h1>
                <Row className="Section" hidden={!this.state.UserRights}>
                  <h1>Meine Kurse</h1>
                  {MyCourseslist}

                  <input type="submit" value="Kurs erstellen" onClick={this.toggleCreateCourse} />
                  <Dialog open={this.state.createCourse} onClose={this.toggleCreateCourse}>
                    <DialogTitle>Kurs erstellen</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Hier können Sie einen Kurs erstellen.
                        <br/>
                        <label for="CreateCourseName">Kursname:</label>
                        <input type="text" id="CreateCourseNameId" placeholder='Kursname'/>
                        <br/>
                        <label for="CreateCourseBioId">Kursbeschreibung:</label>
                        <input type="text" id="CreateCourseBioId" placeholder='Kursbeschreibung'/>
                        <br/>
                        <label for="CreateCourseDegreeId">Studiengang:</label>
                        <input type="text" id="CreateCourseDegreeId" placeholder='Studiengang'/>
                        <br/>
                        <label for="CreateCourseKeyId">Einschreibeschlüssel:</label>
                        <input type="text" id="CreateCourseKeyId" placeholder='Einschreibeschlüssel'/>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <button onClick={this.toggleCreateCourse}>Kurs erstellen</button>
                      <button onClick={this.toggleCreateCourse}>abbrechen</button>
                    </DialogActions>
                  </Dialog>
                </Row>
                <Row className="Section">
                  <h1>Belegte Kurse</h1>
                  {CoursesTakenlist}
                </Row>
                <Row className="Section">
                  <h1>Vorgeschlagene Kurse</h1>
                  {CoursesSuggestedlist}

                </Row>

                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

function ShowCourse(props) {

  return (
    <div className="Course">
      <h4 className='CourseName'>{props.CourseName}</h4>
      <p className='CourseOwner'>Kursbesitzer: {props.CourseOwner}</p>
      <p className='CourseDeskription'>{props.CourseBio}</p>
      <p className='CourseDegree'>Studiengang: {props.CourseDegree}</p>
      <p className='CourseCreatedAt'>erstellt am:{props.CourseCreatedAt}</p>
    </div>
  )
}



export default Kursuebersicht
