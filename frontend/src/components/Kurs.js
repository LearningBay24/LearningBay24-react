import React from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function onClickHandler(navigate, link) {
  // check if user is already enrolled
  // show form
  navigate(link);
}

export function ShowCourse(props) {
  const navigate = useNavigate();
  const link = "/kursansicht/" + props.id;
  return (
    <div onClick={() => {
      onClickHandler(navigate, link);
      props.callback();
    }}>
      <h4 className='CourseName'>{props.name}</h4>
      <p className='CourseDescription'>{props.description}</p>
      <p className='CourseCreatedAt'>erstellt am:
        {new Date(props.created_at).toLocaleDateString()}</p>
    </div>
  );
}
ShowCourse.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  description: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  // owner: PropTypes.string.isRequired,
  callback: PropTypes.func,
};
