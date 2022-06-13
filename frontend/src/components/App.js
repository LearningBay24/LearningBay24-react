import React from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "../components/Kopfzeile";

import "../css/Overlay.css";
import "../css/App.css";
import "../css/SvgStyling.css";


function App() {
  return (
    <div className="App">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" fluid>
          <Row className="Content" fluid>
            <Col xs={2} className="ColNav" fluid><div className="darkBar">
            </div><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" fluid><h1>Home</h1></Col>
          </Row>
        </Container>
      </div>
      <ShowFooter />
    </div>

  );
}

function ShowNavbar() {
  return (
    <div className="Navbar">
      <ul>
        <li key="5"><Link to="/dashboard"
          className="lnkDashboard">Dashboard</Link></li>
        <li key="9"><Link to="/kursuebersicht">Kursübersicht</Link></li>
        <li key="4"><Link to="/benachrichtigungen">
          Benachrichtigungen</Link></li>
        <li key="6"><Link to="/institution">Institution</Link></li>
        <li key="7"><Link to="/klausurenuebersicht">
          Klausurenübersicht</Link></li>
        <li key="2"><Link to="/abgabenuebersicht">Abgabenübersicht</Link></li>
        <li key="11"><Link to="/profil">Profil</Link></li>
        <li key="12"><Link to="/stundenplan">Stundenplan</Link></li>
        <li key="10"><Link to="/login">Login</Link></li>
        <li key="3"><Link to="/anlegen">Nutzer Anlegen</Link></li>
      </ul>
    </div>
  );
}
export default App;
export {ShowNavbar};

