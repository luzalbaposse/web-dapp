import React, { useState, useMemo, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { Typography, Button } from "@talentprotocol/design-system";
import { useStepExperience } from "../../hooks/use-step-experience";
import { SubmissionFormStep } from "./steps/submission-form";
import { CheckEmailStep } from "./steps/check-email";
import { ToastBody } from "src/components/design_system/toasts";
import { users } from "../../api/users";
import { ActionContainer, Container, InnerContainer, StepCounterContainer } from "./styled";

export const ForgotPasswordFlow = () => {
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const stepsState = useStepExperience(2);
  const resendEmailCallback = useCallback(() => {
    users
      .sendResetPasswordEmail(email)
      .then(() => {
        toast.success(<ToastBody heading="Success" />, { autoClose: 5000 });
      })
      .catch(() => {
        toast.error(<ToastBody heading="Something happened" />, { autoClose: 5000 });
      });
  }, [email]);
  const onContinueCallback = useCallback(() => {
    setEmail(emailRef?.current?.value);
    stepsState.nextStep();
  }, [emailRef, setEmail, stepsState]);
  const Step = useMemo(() => {
    if (stepsState.currentStep === 1) {
      return (
        <SubmissionFormStep
          setIsContinueDisabled={setIsContinueDisabled}
          emailRef={emailRef}
          isContinueDisabled={isContinueDisabled}
          onContinueCallback={onContinueCallback}
        />
      );
    } else {
      return <CheckEmailStep email={email} resendEmailCallback={resendEmailCallback} />;
    }
  }, [stepsState.currentStep, email, isContinueDisabled, setIsContinueDisabled]);
  const Footer = useMemo(() => {
    if (stepsState.currentStep === 1) {
      return (
        <ActionContainer>
          <Button hierarchy="tertiary" size="small" text="Return to Login" href="/" />
          <Button
            hierarchy="primary"
            size="small"
            text="Continue"
            onClick={onContinueCallback}
            isDisabled={isContinueDisabled}
          />
        </ActionContainer>
      );
    } else {
      return (
        <ActionContainer>
          <Button hierarchy="tertiary" size="small" text="Resend email" onClick={resendEmailCallback} />
        </ActionContainer>
      );
    }
  }, [stepsState.nextStep, isContinueDisabled]);
  return (
    <Container>
      <InnerContainer>
        <StepCounterContainer>
          <Typography specs={{ variant: "p2", type: "medium" }} color="primary01">
            Step {stepsState.currentStep}
          </Typography>
          <Typography specs={{ variant: "p2", type: "medium" }} color="primary03">
            /
          </Typography>
          <Typography specs={{ variant: "p2", type: "medium" }} color="primary04">
            3
          </Typography>
        </StepCounterContainer>
        {Step}
      </InnerContainer>
      {Footer}
    </Container>
  );
};
