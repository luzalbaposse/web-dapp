import { Avatar, Button, Modal, Typography } from "@talentprotocol/design-system";
import React from "react";
import { toast } from "react-toastify";
import { Container, BottomContainer, StyledQRCode, OutterContainer } from "./styled";
import { ToastBody } from "src/components/design_system/toasts";

export const QRCodeModal = ({ modalState, profilePicture, url, text, buttonText }) => {
  return (
    <Modal title="Share this profile" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      <OutterContainer>
        <Container>
          <Avatar size="md" url={profilePicture} />
          <StyledQRCode value={url} />
          <Typography specs={{ type: "medium", variant: "p2" }} color="primary01">
            {text}
          </Typography>
        </Container>
        <BottomContainer>
          <Typography specs={{ type: "regular", variant: "p2" }} color="primary03">
            {url}
          </Typography>
          <Button
            size="large"
            hierarchy="primary"
            text={buttonText}
            isStretched
            rightIcon="copy"
            onClick={() => {
              toast.success(<ToastBody heading="Success" body="Copied to clipboard" />, { autoClose: 5000 });
              navigator.clipboard.writeText(url);
            }}
          />
        </BottomContainer>
      </OutterContainer>
    </Modal>
  );
};
