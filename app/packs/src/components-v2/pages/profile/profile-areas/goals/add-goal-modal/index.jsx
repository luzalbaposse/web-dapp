import React from "react";
import { noop } from "lodash";
import EditJourneyModal from "src/components/profile/edit/EditJourneyModal";

export const AddGoalModal = ({ isOpen, closeModal }) => {
  return (
    <EditJourneyModal
      show={isOpen}
      hide={closeModal}
      editType="Add"
      selectedItem="Career Goal"
    />
  );
}
