import React from "react";
import { create } from "zustand";

interface CardStoreProps {
  id: string;
  setId: (id: string) => void;
}

const useCard  = create<CardStoreProps>((set) => ({
  id: "",
  setId: (id) => set({ id: id }),
}));

export default useCard;
