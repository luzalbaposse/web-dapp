import { Avatar, Button, Typography } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { ActionArea, Container, DesktopBottomContainer, Headline, HighlightedWord, SocialList } from "./styled";
import StakeModal from "src/components/token/StakeModal";

export const FinalHero = ({ profile, isCurrentUserProfile, railsContext }) => {
  const [showStakeModal, setShowStakeModal] = useState(false);
  return (
    <Container>
      {profile && (
        <StakeModal
          show={showStakeModal}
          setShow={setShowStakeModal}
          tokenAddress={profile.talent_token.contract_id}
          tokenId={profile.talent_token.id}
          userId={profile.user.id}
          userUsername={profile.user.username}
          tokenChainId={profile.talent_token.chain_id}
          talentName={profile.user.name}
          ticker={profile.talent_token.ticker}
          talentIsFromCurrentUser={isCurrentUserProfile}
          railsContext={railsContext}
        />
      )}
      <Avatar size="lg" url={profile.profile_picture_url} />
      <Headline>
        <Typography specs={{ variant: "h4", type: "regular" }} color="primary01">
          --E{" "}
        </Typography>
        <Typography specs={{ variant: "h4", type: "regular" }} color="primary01">
          {!!profile.profile.headline &&
            profile.profile.headline
              .split(" ")
              .map((word, index) =>
                (!!profile.profile.highlighted_headline_words_index
                  ? profile.profile.highlighted_headline_words_index
                  : []
                ).includes(index) ? (
                  <HighlightedWord key={word + index}>{word} </HighlightedWord>
                ) : (
                  <React.Fragment key={word + index}>{word} </React.Fragment>
                )
              )}
        </Typography>
      </Headline>
      <DesktopBottomContainer>
        <SocialList>
          {profile.profile.website && (
            <Button
              hierarchy="secondary"
              size="medium"
              iconColor="primary01"
              leftIcon="globe"
              href={profile.profile.website}
              newPage
            />
          )}
          {profile.profile.twitter && (
            <Button
              hierarchy="secondary"
              size="medium"
              iconColor="primary01"
              leftIcon="twitter"
              href={profile.profile.twitter}
              newPage
            />
          )}
          {profile.profile.telegram && (
            <Button
              hierarchy="secondary"
              size="medium"
              iconColor="primary01"
              leftIcon="telegram"
              href={profile.profile.telegram}
              newPage
            />
          )}
          {profile.profile.discord && (
            <Button
              hierarchy="secondary"
              size="medium"
              iconColor="primary01"
              leftIcon="discord"
              href={profile.profile.discord}
              newPage
            />
          )}
        </SocialList>
        <ActionArea>
          <Button hierarchy="primary" size="medium" text="Become a supporter" onClick={() => setShowStakeModal(true)} />
          <Button hierarchy="secondary" size="medium" text="See my profile" href={window.location.href + "/profile"} />
        </ActionArea>
      </DesktopBottomContainer>
    </Container>
  );
};
