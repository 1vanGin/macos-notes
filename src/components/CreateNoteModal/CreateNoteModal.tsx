import "./CreateNoteModal.css";
import React from "react";
import { Modal } from "@mui/material";
import { NoteWorkspace } from "../../containers/NoteWorkspace";

interface ICreateNoteModal {
  open: boolean;
  handleClose: () => void;
}

export const CreateNoteModal: React.FC<ICreateNoteModal> = ({
  open,
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-modal-body">
        <NoteWorkspace fromModal={true} closeModal={handleClose} />
      </div>
    </Modal>
  );
};
