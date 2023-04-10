import React from "react";
import { ButtonContainer, Container } from "./styled";
import { Button, Typography } from "@talentprotocol/design-system";

export const QuickNavigator = () => {
  return (
    <Container>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="search" iconColor="primary" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Search
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        {/*<Button hierarchy="secondary" size="medium" leftIcon="user" iconColor="primary" />*/}
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          My profile
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="chat" iconColor="primary" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Messages
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="wallet" iconColor="primary" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Wallet
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="flags" iconColor="primary" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Quests
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="email" iconColor="primary" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Invites
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="settings" iconColor="primary" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Settings
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="medium" leftIcon="planet" iconColor="primary" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Activity
        </Typography>
      </ButtonContainer>
    </Container>
  );
};
