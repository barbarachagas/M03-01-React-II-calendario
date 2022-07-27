import React, { useContext } from "react";
import { IUser } from "../app/backend";

export interface IAuthContext {
  user: IUser;
  onSingOut: () => void;
}

export const authContext = React.createContext<IAuthContext>({
  user: {
    name: "Anônimo",
    email: "",
  },
  onSingOut: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}
