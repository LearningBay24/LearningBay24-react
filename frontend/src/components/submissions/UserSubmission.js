import React, {useState} from "react";
import PropTypes from "prop-types";
import "../../css/Submission.css";
import {formatDateString} from "../../api/helperfunctions";

export function UserSubmission(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  // object that contains the submission data
  const subData = props.submission;
  console.log(props.submission);

  return (
    <div className="UserSubmission">
      <div className="SubmissionCourseInfo">
        <p className="SubmissionCourse">{subData.coursename}</p>
        <p className="SubmissionOwner">{subData.owner}</p>
      </div>
      <div className="UserSubmissionInfo">
        <div className="SubmissionInfoTop">
          <p className="SubmissionDeadline">Abgegeben am:
            {formatDateString(subData.submitDate)}</p>
          {isFilePicked ? (
            <div className="SubFileSizeInfo">
              <p className="SubFileSizeText">
                {(selectedFile.size / 1000000).toFixed(2)}MB / 5MB
              </p>
            </div>
          ) : (
            <p>0MB / 5MB</p>
          )}
        </div>
        <div className="UserSubFileSection">
          <input className="SubFileInput"
            type="file" id="fileUpload"
            onChange={changeHandler}
            hidden={props.isAdmin}
          />
          <div className="UserSubFileDiv"
            hidden={!props.isAdmin}>
            <p>Upload des Nutzers</p>
          </div>
          <div className="UserSubGradeDiv">
            <p>Bewertung: </p>
            <p> / 100p</p>
          </div>
        </div>
      </div>
      <div className="UserSubsView">
      </div>
    </div>

  );
}
UserSubmission.propTypes = {
  submission: PropTypes.object,
  isAdmin: PropTypes.bool,
  callback: PropTypes.func,
};
