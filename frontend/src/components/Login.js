import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import Logo from "../images/Logo.png";

import {login, logout} from "../api";

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
        <ShowLoginHeader />
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
          <input id="logoutbutton" type="submit" value="Logout"
            onClick={logout}></input>
          <br />
          <br />
          <br />
        </div>
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
          <Col md={2}><Link to="/kursuebersicht">
            <img src={Logo} width="100px" height="100px"
              alt="Logo" className="Logo"></img></Link></Col>
          <Col md={8}><h1>LEARNINGBAY24</h1></Col>
          <Col md={2}><Link to="/kursuebersicht">
            <img src={Logo} width="100px" height="100px"
              alt="Logo" className="Logo"></img></Link></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
