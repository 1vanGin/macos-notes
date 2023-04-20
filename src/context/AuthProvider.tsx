import { createContext, useContext, useState } from "react";
import { childrenPropType, IAuthProviderValue } from "../interfaces";

const AuthContext = createContext(null);

export function useAuth(): any {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: childrenPropType) {
  const [user, setUser] = useState(() => localStorage.getItem("user") || null);

  const signIn = (newUser: string, callback: () => void) => {
    setUser(newUser);
    localStorage.setItem("user", newUser);
    callback();
  };

  const signOut = (callback: () => void) => {
    setUser(null);
    localStorage.removeItem("user");
    callback();
  };

  const value: IAuthProviderValue = {
    user,
    signIn,
    signOut,
  };

  // @ts-ignore
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
