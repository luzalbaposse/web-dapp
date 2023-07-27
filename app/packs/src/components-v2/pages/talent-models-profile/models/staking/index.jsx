import { Button, Icon, Typography } from "@talentprotocol/design-system";
import React, { useState, useMemo } from "react";
import { Container, ImageContainer } from "./styled";
import StakeModal from "src/components/token/StakeModal";

export const StakingModel = ({ profile, isCurrentUserProfile, currentUserId, railsContext }) => {
  const [showStakeModal, setShowStakeModal] = useState(false);
  const reachedMaxSupply = profile.total_supply === profile.max_supply;
  const tokenLaunched = !!profile.talent_token?.contract_id;

  const text = useMemo(() => {
    if (reachedMaxSupply) {
      return `Stake to vouch for someone you truly believe in. Currenly not available because ${profile.name} has reached their max supply.`;
    }
    if (tokenLaunched) {
      return `Stake to vouch for someone you truly believe in. Both you and ${profile.name} will earn interest in TAL for the amount staked`;
    } else {
      return "Stake to vouch for someone you truly believe in. Currently only available for users that launched their own Talent Token.";
    }
  }, [tokenLaunched, reachedMaxSupply]);
  return (
    <Container>
      {tokenLaunched && (
        <StakeModal
          show={showStakeModal}
          setShow={setShowStakeModal}
          tokenAddress={profile.talent_token.contract_id}
          tokenId={profile.talent_token.id}
          userId={currentUserId}
          userUsername={profile.username}
          tokenChainId={profile.talent_token.chain_id}
          talentName={profile.name}
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
        {text}
      </Typography>
      <Button
        hierarchy="primary"
        size="large"
        text="Stake"
        isDisabled={!tokenLaunched || reachedMaxSupply}
        isStretched
        onClick={() => setShowStakeModal(true)}
      />
    </Container>
  );
};
