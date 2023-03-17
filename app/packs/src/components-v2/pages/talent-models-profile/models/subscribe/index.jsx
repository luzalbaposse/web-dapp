import { Button, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Container, ImageContainer } from "./styled";

export const SubscribeModel = () => (
    <Container>
        <ImageContainer>
            <Icon name="pig" color="primary" size={40} />
        </ImageContainer>
        <Typography specs={{ variant: "h5", type: "bold"}} color="primary01" >
            Career Updates
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular"}} color="primary01" >
            The first step to support someone is being present. Unlock access to career updates, supporter NFT & much more!
        </Typography>
        <Button hierarchy="primary" size="large" text="Subscribe" isStretched/>
    </Container>
)