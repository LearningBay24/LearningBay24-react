import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'


import '../css/App.css';

export class Kursansicht extends Component {
  constructor(props){
    super(props)

    this.state = {

      CourseAdmin: false, // true if active user has adminrights 

      CourseName: "Beispielkurs",
      CourseOwner: "Mustermann, Max",
      CourseAppointments: [{Day:"Montag", Time:"11:00", Content:"Vorlesung"},{Day:"Freitag", Time:"8:00",Content:"Praktikum"}],
      CourseBio: "Das ist ein Beispielkurs",
      CourseCreatedAt: "17.04.2022",
      CourseForum:"",

      CourseMaterial: [{Name:"mat1",Content:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}],
      CourseAssignments: [{Name: "Abgabe1",Content:"https://www.youtube.com/watch?v=dQw4w9WgXcQ", Date:"17.04.2022",Deadline:"25.04.2022 0:00"}],
      CourseSurveys: [{Name:"Umfrage1",Content:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}],
      CourseExams: [{Name:"Klausur1", Date:"30.4.2022", Duration:"1:30h"}]
    }
  }

  

  render() {

    var Generallist = [<h1>{this.state.CourseName}</h1>];
    Generallist.push(<p>{this.state.CourseOwner}</p>)
    for (const Appointment of this.state.CourseAppointments){
      Generallist.push(<h3>{Appointment.Day} {Appointment.Time} {Appointment.Content}</h3>)
    }
    Generallist.push(<p>{this.state.CourseBio}</p>)

    var Materiallist = []
    for (const Mat of this.state.CourseMaterial){
      Materiallist.push(<ShowMaterial Name={Mat.Name} Content={Mat.Content}/>)
    }

    var Assignmentlist = []
    for (const Assignment of this.state.CourseAssignments){
      Assignmentlist.push(<ShowAssignment Name={Assignment.Name} Content={Assignment.Content} Date={Assignment.Date} Deadline={Assignment.Deadline} />)
    }

    var Surveylist = []
    for (const Survey of this.state.CourseSurveys){
      Surveylist.push(<ShowSurvey Name={Survey.Name} Content={Survey.Content}/>)
    }

    var Examlist = []
    for (const Exam of this.state.CourseExams){
      Examlist.push(<ShowExam Name={Exam.Name} Content={Exam.Content} Date={Exam.Date} Duration={Exam.Duration} hidden={this.state.CourseAdmin}/>)
    }
    


    return (
      <div className="Kursansicht">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" fluid>
          <Row className="Row" fluid>
            <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" fluid>
              {Generallist}

              <div className="MaterialSection Section">
                <h2>Material</h2>
                {Materiallist}
              </div>

              <div className="AssignmentSection Section">
                <h2>Abgaben</h2>
                {Assignmentlist}
              </div>

              <div className="SurveySection Section">
                <h2>Umfragen</h2>
                {Surveylist}
              </div>

              <div className="ExamSection Section">
                <h2>Klausuren</h2>
                {Examlist}
              </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    )
  }

  
}
function ShowMaterial(props)
{
  return(
      <div className='MaterialContainer'>
        <h6>{props.Name}</h6>
        <a href={props.Content} target='_blank' rel='noreferrer'>{props.content}</a>
      </div>)
}

function ShowAssignment(props)
{
  return(
      <div className='AssignmentContainer'>
        <h6>{props.Name}</h6>
        <a href={props.Content} target='_blank' rel='noreferrer'>{props.Content}</a>
        <p className='AssignmentDate'>{props.Date}</p>
        <p className='AssignmentDeadline'>{props.Deadline}</p>
        <br/>
        <input type="submit" value= "Datei abgeben" />
      </div>)
}

function ShowExam(props)
{
  return(
      <div className='ExamContainer'>
        <h6>{props.Name}</h6>
        <a href={props.Content} target='_blank' rel='noreferrer'>{props.Content}</a>
        <p>Zeit: {props.Duration}</p>
        <p>Datum: {props.Date}</p>
        <br/>
        <input type="submit" value= "zur Prüfung anmelden"/>
      </div>)
}

function ShowSurvey(props)
{
  return(
      <div className='SurveyContainer'>
        <h6>{props.Name}</h6>
        <a href={props.Content} target='_blank' rel='noreferrer'>{props.Content}</a>
      </div>)
}

export default Kursansicht