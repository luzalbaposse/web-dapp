import React from "react";
import { Button } from "@talentprotocol/design-system";
import { ActionArea, RightAlignedActionZone } from "./styled";

export const DefaultFooter = ({ previousStep, nextStep, isNextDisabled, showSkipButton }) => (
  <ActionArea>
    {showSkipButton && <Button size="medium" hierarchy="secondary" text="Skip" onClick={nextStep} />}
    <RightAlignedActionZone>
      <Button size="medium" hierarchy="tertiary" text="Back" onClick={previousStep} />
      <Button size="medium" hierarchy="primary" text="Next" onClick={nextStep} isDisabled={isNextDisabled} />
    </RightAlignedActionZone>
  </ActionArea>
);
