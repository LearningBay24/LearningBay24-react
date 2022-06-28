import React from "react";
import PropTypes from "prop-types";
import "../../css/Submission.css";
import {formatDateString} from "../../api/helperfunctions";
import {
  createUserSubmissionHasFiles,
  createUserSubmission,
} from "../../api/index";

export function Submission(props) {
  // object that contains the submission data
  // const [fileData, setFileData] = useState();
  const subData = props.submission;
  let file = null;

  const onFileInputChange = (event) => {
    file = event.target.files[0];
  };


  const hochladenOnClick = (event) => {
    if (file == null) {
      alert("Keine Datei angegeben");
      return;
    }
    const newSubmission = {
      // id: ...
      name: subData.subname,
      submission_id: subData.id,
      submission_time: new Date(
          (new Date().getTime() +
          3600000 * 2)).toISOString().split(".")[0]+"Z",
      ignores_deadline: "0",
    };

    // create new usersubmission and send to backend
    createUserSubmission(newSubmission, onCreatedCB);
    alert("Hochladen erfolgreich");
  };

  const onCreatedCB = (id) => {
    if (file != null) {
      createUserSubmissionHasFiles(id, file);
    }
  };

  return (
    <div className="Submission" tabIndex="1">
      <div className="SubmissionCourseInfo">
        <p className="SubmissionName">{subData.subname}</p>
        <p className="SubmissionCourse">{subData.coursename}</p>
        <p className="SubmissionOwner">{subData.owner}</p>
      </div>
      <div className="SubmissionInfo">
        <div className="SubmissionInfoTop">
          <p className="SubmissionDate">{subData.createdAt}</p>
          <p className="SubmissionDeadline">Bis:
            {formatDateString(subData.deadline)}</p>
        </div>
        <div className="SubmissionFileSection">
          <input className="SubFileInput"
            type="file" id="fileUpload"
            onChange={onFileInputChange}
            hidden={props.isAdmin}
          />
          <div className="SubButtonContainer">
            <button className="SubFileUploadButton"
              hidden={props.isAdmin}
              onClick={hochladenOnClick}>
              Hochladen</button>
          </div>
        </div>
      </div>
      <div className="UserSubsView">
      </div>
    </div>
  );
}
Submission.propTypes = {
  submission: PropTypes.object,
  isAdmin: PropTypes.bool,
  callback: PropTypes.func,
};
