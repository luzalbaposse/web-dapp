import React from "react";
import { TalentCard, TextLink, Typography } from "@talentprotocol/design-system";
import { Container, EntryContainer, SliderContainer, TitleContainer } from "./styled";

export const RecommendedBuildersWidget = ({}) => {
  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Recommended Builders</Typography>
        <TextLink href="/talent" text="View all" rightIcon="carret" color="primary" size="medium" />
      </TitleContainer>
      <SliderContainer>
        <EntryContainer>
          <TalentCard />
        </EntryContainer>
        <EntryContainer>
          <TalentCard />
        </EntryContainer>
        <EntryContainer>
          <TalentCard />
        </EntryContainer>
        <EntryContainer>
          <TalentCard />
        </EntryContainer>
      </SliderContainer>
    </Container>
  );
};
