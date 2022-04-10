import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { ShowHeader, ShowNavbar } from './App'


import '../css/App.css';

export class Benachrichtigungen extends Component {
  render() {
    return (
      <div className="Benachrichtigungen">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" fluid>
          <Row className="Row" fluid>
            <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" fluid><h1>Benachrichtigungen</h1></Col>
          </Row>
        </Container>
      </div>
    </div>
    )
  }
}

export default Benachrichtigungen