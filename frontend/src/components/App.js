import {React, useState} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import {ShowFooter} from "./Footer";
import {ShowHeader} from "../components/Kopfzeile";

import "../css/Overlay.css";
import "../css/App.css";
import "../css/SvgStyling.css";
import {role} from "../api";


function App() {
  return (
    <div className="App">
      <ShowHeader />
      <div className="Body">
        <Container className="Container" >
          <Row className="Content" >
            <Col xs={2} className="ColNav" ><div className="darkBar">
            </div><ShowNavbar /></Col>
            <Col xs={10} className="ColContent" ><h1>Home</h1></Col>
          </Row>
        </Container>
      </div>
      <ShowFooter />
    </div>

  );
}

function ShowNavbar() {
  const [Admin, setAdmin] = useState([]);
  role(setAdmin, null);
  return (
    <div className="Navbar">
      <ul>
        <li key="9"><Link to="/kursuebersicht">Kursübersicht</Link></li>
        <li key="7"><Link to="/klausurenuebersicht">
          Klausurenübersicht</Link></li>
        <li key="2"><Link to="/abgabenuebersicht">Abgabenübersicht</Link></li>
        <li key="12"><Link to="/stundenplan">Stundenplan</Link></li>
        {Admin==1?<li key="3"> <Link to="/anlegen" hidden={!Admin}>
          Nutzer Anlegen</Link></li>: null}
      </ul>
    </div>
  );
}
export default App;
export {ShowNavbar};

