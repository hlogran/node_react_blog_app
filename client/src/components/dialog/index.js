import React from 'react'
import {
  Dialog as MUDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

function Dialog (props){
  const {
    title,
    text,
    onAccept,
    onCancel,
    open
  } = props;

  return (
    <MUDialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        {text}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onAccept} color="primary">
          Ok
        </Button>
      </DialogActions>
    </MUDialog>
  );
}

export default Dialog;