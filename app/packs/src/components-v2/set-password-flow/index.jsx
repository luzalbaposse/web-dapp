import React, { useState, useMemo, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { Typography, Button } from "@talentprotocol/design-system";
import { useStepExperience } from "../../hooks/use-step-experience";
import { SetPasswordStep } from "./steps/set-password";
import { SuccessStep } from "./steps/success";
import { ToastBody } from "src/components/design_system/toasts";
import { users } from "../../api/users";
import { ActionContainer, Container, InnerContainer, StepCounterContainer } from "./styled";

export const SetPasswordFLow = props => {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const stepsState = useStepExperience(2);
  const Step = useMemo(() => {
    if (stepsState.currentStep === 1) {
      return (
        <SetPasswordStep
          isContinueDisabled={isContinueDisabled}
          resetPasswordCallback={resetPasswordCallback}
          setIsContinueDisabled={setIsContinueDisabled}
          passwordRef={passwordRef}
          confirmPasswordRef={confirmPasswordRef}
        />
      );
    } else {
      return <SuccessStep />;
    }
  }, [stepsState.currentStep, passwordRef, confirmPasswordRef, setIsContinueDisabled]);
  const resetPasswordCallback = useCallback(() => {
    const password = passwordRef.current.value;
    users
      .resetPassword(props.userId, props.token, password)
      .then(() => {
        stepsState.nextStep();
      })
      .catch(() => {
        toast.error(<ToastBody title="Error"/>);
      });
  }, [passwordRef, stepsState.nextStep, props.userId, props.token]);
  const Footer = useMemo(() => {
    if (stepsState.currentStep === 1) {
      return (
        <ActionContainer>
          <Button hierarchy="tertiary" size="small" text="Return to Login" href="/" />
          <Button
            hierarchy="primary"
            size="small"
            text="Reset password"
            onClick={resetPasswordCallback}
            isDisabled={isContinueDisabled}
          />
        </ActionContainer>
      );
    } else {
      return (
        <ActionContainer>
          <Button hierarchy="primary" size="small" text="Return to Login" href="/" />
        </ActionContainer>
      );
    }
  }, [stepsState.nextStep, isContinueDisabled, resetPasswordCallback]);
  return (
    <Container>
      <InnerContainer>
        {stepsState.currentStep === 1 && (
          <StepCounterContainer>
            <Typography specs={{ variant: "p2", type: "medium" }} color="primary01">
              Step 3
            </Typography>
            <Typography specs={{ variant: "p2", type: "medium" }} color="primary03">
              /
            </Typography>
            <Typography specs={{ variant: "p2", type: "medium" }} color="primary04">
              3
            </Typography>
          </StepCounterContainer>
        )}
        {Step}
      </InnerContainer>
      {Footer}
    </Container>
  );
};
