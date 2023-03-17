import React from "react";
import { Typography } from "@talentprotocol/design-system";
import { Container } from "./styled";
import { SubscribeModel } from "./subscribe";
import { StakingModel } from "./staking";
import { SponsorModel } from "./sponsor";

export const Models = () => (
    <Container>
        <Typography specs={{ variant: "h5", type: "bold"}} color="primary01" >
            Support my career
        </Typography>
        <SubscribeModel />
        <StakingModel />
        <SponsorModel />
    </Container>
)