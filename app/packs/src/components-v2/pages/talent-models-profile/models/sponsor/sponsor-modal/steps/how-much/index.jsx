import { Button, Dropdown, Input, Typography } from "@talentprotocol/design-system";
import React from "react";
import {
  Container,
  BottomContainer,
  ClaimArea,
  ClaimAreaHeader,
  ClaimAreaInput,
  ClaimAreaInputContainer
} from "./styled";

export const HowMuchStep = ({ token, setToken }) => {
  return (
    <>
      <Container>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          How much do you want to sponsor?
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
          The money will be available once claimed.
        </Typography>
      </Container>
      <ClaimArea>
        <ClaimAreaHeader>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
            You will send
          </Typography>
          <Typography specs={{ variant: "p3", type: "bold" }} color="primary04">
            Balance: 2CUSD
          </Typography>
        </ClaimAreaHeader>
        <ClaimAreaInput>
          <ClaimAreaInputContainer>
            <Input type="number" placeholder="10" />
          </ClaimAreaInputContainer>
          <Dropdown
            value={token}
            options={["CUSD", "USDC"]}
            placeholder="USDC"
            selectValue={token => {
              setToken(token);
            }}
          />
        </ClaimAreaInput>
      </ClaimArea>
      <BottomContainer>
        <Button size="large" hierarchy="primary" text="Confirm" isStretched />
        <Button size="large" hierarchy="tertiary" text="Cancel" isStretched />
      </BottomContainer>
    </>
  );
};
