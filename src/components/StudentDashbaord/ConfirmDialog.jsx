import React from 'react';
import { confirmable } from 'react-confirm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmDialog = ({ show, proceed, cancel, title, content, confirmText, cancelText }) => {
  return (
    <Dialog open={show} onClose={cancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary">
          {cancelText || 'Cancel'}
        </Button>
        <Button onClick={proceed} color="primary">
          {confirmText || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default confirmable(ConfirmDialog);
