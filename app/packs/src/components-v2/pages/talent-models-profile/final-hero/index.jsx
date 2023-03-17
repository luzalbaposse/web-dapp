import { Avatar, Button, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { ActionArea, Container, Headline, SocialList } from "./styled";

const PHRASE = ["Make ", "brand identities from scratch and help big brands stay mighty."];

export const FinalHero = () => (
  <Container>
    <Avatar size="lg" />
    <Headline>
      <Typography specs={{ variant: "h4", type: "regular" }} color="primary01">
        --E{" "}
      </Typography>
      <Typography specs={{ variant: "h4", type: "regular" }} color="primary01">
        {PHRASE[0]}
      </Typography>
      <Typography specs={{ variant: "h4", type: "regular" }} color="primary">
        {PHRASE[1]}
      </Typography>
    </Headline>
    <SocialList>
      <Button hierarchy="secondary" size="medium" iconColor="primary01" leftIcon="globe" />
      <Button hierarchy="secondary" size="medium" iconColor="primary01" leftIcon="twitter" />
      <Button hierarchy="secondary" size="medium" iconColor="primary01" leftIcon="telegram" />
      <Button hierarchy="secondary" size="medium" iconColor="primary01" leftIcon="discord" />
    </SocialList>
    <ActionArea>
      <Button hierarchy="primary" size="medium" text="Become a supporter" />
      <Button hierarchy="secondary" size="medium" text="See my profile" />
    </ActionArea>
  </Container>
);
