import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export function ShowConfirmation(props) {
  return (
    <div className="CreateSubDialog">
      <Dialog open={props.open}
        onClose={props.onCloseCallback}
        className="DialogConfirmation">
        <DialogTitle>Hinweis!</DialogTitle>
        <DialogContent className="DConfirmationContent">
          <DialogContentText>
            {props.displayText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              props.onAcceptCallback();
              window.location.reload(false);
              props.onCloseCallback();
            }}
            className="DialogButton">
            Ok</button>
          <button
            onClick={props.onDeclineCallback}
            className="DialogButton">
            Abbrechen</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ShowConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseCallback: PropTypes.func.isRequired,
  displayText: PropTypes.string.isRequired,
  onAcceptCallback: PropTypes.func.isRequired,
  onDeclineCallback: PropTypes.func.isRequired,
};
