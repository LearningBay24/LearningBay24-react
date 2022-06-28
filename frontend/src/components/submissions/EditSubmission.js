import React, {useState} from "react";
import PropTypes from "prop-types";
import {dateStringToIso} from "../../api/helperfunctions";

export function EditSubmission(props) {
  // let subData = props.submission;
  const [subData, setSubData] = useState(props.submission);

  const changeHandler = (event) => {
    switch (event.target.name) {
      case "submissionName":
        setSubData({...subData, subname: event.target.value});
        props.submission.subname = event.target.value;
        break;
      case "submissionDate":
        setSubData({...subData, deadline: event.target.value});
        props.submission.deadline =
          dateStringToIso(event.target.value);
        break;
    }
  };

  return (
    <div className="Submission">
      <div className="SubmissionCourseInfo">
        <input type="text"
          name="submissionName"
          className="SubmissionNameEdit"
          value={subData.subname}
          onChange={changeHandler}
        ></input>
        <p className="SubmissionCourse">{subData.coursename}</p>
        <p className="SubmissionOwner">{subData.owner}</p>
        <p className="SubmissionDegree">{subData.subject}</p>
      </div>
      <div className="SubmissionInfo">
        <div className="SubmissionInfoTop">
          <p className="SubmissionDate">{subData.createdAt}</p>
          <input type="datetime-local"
            className="SubmissionDateEdit"
            defaultValue={subData.deadline.slice(0, 16)}
            onChange={changeHandler}
            name="submissionDate"></input>
        </div>
        <div className="SubmissionFileSection">
          <input className="SubFileInput"
            type="file" id="fileUpload"
            hidden={props.isAdmin}
          />
          <div className="SubButtonContainer">
            <button className="SubFileUploadButton"
              hidden={props.isAdmin}
            >Hochladen</button>
          </div>
        </div>
      </div>
    </div>
  );
}
EditSubmission.propTypes = {
  submission: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

