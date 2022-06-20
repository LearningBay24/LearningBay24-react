import React from "react";
import PropTypes from "prop-types";

export function ShowAssignment(props) {
  return (
    <div className="Assignment">
      <div className="AssignmentCourseInfo">
        <p className="AssignmentName">{props.assignname}</p>
        <p className="AssignmentCourse">{props.coursename}</p>
        <p className="AssignmentOwner">{props.owner}</p>
        <p className="AssignmentDegree">{props.subject}</p>
      </div>
      <div className="AssignmentInfo">
        <div className="AssignmentInfoTop">
          <p className="AssignmentDate">{props.created_at}</p>
          <p className="AssignmentTime">{props.time}</p>
          <p className="AssignmentDeadline">{props.deadline}</p>
        </div>
        <div className="AssignmentInfoComment">
          <input type="text" className="AssignmentComment"
            placeholder="Kommentar" value={props.comment} />
        </div>
      </div>
    </div>
    /*
    <div className="Exercise">
      <table>
        <tr>
          <td>
          </td>
          <td>
          </td>
        </tr>
      </table>
    </div>
    */
  );
}
ShowAssignment.propTypes = {
  assignname: PropTypes.string.isRequired,
  coursename: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};
