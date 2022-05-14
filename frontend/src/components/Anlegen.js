import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowHeader, ShowNavbar} from "./App";

import {register} from "../api";

import "../css/Overlay.css";
import "../css/Anlegen.css";

export class Anlegen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role_id: 9999,
      preferred_language_id: 9999,

    };
  }
  render() {
    this.onInputChange = this.onInputChange.bind(this);
    this.UserRegister = this.UserRegister.bind(this);

    return (
      <div className="Anlegen">
        <ShowHeader />
        <div className="Body">
          <Container className="Container" fluid>
            <Row className="Content" fluid>
              <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
              <Col xs={10} className="ColContent" fluid>
                <h1>Anlegen</h1>
                <label>E-Mail</label>
                <br />
                <input type="text" name="Email"
                  onChange={this.onInputChange}></input>
                <br />
                <label>Vorname</label>
                <br />
                <input type="text" name="firstname"
                  onChange={this.onInputChange}></input>
                <br />
                <label>Nachname</label>
                <br />
                <input type="text" name="surname"
                  onChange={this.onInputChange}></input>
                <br />
                <label>Passwort</label>
                <br />
                <input type="password" name="password"
                  onChange={this.onInputChange}></input>
                <br />
                <label>Rolle</label>
                <select name="role_id">
                  <option value={2}>Dozent</option>
                </select>
                <label>Sprache</label>
                <select name="preferred_language_id">
                  <option value={2}>Deutsch</option>
                </select>
                <input type="submit" onClick={this.UserRegister}
                  value="Neuen Nutzer anlegen" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  UserRegister() {
    const data = {
      firstname: this.state.firstname,
      surname: this.state.surname,
      email: this.state.Email,
      password: this.state.password,
      role_id: this.state.role_id,
      preferred_language_id: this.state.preferred_language_id,

    };
    // console.log(data);
    register(this, data);
  }
}

export default Anlegen;
