import { Avatar, Button, Icon, Typography, useModal } from "@talentprotocol/design-system";
import React from "react";
import { QRCodeModal } from "src/components-v2/qr-code-modal";
import defaultBanner from "../../../../../images/standard-banner.png";
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

  const profileButtonCopy = () => {
    if (document.referrer.includes(`/u/${profile.user.username}`)) {
      return "Return to profile";
    } else {
      return "See profile";
    }
  };

  return (
    <>
      <QRCodeModal
        modalState={modalState}
        url={`https://beta.talentprotocol.com/u/${profile.username}`}
        profilePicture={profile.profile_picture_url}
        text="Scan this QR code to open your profile."
        buttonText="Copy profile URL"
      />
      <Container>
        <AvatarContainer>
          <Avatar size="lg" url={profile.profile_picture_url} />
        </AvatarContainer>
        <BannerContainer>
          <Banner src={profile.banner_url || defaultBanner} />
        </BannerContainer>
        <ActionArea>
          <Button
            size="small"
            hierarchy="secondary"
            leftIcon="qr"
            iconColor="primary01"
            onClick={modalState.openModal}
          />
          <Button size="small" hierarchy="secondary" text={profileButtonCopy()} href={`/u/${profile.user.username}`} />
        </ActionArea>
        <InfoArea>
          <DetailedInfoContainer>
            <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
              {profile.user.display_name}
            </Typography>
            {profile.user.verified && <Icon name="verified-2" color="primary" size={20} />}
          </DetailedInfoContainer>
          <DetailedInfoContainer>
            {profile.talent_token.ticker && (
              <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
                ${profile.talent_token.ticker}
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
