import { Icon, Typography, Button } from "@talentprotocol/design-system";
import React from "react";
import { Container, TextColumn } from "./styled";

export const CareerUpdateEmptyState = ({ profile }) => {
  return (
    <Container>
      <Icon name="mailbox" size={48} color="primary04" />
      <TextColumn>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          {profile.user.name} doesn't have career updates
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
          Ask for an update
        </Typography>
      </TextColumn>
      <Button
        hierarchy="primary"
        variant=""
        size="medium"
        text="Send message"
        href={`/messages?user=${profile.user.username}`}
      />
    </Container>
  );
};
