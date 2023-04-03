import { Button, Dropdown, Input, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useState } from "react";
import { ToastBody } from "src/components/design_system/toasts";
import {
  Container,
  ClaimArea,
  ClaimAreaHeader,
  ClaimAreaInput,
  ClaimAreaInputContainer,
  OutterContainer,
  BottomContainer
} from "./styled";
import { OnChain } from "src/onchain";
import { parseAndCommify } from "src/onchain/utils";
import { toast } from "react-toastify";

export const HowMuchStep = ({ token, setToken, railsContext, setAmount, closeModal, nextStep, amount }) => {
  const [availableAmount, setAvailableAmount] = useState(0);

  const setupOnChain = useCallback(async () => {
    const newOnChain = new OnChain(railsContext.contractsEnv);
    let result;
    result = await newOnChain.connectedAccount();

    // load stable token
    const _availableAmount = await newOnChain.getStableBalanceERC20("0xe11A86849d99F524cAC3E7A0Ec1241828e332C62");

    if (_availableAmount === undefined) {
      toast.error(<ToastBody heading="We couldn't find your wallet" />);
      closeModal();
      return;
    }
    setAvailableAmount(_availableAmount);
  }, [setAvailableAmount, closeModal]);

  useEffect(() => {
    setupOnChain();
  }, []);
  return (
    <OutterContainer>
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
            Balance: {parseAndCommify(availableAmount)} {token}
          </Typography>
        </ClaimAreaHeader>
        <ClaimAreaInput>
          <ClaimAreaInputContainer>
            <Input type="number" placeholder="10" onChange={e => setAmount(e.target.value)} />
          </ClaimAreaInputContainer>
          <Dropdown
            value={token}
            options={["cUSD", "USDC"]}
            placeholder="cUSD"
            selectValue={token => {
              setToken(token);
            }}
          />
        </ClaimAreaInput>
      </ClaimArea>
      <BottomContainer>
        <Button size="large" hierarchy="primary" text="Confirm" isStretched onClick={nextStep} isDisabled={!amount} />
        <Button size="large" hierarchy="tertiary" text="Cancel" isStretched onClick={closeModal} />
      </BottomContainer>
    </OutterContainer>
  );
};
