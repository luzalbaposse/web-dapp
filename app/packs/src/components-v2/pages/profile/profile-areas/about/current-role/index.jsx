import React from "react";
import { Container, Dot } from "./styled";
import { TextLink, Typography } from "@talentprotocol/design-system";

export const CurrentRole = ({}) => {
  return (
    <Container>
      <Typography specs={{ type: "regular", variant: "label2" }} color="primary03">
        Product Designer at Talent Protocol
      </Typography>
      <Dot />
      <TextLink color="primary01" size="small" text="View Experience" />
    </Container>
  );
};
