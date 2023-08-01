import { useCallback } from "react";
import { useState } from "react";

export const useAddGoalModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  return {
    isOpen,
    openModal,
    closeModal
  };
}
