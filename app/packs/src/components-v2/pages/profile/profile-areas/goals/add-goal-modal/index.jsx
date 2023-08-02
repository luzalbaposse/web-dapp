import React from "react";
import { noop } from "lodash";
import EditJourneyModal from "src/components/profile/edit/EditJourneyModal";

export const AddGoalModal = ({ modalState, closeModal }) => {
  return (
    modalState.isOpen && (
      <EditJourneyModal
        show={modalState.isOpen}
        hide={closeModal}
        editType={modalState.type}
        skipToNextStepItemName="Goal"
        setJourneyItem={noop}
        journeyItem={{ ...modalState.item, category: "Goal" }}
      />
    )
  );
};
