import React from "react";
import { ButtonContainer, Container } from "./styled";
import { Button, Typography } from "@talentprotocol/design-system";

export const QuickNavigator = ({ username }) => {
  return (
    <Container>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="search" iconColor="primary" isDisabled />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primaryDisable">
          Search
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="user" iconColor="primary" href={`/u/${username}`} />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          My profile
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="chat" iconColor="primary" href="/messages" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Messages
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="wallet" iconColor="primaryDisable" isDisabled />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primaryDisable">
          Wallet
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="flags" iconColor="primary" href="/earn?tab=quests" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Quests
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="email" iconColor="primary" href="/earn?tab=talent" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Invites
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button
          hierarchy="secondary"
          size="medium"
          leftIcon="settings"
          iconColor="primary"
          href={`/u/${username}/account_settings`}
        />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Settings
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="planet" iconColor="primary" isDisabled />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primaryDisable">
          Activity
        </Typography>
      </ButtonContainer>
    </Container>
  );
};
