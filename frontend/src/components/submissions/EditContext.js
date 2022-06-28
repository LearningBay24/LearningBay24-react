import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {ShowConfirmation} from "../DialogComponent";

import {
  deleteUserSubmission,
  getFileFromUserSubmission,
} from "../../api/index";

import "../../css/Submission.css";


export function EditContext(props) {
  console.log(props);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  // const [containsFile, setContainsFile] = useState(false);

  const displayChild = (props.isAdmin) ? (
    // <EditSubmission submission={props.children.props.submission} />
    props.children
  ) : (
    props.children
  );

  useEffect(() => {
    // setContainsFile(checkFileFromSubmission(false));
  }, []);

  const bewertenOnClick = () => {
  };

  const hochladenOnClick = () => {
  };

  const removeFileOnClick = () => {
  };

  const löschenOnClick = () => {
    setDeleteConfirmation(true);
    // window.location.reload(false);
  };


  const displayButtons = (props.isAdmin) ? (
    <div className="SubContextButtons">
      <button className="SubButton"
        onClick={bewertenOnClick}>
        Bewerten
      </button>
      <button className="SubFileUploadButton"
        onClick={
          getFileFromUserSubmission(props.children.props.submission.id,
              props.children.props.submission.name)
        }>Datei herunterladen</button>
    </div>
  ) : (
    <div className="SubContextButtons">
      <button className="SubButton"
        onClick={hochladenOnClick}>
        Hochladen
      </button>
      <button className="SubButton"
        onClick={removeFileOnClick}>
        Datei entfernen
      </button>
      <button className="SubButton"
        onClick={löschenOnClick}>
        Löschen
      </button>
    </div>
  );


  return (
    <div className="EditContext">
      <div className="SubContextChildren">
        {displayChild}
      </div>
      {displayButtons}

      <ShowConfirmation
        open={deleteConfirmation}
        onCloseCallback={() => {
          setDeleteConfirmation(false);
        }}
        displayText="Sie löschen Abgabe"
        onAcceptCallback={() => {
          deleteUserSubmission(props.children.props.submission.id);
          props.deleteCB();
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
EditContext.propTypes = {
  children: PropTypes.any.isRequired,
  isAdmin: PropTypes.bool,
  deleteCB: PropTypes.func.isRequired,
};
