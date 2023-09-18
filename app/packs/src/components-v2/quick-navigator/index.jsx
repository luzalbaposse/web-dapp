import { Button, Typography } from "@talentprotocol/design-system";
import React from "react";
import { ButtonContainer, Container } from "./styled";

export const QuickNavigator = ({ username }) => {
  return (
    <Container>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="search" iconColor="primary" onClick={window.openSearch} />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
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
        <Button hierarchy="secondary" size="large" leftIcon="wallet" iconColor="primary" href="/wallet" />
        <Typography specs={{ variant: "p3", type: "medium" }}>Wallet</Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="flags" iconColor="primary" href="/quests?tab=quests" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Quests
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button hierarchy="secondary" size="large" leftIcon="multiple-users" iconColor="primary" href="/collectives" />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Collectives
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button
          hierarchy="secondary"
          size="large"
          leftIcon="settings"
          iconColor="primary"
          href={`/u/${username}/?account`}
        />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Settings
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button
          hierarchy="secondary"
          size="large"
          leftIcon="planet"
          iconColor="primary"
          onClick={() => {
            document
              .getElementById("activity-widget")
              ?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          }}
        />
        <Typography specs={{ variant: "p3", type: "medium" }} color="primary01">
          Activity
        </Typography>
      </ButtonContainer>
    </Container>
  );
};
