import React from "react";
import { Button } from "@talentprotocol/design-system";
import { ActionArea } from "./styled";

export const EmailFooter = () => (
  <ActionArea>
    <Button size="small" hierarchy="tertiary" text="Resend email" />
    <Button size="small" hierarchy="primary" text="Go to mail app" />
  </ActionArea>
);
