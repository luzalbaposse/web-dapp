import { Avatar, Button, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useState, useEffect } from "react";
import { BottomContainer, Container, DetailsContainer, DetailsRow, HeaderContainer } from "./styled";

import { ethers } from "ethers";
import { OnChain } from "src/onchain";
import { parseAndCommify, chainIdToName } from "src/onchain/utils";

export const TransactionStep = ({ profile, token, railsContext, amount, close }) => {
  const [onchain, setOnchain] = useState(null);
  const [account, setAccount] = useState(null);

  const setupOnChain = useCallback(async () => {
    const newOnChain = new OnChain(railsContext.contractsEnv);

    const _account = await newOnChain.connectedAccount();
    await newOnChain.loadStableToken();
    await newOnChain.loadSponsorship();

    setOnchain(newOnChain);
    setAccount(_account);
  }, []);

  useEffect(() => {
    setupOnChain();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    await onchain.approveStableSponsorship(amount);

    const result = await onchain.createSponsorship(account, amount).catch(error => {
      console.error(error);
    });

    if (result) {
      await post(`/api/v1/sponsorships`, {
        sponsorship: { tx_hash: result.transactionHash }
      }).catch(e => console.log(e));
    } else {
      console.log("ERROR");
    }

    close();
  };

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
              {amount} CUSD
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
              {amount} cUSD + Gas Fee
            </Typography>
          </DetailsRow>
        </DetailsContainer>
        <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
          Please note that this is an estimate and the actual value may vary based on the Ethereum gas fee.
        </Typography>
        <BottomContainer>
          <Button size="large" hierarchy="primary" text="Approve Transaction" isStretched onClick={onSubmit} />
          <Button size="large" hierarchy="tertiary" text="Cancel" isStretched onClick={close} />
        </BottomContainer>
      </Container>
    </>
  );
};
