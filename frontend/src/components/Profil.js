import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";
import {ShowFooter} from "./Footer";
import {getUser} from "../api";

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
      job: null,
      location: null,
      institutionlocation: null,
      bio: null,
      // courses: ["Prog1", "Projekt1", "Mathe1"],

    };
  }

  componentDidMount() {
    getUser(this);
    this.render();
  }

  render() {
    return (
      <div className="Profil">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid><h1>Profil</h1>
                <p>{this.state.title} {this.state.surname},
                  {this.state.firstname}</p>
                <p>{this.state.email}</p>
                <p>{this.state.graduation}</p>
                <p>{this.state.job}</p>
                <p>{this.state.location}</p>
                <p>{this.state.institutionlocation}</p>
                <input type="text" id="bio" defaultValue={this.state.bio}
                  onInput={this.ChangeBio} ></input>
              </Col>
            </Row>
          </Container>
        </div>
        <ShowFooter />
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
