import { Avatar, Button, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Banner, BannerContainer, Container, AvatarContainer, ActionArea, InfoArea, DetailedInfoContainer } from "./styled";

export const ProfileHeader = () => (
    <Container>
        <AvatarContainer>
            <Avatar size="lg" />
        </AvatarContainer>
        <BannerContainer>
            <Banner src="https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg" />
        </BannerContainer>
        <ActionArea>
            <Button size="small" hierarchy="secondary" leftIcon="bulb" iconColor="primary01" />
            <Button size="small" hierarchy="secondary" text="See profile" href={window.location.href + "/profile"} />
        </ActionArea>
        <InfoArea>
            <DetailedInfoContainer>
                <Typography specs={{ variant: "h5", type: "bold"}} color="primary01">Pedro Pereira</Typography>
                <Icon name="verified-2" color="primary" size={20} />
            </DetailedInfoContainer>
            <DetailedInfoContainer>
                <Typography specs={{ variant: "p2", type: "bold"}} color="primary01">$XPM</Typography>
                <Typography specs={{ variant: "p2", type: "regular"}} color="primary01">Product Designer at Talent Protocol</Typography>
            </DetailedInfoContainer>
        </InfoArea>
    </Container>
)