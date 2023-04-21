import { Button, Dropdown, Input, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useEffect, useState } from "react";
import { ToastBody } from "src/components/design_system/toasts";
import {
  Container,
  ClaimArea,
  ClaimAreaInput,
  ClaimAreaInputContainer,
  OutterContainer,
  BottomContainer,
  ClaimAreaAmountContainer,
  BottomDivider
} from "./styled";
import { OnChain } from "src/onchain";
import { chainNameToId, chainIdToName } from "src/onchain/utils";
import { parseAndCommify } from "src/onchain/utils";
import { toast } from "react-toastify";

export const HowMuchStep = ({ token, setToken, railsContext, setAmount, closeModal, nextStep, amount }) => {
  const [onchain, setOnchain] = useState(null);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [chainId, setChainId] = useState(0);
  const tokenOptions = [
    { value: "cUSD", iconName: "celo", chain: "Celo" },
    { value: "USDC", iconName: "polygon", chain: "Polygon" }
  ];

  const setupOnChain = useCallback(async () => {
    const newOnChain = new OnChain(railsContext.contractsEnv);
    setOnchain(newOnChain);

    const _account = await newOnChain.connectedAccount();

    // Open metamask connect modal
    if (!_account) {
      closeModal();
      await newOnChain.connectedAccount(true);
    }

    if (!(await newOnChain.recognizedChain())) {
      const tokenChainID = chainNameToId(token.chain, railsContext.contractsEnv);
      await newOnChain.switchChain(tokenChainID);
    }

    const chainId = await newOnChain.getChainID();
    setChainId(chainId);
    const chainName = chainIdToName(chainId, railsContext.contractsEnv);

    const chainToken = tokenOptions.find(option => option.chain == chainName);
    setToken(chainToken);

    // load stable token
    const _availableAmount = await newOnChain.getStableBalanceERC20();

    if (_availableAmount === undefined) {
      toast.error(<ToastBody heading="We couldn't find your wallet" />, { autoClose: 5000 });
      closeModal();
      return;
    }
    setAvailableAmount(_availableAmount);
  }, [setAvailableAmount, closeModal]);

  useEffect(() => {
    setupOnChain();
  }, []);

  const changeToken = async token => {
    const tokenChainID = chainNameToId(token.chain, railsContext.contractsEnv);
    if (chainId != tokenChainID) {
      await onchain.switchChain(tokenChainID);
    }
    setToken(token);
  };

  return (
    <OutterContainer>
      <Container>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          How much do you want to sponsor?
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          The money will be available once claimed.
        </Typography>
      </Container>
      <ClaimArea>
        <ClaimAreaInput>
          <Typography specs={{ variant: "p2", type: "bold" }} color="primary01" className="mb-2">
            Currency
          </Typography>
          <Dropdown
            value={token.value}
            selectedOption={token}
            options={tokenOptions}
            placeholder="USDC"
            selectOption={token => changeToken(token)}
          />
          <ClaimAreaAmountContainer>
            <Typography specs={{ variant: "p2", type: "bold" }} color="primary01">
              You will send
            </Typography>
            <Typography specs={{ variant: "p3", type: "bold" }} color="primary04">
              Balance: {parseAndCommify(availableAmount)} {token.value}
            </Typography>
          </ClaimAreaAmountContainer>
          <ClaimAreaInputContainer>
            <Input type="number" placeholder="10" onChange={e => setAmount(e.target.value)} />
          </ClaimAreaInputContainer>
        </ClaimAreaInput>
      </ClaimArea>
      <BottomDivider />
      <BottomContainer>
        <Button size="small" hierarchy="primary" text="Confirm" onClick={nextStep} isDisabled={!amount} />
        <Button size="small" hierarchy="tertiary" text="Cancel" onClick={closeModal} />
      </BottomContainer>
    </OutterContainer>
  );
};
