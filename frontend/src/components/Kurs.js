import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

// async function onClickHandler(navigate, link) {
// show form
// navigate(link);
// }

export function ShowCourse(props) {
  const link = "/kursansicht/" + props.id;
  return (
    <Link to={link}>
      <h4 className='CourseName'>{props.name}</h4>
      <p className='CourseDescription'>{props.description}</p>
      <p className='CourseCreatedAt'>erstellt am:
        {new Date(props.created_at).toLocaleDateString()}</p>
    </Link>
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
