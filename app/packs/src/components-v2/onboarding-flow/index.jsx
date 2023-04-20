import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@talentprotocol/design-system";
import { useStepExperience } from "../../hooks/use-step-experience";
import { OccupationStep } from "./steps/occupation";
import { LookingForStep } from "./steps/looking-for";
import { IntroductionStep } from "./steps/introduction";
import { FinishStep } from "./steps/finish";
import { useUserBuilder } from "./hooks/use-user-builder";
import { DefaultFooter } from "./default-footer";
import { ActionContainer, Container, StepContainer, StepCounterContainer } from "./styled";
import { DefineStep } from "./steps/define";

const STEP_TO_COMPONENT_MAP = {
  1: DefineStep,
  2: OccupationStep,
  3: LookingForStep,
  4: IntroductionStep,
  5: FinishStep
};

const CAN_SKIP_STEPS = [2, 3];

export const OnboardingFlow = props => {
  const [isNextDisabled, setIsNextDisable] = useState(true);
  const userBuilderState = useUserBuilder();
  const stepsState = useStepExperience(Object.keys(STEP_TO_COMPONENT_MAP).length);
  const StepScreen = useMemo(() => STEP_TO_COMPONENT_MAP[stepsState.currentStep], [stepsState.currentStep]);
  useEffect(() => {
    setIsNextDisable(true);
  }, [setIsNextDisable, stepsState.currentStep]);
  const MemoizedStep = useMemo(
    () => (
      <StepScreen
        nextStep={stepsState.nextStep}
        setIsNextDisable={setIsNextDisable}
        isNextDisabled={isNextDisabled}
        user={userBuilderState.user}
        setUser={userBuilderState.setUser}
        goToFirstStep={() => stepsState.jumpToStep(props.isDesktop ? 2 : 3)}
      />
    ),
    [stepsState, setIsNextDisable, isNextDisabled, useUserBuilder, props.isDesktop]
  );
  const MemoizedDefaultFooter = useMemo(
    () => (
      <DefaultFooter
        isFirstStep={stepsState.currentStep === 1}
        showSkipButton={CAN_SKIP_STEPS.includes(stepsState.currentStep)}
        previousStep={stepsState.previousStep}
        nextStep={stepsState.nextStep}
        isNextDisabled={isNextDisabled}
      />
    ),
    [stepsState, isNextDisabled, props.isDesktop]
  );
  return (
    <>
      <Container>
        <StepCounterContainer>
          <Typography specs={{ variant: "p2", type: "medium" }} color="primary01">
            Step {stepsState.currentStep}
          </Typography>
          <Typography specs={{ variant: "p2", type: "medium" }} color="primary03">
            /
          </Typography>
          <Typography specs={{ variant: "p2", type: "medium" }} color="primary04">
            4
          </Typography>
        </StepCounterContainer>
        <StepContainer>{MemoizedStep}</StepContainer>
      </Container>
      <ActionContainer>{MemoizedDefaultFooter}</ActionContainer>
    </>
  );
};
