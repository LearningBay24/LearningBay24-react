import React from "react";
import PropTypes from "prop-types";

export function ShowCourse(props) {
  return (
    <div onClick={() => {
      props.callback(props.id);
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
  id: PropTypes.number,
  description: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  // owner: PropTypes.string.isRequired,
  callback: PropTypes.func,
};
