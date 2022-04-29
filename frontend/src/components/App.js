import Logo from '../images/Logo.png';
import React from 'react';
import {Link} from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap'
import '../css/App.css';


function App() {
  return (
    <div className="App">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" fluid>
          <Row className="Row" fluid>
            <Col xs={2} className="ColNav" fluid><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" fluid><h1>Home</h1></Col>
          </Row>
        </Container>
      </div>
    </div>

  );
}

function ShowNavbar() {
  return (
    <div className="Navbar">
      <ul>
        <li key="1"><Link to="/">Home</Link></li>
        <li key="2"><Link to="/abgabenuebersicht">Abgabenübersicht</Link></li>
        <li key="3"><Link to="/anlegen">Anlegen</Link></li>
        <li key="4"><Link to="/benachrichtigungen">Benachrichtigungen</Link></li>
        <li key="5"><Link to="/dashboard">Dashboard</Link></li>
        <li key="6"><Link to="/institution">Institution</Link></li>
        <li key="7"><Link to="/klausurenuebersicht">Klausurenübersicht</Link></li>
        <li key="8"><Link to="/kursansicht/:1">Kurs1</Link></li>
        <li key="9"><Link to="/kursuebersicht">Kursübersicht</Link></li>
        <li key="10"><Link to="/login">Login</Link></li>
        <li key="11"><Link to="/profil">Profil</Link></li>
        <li key="12"><Link to="/stundenplan">Stundenplan</Link></li>
      </ul>
    </div>
  )
}

function ShowHeader() {
  return (
    <div className="Header">
      <Container>
        <Row>
          <Col md={2}><img src={Logo} width="100px" height="100px" alt="Logo"></img></Col>
          <Col md={8}><input type="text" id="tfSearchbar"></input>
            <button id="btnSearchbar">Suche</button></Col>
          <Col md={2}><Link to="/profil" id="lnkProfile">Profil</Link></Col>
        </Row>
      </Container>
    </div>
  )
}

export default App;
export { ShowNavbar, ShowHeader };

