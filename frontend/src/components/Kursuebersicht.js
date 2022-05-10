import React, {Component} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {ShowHeader, ShowNavbar} from './App';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {Link} from 'react-router-dom';

import {enrollUser, getMyCourses, postNewCourse} from '../api';


import '../css/Overlay.css';
import '../css/Kursübersicht.css'



export class Kursuebersicht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NewCourseID: 0,

      UserRights: true, // true if active user can create courses

      MyCourses: [{name: 'test1', owner: 'Peter', description: 'das ist mein Kurs', created_at: '19.04.2022', id: '1'}],

      CoursesTaken: [{name: 'test2', owner: 'Hans', description: 'das ist ein anderer Kurs', created_at: '19.04.2022', id: '2'}],

      CoursesSuggested: [{name: 'test3', owner: 'Klaus', description: 'Dieser Kurs könnte ihnen gefallen', created_at: '19.04.2022', id: '3'}],

      createCourse: false,

      // this object will be filled by the createCourse Dialog and will be sent to the server
      NewCourse: {name: '', user_id: '', description: '', enroll_key: ''},

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

  onCreateCourse() {
    this.state.NewCourse.name = this.state.NewName;
    this.state.NewCourse.description = this.state.NewBio;
    this.state.NewCourse.enroll_key = this.state.NewKey;
    this.state.NewCourse.user_id = 4; // hardcoded user id
    console.log(this.state.NewCourse);
    postNewCourse(this, this.state.NewCourse);
    this.toggleCreateCourse();
    this.componentDidMount();
  }

  componentDidMount() {
    getMyCourses(this);
  }


  render() {
    const MyCourseslist = [];
    for (const Course of this.state.MyCourses) {
      MyCourseslist.push(<Col xs={4} fluid><ShowCourse name={Course.name}
        owner={Course.CourseOwner} description={Course.description}
        created_at={Course.created_at} id={Course.id} /></Col>);
    }

    const CoursesTakenlist = [];
    for (const Course of this.state.CoursesTaken) {
      CoursesTakenlist.push(<Col xs={4} fluid><ShowCourse name={Course.name}
        owner={Course.CourseOwner} description={Course.description}
        created_at={Course.created_at} id={Course.id} /></Col>);
    }

    const CoursesSuggestedlist = [];
    for (const Course of this.state.CoursesSuggested) {
      CoursesSuggestedlist.push(<Col xs={4} fluid><ShowCourse name={Course.name}
        owner={Course.CourseOwner} description={Course.description}
        created_at={Course.created_at} id={Course.id} /></Col>);
    }


    return (
      <div className="Kursuebersicht">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                <Row className="Section">
                  <h1>Kursübersicht</h1>
                  <Row className="Section" hidden={!this.state.UserRights}>
                    <h1>Meine Kurse</h1>
                    {MyCourseslist}

                    <button className="primary" onClick={this.toggleCreateCourse}> Kurs erstellen </button>
                    <Dialog open={this.state.createCourse} onClose={this.toggleCreateCourse}>
                      <DialogTitle>Kurs erstellen</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Hier können Sie einen Kurs erstellen.
                          <br />
                          <label htmlFor="CreateCourseName">Kursname:</label>
                          <input type="text" id="CreateCourseNameId" placeholder='Kursname' name="NewName" onChange={this.onInputchange} />
                          <br />
                          <label htmlFor="CreateCourseBioId">Kursbeschreibung:</label>
                          <input type="text" id="CreateCourseBioId" placeholder='Kursbeschreibung' name="NewBio" onChange={this.onInputchange} />
                          <br />
                          <label htmlFor="CreateCourseKeyId">Einschreibeschlüssel:</label>
                          <input type="text" id="CreateCourseKeyId" placeholder='Einschreibeschlüssel' name="NewKey" onChange={this.onInputchange} />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <button onClick={this.onCreateCourse}>Kurs erstellen</button>
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
    );
  }
}

function ShowCourse(props) {
  const link = '/kursansicht/' + props.id;
  return (
    <div className="Course">
      <Link to={link}>
        <h4 className='CourseName'>{props.name}</h4>
      </Link>
      <p className='CourseOwner'>Kursbesitzer: {props.owner}</p>
      <p className='CourseDescription'>{props.description}</p>
      <p className='CourseCreatedAt'>erstellt am:{props.created_at}</p>

    </div>
  );
}


export default Kursuebersicht;
