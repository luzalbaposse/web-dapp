import React from "react";
import { Container } from "./styled";
import { Typography } from "@talentprotocol/design-system";

export const AboutMe = ({}) => {
  return (
    <Container>
      <Typography specs={{ type: "medium", variant: "p1" }} color="primary01">
        About Me
      </Typography>
      <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
        Pedro Pereira is an award-winning Logo Designer and Illustrator with 10+ years of experience designing
        identities for clients around the globe. The 30 Years old Oporto Artist created over 1,000 innovative logos for
        hundreds of clients and received features and claims of experience designing identities for clients around the
        world.
      </Typography>
    </Container>
  );
};
