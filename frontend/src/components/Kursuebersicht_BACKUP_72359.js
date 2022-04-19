import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'
import {callFetchCourses} from '../containers/APICalls'

import '../css/App.css';
import '../css/Kursübersicht.css'


export class Kursuebersicht extends Component {
<<<<<<< HEAD
=======
  constructor(props) {
    super(props)

    this.state = {

      UserRights: true, // true if active user can create courses

      MyCourses: [{ CourseName: "test", CourseOwner: "abcs", CourseBio: "asdf", CourseDegree: "AI", CourseCreatedAt: "hre" }, { CourseName: "dhj", CourseOwner: "fgj", CourseBio: "dghjm", CourseCreatedAt: "hg" }],

      CoursesTaken: [{ CourseName: "dhj", CourseOwner: "fgj", CourseBio: "dghjm", CourseCreatedAt: "hg" }],

      CoursesSuggested: [{ CourseName: "sgfh", CourseOwner: "sgjf", CourseBio: "fgj", CourseCreatedAt: "dj" }],



    }
  }

>>>>>>> fcaaf04df338b7b2d12fd24f8cd29c390bca0807

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
<<<<<<< HEAD
                <Row className="Section">
                  <h1>Kursübersicht</h1>

                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
=======
                <Row className="Section" hidden={!this.state.UserRights}>
                  <h1>Meine Kurse</h1>
                  {MyCourseslist}

                  <input type="submit" value="Kurs erstellen" />
>>>>>>> fcaaf04df338b7b2d12fd24f8cd29c390bca0807
                </Row>
                <Row className="Section">
                  <h1>Belegte Kurse</h1>
                  {CoursesTakenlist}
                </Row>
                <Row className="Section">
                  <h1>Vorgeschlagene Kurse</h1>
                  {CoursesSuggestedlist}

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
