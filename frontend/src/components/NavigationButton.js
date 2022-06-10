import React from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function onClickHandler(navigate, link) {
  navigate(link);
}

export function NavigationButton(props) {
  const navigate = useNavigate();
  const link = props.link;
  const text = props.innerText;
  const callback = props.callback();

  return (
    <button onClick={() => {
      onClickHandler(navigate, link);
      callback();
    }}>
      {text}
    </button>
  );
}
NavigationButton.propTypes = {
  link: PropTypes.string.isRequired,
  innerText: PropTypes.string.isRequired,
  callback: PropTypes.func,
};
