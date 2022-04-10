import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'


import '../css/App.css';

export class Klausurenuebersicht extends Component {
  render() {
    return (
      <div className="Klausurenuebersicht">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" fluid>
          <Row className="Row" fluid>
            <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" fluid>
              <Row className="Section">
                <h1>Angemeldete Klausuren</h1>
                <Col xs={4} fluid> <ShowExam /></Col>
                <Col xs={4} fluid> <ShowExam /></Col>
                <Col xs={4} fluid> <ShowExam /></Col>
                <Col xs={4} fluid> <ShowExam /></Col>
              </Row>
              <Row className="Section">
                <h1>Klausuren aus ihren Kursen</h1>
                <Col xs={4} fluid> <ShowExam /></Col>
                <Col xs={4} fluid> <ShowExam /></Col>
                <Col xs={4} fluid> <ShowExam /></Col>
                <Col xs={4} fluid> <ShowExam /></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    )
  }
}

function ShowExam() {
  return (
    <div className="Exam">
      <h4 className='ExamName'>Klausurname</h4>
      <p className='ExamCourse'>Kurs</p>
      <p className='ExamOwner'>Klausurersteller</p>
      <p className='ExamDegree'>Studiengang</p>
    </div>
  )
}

export default Klausurenuebersicht