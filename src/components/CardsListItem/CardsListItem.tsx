import "./CardsListItem.css";
import React, { useState } from "react";
import { INotesItem } from "../../interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { format } from "date-fns";
import { CustomDialog } from "../CustomDialog";
import { NavLink } from "react-router-dom";
import { Links } from "../../enums";

interface ICardListItemProps {
  item: INotesItem;
}

export const CardsListItem: React.FC<ICardListItemProps> = ({ item }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = (event: any) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  const handleClose = (event: any) => {
    event.preventDefault();
    setOpenDialog(false);
  };

  let date: string = format(new Date(item.time), "dd.MM.yyyy HH:mm");

  return (
    <NavLink to={`${Links.tableLink}/${item.id}`}>
      <div className="cards__list-item">
        <div className="cards__list-body">
          <div className="cards__list-item__title">
            <b>{item.title}</b>
          </div>
          <div className="cards__list-item__text">
            {item.text
              .replaceAll("\\n", "\n")
              .replace(/[^a-zа-яё0-9\s]/gi, " ")
              .trim()}
          </div>
        </div>
        <div className="cards__list-footer">
          <div className="cards__list-item__time">{date}</div>
          <IconButton
            onClick={handleClickOpen}
            color="primary"
            aria-label="delete"
            size="small"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>

      <CustomDialog
        title="Вы действительно хотите удалить заметку?"
        open={openDialog}
        handleClose={(event) => handleClose(event)}
        notesId={item.id}
      />
    </NavLink>
  );
};
