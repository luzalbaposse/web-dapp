import React, { useCallback, useMemo, useState } from "react";
import { HowMuchStep } from "./steps/how-much";
import { TransactionStep } from "./steps/transaction";
import { useStepExperience } from "../../../../../../hooks/use-step-experience";
import { Modal } from "@talentprotocol/design-system";
import { SuccessStep } from "./steps/success";

const STEPS = {
  1: HowMuchStep,
  2: TransactionStep,
  3: SuccessStep
};

export const SponsorModal = ({ modalState, profile, railsContext }) => {
  const [token, setToken] = useState("cUSD");
  const [amount, setAmount] = useState(0);
  const stepsState = useStepExperience(Object.keys(STEPS).length);
  const StepScreen = useMemo(() => STEPS[stepsState.currentStep], [stepsState.currentStep]);
  const closeModal = useCallback(() => {
    modalState.closeModal();
    stepsState.jumpToStep(1);
  }, [modalState.closeModal, stepsState.jumpToStep]);
  return (
    <Modal title="Sponsorship" isOpen={modalState.isOpen} closeModal={closeModal}>
      {
        <StepScreen
          profile={profile}
          token={token}
          setToken={setToken}
          railsContext={railsContext}
          closeModal={closeModal}
          nextStep={stepsState.nextStep}
          amount={amount}
          setAmount={setAmount}
        />
      }
    </Modal>
  );
};
