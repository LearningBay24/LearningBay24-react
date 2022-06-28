import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {formatDateString} from "../../api/helperfunctions";
import {
  createUserSubmission,
} from "../../api/index";

export function ShowSubmission(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  /*
  const [userSubs, setUserSubs] = useState([]);
  const [userSubsDisplay, setUserSubsDisplay] = useState([]);
  */

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const commentChange = (event) => {
  };

  const handleSubmission = () => {
    const newSubmission = {
      // id: ...
      name: props.submissionname,
      submission_id: props.id,
      submission_time: new Date(
          (new Date().getTime() +
          3600000 * 2)).toISOString().split(".")[0]+"Z",
      ignores_deadline: "0",
    };
    console.log(newSubmission);

    // create new usersubmission and send to backend
    createUserSubmission(newSubmission);
  };

  return (
    <div className="Submission" tabIndex="1"
      onClick={ () => {
        if (props.isAdmin) {
          props.callback(props.id);
        }
        // console.log(props.id);
      }
      }>
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
            onChange={changeHandler}
            hidden={props.isAdmin}
          />
          <div className="SubButtonContainer">
            <button className="SubFileUploadButton"
              onClick={handleSubmission}
              hidden={props.isAdmin}>Hochladen</button>
          </div>
        </div>
      </div>
      <div className="UserSubsView">
      </div>
    </div>
  );
}
ShowSubmission.propTypes = {
  id: PropTypes.number.isRequired,
  submissionname: PropTypes.string.isRequired,
  coursename: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  subject: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  comment: PropTypes.string,
  fileLink: PropTypes.string,
  isAdmin: PropTypes.bool,
  callback: PropTypes.func,
};


export function ShowSubmissionEdit(props) {
  const [submissionName, setAssignName] = useState("");
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

  useEffect(() => {
    if (submissionName == "") {
      setAssignName(props.submissionname);
    }
    if (submissionDate == "") {
      setAssignDate(props.deadline);
    }
  });

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
  deadline: PropTypes.string.isRequired,
  comment: PropTypes.string,
  callback: PropTypes.func,
  state: PropTypes.object.isRequired,
};


export function ShowUserSubmission(props) {
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
    <div className="Submission" tabIndex="1"
      onClick={props.callback}>
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
            onChange={changeHandler}/>
          {props.isAdmin? (
            <input type="number"
              className="GradeInput"></input>
          ) : (
            <p>{props.grade}</p>
          )}
          <p> / 100</p>
          <div className="SubButtonContainer">
            <button className="SubFileUploadButton"
              onClick={handleSubmission}>Hochladen</button>
          </div>
        </div>
      </div>
    </div>
  );
}
ShowUserSubmission.propTypes = {
  submissionname: PropTypes.string.isRequired,
  coursename: PropTypes.string,
  owner: PropTypes.string,
  subject: PropTypes.string,
  created_at: PropTypes.string,
  deadline: PropTypes.string,
  comment: PropTypes.string,
  fileLink: PropTypes.string,
  grade: PropTypes.number,
  isAdmin: PropTypes.bool,
  callback: PropTypes.func.isRequired,
};


