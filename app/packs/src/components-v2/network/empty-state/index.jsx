import { Icon, Typography, Button } from "@talentprotocol/design-system";
import React from "react";
import { Container, TextColumn } from "./styled";

export const CareerCircleEmptyState = ({ iconName, title, text, buttonText, buttonUrl }) => {
  return (
    <Container>
      <Icon name={iconName} size={48} color="primary04" />
      <TextColumn>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary04">
          {title}
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
          {text}
        </Typography>
      </TextColumn>
      <Button hierarchy="primary" variant="" size="medium" text={buttonText} href={buttonUrl} />
    </Container>
  );
};
