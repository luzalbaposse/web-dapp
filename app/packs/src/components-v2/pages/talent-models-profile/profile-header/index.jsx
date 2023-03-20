import { Avatar, Button, Icon, Typography, useModal } from "@talentprotocol/design-system";
import React from "react";
import { QRCodeModal } from "./qr-code-modal";
import {
  Banner,
  BannerContainer,
  Container,
  AvatarContainer,
  ActionArea,
  InfoArea,
  DetailedInfoContainer
} from "./styled";

export const ProfileHeader = ({ profile }) => {
  const modalState = useModal();

  return (
    <>
      <QRCodeModal modalState={modalState} profile={profile} />
      <Container>
        <AvatarContainer>
          <Avatar size="lg" url={profile.profile_picture_url} />
        </AvatarContainer>
        <BannerContainer>
          <Banner src={profile.banner_url} />
        </BannerContainer>
        <ActionArea>
          <Button
            size="small"
            hierarchy="secondary"
            leftIcon="bulb"
            iconColor="primary01"
            onClick={modalState.openModal}
          />
          <Button size="small" hierarchy="secondary" text="See profile" href={window.location.href + "/profile"} />
        </ActionArea>
        <InfoArea>
          <DetailedInfoContainer>
            <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
              {profile.user.legal_first_name} {profile.user.legal_last_name}
            </Typography>
            {profile.user.verified && <Icon name="verified-2" color="primary" size={20} />}
          </DetailedInfoContainer>
          <DetailedInfoContainer>
            {profile.talent_token.ticker && (
              <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
                {profile.talent_token.ticker}
              </Typography>
            )}
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
              {profile.profile.occupation}
            </Typography>
          </DetailedInfoContainer>
        </InfoArea>
      </Container>
    </>
  );
};
