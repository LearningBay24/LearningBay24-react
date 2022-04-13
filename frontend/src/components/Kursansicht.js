import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'


import '../css/App.css';

export class Kursansicht extends Component {
  render() {
    return (
      <div className="Kursansicht">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" fluid>
          <Row className="Row" fluid>
            <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" fluid>
              <h1>Kursname</h1>
              <p>Termine</p>
              <p>Kursbeschreibung</p>
              <p>Forum</p>
              <p>Kursersteller</p>

              <div className="MaterialSection Section">
                <h2>Material</h2>
                <ShowMaterial/>
                <ShowMaterial/>
                <ShowMaterial/>
              </div>

              <div className="AssignmentSection Section">
                <h2>Abgaben</h2>
                <ShowAssignment/>
                <ShowAssignment/>
                <ShowAssignment/>
              </div>

              <div className="SurveySection Section">
                <h2>Umfragen</h2>
                <ShowSurvey/>
                <ShowSurvey/>
              </div>

              <div className="ExamSection Section">
                <h2>Klausuren</h2>
                <ShowExam/>
              </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    )
  }

  
}
function ShowMaterial()
{
  return(
      <div className='MaterialContainer'>
        <h6>Materialname</h6>
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
      </div>)
}

function ShowAssignment()
{
  return(
      <div className='AssignmentContainer'>
        <h6>Abgabename</h6>
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
        <p className='AssignmentDate'>Datum</p>
        <p className='AssignmentDeadline'>Deadline</p>
        <br/>
        <input type="submit" value= "Datei abgeben" />
      </div>)
}

function ShowExam()
{
  return(
      <div className='ExamContainer'>
        <h6>Klausurname</h6>
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
        <br/>
        <input type="submit" value= "zur Prüfung anmelden" />
      </div>)
}

function ShowSurvey()
{
  return(
      <div className='SurveyContainer'>
        <h6>Umfragename</h6>
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
        <br/>
        <input type="submit" value= "zur Umfrage anmelden" />
      </div>)
}

export default Kursansicht