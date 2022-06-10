import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as HomeSvg} from "../icons/home.svg";

export function ShowHeader() {
  const navigate = useNavigate();
  return (
    <div className="Header">
      <Container>
        <Row>
          <Col md={2}><Link to="/kursuebersicht">
            <HomeSvg className="homeSvg"/>
          </Link></Col>
          <Col md={8}><input type="text" id="tfSearchbar"></input>
            <button id="btnSearchbar"
              onClick={()=>{
                navigate("/suchergebnis");
              }}>Suchen</button></Col>
          <Col md={2}><Link to="/profil" id="lnkProfile">Profil</Link></Col>
        </Row>
      </Container>
    </div>
  );
}
