import React from "react";
import { Container, Dot, IconContainer, StyledImage } from "./styled";
import { Icon, TextLink, Typography } from "@talentprotocol/design-system";

export const CurrentRole = ({ position, username }) => {
  return (
    <Container>
      {position.images.length ? (
        <StyledImage src={position.images[0].image_url} />
      ) : (
        <IconContainer>
          <Icon name="tool-box" size={14} />
        </IconContainer>
      )}
      <Typography specs={{ type: "regular", variant: "label2" }} color="primary03">
        {position.title}
      </Typography>
      <Dot />
      <TextLink color="primary01" size="small" text="View Experience" href={`/u/${username}/settings`} />
    </Container>
  );
};
