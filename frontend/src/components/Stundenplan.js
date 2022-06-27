import React, {Component} from "react";
import {ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "./Kopfzeile";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import {Col, Container, Row} from "react-bootstrap";

import {getAppointments, getRegisteredExams} from "../api";
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

      RegisteredExams: [{}],

      eventsAppointments: [{}],

      eventsExams: [{}],

    };

    this.AppointmentsCallback= this.AppointmentsCallback.bind(this);
    this.ExamsCallback = this.ExamsCallback.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  calendarRef = React.createRef();

  componentDidMount() {
    this.setState({events: []});
    getAppointments(this, this.AppointmentsCallback);
    getRegisteredExams(this, this.ExamsCallback);
  }

  AppointmentsCallback(caller) {
    if (caller.state.Appointments != null) {
      for (const Appointment of this.state.Appointments) {
        this.state.eventsAppointments.push({
          title: Appointment.name + ": " + Appointment.location,
          url: "/kursansicht/" + Appointment.course_id,
          start: new Date(Date.parse(
              Appointment.date),
          ).toISOString().split(".")[0]+"Z",

          end: new Date(Date.parse(Appointment.date) +
          Appointment.duration * 1000).toISOString()
              .split(".")[0]+"Z",
          backgroundColor: "blue",
        });
      }
    }
    for (let i = 0; i < this.state.eventsAppointments.length; i++) {
      this.addEvent(this.state.eventsAppointments[i]);
    }
  }

  ExamsCallback(caller) {
    if (this.state.RegisteredExams != null) {
      for (const Exam of this.state.RegisteredExams) {
        this.state.eventsExams.push({
          title: Exam.name +": " +
          Exam.location,
          url: "/klausurenuebersicht/",
          start: new Date(Date.parse(
              Exam.date),
          ).toISOString().split(".")[0]+"Z",

          end: new Date(Date.parse(Exam.date) +
          Exam.duration * 1000).toISOString()
              .split(".")[0]+"Z",
          backgroundColor: "red",
        });
      }
    }
    for (let i = 0; i < this.state.eventsExams.length; i++) {
      this.addEvent(this.state.eventsExams[i]);
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
          <Container fluid className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col className="ColContent" >
                <h1>Stundenplan</h1>
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
