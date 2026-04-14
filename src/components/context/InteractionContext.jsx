"use client";
import { createContext, useContext, useState } from "react";

const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
  const [interactions, setInteractions] = useState([]);

  const addInteraction = (newAction) => {
    setInteractions((prev) => [newAction, ...prev]);
  };

  return (
    <InteractionContext.Provider value={{ interactions, addInteraction }}>
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteractions = () => useContext(InteractionContext);