import '../App.css';
import '../test.css';
import Logo from '../images/Logo.png';
import {
  Link,

} from "react-router-dom"

import { Container, Row, Col } from 'react-bootstrap'


function App() {
  return (
    <div className="App">
      <ShowHeader />
      <h1>Home</h1>
      <ShowNavbar />
    </div>

  );
}

function ShowNavbar() {
  return (
    <footer>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/abgabenuebersicht">Abgabenübersicht</Link></li>
        <li><Link to="/anlegen">Anlegen</Link></li>
        <li><Link to="/benachrichtigungen">Benachrichtigungen</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/institution">Institution</Link></li>
        <li><Link to="/klausurenuebersicht">Klausurenübersicht</Link></li>
        <li><Link to="/kursansicht">Kursansicht</Link></li>
        <li><Link to="/kursuebersicht">Kursübersicht</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/profil">Profil</Link></li>
        <li><Link to="/stundenplan">Stundenplan</Link></li>
      </ul>
    </footer>
  )
}

function ShowHeader() {
  return (
    <div className="Header">
    <Container>
      <Row>
        <Col md={2}><img src={Logo} width="100px" height="100px" alt="Logo"></img></Col>
        <Col md={8}><input type="text" id="tfSearchbar"></input>
          <button id="btnSearchbar">Search</button></Col>
        <Col md={2}><Link to="/profil" id="lnkProfile">Profil</Link></Col>
      </Row>
    </Container>
    </div>
  )
}
export default App;
export { ShowNavbar, ShowHeader };

