import { Button, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Container, InfoContainer } from "./styled";

export const SuccessStep = ({ closeModal, sponsorship }) => {
  return (
    <Container>
      <Icon name="success" />
      <InfoContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Sponsorship accepted!
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          Congratulations! You can now access the funds directly in your wallet. We encourage you to send a thank you
          message to your new sponsor.
        </Typography>
      </InfoContainer>
      <Button
        hierarchy="primary"
        size="large"
        onClick={() => (window.location.href = `/messages?user=${sponsorship.sponsor.username}`)}
        text="Send Message"
      />
      <Button hierarchy="secondary" size="medium" onClick={closeModal} text="Return" />
    </Container>
  );
};
