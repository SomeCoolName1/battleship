import React, { createContext, useReducer } from "react";
import reducer from "./ContextReducer";

//Creates context to hold user information
const storage = createContext();

const GameStorage = ({ children }) => {
  const gameInformation = {
    players: {},
    window: "Initial",
    message: "",
    winner: "",
  };

  const [state, dispatch] = useReducer(reducer, gameInformation);

  return (
    <storage.Provider value={{ state, dispatch }}>{children}</storage.Provider>
  );
};

export default GameStorage;
export { storage };
