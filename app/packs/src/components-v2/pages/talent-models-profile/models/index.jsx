import React from "react";
import { Typography } from "@talentprotocol/design-system";
import { Container, TitleContainer } from "./styled";
import { SubscribeModel } from "./subscribe";
import { StakingModel } from "./staking";
import { SponsorModel } from "./sponsor";

export const Models = ({
  profile,
  setProfile,
  isCurrentUserProfile,
  currentUserId,
  railsContext,
}) => (
  <Container>
    <TitleContainer>
      <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
        Support my career
      </Typography>
    </TitleContainer>
    <SubscribeModel
      profile={profile}
      setProfile={setProfile}
      isCurrentUserProfile={isCurrentUserProfile}
    />
    <StakingModel
      profile={profile}
      isCurrentUserProfile={isCurrentUserProfile}
      railsContext={railsContext}
      currentUserId={currentUserId}
    />
    <SponsorModel
      isCurrentUserProfile={isCurrentUserProfile}
      profile={profile}
      railsContext={railsContext}
    />
  </Container>
);
