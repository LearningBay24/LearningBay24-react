import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowHeader} from "./Kopfzeile";
import {getUser, logout} from "../api";

import "../css/Overlay.css";
import "../css/Profil.css";

export class Profil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: null,
      surname: null,
      title: null,
      email: null,
      graduation: null,
      role_id: null,
      location: null,
      bio: null,
      // courses: ["Prog1", "Projekt1", "Mathe1"],

    };
  }

  componentDidMount() {
    getUser(this);
  }

  render() {
    return (
      <div className="Profil">
        <ShowHeader />
        <div className="Body">
          <Container fluid className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col className="ColContent" ><h1>Profil</h1>
                <p>Name :{this.state.title} {this.state.surname},
                  {this.state.firstname}</p>
                <p>Email: {this.state.email}</p>
                <p>Abschluss: {this.state.graduation}</p>
                <p>Rolle: {this.state.role_id}</p>
                <p>Ort: {this.state.location}</p>
                <input type="text" id="bio" defaultValue={this.state.bio}
                  onInput={this.ChangeBio} ></input>
                <button onClick={() => {
                  logout();
                  this.componentDidMount();
                }}>Log Out</button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  ChangeBio = () => {
    this.setState({bio: document.getElementById("bio").value});
    alert(this.state.bio);
  };

  FillCourses = () => {
    let t = "";
    for (const course of this.state.courses) {
      t += course + ",";
    }
    return <p>{t}</p>;
  };
}


export default Profil;
