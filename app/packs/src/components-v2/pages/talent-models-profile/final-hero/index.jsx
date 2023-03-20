import { Avatar, Button, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { ActionArea, Container, Headline, HighlightedWord, SocialList } from "./styled";

const PHRASE = ["Make ", "brand identities from scratch and help big brands stay mighty."];

export const FinalHero = ({ profile }) => (
  <Container>
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
      <Button hierarchy="primary" size="medium" text="Become a supporter" />
      <Button hierarchy="secondary" size="medium" text="See my profile" href={window.location.href + "/profile"} />
    </ActionArea>
  </Container>
);
