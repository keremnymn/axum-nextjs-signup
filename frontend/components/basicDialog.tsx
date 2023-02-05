import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Dialog,
  Button
} from "@mui/material";

import { useRouter } from 'next/router';
import { dialogContent } from "../src/types";

export default function AgreeDialog({
  message,
  setDialog,
}: {
  message: dialogContent;
  setDialog: Function;
}) {
  const router = useRouter();

  const handleClose = () => {
    switch (message.notClosable) {
      case true: // pass
        break;
      default:
        if (message.navigate) {
          router.push(message.navigate);
        }
        setDialog({ ...message, dialogOpen: false });
        break;
    }
  };
  const forceClose = () => {
    if (message.defaultButton?.func) {
      message.defaultButton.func();
    }
    setDialog({ ...message, dialogOpen: false });
  };
  return (
    <Dialog
      open={message.dialogOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message.title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span dangerouslySetInnerHTML={{ __html: message.text! }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={message.notClosable ? forceClose : handleClose}
          autoFocus
        >
          {message.defaultButton
            ? message.defaultButton.buttonText
            : "I Understand"}
        </Button>
        {message.extraButton && (
          <Button onClick={message.extraButton?.func}>
            {" "}
            {message.extraButton.buttonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}