import React, {Component} from "react";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import {Col, Container, Row} from "react-bootstrap";

import "../css/Overlay.css";
import "../css/Stundenplan.css";

export class Stundenplan extends Component {
  render() {
    const s = new Date(new Date().getTime() + 30 * 60 * 1000);
    const e = new Date(new Date().getTime() + 90 * 60 * 1000);
    console.log(s);
    return (
      <div className="Stundenplan">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid><h1>Stundenplan</h1>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin]}
                  initialView="timeGridWeek"
                  height={700}
                  events={[
                    {title: "event 1", date: s,
                      end: e},
                    {title: "event 2", date: "2019-04-02"},
                  ]}
                /></Col>
            </Row>
          </Container>
        </div>
        <ShowFooter />
      </div>
    );
  }
}


export default Stundenplan;
