import React, {useState} from "react";
import {Container, Row, Col} from "react-bootstrap";

import {login} from "../api";
import {useNavigate} from "react-router-dom";
import {ShowFooter} from "./Footer";

import "../css/Overlay.css";
import "../css/Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = () => {
    const data = {
      Email: email,
      Password: password,
    };

    login(data, onSuccessfulLogin);
  };

  const onSuccessfulLogin = () => {
    navigate("/kursuebersicht");
  };

  return (
    <div className="LoginContainer">
      <ShowLoginHeader />
      <div className="Login">
        <div className="LoginHeader">
          <h1 className="LoginH1">Log in</h1>
        </div>
        <div className="LoginBody">
          <div className="EmptySpace"></div>
          <label id="emaillabel" htmlFor="email">E-mail</label>
          <input id="email" type="text" name="Email"
            onChange={onEmailChange}></input>
          <div className="EmptySpace"></div>
          <label id="pswdlabel" htmlFor="password">Passwort</label>
          <input id="password" type="password" name="Password"
            onChange={onPasswordChange}></input>
        </div>
        <div className="LoginFooter">
          <input className="LoginButton" type="submit" value="Log in"
            onClick={userLogin}></input>
        </div>
        <br />
        <br />
        <br />
      </div>
      <ShowFooter />
    </div>
  );
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
