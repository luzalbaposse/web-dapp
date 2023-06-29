import { Avatar, Button, Typography } from "@talentprotocol/design-system";
import React, { useCallback, useState, useEffect } from "react";
import {
  BottomContainer,
  Container,
  DetailsContainer,
  DetailsRow,
  HeaderContainer,
  BottomDivider,
  FixedBottom,
  ContentContainer
} from "./styled";
import { OnChain } from "src/onchain";
import { post } from "src/utils/requests";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";

const PRIMARY_BUTTON_STATES = {
  APPROVE: {
    title: "Approve Transaction",
    isLoading: false
  },
  CONFIRMING_TRANSACTION: {
    title: "Approving Transaction...",
    isLoading: true
  },
  SPONSOR: {
    title: "Sponsor",
    isLoading: false
  },
  LOADING_SPONSOR: {
    title: "Sponsoring...",
    isLoading: true
  }
};

export const TransactionStep = ({ profile, token, railsContext, amount, closeModal, nextStep }) => {
  const [onchain, setOnchain] = useState(null);
  const [account, setAccount] = useState(null);
  const [primaryButtonState, setPrimaryButtonState] = useState(PRIMARY_BUTTON_STATES.APPROVE);

  const setupOnChain = useCallback(
    async errorCallback => {
      try {
        const newOnChain = new OnChain(railsContext.contractsEnv);

        const _account = newOnChain.connectedAccount();

        setOnchain(newOnChain);
        setAccount(_account);
      } catch (error) {
        console.error(error);
        errorCallback();
      }
    },
    [setOnchain, setAccount]
  );

  useEffect(() => {
    let maxTries = 5;
    const errorCallback = () => {
      setTimeout(() => {
        if (!!maxTries) {
          setupOnChain(errorCallback);
          maxTries--;
        }
        return;
      }, 500);
    };
    setupOnChain(errorCallback);
  }, []);

  const approveTransactionCallback = useCallback(async () => {
    setPrimaryButtonState(PRIMARY_BUTTON_STATES.CONFIRMING_TRANSACTION);
    await onchain.approveSponsorship(token.address, token.decimals, amount);
    setPrimaryButtonState(PRIMARY_BUTTON_STATES.SPONSOR);
  }, [onchain, setPrimaryButtonState]);

  const sponsorCallback = useCallback(async () => {
    setPrimaryButtonState(PRIMARY_BUTTON_STATES.LOADING_SPONSOR);
    const result = await onchain
      .createSponsorship(profile.user.wallet_id, token.address, token.decimals, amount)
      .catch(error => {
        console.error(error);
        toast.warning(<ToastBody title="Warning" body="We were not able to perform the action in your metamask" />, {
          autoClose: 5000
        });
        setPrimaryButtonState(PRIMARY_BUTTON_STATES.SPONSOR);
        return;
      });
    if (result) {
      const _chainId = await onchain.getChainID();
      await post(`/api/v1/sponsorships`, {
        sponsorship: { tx_hash: result.transactionHash, chain_id: _chainId }
      })
        .then(() => {
          nextStep();
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
        <ContentContainer>
          <Avatar size="lg" url={profile.profile_picture_url} />
          <HeaderContainer>
            <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
              You will become {profile.user.name}'s sponsor
            </Typography>
            <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
              You will send money directly to {profile.user.name} wallet and the money will be available once claimed.
            </Typography>
          </HeaderContainer>
          <DetailsContainer>
            <DetailsRow>
              <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
                Confirm your Sponsorship
              </Typography>
              <Typography specs={{ variant: "p2", type: "regular" }} color="primary01">
                {amount} {token.value}
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
                {amount} {token.value} + Gas Fee
              </Typography>
            </DetailsRow>
          </DetailsContainer>
          <Typography specs={{ variant: "p3", type: "regular" }} color="primary03" className="mt-4 mb-4">
            Please note that this is an estimate and the actual value may vary based on the network gas fee.
          </Typography>
        </ContentContainer>
        <FixedBottom>
          <BottomDivider />
          <BottomContainer>
            <Button
              size="small"
              hierarchy="primary"
              text={primaryButtonState.title}
              isLoading={primaryButtonState.isLoading}
              onClick={
                primaryButtonState.title === PRIMARY_BUTTON_STATES.APPROVE.title
                  ? approveTransactionCallback
                  : sponsorCallback
              }
            />
            <Button size="small" hierarchy="tertiary" text="Cancel" onClick={closeModal} />
          </BottomContainer>
        </FixedBottom>
      </Container>
    </>
  );
};
