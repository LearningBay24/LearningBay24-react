import React, {useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as HomeSvg} from "../icons/home.svg";
import PropTypes from "prop-types";
import {getCoursesByQuery, logout} from "../api/index";


export function ShowHeader(props) {
  const [CurrentQuery, setCurrentQuery] = useState("");
  const navigate = useNavigate();

  const onInputChange = (event) => {
    setCurrentQuery(event.target.value);
  };

  const onButtonClick = () => {
    getCoursesByQuery(CurrentQuery, onAPICallFinished);
  };

  const onAPICallFinished = (result) => {
    console.log("(onAPICallFinished)");
    console.log(result);
    navigate("/suchergebnis", {state: {Result: result}});
  };

  const onSuccessfulLogout = () => {
    navigate("/login");
  };

  return (
    <div className="Header">
      <Container>
        <Row>
          <Col md={2}><Link to="/kursuebersicht">
            <HomeSvg className="homeSvg"/>
          </Link></Col>
          <Col md={8}><input type="text" id="tfSearchbar"
            onChange={onInputChange}></input>
          <button id="btnSearchbar"
            onClick={onButtonClick}>Suchen</button></Col>
          <Col md={2}><button id="btnLogout"
            onClick={() => logout(onSuccessfulLogout)}>Logout</button></Col>
        </Row>
      </Container>
    </div>
  );
}

ShowHeader.propTypes = {
  callbackQueryUpdate: PropTypes.func,
  callbackOnSearch: PropTypes.func,
};
