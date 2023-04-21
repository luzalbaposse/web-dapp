import React from "react";
import { Button } from "@talentprotocol/design-system";
import { ActionArea, RightActionZone } from "./styled";

export const DefaultFooter = ({ previousStep, nextStep, isNextDisabled, showSkipButton, isFirstStep }) => (
  <ActionArea>
    {showSkipButton && <Button size="medium" hierarchy="secondary" text="Skip" onClick={nextStep} />}
    <RightActionZone>
      {!isFirstStep && <Button size="medium" hierarchy="tertiary" text="Back" onClick={previousStep} />}
      <Button size="medium" hierarchy="primary" text="Next" onClick={nextStep} isDisabled={isNextDisabled} />
    </RightActionZone>
  </ActionArea>
);
