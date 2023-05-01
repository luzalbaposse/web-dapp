import React from "react";
import { Container, InnerContainer } from "./styled";
import { Avatar, TextLink, Typography } from "@talentprotocol/design-system";

export const GmHeader = ({ profile }) => {
  return profile ? (
    <Container>
      <Avatar size="md" url={profile.profile_picture_url} userId={profile.id} profileURL={`/u/${profile.username}`}/>
      <InnerContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>GM {profile.username}! 👋</Typography>
        <TextLink href="/earn?tab=quests" text="Go to quests" rightIcon="carret" color="primary" size="medium" />
      </InnerContainer>
    </Container>
  ) : (
    <></>
  );
};
