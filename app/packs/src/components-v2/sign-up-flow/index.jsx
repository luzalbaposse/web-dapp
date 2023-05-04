import React, { useEffect, useMemo, useState } from "react";
import { ModalDialog, Typography, useModal } from "@talentprotocol/design-system";
import { useStepExperience } from "../../hooks/use-step-experience";
import { EmailPasswordStep } from "./steps/email-password";
import { WelcomeStep } from "./steps/welcome";
import { LegalNameStep } from "./steps/legal-name";
import { HandleStep } from "./steps/handle";
import { DefineStep } from "./steps/define";
import { OccupationStep } from "./steps/occupation";
import { LookingForStep } from "./steps/looking-for";
import { IntroductionStep } from "./steps/introduction";
import { ConfirmEmailStep } from "./steps/confirm-email";
import { useUserBuilder } from "./hooks/use-user-builder";
import { WelcomeFooter } from "./welcome-footer";
import { CreateAccountFooter } from "./create-account-footer";
import { DefaultFooter } from "./default-footer";
import { ActionContainer, Container, StepContainer, StepCounterContainer } from "./styled";
import { EmailFooter } from "./email-footer";
import { Captcha } from "./steps/captcha";
import { OnBoardFlow } from "../on-board-flow";

const STEP_TO_COMPONENT_MAP = isDesktop =>
  isDesktop
    ? {
        1: WelcomeStep,
        2: EmailPasswordStep,
        3: LegalNameStep,
        4: HandleStep,
        5: DefineStep,
        6: OccupationStep,
        7: LookingForStep,
        8: IntroductionStep,
        9: ConfirmEmailStep
      }
    : {
        1: OnBoardFlow,
        2: WelcomeStep,
        3: EmailPasswordStep,
        4: LegalNameStep,
        5: HandleStep,
        6: DefineStep,
        7: OccupationStep,
        8: LookingForStep,
        9: IntroductionStep,
        10: ConfirmEmailStep
      };

const CAN_SKIP_STEPS_DESKTOP = [5, 6, 7];
const CAN_SKIP_STEPS_MOBILE = [6, 7, 8];

export const SignUpFlow = props => {
  const captchaModalState = useModal();
  const { linkedinClientId, linkedinRedirectUri } = props.railsContext;
  const [linkedinRedirectWithCode, setLinkedinRedirectWithCode] = useState(linkedinRedirectUri);
  const [isNextDisabled, setIsNextDisable] = useState(true);
  const [hasCreateAccountError, setHasCreateAccountError] = useState(false);
  const [createdUser, setCreatedUser] = useState({});
  const userBuilderState = useUserBuilder();

  useEffect(() => {
    if (props.code == userBuilderState.user.code && props.utmSource == userBuilderState.user.utmSource) return;
    userBuilderState.setUser({
      ...userBuilderState.user,
      code: props.code,
      utmSource: props.utmSource
    });

    setLinkedinRedirectWithCode(`${linkedinRedirectUri}?invite_code=${props.code}&utm_source=${props.utmSource}`);
  }, [props.code, props.utmSource, userBuilderState]);
  const stepsState = useStepExperience(Object.keys(STEP_TO_COMPONENT_MAP(props.isDesktop)).length);
  const StepScreen = useMemo(
    () => STEP_TO_COMPONENT_MAP(props.isDesktop)[stepsState.currentStep],
    [stepsState.currentStep]
  );
  useEffect(() => {
    setIsNextDisable(true);
  }, [setIsNextDisable, stepsState.currentStep]);
  const MemoizedStep = useMemo(
    () => (
      <StepScreen
        openCaptchaModal={captchaModalState.openModal}
        nextStep={stepsState.nextStep}
        setIsNextDisable={setIsNextDisable}
        isNextDisabled={isNextDisabled}
        user={userBuilderState.user}
        setUser={userBuilderState.setUser}
        linkedinClientId={linkedinClientId}
        linkedinRedirectUri={linkedinRedirectWithCode}
        setHasCreateAccountError={setHasCreateAccountError}
        setCreatedUser={setCreatedUser}
        inviteProps={{
          name: props.name,
          profilePictureUrl: props.profilePictureUrl,
          inviteCode: props.inviteCode
        }}
        goToFirstStep={() => stepsState.jumpToStep(props.isDesktop ? 2 : 3)}
      />
    ),
    [
      captchaModalState,
      stepsState,
      setIsNextDisable,
      isNextDisabled,
      useUserBuilder,
      linkedinClientId,
      linkedinRedirectWithCode,
      props.name,
      props.profilePictureUrl,
      props.inviteCode,
      props.isDesktop
    ]
  );
  const MemoizedDefaultFooter = useMemo(
    () => (
      <DefaultFooter
        showSkipButton={
          props.isDesktop
            ? CAN_SKIP_STEPS_DESKTOP.includes(stepsState.currentStep)
            : CAN_SKIP_STEPS_MOBILE.includes(stepsState.currentStep)
        }
        previousStep={stepsState.previousStep}
        nextStep={stepsState.nextStep}
        isNextDisabled={isNextDisabled}
      />
    ),
    [stepsState, isNextDisabled, props.isDesktop]
  );
  const MemoizedActionArea = useMemo(() => {
    switch (stepsState.currentStep) {
      case 1:
        return !props.isDesktop ? <></> : <WelcomeFooter />;
      case 2:
        return !props.isDesktop ? <WelcomeFooter /> : MemoizedDefaultFooter;
      case 8:
        return !props.isDesktop ? (
          MemoizedDefaultFooter
        ) : (
          <CreateAccountFooter
            previousStep={stepsState.previousStep}
            openCaptchaModal={captchaModalState.openModal}
            isNextDisabled={isNextDisabled}
          />
        );
      case 9:
        return !props.isDesktop ? (
          <CreateAccountFooter
            previousStep={stepsState.previousStep}
            openCaptchaModal={captchaModalState.openModal}
            isNextDisabled={isNextDisabled}
          />
        ) : (
          <EmailFooter hasCreateAccountError={hasCreateAccountError} createdUser={createdUser} />
        );
      case 10:
        return <EmailFooter hasCreateAccountError={hasCreateAccountError} createdUser={createdUser} />;
      default:
        return MemoizedDefaultFooter;
    }
  }, [stepsState.currentStep, isNextDisabled, props.isDesktop, hasCreateAccountError, createdUser]);
  return (
    <>
      <ModalDialog title="Captcha" isOpen={captchaModalState.isOpen} closeModal={captchaModalState.closeModal}>
        <Captcha
          captchaKey={props.railsContext.captchaKey}
          nextStep={stepsState.nextStep}
          user={userBuilderState.user}
          setUser={userBuilderState.setUser}
          closeModal={captchaModalState.closeModal}
        />
      </ModalDialog>
      <Container>
        {(!props.isDesktop && stepsState.currentStep === 1) ||
        stepsState.currentStep === 10 ||
        (props.isDesktop && stepsState.currentStep === 9) ? (
          <></>
        ) : (
          <StepCounterContainer>
            <Typography specs={{ variant: "p2", type: "medium" }} color="primary01">
              Step {!props.isDesktop ? stepsState.currentStep - 1 : stepsState.currentStep}
            </Typography>
            <Typography specs={{ variant: "p2", type: "medium" }} color="primary03">
              /
            </Typography>
            <Typography specs={{ variant: "p2", type: "medium" }} color="primary04">
              9
            </Typography>
          </StepCounterContainer>
        )}
        {stepsState.currentStep === 1 || stepsState.currentStep === 10 ? (
          MemoizedStep
        ) : (
          <StepContainer>{MemoizedStep}</StepContainer>
        )}
      </Container>
      <ActionContainer>{MemoizedActionArea}</ActionContainer>
    </>
  );
};
