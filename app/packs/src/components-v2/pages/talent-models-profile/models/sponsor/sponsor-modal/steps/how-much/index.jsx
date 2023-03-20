import { Button, Dropdown, Input, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  BottomContainer,
  ClaimArea,
  ClaimAreaHeader,
  ClaimAreaInput,
  ClaimAreaInputContainer
} from "./styled";

import { OnChain } from "src/onchain";
import { parseAndCommify } from "src/onchain/utils";

export const HowMuchStep = ({ token, setToken, railsContext, close, nextStep, amount, setAmount }) => {
  const [availableAmount, setAvailableAmount] = useState(0);

  const setupOnChain = useCallback(async () => {
    const newOnChain = new OnChain(railsContext.contractsEnv);
    let result;

    result = await newOnChain.connectedAccount();
    result = await newOnChain.loadStableToken();

    const _availableAmount = await newOnChain.getStableBalance(true);
    setAvailableAmount(_availableAmount);
  }, []);

  useEffect(() => {
    setupOnChain();
  }, []);

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
            Balance: {parseAndCommify(availableAmount)} CUSD
          </Typography>
        </ClaimAreaHeader>
        <ClaimAreaInput>
          <ClaimAreaInputContainer>
            <Input type="number" placeholder="10" onChange={e => setAmount(e.target.value)} />
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
        <Button size="large" hierarchy="primary" text="Confirm" isStretched onClick={() => nextStep()} />
        <Button size="large" hierarchy="tertiary" text="Cancel" isStretched onClick={() => close()} />
      </BottomContainer>
    </>
  );
};
