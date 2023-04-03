import { Icon, Typography, Button } from "@talentprotocol/design-system";
import React from "react";
import { Container, TextColumn } from "./styled";

export const CareerUpdateLockedState = ({ profile }) => {
  return (
    <Container>
      <Icon name="padlock" size={48} color="primary04" />
      <TextColumn>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Unlock career updates
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
          By becoming a subscriber!
        </Typography>
      </TextColumn>
      <Button hierarchy="primary" variant="" size="medium" text="Subscribe" />
    </Container>
  );
};
