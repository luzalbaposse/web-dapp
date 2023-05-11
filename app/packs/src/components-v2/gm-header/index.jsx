import React from "react";
import { Container, InnerContainer } from "./styled";
import { Avatar, Typography } from "@talentprotocol/design-system";

export const GmHeader = ({ profile }) => {
  console.log(profile)
  return profile ? (
    <Container>
      <Avatar size="md" url={profile.profile_picture_url} userId={profile.id} profileURL={`/u/${profile.username}`} />
      <InnerContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>GM {profile.username}! 👋</Typography>
      </InnerContainer>
    </Container>
  ) : (
    <></>
  );
};
