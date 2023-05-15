import React from "react";
import { ButtonContainer, Container } from "./styled";
import { Button, Typography } from "@talentprotocol/design-system";

export const QuickNavigator = ({ username }) => {
  return (
    <Container>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="search" iconColor="primary" isDisabled />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primaryDisable">
          Search
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="user" iconColor="primary" href={`/u/${username}`} />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          My profile
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="chat" iconColor="primary" href="/messages" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Messages
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="wallet" iconColor="primary" href="/portfolio" />
        <Typography specs={{ variant: "p3", type: "medium" }}>Wallet</Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="flags" iconColor="primary" href="/earn?tab=quests" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Quests
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="email" iconColor="primary" href="/earn?tab=talent" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Invites
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button
          hierarchy="secondary"
          size="large"
          leftIcon="settings"
          iconColor="primary"
          href={`/u/${username}/account_settings`}
        />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Settings
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="planet" iconColor="primary" isDisabled />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primaryDisable">
          Activity
        </Typography>
      </ButtonContainer>
    </Container>
  );
};
