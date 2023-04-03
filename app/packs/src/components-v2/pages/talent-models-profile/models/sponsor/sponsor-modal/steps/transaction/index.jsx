import { Avatar, Button, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useState, useEffect } from "react";
import { BottomContainer, Container, DetailsContainer, DetailsRow, HeaderContainer } from "./styled";
import { OnChain } from "src/onchain";
import { post } from "src/utils/requests";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

const PRIMARY_BUTTON_STATES = {
  APPROVE: {
    title: "Approve Transaction",
    isDisabled: false
  },
  CONFIRMING_TRANSACTION: {
    title: "Approving Transaction...",
    isDisabled: true
  },
  SPONSOR: {
    title: "Sponsor",
    isDisabled: false
  },
  LOADING_SPONSOR: {
    title: "Sponsoring...",
    isDisabled: true
  }
};

export const TransactionStep = ({ profile, token, railsContext, amount, closeModal }) => {
  const [onchain, setOnchain] = useState(null);
  const [account, setAccount] = useState(null);
  const [primaryButtonState, setPrimaryButtonState] = useState(PRIMARY_BUTTON_STATES.APPROVE);

  const setupOnChain = useCallback(async () => {
    const newOnChain = new OnChain(railsContext.contractsEnv);

    const _account = await newOnChain.connectedAccount();
    await newOnChain.loadSponsorship();
    await newOnChain.loadStableToken();

    setOnchain(newOnChain);
    setAccount(_account);
  }, [setOnchain, setAccount]);

  useEffect(() => {
    setupOnChain();
  }, []);

  const approveTransactionCallback = useCallback(async () => {
    const tx = await onchain.approveStableSponsorship(amount);
    setPrimaryButtonState(PRIMARY_BUTTON_STATES.CONFIRMING_TRANSACTION);
    await tx.wait();
    setPrimaryButtonState(PRIMARY_BUTTON_STATES.SPONSOR);
  }, [onchain, setPrimaryButtonState]);

  const sponsorCallback = useCallback(async () => {
    setPrimaryButtonState(PRIMARY_BUTTON_STATES.LOADING_SPONSOR);
    const result = await onchain.createSponsorship(profile.user.wallet_id, amount).catch(error => {
      console.error(error);
      toast.error(<ToastBody title="Error" body="Something went wrong" />, { autoClose: 5000 });
      setPrimaryButtonState(PRIMARY_BUTTON_STATES.SPONSOR);
      return;
    });
    if (result) {
      await post(`/api/v1/sponsorships`, {
        sponsorship: { tx_hash: result.transactionHash }
      })
        .then(() => {
          closeModal();
        })
        .catch(e => {
          setPrimaryButtonState(PRIMARY_BUTTON_STATES.SPONSOR);
          console.error(e);
        });
    } else {
      console.log("Error: Something happened");
    }
  }, [onchain, account, setPrimaryButtonState, profile]);

  return (
    <>
      <Container>
        <Avatar size="lg" url={profile.profile_picture_url} />
        <HeaderContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            You will become {profile.user.name}’s sponsor
          </Typography>
          <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
            You will become {profile.user.name}’ sponsor
          </Typography>
        </HeaderContainer>
        <DetailsContainer>
          <DetailsRow>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              Sponsorship
            </Typography>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
              {amount} {token}
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
              {amount} {token} + Gas Fee
            </Typography>
          </DetailsRow>
        </DetailsContainer>
        <Typography specs={{ variant: "p3", type: "regular" }} color="primary03">
          Please note that this is an estimate and the actual value may vary based on the Ethereum gas fee.
        </Typography>
        <BottomContainer>
          <Button
            size="large"
            hierarchy="primary"
            text={primaryButtonState.title}
            isDisabled={primaryButtonState.isDisabled}
            isStretched
            onClick={
              primaryButtonState.title === PRIMARY_BUTTON_STATES.APPROVE.title
                ? approveTransactionCallback
                : sponsorCallback
            }
          />
          <Button size="large" hierarchy="tertiary" text="Cancel" isStretched onClick={closeModal} />
        </BottomContainer>
      </Container>
    </>
  );
};
