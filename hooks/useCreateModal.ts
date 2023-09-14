import React from "react";
import { create } from "zustand";

interface CreateStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateModal = create<CreateStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateModal;
