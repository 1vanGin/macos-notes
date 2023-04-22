import { ReactNode } from "react";

export type childrenPropType = {
  children: JSX.Element | JSX.Element[] | ReactNode;
};

export type workspaceStateType = "show" | "edit";

export interface IAuthProviderValue {
  user: string | null;
  signIn: (newUser: string, callback: () => void) => void;
  signOut: (callback: () => void) => void;
}

export interface INotesDB {
  notes: INotesItem[];
  loading: boolean;
  addNote: (value: string) => void;
  deleteNote: (id: number) => void;
  updateNote: (id: number, text: string) => void;
}
export interface INotesItem {
  id: number;
  text: string;
  time: number;
  title: string;
}

export interface IUseTimeout {
  reset: () => void;
  clear: () => void;
}
