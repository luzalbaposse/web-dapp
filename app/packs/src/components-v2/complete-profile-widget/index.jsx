import React from "react";
import { Container, IntroContainer, ItemContainer, ListContainer, ProgressContainer } from "./styled";
import { Button, Typography } from "@talentprotocol/design-system";

export const CompleteProfileWidget = ({}) => {
  return (
    <Container>
      <ProgressContainer progress={25}>
        <Typography specs={{ variant: "p1", type: "bold" }}>25%</Typography>
      </ProgressContainer>
      <IntroContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Complete your profile</Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Completing your profile unlocks quests and allows you to start earning TAL!
        </Typography>
      </IntroContainer>
      <ListContainer>
        <ItemContainer>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
            Add your profile picture
          </Typography>
        </ItemContainer>
        <ItemContainer>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
            Add your current occupation
          </Typography>
        </ItemContainer>
        <ItemContainer>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
            Create your headline
          </Typography>
        </ItemContainer>
        <ItemContainer>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
            Add at least 2 entries to your journey
          </Typography>
        </ItemContainer>
        <ItemContainer>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
            Add at least 2 social links
          </Typography>
        </ItemContainer>
      </ListContainer>
      <Button text="Edit my profile" size="large" hierarchy="primary" isStretched href="" />
    </Container>
  );
};
