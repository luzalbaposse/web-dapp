import { Button, Icon, Typography } from "@talentprotocol/design-system";
import React from "react";
import { Container, InfoContainer } from "./styled";

export const SuccessStep = ({ closeModal }) => {
  return (
    <Container>
      <Icon name="success" />
      <InfoContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          Sponsorship revoked!
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          You can now view your funds by checking the same wallet that you used to confirm the transaction.
        </Typography>
      </InfoContainer>
      <Button hierarchy="primary" size="large" onClick={closeModal} text="Return" />
    </Container>
  );
};
