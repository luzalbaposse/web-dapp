import React from "react";
import { Container, Dot, IconContainer, StyledImage } from "./styled";
import { Icon, TextLink, Typography } from "@talentprotocol/design-system";

export const CurrentRole = ({ position, username, isOwner }) => {
  if (!position && !isOwner) return <></>;
  return (
    <Container>
      {position?.title && (
        <>
          {position.images.length ? (
            <StyledImage src={position.images[0].image_url} />
          ) : (
            <IconContainer>
              <Icon name={position.category === "Position" ? "tool-box" : "learn"} size={14} />
            </IconContainer>
          )}
          <Typography specs={{ type: "regular", variant: "label2" }} color="primary03">
            {position.title}
          </Typography>
          <Dot />
          <TextLink color="primary01" size="small" text="View Experiences" href={`/u/${username}/settings`} />
        </>
      )}
      {!position?.title && isOwner && (
          <TextLink color="primary01" size="small" text="Add Experiences" href={`/u/${username}/settings`} leftIcon="add"/>)}
    </Container>
  );
};
