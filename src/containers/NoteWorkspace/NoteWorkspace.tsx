import "./NoteWorkspace.css";
import "easymde/dist/easymde.min.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SimpleMdeReact } from "react-simplemde-editor";
import ReactMarkdown from "react-markdown";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { INotesItem, workspaceStateType } from "../../interfaces";
import { CustomDialog } from "../../components/CustomDialog/";
import { useParams } from "react-router-dom";
import { useFirebaseDB } from "../../hooks/useFirebaseDB";
import { useDebounce } from "../../hooks/useDebounce";

interface INoteWorkspace {
  fromModal?: boolean;
  closeModal?: () => void;
}

export const NoteWorkspace: React.FC<INoteWorkspace> = ({
  fromModal = false,
  closeModal,
}) => {
  const { id } = useParams();
  if (!id && !fromModal) {
    return <div className="workspace">Выберите заметку</div>;
  }

  const { notes, loading, addNote, updateNote } = useFirebaseDB();
  const [value, setValue] = useState("");
  const [state, setState] = useState<workspaceStateType>(
    fromModal ? "edit" : "show"
  );
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (notes?.length) {
      const currentNote: INotesItem = notes.filter(
        (note) => note.id === Number(id)
      )[0];

      if (!!id && !loading) {
        setValue(currentNote?.text.replaceAll("\\n", "\n"));
      }
    }
  }, [id, notes]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleAddNote = () => {
    if (value !== "") {
      addNote(value);
      setValue("");
      closeModal && closeModal();
    }
  };

  const mdeOptions = useMemo(() => {
    return {
      maxHeight: "500px",
      nativeSpellcheck: false,
    };
  }, []);

  useDebounce(
    () => {
      if (id && state === "edit" && !fromModal) updateNote(Number(id), value);
    },
    3000,
    [value]
  );

  return (
    <div className="workspace">
      <div className="workspace__buttons-wrapper">
        <Button
          onClick={() => setState("show")}
          variant={state === "show" ? "contained" : "outlined"}
        >
          <VisibilityIcon />
        </Button>
        <Button
          onClick={() => setState("edit")}
          variant={state === "edit" ? "contained" : "outlined"}
        >
          <EditIcon />
        </Button>
        {!fromModal && (
          <Button onClick={handleClickOpen} variant="outlined">
            <DeleteIcon />
          </Button>
        )}
        {fromModal && (
          <Button
            onClick={handleAddNote}
            sx={{ ml: "auto" }}
            variant="contained"
          >
            Создать
          </Button>
        )}
      </div>

      {state === "show" ? (
        <ReactMarkdown className="react-markdown">{value}</ReactMarkdown>
      ) : (
        <SimpleMdeReact
          id="note-workspace"
          value={value}
          onChange={onChange}
          options={mdeOptions}
        />
      )}
      <CustomDialog
        title="Вы действительно хотите удалить заметку?"
        open={openDialog}
        handleClose={handleClose}
        notesId={Number(id)}
      />
    </div>
  );
};
