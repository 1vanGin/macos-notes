import "./SidebarListItem.css";
import React from "react";
import { INotesItem } from "../../interfaces";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import { Links } from "../../enums";
interface ISidebarListItemProps {
  item: INotesItem;
}
export const SidebarListItem: React.FC<ISidebarListItemProps> = ({ item }) => {
  let date: string = format(new Date(item.time), "dd.MM.yyyy HH:mm");

  return (
    <NavLink to={`${Links.tableLink}/${item.id}`}>
      <li className="sidebar__list-item">
        <div className="sidebar__list-item__title">
          <b>{item.title}</b>
        </div>

        <div className="sidebar__list-item__text">
          {item.text
            .replaceAll("\\n", "\n")
            .replace(/[^a-zа-яё0-9\s]/gi, " ")
            .trim()}
        </div>
        <div className="sidebar__list-item__time">{date}</div>
      </li>
    </NavLink>
  );
};
