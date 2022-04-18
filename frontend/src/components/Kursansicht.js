import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'


import '../css/App.css';

export class Kursansicht extends Component {
  constructor(props){
    super(props)

    this.state = {
      CourseName: "Beispielkurs",
      CourseOwner: "Mustermann, Max",
      CourseAppointments: [["Montag 11:00 ","Vorlesung" ],["Freitag 8:00","Praktikum"]],
      CourseBio: "Das ist ein Beispielkurs",
      CourseCreatedAt: "17.04.2022",
      CourseForum:"",

      CourseMaterial: [{name:"mat1",content:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}],
      CourseAssignments: [{name: "Abgabe1",content:"https://www.youtube.com/watch?v=dQw4w9WgXcQ", date:"17.04.2022",deadline:"25.04.2022 0:00"}],
      CourseSurveys: [{name:"Umfrage1",content:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}],
      CourseExams: [{name:"Klausur1", date:"30.4.2022", duration:"1:30h"}]
    }
  }

  

  render() {

    var generallist = [<h1>{this.state.CourseName}</h1>];
    generallist.push(<p>{this.state.CourseOwner}</p>)
    for (const Appointment of this.state.CourseAppointments){
      generallist.push(<h3>{Appointment}</h3>)
    }
    generallist.push(<p>{this.state.CourseBio}</p>)

    var materiallist = []
    for (const Mat of this.state.CourseMaterial){
      materiallist.push(<ShowMaterial name={Mat.name} content={Mat.content}/>)
    }

    var assignmentlist = []
    for (const Assignment of this.state.CourseAssignments){
      assignmentlist.push(<ShowAssignment name={Assignment.name} content={Assignment.content} date={Assignment.date} deadline={Assignment.deadline} />)
    }

    var surveylist = []
    for (const Survey of this.state.CourseSurveys){
      surveylist.push(<ShowSurvey name={Survey.name} content={Survey.content}/>)
    }

    var examlist = []
    for (const exam of this.state.CourseExams){
      examlist.push(<ShowMaterial name={exam.name} content={exam.content} date={exam.date} duration={exam.duration}/>)
    }
    


    return (
      <div className="Kursansicht">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" fluid>
          <Row className="Row" fluid>
            <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" fluid>
              {generallist}

              <div className="MaterialSection Section">
                <h2>Material</h2>
                {materiallist}
              </div>

              <div className="AssignmentSection Section">
                <h2>Abgaben</h2>
                {assignmentlist}
              </div>

              <div className="SurveySection Section">
                <h2>Umfragen</h2>
                {surveylist}
              </div>

              <div className="ExamSection Section">
                <h2>Klausuren</h2>
                {examlist}
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
        <h6>{props.name}</h6>
        <a href={props.content} target='_blank' rel='noreferrer'>{props.content}</a>
      </div>)
}

function ShowAssignment(props)
{
  return(
      <div className='AssignmentContainer'>
        <h6>{props.name}</h6>
        <a href={props.content} target='_blank' rel='noreferrer'>{props.content}</a>
        <p className='AssignmentDate'>{props.date}</p>
        <p className='AssignmentDeadline'>{props.deadline}</p>
        <br/>
        <input type="submit" value= "Datei abgeben" />
      </div>)
}

function ShowExam(props)
{
  return(
      <div className='ExamContainer'>
        <h6>{props.name}</h6>
        <a href={props.content} target='_blank' rel='noreferrer'>{props.content}</a>
        <p>Zeit: {props.duration}</p>
        <p>Datum: {props.date}</p>
        <br/>
        <input type="submit" value= "zur Prüfung anmelden" />
      </div>)
}

function ShowSurvey(props)
{
  return(
      <div className='SurveyContainer'>
        <h6>{props.name}</h6>
        <a href={props.content} target='_blank' rel='noreferrer'>{props.content}</a>
      </div>)
}

export default Kursansicht