import { Button, Icon, Typography, useModal } from "@talentprotocol/design-system";
import React from "react";
import { SponsorModal } from "./sponsor-modal";
import { Container, ImageContainer } from "./styled";

export const SponsorModel = ({ isCurrentUserProfile, profile, railsContext }) => {
  const modalState = useModal();
  console.log("=====================", modalState);
  return (
    <>
      <SponsorModal modalState={modalState} profile={profile} railsContext={railsContext} />
      <Container>
        <ImageContainer>
          <Icon name="sponsor" color="primary" size={40} />
        </ImageContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Sponsorship
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Help {profile.name} grow by sending funds directly to their wallet. You can revoke your sponsorship before{" "}
          {profile.name} claims it.
        </Typography>
        <Button
          hierarchy="primary"
          size="large"
          text="Sponsor"
          isStretched
          onClick={() => {
            if (modalState.isOpen) {
              modalState.closeModal();
            } else {
              modalState.openModal();
            }
          }}
          isDisabled={isCurrentUserProfile}
        />
      </Container>
    </>
  );
};
