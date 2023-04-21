import { Button, Icon, Typography } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { Container, ImageContainer } from "./styled";
import StakeModal from "src/components/token/StakeModal";

export const StakingModel = ({ profile, isCurrentUserProfile, currentUserId, railsContext }) => {
  const [showStakeModal, setShowStakeModal] = useState(false);
  const tokenLaunched = !!profile.talent_token?.contract_id;
  return (
    <Container>
      {tokenLaunched && (
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
        Endorsement
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
        {tokenLaunched
          ? `Stake to vouch for someone you truly believe in. Both you and ${profile.user.name} will earn interest in TAL for the amount staked`
          : "Stake to vouch for someone you truly believe in. Currently only available for users that launched their own Talent Token."}
      </Typography>
      <Button
        hierarchy="primary"
        size="large"
        text="Stake"
        isDisabled={!tokenLaunched}
        isStretched
        onClick={() => setShowStakeModal(true)}
      />
    </Container>
  );
};
