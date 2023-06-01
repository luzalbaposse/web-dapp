import React from "react";
import { Container, ScoreRow } from "./styled";
import { Icon, Typography } from "@talentprotocol/design-system";

export const ScoreBoard = ({ children, points }) => {
  return (
    <Container>
      <ScoreRow>
        <Icon name="flash" color="primary" size={24} />
        <Typography specs={{ variant: "h3", type: "bold" }} color="primary01">
          {points} XP
        </Typography>
      </ScoreRow>
      {children}
    </Container>
  );
};
