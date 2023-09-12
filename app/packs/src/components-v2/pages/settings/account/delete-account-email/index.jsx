import React, { useCallback } from "react";
import { Modal, Typography, Button } from "@talentprotocol/design-system";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { users } from "src/api";
import { OutterContainer, Container, BottomContainer } from "./styled";

export const DeleteAccountEmail = ({ modalState, userId }) => {
  const sendDeleteAccountEmail = useCallback(() => {
    users.sendDeleteAccountEmail(userId).then(() => {
      toast.success(<ToastBody heading="Success!" body="Email sent!" />);
      modalState.closeModal();
    });
  }, [userId]);

  return (
    <Modal title="Delete your account" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      <OutterContainer>
        <Container>
          <Typography specs={{ type: "medium", variant: "p2" }} color="primary01">
            To permanently delete your account and account data, you'll need to confirm your decision in an email we
            send you.
          </Typography>
        </Container>
        <BottomContainer>
          <Button hierarchy="danger" size="medium" text="Delete Account" onClick={sendDeleteAccountEmail} />
        </BottomContainer>
      </OutterContainer>
    </Modal>
  );
};
