import React from "react";
import { Container, SupportModelsContainer } from "./styled";
import { StakingModel } from "./staking";
import { SponsorModel } from "./sponsor";

export const Models = ({ profile, isCurrentUserProfile, currentUserId, railsContext }) => (
  <Container>
    <SupportModelsContainer>
      <StakingModel
        profile={profile}
        isCurrentUserProfile={isCurrentUserProfile}
        railsContext={railsContext}
        currentUserId={currentUserId}
      />
      <SponsorModel isCurrentUserProfile={isCurrentUserProfile} profile={profile} railsContext={railsContext} />
    </SupportModelsContainer>
  </Container>
);
