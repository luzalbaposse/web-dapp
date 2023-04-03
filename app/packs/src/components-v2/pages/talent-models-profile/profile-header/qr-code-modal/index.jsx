import { Avatar, Button, Modal, Typography } from "@talentprotocol/design-system";
import React from "react";
import { toast } from "react-toastify";
import { Container, BottomContainer, StyledQRCode, OutterContainer } from "./styled";
import { ToastBody } from "src/components/design_system/toasts";

export const QRCodeModal = ({ modalState, profile }) => {
  return (
    <Modal title="Share this profile" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      <OutterContainer>
        <Container>
          <Avatar size="lg" url={profile.profile_picture_url} />
          <StyledQRCode value={window.location.href} />
          <Typography specs={{ type: "medium", variant: "p2" }} color="primary01">
            {profile.tal_domain && `@${profile.tal_domain}`}
          </Typography>
        </Container>
        <BottomContainer>
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
            {window.location.href}
          </Typography>
          <Button
            size="large"
            hierarchy="primary"
            text="Share your profile"
            isStretched
            rightIcon="copy"
            onClick={() => {
              toast.success(<ToastBody heading="Success" body="Copied to clipboard" />);
              navigator.clipboard.writeText(window.location.href);
            }}
          />
        </BottomContainer>
      </OutterContainer>
    </Modal>
  );
};
