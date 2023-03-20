import { Avatar, Button, Icon, Modal, Typography, useModal } from "@talentprotocol/design-system";
import React from "react";
import { Container, BottomContainer } from "./styled";
import { QRCodeSVG } from "qrcode.react";

export const QRCodeModal = ({ modalState, profile }) => {
  console.log({ profile });
  return (
    <Modal title="Share this profile" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      <Container>
        <Avatar size="md" url={profile.profile_picture_url} />
        <QRCodeSVG value={window.location.href} />
        <Typography specs={{ type: "medium", variant: "p2" }} color="primary01">
          {profile.tal_domain && `@${profile.tal_domain}`}
        </Typography>
      </Container>
      <BottomContainer>
        <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
          {window.location.href}
        </Typography>
        <Button size="large">Share your profile</Button>
      </BottomContainer>
    </Modal>
  );
};
