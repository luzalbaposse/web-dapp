import React from "react";
import { Container, InfoGroup } from "./styled";
import { Typography } from "@talentprotocol/design-system";

export const SupportData = ({ subscribers_count, goals_count, updates_count }) => {
  return (
    <Container>
      <InfoGroup>
        <Typography specs={{ type: "bold", variant: "p2" }} color="primary01">
          {subscribers_count}
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
          Subscribers
        </Typography>
      </InfoGroup>
      <InfoGroup>
        <Typography specs={{ type: "bold", variant: "p2" }} color="primary01">
          {goals_count}
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
          Goals
        </Typography>
      </InfoGroup>
      <InfoGroup>
        <Typography specs={{ type: "bold", variant: "p2" }} color="primary01">
          {updates_count}
        </Typography>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary01">
          Updates
        </Typography>
      </InfoGroup>
    </Container>
  );
};
