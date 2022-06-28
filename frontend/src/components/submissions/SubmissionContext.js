import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {EditSubmission} from "./EditSubmission";
import {ShowConfirmation} from "../DialogComponent";
import {UserSubmission} from "./UserSubmission";
import {EditContext} from "../submissions/EditContext";

import {
  editSubmissionById,
  deleteSubmission,
  // checkFileFromSubmission,
  getUserSubmissionsFromSubmission,
  getUserSubmission,
} from "../../api/index";

import "../../css/Submission.css";


export function SubmissionContext(props) {
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [userSubs, setUserSubs] = useState();
  const [userSub, setUserSub] = useState();
  const [viewUserSubs, setViewUserSubs] = useState(false);
  // const [containsFile, setContainsFile] = useState(false);

  const displayChild = (editMode) ? (
    <EditSubmission submission={props.children.props.submission} />
  ) : (
    props.children
  );

  useEffect(() => {
    // setContainsFile(checkFileFromSubmission(false));
  }, []);

  // this function passes the submission prop to each child
  /*
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      console.log("cloneElem");
      return React.cloneElement(child, { submission: props.submission });
    }
    return child;
  });
  */

  const bearbeitenOnClick = () => {
    if (editMode) {
      // call PATCH to update new data
      const patchObj = {
        name: props.children.props.submission.subname,
        deadline: props.children.props.submission.deadline,
        visible_from: "2022-07-21T00:00:00Z",
        max_filesize: "5",
      };
      editSubmissionById(props.children.props.submission.id, patchObj);
    }
    setEditMode(!editMode);
  };

  const löschenOnClick = () => {
    setDeleteConfirmation(true);
    // window.location.reload(false);
  };

  const userSubsAnzeigenOnClick = () => {
    getUserSubmissionsFromSubmission(
        props.children.props.submission.id, setUserSubsCallback);
    setViewUserSubs(!viewUserSubs);
  };

  const setUserSubsCallback = (data) => {
    setUserSubs(data);
  };

  const userSubDelete = () => {
    setUserSub(null);
  };

  const UserSubslist = [];
  if (userSubs != null && userSubs.length > 0) {
    for (const Sub of userSubs) {
      console.log(Sub);
      UserSubslist.push(<EditContext isAdmin={props.isAdmin}
        deleteCB={userSubDelete}
      >
        <UserSubmission submission={
          {
            id: Sub.id,
            subname: Sub.name,
            coursename: Sub.coursename,
            // owner: this.state.Course.CourseOwner.LastName,
            createdAt: Sub.created_at,
            deadline: Sub.deadline,
            submitDate: Sub.submission_time,
            updateDate: Sub.updated_at,
          }
        }
        isAdmin={props.isAdmin}
        /></EditContext>);
    }
  }

  const userSubAnzeigenOnClick = () => {
    getUserSubmission(
        props.children.props.submission.id, getUserSubCallback);

    setViewUserSubs(!viewUserSubs);
  };


  const getUserSubCallback = (data) => {
    setUserSub(<EditContext isAdmin={props.isAdmin}
      deleteCB={userSubDelete}
    >
      <UserSubmission submission={
        {
          id: data.id,
          subname: data.name,
          coursename: data.coursename,
          // owner: this.state.Course.CourseOwner.LastName,
          createdAt: data.date,
          deadline: data.deadline,
        }
      }
      isAdmin={props.isAdmin}
      /></EditContext>);

    if (data != null) {
      // get file
    }
  };

  const checkUserSubslist = (UserSubslist != null &&
    UserSubslist.length > 0) ? (
    UserSubslist
  ) : (
    <div>
    </div>
  );

  const displayUserSubs = (props.isAdmin) ? (
    checkUserSubslist
  ) : (
    userSub
  );


  const displayButtons = (!props.courseEdit) ? (
    <div className="SubContextButtons">
      <button className="SubButton"
        onClick={userSubAnzeigenOnClick}>
        Nutzerabgabe anzeigen
      </button>
    </div>
  ) : (
    <div className="SubContextButtons">
      {(props.isAdmin) ? (
        <div>
          <button className="SubButton"
            onClick={bearbeitenOnClick}>
            Bearbeiten
          </button>
          <button className="SubButton"
            onClick={löschenOnClick}>
            Löschen
          </button>
          <button className="SubButton"
            onClick={userSubsAnzeigenOnClick}>
            Nutzerabgaben anzeigen
          </button>
        </div>
    ) : (
      <button className="SubButton"
        onClick={userSubAnzeigenOnClick}>
        Nutzerabgabe anzeigen
      </button>
      )}
    </div>
  );

  const displaySubsTitle = (props.isAdmin)? (
    <h2>Nutzerabgaben</h2>
  ) : (
    <h2>Deine Abgabe</h2>
  );

  /*
  const showFile = () => {
    (props.isAdmin) ? (
      (containsFile) ? (
        <p>----</p>
      ) : (
        <input className="SubFileInput"
          type="file" id="fileUpload"
        />
      )
    ) : (
      <button className="SubButton"
        onClick={getFileFromSubmission(
            props.children.props.submission.id,
            props.children.props.submission.subname,
        )}>Herunterladen
      </button>
    );
  };*/

  return (
    <div className="SubContext">
      <div className="SubContextChildren">
        {displayChild}
      </div>
      <div className="SubContextButtonArea">
        {displayButtons}
      </div>
      <div className="UserSubsSection"
        hidden={viewUserSubs}>
        {displaySubsTitle}
        {displayUserSubs}
      </div>

      <ShowConfirmation
        open={deleteConfirmation}
        onCloseCallback={() => {
          setDeleteConfirmation(false);
        }}
        displayText="Sie löschen Abgabe"
        onAcceptCallback={() => {
          deleteSubmission(props.children.props.submission.id);
          setDeleteConfirmation(false);
        }
        }
        onDeclineCallback={() => {
          setDeleteConfirmation(false);
        }}
      />
    </div>
  );
}
SubmissionContext.propTypes = {
  children: PropTypes.any.isRequired,
  courseEdit: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
