export type childrenPropType = {
  children: JSX.Element | JSX.Element[];
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
}
export interface INotesItem {
  id: number;
  text: string;
  time: number;
  title: string;
}
