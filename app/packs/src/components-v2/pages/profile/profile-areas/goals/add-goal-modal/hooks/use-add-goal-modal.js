import { useCallback } from "react";
import { useState } from "react";

export const useAddGoalModalState = () => {
  const [modalState, setModalState] = useState({ isOpen: false, type: "", item: undefined });
  const openModal = useCallback((type, item) => setModalState({ isOpen: true, type, item }), [setModalState]);
  const closeModal = useCallback(() => setModalState({ isOpen: false, type: "", item: undefined }), [setModalState]);
  return {
    modalState,
    openModal,
    closeModal
  };
};
