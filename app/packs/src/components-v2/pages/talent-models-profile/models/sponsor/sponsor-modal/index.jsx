import React, { useMemo, useState } from "react";
import { HowMuchStep } from "./steps/how-much";
import { TransactionStep } from "./steps/transaction";
import { useStepExperience } from "../../../../../../hooks/use-step-experience";
import { Modal } from "@talentprotocol/design-system";

const STEPS = {
  1: HowMuchStep,
  2: TransactionStep
};

export const SponsorModal = ({ modalState, profile, railsContext, close }) => {
  const [token, setToken] = useState("CUSD");
  const [amount, setAmount] = useState(0);
  const stepsState = useStepExperience(Object.keys(STEPS).length);
  const StepScreen = useMemo(() => STEPS[stepsState.currentStep], [stepsState.currentStep]);
  return (
    <Modal title="Sponsorship" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      {
        <StepScreen
          profile={profile}
          token={token}
          setToken={setToken}
          railsContext={railsContext}
          close={close}
          nextStep={() => stepsState.nextStep()}
          amount={amount}
          setAmount={setAmount}
        />
      }
    </Modal>
  );
};
