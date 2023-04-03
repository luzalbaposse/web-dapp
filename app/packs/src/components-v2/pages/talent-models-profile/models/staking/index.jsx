import { Button, Icon, Typography } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { Container, ImageContainer } from "./styled";
import StakeModal from "src/components/token/StakeModal";

export const StakingModel = ({ profile, isCurrentUserProfile, currentUserId, railsContext }) => {
  const [showStakeModal, setShowStakeModal] = useState(false);
  return (
    <Container>
      {profile && (
        <StakeModal
          show={showStakeModal}
          setShow={setShowStakeModal}
          tokenAddress={profile.talent_token.contract_id}
          tokenId={profile.talent_token.id}
          userId={currentUserId}
          userUsername={profile.user.username}
          tokenChainId={profile.talent_token.chain_id}
          talentName={profile.user.name}
          ticker={profile.talent_token.ticker}
          talentIsFromCurrentUser={isCurrentUserProfile}
          railsContext={railsContext}
        />
      )}
      <ImageContainer>
        <Icon name="flower" color="primary" size={40} />
      </ImageContainer>
      <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
        Staking
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
        Stake to vouch for someone you truly believe in. Unlock access to a TAL yield pool for both yourself and who you
        are supporting.
      </Typography>
      <Button hierarchy="primary" size="large" text="Stake" isStretched onClick={() => setShowStakeModal(true)} />
    </Container>
  );
};
