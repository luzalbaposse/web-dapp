import { Avatar, Button, Typography } from "@talentprotocol/design-system";
import React from "react";
import { BottomContainer, Container, DetailsContainer, DetailsRow, HeaderContainer } from "./styled";

export const TransactionStep = ({ profile }) => {
  return (
    <>
      <Container>
        <Avatar size="lg" url={profile.profile_picture_url} />
        <HeaderContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            You will become Pedro Pereira’s sponsor
          </Typography>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
            You will become Pedro Pereira’s sponsor
          </Typography>
        </HeaderContainer>
        <DetailsContainer>
          <DetailsRow>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              Sponsorship
            </Typography>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
              250CUSD
            </Typography>
          </DetailsRow>
          <DetailsRow>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              Gas fee
            </Typography>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
              Network gas fee
            </Typography>
          </DetailsRow>
        </DetailsContainer>
        <DetailsContainer>
          <DetailsRow>
            <Typography specs={{ variant: "p1", type: "bold" }} color="primary01">
              Total
            </Typography>
            <Typography specs={{ variant: "p1", type: "bold" }} color="primary01">
              250 cUSD + Gas Fee
            </Typography>
          </DetailsRow>
        </DetailsContainer>
        <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
          Please note that this is an estimate and the actual value may vary based on the Ethereum gas fee.
        </Typography>
        <BottomContainer>
          <Button size="large" hierarchy="primary" text="Approve Transaction" isStretched />
          <Button size="large" hierarchy="tertiary" text="Cancel" isStretched />
        </BottomContainer>
      </Container>
    </>
  );
};
