import React from "react";
import { Container } from "./styled";
import { Typography } from "@talentprotocol/design-system";

export const AboutMe = ({ bio }) => {
  return (
    <Container>
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        About Me
      </Typography>
      <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
        {bio}
      </Typography>
    </Container>
  );
};
