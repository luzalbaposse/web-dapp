import React from "react";
import { Container, InfoGroup } from "./styled";
import { Typography } from "@talentprotocol/design-system";

export const SupportData = ({}) => {
  return (
    <Container>
      <InfoGroup>
        <Typography specs={{ type: "bold", variant: "p2" }} color="primary01">
          63
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
          Subscribers
        </Typography>
      </InfoGroup>
      <InfoGroup>
        <Typography specs={{ type: "bold", variant: "p2" }} color="primary01">
          13
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
          Goals
        </Typography>
      </InfoGroup>
      <InfoGroup>
        <Typography specs={{ type: "bold", variant: "p2" }} color="primary01">
          2
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
          Updates
        </Typography>
      </InfoGroup>
    </Container>
  );
};
