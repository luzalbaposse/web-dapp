import React from "react";
import { Avatar, TextLink, Typography, Button } from "@talentprotocol/design-system";
import { BuilderEntry, BuildersList, Container, TitleContainer } from "./styled";

export const RecommendedBuildersWidget = ({}) => {
  return (
    <Container>
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }}>Recommended Builders</Typography>
        <TextLink href="/talent" text="View all" rightIcon="carret" color="primary" size="medium" />
      </TitleContainer>
      <BuildersList>
        <BuilderEntry>
          <Avatar size="md" name="John" occupation="Just a test" />
          <Button hierarchy="primary" size="small" text="Support" href={`/u/${"bguedes"}/support`} />
        </BuilderEntry>
        <BuilderEntry>
          <Avatar size="md" name="John" occupation="Just a test" />
          <Button hierarchy="primary" size="small" text="Support" href={`/u/${"bguedes"}/support`} />
        </BuilderEntry>
        <BuilderEntry>
          <Avatar size="md" name="John" occupation="Just a test" />
          <Button hierarchy="primary" size="small" text="Support" href={`/u/${"bguedes"}/support`} />
        </BuilderEntry>
      </BuildersList>
    </Container>
  );
};
