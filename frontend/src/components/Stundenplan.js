import React, { Component } from 'react'
import { ShowHeader, ShowNavbar } from './App'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Col, Container, Row } from 'react-bootstrap'

import '../css/Overlay.css';
import '../css/Stundenplan.css';

export class Stundenplan extends Component {
  render() {
    return (
      <div className="Stundenplan">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid><h1>Stundenplan</h1>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridWeek"
                  height={700}
                /></Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}



export default Stundenplan
