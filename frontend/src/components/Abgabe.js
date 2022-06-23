import React, {useState} from "react";
import PropTypes from "prop-types";
import {formatDateString} from "../api/helperfunctions";

export function ShowSubmission(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const commentChange = (event) => {
  };

  const handleSubmission = () => {
  };

  return (
    <div className="Submission" tabIndex="1">
      <div className="SubmissionCourseInfo">
        <p className="SubmissionName">{props.submissionname}</p>
        <p className="SubmissionCourse">{props.coursename}</p>
        <p className="SubmissionOwner">{props.owner}</p>
        <p className="SubmissionDegree">{props.subject}</p>
        <label htmlFor="SubmissionInfoFile">
          Aufabenblatt:</label>
        {props.fileLink? (
          <button id="SubmissionInfoFile">Öffnen</button>
        ) : (
          <p>-</p>
        )}
      </div>
      <div className="SubmissionInfo">
        <div className="SubmissionInfoTop">
          <p className="SubmissionDate">{props.created_at}</p>
          <p className="SubmissionDeadline">Bis:
            {formatDateString(props.deadline)}</p>
          {isFilePicked ? (
            <div className="SubFileSizeInfo">
              <p className="SubFileSizeText">
                {(selectedFile.size / 1000000).toFixed(2)}MB / 5MB
              </p>
              {console.log(selectedFile)}
            </div>
          ) : (
            <p>0MB / 5MB</p>
          )}
        </div>
        <div className="SubmissionInfoComment">
          <label htmlFor="SubCommentInput">
            Kommentar</label>
          <input id="SubCommentInput"
            type="text"
            placeholder="Kommentar"
            value={props.comment} onChange={commentChange}/>
        </div>
        <div className="SubmissionFileSection">
          <input className="SubFileInput"
            type="file" id="fileUpload"
            onChange={changeHandler} multiple/>
          <div className="SubButtonContainer">
            <button className="SubFileUploadButton"
              onClick={handleSubmission}>Hochladen</button>
          </div>
        </div>
      </div>
    </div>
  );
}
ShowSubmission.propTypes = {
  submissionname: PropTypes.string.isRequired,
  coursename: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  subject: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  comment: PropTypes.string,
  fileLink: PropTypes.string,
};


export function ShowSubmissionEdit(props) {
  const [submissionName, setAssignName] = useState(props.submissionname);
  const [submissionDate, setAssignDate] = useState(props.deadline);
  const submissionId = props.id;

  const changeHandler = (event) => {
    switch (event.target.name) {
      case "submissionName":
        setAssignName(event.target.value);
        props.callback(submissionId);
        break;
      case "submissionDate":
        setAssignDate(event.target.value);
        props.callback(submissionId);
        break;
    }
  };


  return (
    <div className="Submission" tabIndex="1"
      onClick={() => {
        props.state.setState({FocusedSubId: submissionId});
      }}>
      <div className="SubmissionCourseInfo">
        <input type="text"
          className="SubmissionNameEdit"
          value={submissionName} onChange={changeHandler}
          name="submissionName"></input>
        <p className="SubmissionCourse">{props.coursename}</p>
        <p className="SubmissionOwner">{props.owner}</p>
        <p className="SubmissionDegree">{props.subject}</p>
      </div>
      <div className="SubmissionInfo">
        <div className="SubmissionInfoTop">
          <p className="SubmissionDate">{props.created_at}</p>
          <input type="text"
            className="SubmissionDateEdit"
            value={submissionDate} onChange={changeHandler}
            name="submissionDate"></input>
        </div>
      </div>
    </div>
  );
}
ShowSubmissionEdit.propTypes = {
  id: PropTypes.number.isRequired,
  submissionname: PropTypes.string.isRequired,
  coursename: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  subject: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  comment: PropTypes.string,
  callback: PropTypes.func,
  state: PropTypes.object.isRequired,
};
