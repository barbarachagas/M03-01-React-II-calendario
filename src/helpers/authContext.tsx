import React from "react";
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
