import { Avatar, Button, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useState, useEffect } from "react";
import { BottomContainer, Container, DetailsContainer, DetailsRow, HeaderContainer, BottomDivider } from "./styled";
import { OnChain } from "src/onchain";
import { post } from "src/utils/requests";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import { parseStableAmount } from "src/onchain/utils";

const PRIMARY_BUTTON_STATES = {
  ACCEPT_SPONSOR: {
    title: "Accept Sponsorship",
    isLoading: false
  },
  LOADING_SPONSOR: {
    title: "Accepting Sponsorship...",
    isLoading: true
  }
};

export const TransactionStep = ({ sponsorship, railsContext, closeModal, nextStep, claimedSponsor }) => {
  const [onchain, setOnchain] = useState(null);
  const [account, setAccount] = useState(null);
  const [primaryButtonState, setPrimaryButtonState] = useState(PRIMARY_BUTTON_STATES.ACCEPT_SPONSOR);

  const setupOnChain = useCallback(async () => {
    const newOnChain = new OnChain(railsContext.contractsEnv);

    let _account = await newOnChain.connectedAccount();

    // Open metamask connect modal
    if (!_account) {
      closeModal();
      // Force connection
      _account = await newOnChain.connectedAccount(true);
    }

    const chainId = await newOnChain.getChainID();

    if (chainId != sponsorship.chain_id) {
      await newOnChain.switchChain(sponsorship.chain_id);
    }

    await newOnChain.loadSponsorship();
    await newOnChain.loadStableToken();

    setOnchain(newOnChain);
    setAccount(_account);
  }, [setOnchain, setAccount]);

  useEffect(() => {
    setupOnChain();
  }, []);

  const acceptSponsorCallback = useCallback(async () => {
    setPrimaryButtonState(PRIMARY_BUTTON_STATES.LOADING_SPONSOR);
    const result = await onchain.claimSponsorship(sponsorship.sponsor_address, sponsorship.token).catch(error => {
      console.error(error);
      toast.warning(<ToastBody title="Warning" body="We were not able to perform the action in your metamask" />, {
        autoClose: 5000
      });
      setPrimaryButtonState(PRIMARY_BUTTON_STATES.ACCEPT_SPONSOR);
      return;
    });
    if (result) {
      await post(`/api/v1/sponsorships`, {
        sponsorship: { tx_hash: result.transactionHash, chain_id: sponsorship.chain_id }
      })
        .then(() => {
          nextStep();
          claimedSponsor(sponsorship);
        })
        .catch(e => {
          setPrimaryButtonState(PRIMARY_BUTTON_STATES.ACCEPT_SPONSOR);
          console.error(e);
        });
    } else {
      console.log("Error: Something happened");
    }
  }, [onchain, account, setPrimaryButtonState, sponsorship]);

  return (
    <>
      <Container>
        <Avatar size="lg" url={sponsorship.sponsor.profile_picture_url} />
        <HeaderContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            {sponsorship.sponsor.name} wants to sponsor you with {parseStableAmount(sponsorship.amount)}{" "}
            {sponsorship.symbol}
          </Typography>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
            The funds will be available in your wallet after you accept this transaction.
          </Typography>
        </HeaderContainer>
        <DetailsContainer>
          <DetailsRow>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              You will receive
            </Typography>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
              {parseStableAmount(sponsorship.amount)} {sponsorship.symbol}
            </Typography>
          </DetailsRow>
          <DetailsRow>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              You will pay
            </Typography>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
              Network gas fee
            </Typography>
          </DetailsRow>
        </DetailsContainer>
        <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
          Please note that this is an estimate and the actual value may vary based on the network gas fee.
        </Typography>
        <BottomDivider />
        <BottomContainer>
          <Button
            size="small"
            hierarchy="primary"
            text={primaryButtonState.title}
            isLoading={primaryButtonState.isLoading}
            onClick={acceptSponsorCallback}
          />
          <Button size="small" hierarchy="tertiary" text="Cancel" onClick={closeModal} />
        </BottomContainer>
      </Container>
    </>
  );
};
