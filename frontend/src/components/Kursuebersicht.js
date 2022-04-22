import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { getCourse } from '../api';
import axios from 'axios';

import '../css/App.css';
import '../css/Kursübersicht.css'


export class Kursuebersicht extends Component {
  constructor(props) {
    super(props)

    this.state = {

      UserRights: true, // true if active user can create courses

        /*
      MyCourses: [{ CourseName: "test1", CourseOwner: "Peter", CourseBio: "das ist mein Kurs", CourseDegree: "AI", CourseCreatedAt: "19.04.2022" }],

      CoursesTaken: [{ CourseName: "test2", CourseOwner: "Hans", CourseBio: "das ist ein anderer Kurs", CourseCreatedAt: "19.04.2022" }],

      CoursesSuggested: [{ CourseName: "test3", CourseOwner: "Klaus", CourseBio: "Dieser Kurs könnte ihnen gefallen", CourseCreatedAt: "19.04.2022" }],
      */
        MyCourses: [],
        CoursesTaken: [],
        CoursesSuggested: [],
      createCourse: false,

      testObj: {},

      courseObj: { CourseName: "", CourseId: 1, CourseBio: "", CourseKey: ""},

        CourseId : 1,
        CourseName : "",
        CourseBio : "",
        CourseDegree : "",
        CourseKey : "",
        
    }

      this.createCourse = this.createCourse.bind(this);

  }

  toggleCreateCourse = () => {
    this.setState({createCourse : !this.state.createCourse})
    }
  
    componentDidMount()
    {
        fetch(`https://learningbay24.de/api/v1/courses`, { method: 'GET' })
            .then((response) => response.json())
            .then((data) => this.setState({ MyCourses: data }))
            .catch((error) => console.error(error));
    }
    

    createCourse(courseObj)
    {
        this.toggleCreateCourse();
        this.setState({ CourseId: this.state.CourseId + 1});

        const newCourse = {
            name: this.state.CourseName,
            description: this.state.CourseBio,
            enroll_key: this.state.CourseKey,
        };

        const requestOptions = {
                method: 'POST',
                body: JSON.stringify(newCourse)
            };

        fetch('https://learningbay24.de/api/v1/courses', requestOptions)
            .then((response) => response.json())
            .then((data) => this.setState({MyCourses: [data]}))
            .catch((error) => console.error(error));
    }

    onInputChange = event => {
        switch(event.target.id)
        {
            case "CreateCourseNameId":
                this.setState({ CourseName: event.target.value });
                break;
            case "CreateCourseBioId":
                this.setState({ CourseBio: event.target.value });
                break;
            case "CreateCourseDegreeId":
                this.setState({ CourseDegree: event.target.value });
                break;
            case "CreateCourseKeyId":
                this.setState({ CourseKey: event.target.value });
                break;
        }
    }


  render() {
    var MyCourseslist = []
    if(!(this.state.MyCourses == null))
      {
        for (const Course of this.state.MyCourses) {
              MyCourseslist.push(<Col xs={4} fluid><ShowCourse CourseName={Course.name}
                CourseOwner={""} CourseBio={Course.description}
                CourseDegree={""} CourseCreatedAt={Course.CourseCreatedAt} /></Col>)
            }
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
                        <input type="text" id="CreateCourseNameId" placeholder='Kursname' onChange={evt => this.onInputChange(evt)}/>
                        <br/>
                        <label for="CreateCourseBioId">Kursbeschreibung:</label>
                        <input type="text" id="CreateCourseBioId" placeholder='Kursbeschreibung' onChange={evt => this.onInputChange(evt)}/>
                        <br/>
                        <label for="CreateCourseDegreeId">Studiengang:</label>
                        <input type="text" id="CreateCourseDegreeId" placeholder='Studiengang' onChange={evt => this.onInputChange(evt)}/>
                        <br/>
                        <label for="CreateCourseKeyId">Einschreibeschlüssel:</label>
                        <input type="text" id="CreateCourseKeyId" placeholder='Einschreibeschlüssel' onChange={evt => this.onInputChange(evt)}/>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <button onClick={this.createCourse}>Kurs erstellen</button>
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
