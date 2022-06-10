import React, {Component} from "react";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import {Col, Container, Row} from "react-bootstrap";

import {getAppointments} from "../api";
import "../css/Overlay.css";
import "../css/Stundenplan.css";

export class Stundenplan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Appointments: [{
        id: 0,
        date: "",
        location: "",
        online: "",
        course_id: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
      }],

      events: [{
        title: "event 1",
        start: "2022-06-05",
        end: "2022-06-07",
      }],
    };

    this.AppointmentsCallback= this.AppointmentsCallback.bind(this);
  }

  calendarRef = React.createRef();

  componentDidMount() {
    this.setState({events: []});
    getAppointments(this, this.AppointmentsCallback);
  }

  AppointmentsCallback(caller) {
    console.log("AppointmentsCallback");
    if (caller.state.Apointments[0] != null) {
      console.log("test");
      for (let i = 0; i < caller.state.Apointments.length; i++) {
        this.state.events.push({
          title: caller.state.Apointments[i][0].id,
          start: new Date(Date.parse(
              caller.state.Apointments[i][0].date),
          ).toISOString().split(".")[0]+"Z",

          end: new Date(Date.parse(caller.state.Apointments[i][0].date) +
            90 * 60 * 1000).toISOString().split(".")[0]+"Z",
        });
      }
    }
    console.log("events");
    console.log(this.state.events);
    for (let i = 0; i < this.state.events.length; i++) {
      this.addEvent(this.state.events[i]);
    }
  }

  addEvent = (event) => {
    const api = this.calendarRef.current.getApi();
    api.addEvent(event);
  };


  render() {
    return (
      <div className="Stundenplan">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid><h1
                onClick={() => {
                  console.log(this.state.appointments[0].id);
                }}>Stundenplan</h1>
              <FullCalendar ref={this.calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                height={700}
                events={this.state.events}
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
