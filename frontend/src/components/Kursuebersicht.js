import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'

import '../css/App.css';
import '../css/Kursübersicht.css'


export class Kursuebersicht extends Component {

  render() {
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
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                </Row>
                <Row className="Section">
                  <h1>Vorgeschlagene Kurse</h1>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                </Row>
                <Row className="Section">
                  <h1>Meine Kurse</h1>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                  <Col xs={4} fluid> <ShowCourse /></Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

function ShowCourse() {
  return (
    <div className="Course">
      <h4 className='CourseName'>Kursname</h4>
      <p className='CourseOwner'>Kursersteller</p>
      <p className='CourseDeskription'>Kursbeschreibung</p>
      <p className='CourseDegree'>Studiengang</p>
    </div>
  )
}

export default Kursuebersicht
