import React from "react";
import { Container, InviteLinkArea, InvitesRow, InvitesTextRow, TitleContainer } from "./styled";
import { Button, Icon, Typography } from "@talentprotocol/design-system";
import { toast } from "react-toastify";

export const EmptyState = ({ openQRCodeModal, username }) => {
  return (
    <Container>
      <Icon name="user" size={48} color="primary04" />
      <TitleContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary04">
          No invites sent yet.
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
          Get your friends on board. For each friend who signs up and verifies their account, you will{" "}
        </Typography>
        <InvitesTextRow>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
            win
          </Typography>
          <Icon name="flash" size={12} color="primary" />
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
            500 XP
          </Typography>
        </InvitesTextRow>
      </TitleContainer>
      <InviteLinkArea>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary04">
          https://beta.talent.../u/{username}
        </Typography>
        <InvitesRow>
          <Button
            hierarchy="primary"
            size="medium"
            text="Copy invite link"
            isStretched
            rightIcon="copy"
            onClick={() => {
              navigator.clipboard.writeText(`https://beta.talentprotocol.com/join/${username}`);
              toast.success("Copied to clipboard!", {
                autoClose: 3000
              });
            }}
          />
          <Button size="medium" hierarchy="secondary" leftIcon="qr" iconColor="primary01" onClick={openQRCodeModal} />
        </InvitesRow>
        <Button hierarchy="tertiary" size="medium" text="Learn More" href="https://help.talentprotocol.com/" newPage />
      </InviteLinkArea>
    </Container>
  );
};
