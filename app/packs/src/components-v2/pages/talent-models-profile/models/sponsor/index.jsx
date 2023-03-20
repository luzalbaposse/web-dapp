import { Button, Icon, Typography, useModal } from "@talentprotocol/design-system";
import React from "react";
import { SponsorModal } from "./sponsor-modal";
import { Container, ImageContainer } from "./styled";

export const SponsorModel = ({ isCurrentUserProfile, profile }) => {
  const modalState = useModal();
  return (
    <>
      <SponsorModal modalState={modalState} profile={profile} />
      <Container>
        <ImageContainer>
          <Icon name="pig" color="primary" size={40} />
        </ImageContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Sponsorship
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
          The first step to support someone is being present. Unlock access to career updates, supporter NFT & much
          more!
        </Typography>
        <Button
          hierarchy="primary"
          size="large"
          text="Sponsor"
          isStretched
          isDisabled={isCurrentUserProfile}
          onClick={() => {
            if (modalState.isOpen) {
              modalState.closeModal();
            } else {
              modalState.openModal();
            }
          }}
        />
      </Container>
    </>
  );
};
