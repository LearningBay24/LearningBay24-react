import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";

import {login} from "../api";
import {Link} from "react-router-dom";
import {ShowFooter} from "./Footer";

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
      <div className="LoginContainer">
        <Link to="/kursuebersicht">
          <ShowLoginHeader />
        </Link>
        <div className="Login">
          <h1>Login</h1>
          <label id="emaillabel" htmlFor="email">E-mail</label>
          <br />
          <input id="email" type="text" name="Email"
            onChange={this.onInputChange}></input>
          <br />
          <label id="pswdlabel" htmlFor="password">Passwort</label>
          <br />
          <input id="password" type="password" name="Password"
            onChange={this.onInputChange}></input>
          <br />
          <input id="loginbutton" type="submit" value="Login"
            onClick={this.UserLogin}></input>
          <br />
          <br />
          <br />
        </div>
        <ShowFooter />
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
          <Col md={8}><h1 className="LB24Header">LEARNINGBAY24</h1></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
