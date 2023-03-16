import { Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Container } from "./styled";

export const SuccessStep = () => {
  return (
    <Container>
      <Icon name="success" size={64} />
      <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
        Your password has been successfully reset.
      </Typography>
    </Container>
  );
};
