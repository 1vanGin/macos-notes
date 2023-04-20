import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Backdrop, CircularProgress } from "@mui/material";
import { useFirebaseDB } from "../../hooks/useFirebaseDB";
import { useNavigate, useParams } from "react-router-dom";

interface IDeleteDialog {
  open: boolean;
  handleClose: (event: any) => void;
  title: string;
  notesId: number;
}

export const CustomDialog: React.FC<IDeleteDialog> = ({
  title,
  notesId,
  open,
  handleClose,
}) => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const { deleteNote } = useFirebaseDB();
  const { id } = useParams();
  const navigate = useNavigate();
  const yes = (event: any) => {
    event.preventDefault();
    setShowBackdrop(true);

    deleteNote(notesId);

    setShowBackdrop(false);
    handleClose(event);

    if (Number(id) === notesId) {
      navigate("/", {
        replace: true,
      });
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={(event) => handleClose(event)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={(e) => yes(e)} autoFocus>
            Да
          </Button>
          <Button onClick={handleClose}>Нет</Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10000 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
