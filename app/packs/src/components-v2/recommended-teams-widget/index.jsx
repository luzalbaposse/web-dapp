import React from "react";
import { TeamCard, Typography } from "@talentprotocol/design-system";
import { Container, EntryContainer, SliderContainer, TitleContainer } from "./styled";

export const RecommendedTeamsWidget = ({}) => {
  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Recommended Teams</Typography>
      </TitleContainer>
      <SliderContainer>
        <EntryContainer>
          <TeamCard 
            membersImages={[]}
            totalMembers={0}
          />
        </EntryContainer>
        <EntryContainer>
          <TeamCard 
            membersImages={[]}
            totalMembers={0}
          />
        </EntryContainer>
        <EntryContainer>
          <TeamCard 
            membersImages={[]}
            totalMembers={0}
          />
        </EntryContainer>
      </SliderContainer>
    </Container>
  );
};
