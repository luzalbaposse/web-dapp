import React from "react";
import { Typography } from "@talentprotocol/design-system";
import { Container, TitleContainer } from "./styled";
import { SubscribeModel } from "./subscribe";
import { StakingModel } from "./staking";
import { SponsorModel } from "./sponsor";

export const Models = () => (
  <Container>
    <TitleContainer>
      <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
        Support my career
      </Typography>
    </TitleContainer>
    <SubscribeModel />
    <StakingModel />
    <SponsorModel />
  </Container>
);
