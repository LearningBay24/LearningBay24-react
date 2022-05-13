import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import Logo from "../images/Logo.png";

import {login} from "../api";

import "../css/Overlay.css";
import "../css/Login.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
    };
  }
  render() {
    this.onInputChange = this.onInputChange.bind(this);
    this.UserLogin = this.UserLogin.bind(this);

    return (
      <div>
        <ShowLoginHeader />
        <h1>Login</h1>
        <label htmlFor="user">E-mail</label>
        <br />
        <input id="user" type="text" name="Email"
          onChange={this.onInputChange}></input>
        <br />
        <label htmlFor="password">Passwort</label>
        <br />
        <input id="password" type="password" name="Password"
          onChange={this.onInputChange}></input>
        <br />
        <input type="submit" value="log in" onClick={this.UserLogin}></input>
        <br />
        <Link to="/anlegen">Registrieren</Link>
        <br/>
        <Link to="/kursuebersicht">Kursübersicht</Link>
      </div>
    );
  }


  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }


  UserLogin() {
    const data = {
      Email: this.state.Email,
      Password: this.state.Password,
    };
    login(this, data);
  }
}


function ShowLoginHeader() {
  return (
    <div className="Header">
      <Container>
        <Row>
          <Col md={2}><img src={Logo} width="100px" height="100px" alt="Logo">
          </img></Col>
          <Col md={8}><h1>LEARNINGBAY24</h1></Col>
          <Col md={2}><img src={Logo} width="100px" height="100px" alt="Logo">
          </img></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
