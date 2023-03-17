import React from "react";
import { Button } from "@talentprotocol/design-system";
import { ActionArea } from "./styled";

export const CreateAccountFooter = ({ previousStep, openCaptchaModal, isNextDisabled }) => (
  <ActionArea>
    <Button size="medium" hierarchy="tertiary" text="Back" onClick={previousStep} />
    <Button
      size="medium"
      hierarchy="primary"
      text="Create account"
      onClick={openCaptchaModal}
      isDisabled={isNextDisabled}
    />
  </ActionArea>
);
