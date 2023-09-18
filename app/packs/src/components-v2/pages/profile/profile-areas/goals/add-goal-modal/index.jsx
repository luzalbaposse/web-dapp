import React from "react";
import { noop } from "lodash";
import EditJourneyModal from "src/components/profile/edit/EditJourneyModal";

export const AddGoalModal = ({ modalState, closeModal, talent, activeElection }) => {
  return (
    modalState.isOpen && (
      <EditJourneyModal
        show={modalState.isOpen}
        hide={closeModal}
        editType={modalState.type}
        skipToNextStepItemName="Career Goal"
        setJourneyItem={noop}
        journeyItem={{ ...modalState.item, category: "Career Goal" }}
        hideBackButton={true}
        talent={talent}
        setTalent={() => window.location.reload()}
        activeElection={activeElection}
      />
    )
  );
};
