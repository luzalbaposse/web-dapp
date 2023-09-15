import React, { useCallback } from "react";
import { Modal, Typography, Button } from "@talentprotocol/design-system";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { users } from "src/api";
import { OutterContainer, Container, BottomContainer } from "./styled";

export const ForgotPasswordEmail = ({ modalState, email }) => {
  const sendResetPasswordEmail = useCallback(() => {
    users
      .sendResetPasswordEmail(profile?.user.email)
      .then(() => {
        toast.success(<ToastBody heading={`We have sent and reset password email to: ${profile?.user.email}`} />, {
          autoClose: 5000
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch(() => {
        toast.error(<ToastBody heading="We were unable to send the reset email. Try again later." />, {
          autoClose: 5000
        });
      });
  }, [email]);

  return (
    <Modal title="Reset your password" isOpen={modalState.isOpen} closeModal={modalState.closeModal}>
      <OutterContainer>
        <Container>
          <Typography specs={{ type: "medium", variant: "p2" }} color="primary01">
            You will receive an email with the steps required to reset your password.
          </Typography>
          <Typography specs={{ type: "medium", variant: "p2" }} color="primary01">
            For security reasons you will be logged out from the app.
          </Typography>
        </Container>
        <BottomContainer>
          <Button hierarchy="danger" size="medium" text="Reset Password" onClick={sendResetPasswordEmail} />
        </BottomContainer>
      </OutterContainer>
    </Modal>
  );
};
