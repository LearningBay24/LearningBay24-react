import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShowNavbar} from "./App";
import {ShowHeader} from "./Kopfzeile";

import {register} from "../api";

import "../css/Overlay.css";
import "../css/Anlegen.css";

export class Anlegen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role_id: "3",
      preferred_language_id: 1,
    };
  }
  render() {
    this.onInputChange = this.onInputChange.bind(this);
    this.UserRegister = this.UserRegister.bind(this);

    return (
      <div className="Anlegen">
        <ShowHeader />
        <div className="Body">
          <Container fluid className="Container" >
            <Row className="Content" >
              <Col xs={2} className="ColNav" ><ShowNavbar /></Col>
              <Col className="ColContent" >
                <div className="AddUserContainer">
                  <h1>Nutzer Anlegen</h1>
                  <div className="AddUserSection">
                    <label className="AddUserLabel">Nutzername</label>
                    <br />
                    <input className="AddUserInput" type="text" name="Email"
                      onChange={this.onInputChange}></input>
                    <br />
                    <label className="AddUserLabel">Vorname</label>
                    <br />
                    <input className="AddUserInput" type="text"
                      name="firstname" pattern="[A-Za-z]"
                      onChange={this.onInputChange}></input>
                    <br />
                    <label className="AddUserLabel">Nachname</label>
                    <br />
                    <input className="AddUserInput" type="text" name="surname"
                      onChange={this.onInputChange}></input>
                    <br />
                    <label className="AddUserLabel">Passwort</label>
                    <br />
                    <input className="AddUserInput" type="password"
                      name="password"
                      onChange={this.onInputChange}></input>
                    <br />
                    <label className="AddUserLabel">Rolle</label>
                    <select className="AddUserSelect" name="role_id"
                      onChange={this.onInputChange}>
                      <option value={3}>Nutzer</option>
                      <option value={2}>Moderator</option>
                      <option value={1}>Admin</option>
                    </select>
                  </div>
                  <div className="ButtonArea">
                    <input className="AddUserSubmitButton" type="submit"
                      onClick={this.UserRegister}
                      value="Neuen Nutzer anlegen" />
                  </div>
                  <label id="successId">
                    {this.state.success? "erfolgreich angelegt":""}
                  </label>
                </div>
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
    this.setState({success: 0});
  }

  UserRegister() {
    const data = {
      firstname: this.state.firstname,
      surname: this.state.surname,
      email: this.state.Email,
      password: this.state.password,
      role_id: parseInt(this.state.role_id),
      preferred_language_id: this.state.preferred_language_id,

    };
    // console.log(data);
    register(this, data);
  }
}

export default Anlegen;
