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
              <a><p>Forum</p></a>
              <div className="MaterialSection Section">
                <h2>Material</h2>
                <div className='MaterialContainer'>
                <h6>Materialname</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>
                
                <div className='MaterialContainer'>
                <h6>Materialname</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>

                <div className='MaterialContainer'>
                <h6>Materialname</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>
              </div>

              <div className="ExerciseSection Section">
                <h2>Abgaben</h2>
                <div className='ExerciseContainer'>
                <h6>Abgabe</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>
                
                <div className='ExerciseContainer'>
                <h6>Abgabe</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>

                <div className='ExerciseContainer'>
                <h6>Abgabe</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>
              </div>

              <div className="SurveySection Section">
                <h2>Umfragen</h2>
                <div className='ExerciseContainer'>
                <h6>Umfrage</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>
                
                <div className='ExerciseContainer'>
                <h6>Umfrage</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>

                <div className='ExerciseContainer'>
                <h6>Umfrage</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>
              </div>

              <div className="ExamSection Section">
                <h2>Klausuren</h2>
                <div className='ExerciseContainer'>
                <h6>Klausur</h6>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
                </div>
              </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    )
  }
}

export default Kursansicht