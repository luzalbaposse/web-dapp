import React from "react";
import { Container, Dot } from "./styled";
import { Icon, TextLink, Typography } from "@talentprotocol/design-system";

export const CurrentRole = ({ position }) => {
  return (
    <Container>
      <Icon name="position-placeholder" size={24} />
      <Typography specs={{ type: "regular", variant: "label2" }} color="primary03">
        {position.title}
      </Typography>
      <Dot />
      <TextLink color="primary01" size="small" text="View Experience" />
    </Container>
  );
};
