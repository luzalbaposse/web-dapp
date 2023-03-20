import React, { useMemo, useState } from "react";
import { HowMuchStep } from "./steps/how-much";
import { TransactionStep } from "./steps/transaction";
import { useStepExperience } from "../../../../../../hooks/use-step-experience";
import { Modal } from "@talentprotocol/design-system";

const STEPS = {
  1: HowMuchStep,
  2: TransactionStep
};

export const SponsorModal = ({ modalState, profile }) => {
  const [token, setToken] = useState("USDC");
  const stepsState = useStepExperience(Object.keys(STEPS).length);
  const StepScreen = useMemo(
    () => STEPS[stepsState.currentStep],
    [stepsState.currentStep]
  );
  return (
    <Modal title="Sponsorship" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      {
        <StepScreen profile={profile} token={token} setToken={setToken} />
      }
    </Modal>
  );
};
