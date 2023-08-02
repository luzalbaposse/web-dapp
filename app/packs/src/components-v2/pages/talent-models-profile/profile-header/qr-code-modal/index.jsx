import { Avatar, Button, Modal, Typography } from "@talentprotocol/design-system";
import React from "react";
import { toast } from "react-toastify";
import { Container, BottomContainer, StyledQRCode, OutterContainer } from "./styled";
import { ToastBody } from "src/components/design_system/toasts";

export const QRCodeModal = ({ modalState, profile }) => {
  const inviteUrl = `https://beta.talentprotocol.com/join/${profile.username || profile.user.username}`;
  return (
    <Modal title="Share this profile" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      <OutterContainer>
        <Container>
          <Avatar size="md" url={profile.profile_picture_url} />
          <StyledQRCode value={inviteUrl} />
          <Typography specs={{ type: "medium", variant: "p2" }} color="primary01">
            Share this QRcode or link to invite others to Talent Protocol
          </Typography>
        </Container>
        <BottomContainer>
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
            {inviteUrl}
          </Typography>
          <Button
            size="large"
            hierarchy="primary"
            text="Share this profile"
            isStretched
            rightIcon="copy"
            onClick={() => {
              toast.success(<ToastBody heading="Success" body="Copied to clipboard" />, { autoClose: 5000 });
              navigator.clipboard.writeText(inviteUrl);
            }}
          />
        </BottomContainer>
      </OutterContainer>
    </Modal>
  );
};
