import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import Logo from '../images/Logo.png';


import '../css/App.css';

export class Login extends Component {
  render() {
    return (
      <div>
        <ShowLoginHeader />
        <h1>Login</h1>
        <label htmlFor="user">Username</label>
        <br />
        <input id="user" type="text"></input>
        <br />
        <label htmlFor="password">Passwort</label>
        <br />
        <input id="password" type="password"></input>
        <br />
        <input type="submit" value="log in"></input>
        <br />
        <br />
        <br />
        <Link to="/">Home</Link>
      </div>
    );
  }
}

function ShowLoginHeader() {
  return (
    <div className="Header">
      <Container>
        <Row>
          <Col md={2}><img src={Logo} width="100px" height="100px" alt="Logo"></img></Col>
          <Col md={8}><h1>LEARNINGBAY24</h1></Col>
          <Col md={2}><img src={Logo} width="100px" height="100px" alt="Logo"></img></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
