import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useStepExperience } from "src/hooks/use-step-experience";
import { Modal, Typography, Input, Button, Icon } from "@talentprotocol/design-system";
import { toast } from "react-toastify";
import { ToastBody } from "src/components/design_system/toasts";
import {
  HeaderContainer,
  HeaderText,
  ModalContent,
  ModalBody,
  ModalInput,
  ModalInputHeader,
  ModalInputBox,
  ModalDescription,
  ModalValueDescription,
  ModalValuesRow,
  StyledTypographyLink,
  ModalFooter,
  Container,
  InfoContainer,
  ChangeNetworkContainer
} from "./styled";
import TalentProfilePicture from "src/components/talent/TalentProfilePicture";
import Divider from "src/components/design_system/other/Divider";
import { OnChain } from "src/onchain";
import { parseAndCommify, chainNameToId } from "src/onchain/utils";
import { formatUnits } from "viem";
import { post } from "src/utils/requests";

const TransactionStep = ({ member, updateMember, election, onSuccess, onError, onCancel, setError, railsContext }) => {
  const inputRef = useRef(1);
  const [value, setValue] = useState(1);
  const [chainId, setChainId] = useState(null);
  const [talBalance, setTalBalance] = useState(0);
  const [makingRequest, setMakingRequest] = useState(false);

  const setupChain = useCallback(async () => {
    try {
      const newOnChain = new OnChain(railsContext.contractsEnv);

      const currentAccount = await newOnChain.connectedAccount();

      if (!currentAccount) {
        toast.error(
          <ToastBody
            heading="Wallet disconnected"
            body={"Your wallet is disconnected please connect it before voting"}
          />,
          {
            autoClose: 1500
          }
        );
        onCancel();
      }
      const selectedChainId = await newOnChain.getChainID();

      const recognizedChain = await newOnChain.recognizedChain(selectedChainId);

      if (!recognizedChain) {
        setError("Unsupported chain.");
        onError();
        return;
      }
      setChainId(selectedChainId);

      const availableBalance = await newOnChain.getTALBalance(currentAccount);
      const formatedUnitsTALBalance = formatUnits(availableBalance, 18);
      let formatedUnitsVotesCost = "0";
      if (selectedChainId == 80001 || selectedChainId == 137) {
        formatedUnitsVotesCost = formatUnits(member.currentUserVotesCostOnPolygon, 18);
      } else if (selectedChainId == 44787 || selectedChainId == 42220) {
        formatedUnitsVotesCost = formatUnits(member.currentUserVotesCostOnCelo, 18);
      }
      const realTALBalance = parseInt(formatedUnitsTALBalance) - parseInt(formatedUnitsVotesCost);
      const available = parseAndCommify(realTALBalance.toString());

      setTalBalance(available);
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    setupChain();
  }, []);

  const onTextChange = e => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current.value = value;
  };

  const increment = () => {
    inputRef.current.value = value + 1;
    setValue(prev => prev + 1);
  };

  const decrement = () => {
    if (value > 1) {
      inputRef.current.value = value - 1;
      setValue(prev => prev - 1);
    }
  };

  const calculateCost = () => {
    // replace with number of votes
    let cost = 0;
    for (let i = 0; i < value; i++) {
      cost += member.voteCount + i + 1;
    }
    return cost;
  };

  const createVote = async e => {
    e.stopPropagation();
    e.preventDefault();

    setMakingRequest(true);

    const response = await post(`/api/v1/elections/${election.id}/vote`, {
      candidate_id: member.id,
      number_of_votes: value,
      chain_id: chainId
    });

    if (response.success) {
      updateMember({
        ...member,
        voteCount: member.voteCount + value,
        currentUserVotesCount: member.currentUserVotesCount + value
      });
      onSuccess();
    } else {
      setError(response.error);
      onError();
    }
    setMakingRequest(false);
  };

  return (
    <ModalContent>
      <HeaderContainer>
        <TalentProfilePicture height={80} src={member.profilePictureUrl} />
        <HeaderText>
          <Typography specs={{ variant: "h5", type: "bold" }}>Vote for {member.name}</Typography>
          <Typography specs={{ variant: "p2", type: "regular" }}>
            Every vote has a cost in $TAL, but if {member.name} wins a Take Off scholarship, you will also win a prize
            in $TAL.
          </Typography>
        </HeaderText>
      </HeaderContainer>
      <ModalBody>
        <ModalInput>
          <ModalInputHeader>
            <Typography specs={{ variant: "p2", type: "bold" }}>New Votes</Typography>
            <Typography specs={{ variant: "p3", type: "bold" }}>Balance: {talBalance} $TAL</Typography>
          </ModalInputHeader>
          <ModalInputBox>
            <Input inputRef={inputRef} defaultValue={value} value={value} onChange={onTextChange} />
            <Button size="small" hierarchy="secondary" onClick={increment}>
              +
            </Button>
            <Button size="small" hierarchy="secondary" onClick={decrement}>
              -
            </Button>
          </ModalInputBox>
        </ModalInput>
        <ModalDescription>
          <ModalValueDescription>
            <ModalValuesRow>
              <Typography specs={{ variant: "p2", type: "regular" }}>Previous votes from you</Typography>
              <Typography specs={{ variant: "p2", type: "regular" }}>{member.currentUserVotesCount}</Typography>
            </ModalValuesRow>
            <ModalValuesRow>
              <Typography specs={{ variant: "p2", type: "regular" }}>Previous votes on {member.name}</Typography>
              <Typography specs={{ variant: "p2", type: "regular" }}>{member.voteCount}</Typography>
            </ModalValuesRow>
            <ModalValuesRow>
              <Typography specs={{ variant: "p2", type: "regular" }}>Next vote costs</Typography>
              <Typography specs={{ variant: "p2", type: "regular" }}>{member.voteCount + value} $TAL</Typography>
            </ModalValuesRow>
            <Divider />
            <ModalValuesRow>
              <Typography specs={{ variant: "p1", type: "bold" }}>Total cost</Typography>
              <Typography specs={{ variant: "p1", type: "bold" }}>{calculateCost()} $TAL</Typography>
            </ModalValuesRow>
          </ModalValueDescription>
          <Divider />
          <Typography specs={{ variant: "p3", type: "regular" }}>
            The cost of a vote increases linearly with every new vote. The 1st vote in a candidate costs 1 $TAL, the 2nd
            vote costs 2 $TAL, the 3rd vote costs 3 $TAL, and so on. If you don't have any $TAL in your{" "}
            <StyledTypographyLink href={"/wallet"} target="_blank">
              Wallet
            </StyledTypographyLink>
            , go earn some in{" "}
            <StyledTypographyLink href={"/quests"} target="_blank">
              Quests
            </StyledTypographyLink>
            .
          </Typography>
        </ModalDescription>
      </ModalBody>
      <ModalFooter>
        <Button size="small" hierarchy="tertiary" text="Cancel" onClick={onCancel} />
        <Button
          size="small"
          hierarchy="primary"
          text="Vote"
          onClick={createVote}
          isLoading={makingRequest}
          isDisabled={makingRequest}
        />
      </ModalFooter>
    </ModalContent>
  );
};

const SuccessStep = ({ member, onCancel, election }) => (
  <Container>
    <Icon name="success" />
    <InfoContainer>
      <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
        Vote Submitted!
      </Typography>
      <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
        Thank you for supporting {member.name} in the '{election.name}' scholarship. We processed your vote and will be
        deducting $TAL from your virtual wallet in the end of the voting period.
      </Typography>
    </InfoContainer>
    <Button hierarchy="primary" size="medium" onClick={onCancel} text="Return" />
  </Container>
);

const ErrorStep = ({ error, onCancel, railsContext, election }) => {
  const titleToText = () => {
    switch (error) {
      case "No wallet connected.":
        return "You need to have your wallet connected in order to vote";
      case "The voting period is not active.":
        return "You can only vote during the voting period.";
      case "At least one vote must be cast.":
        return "You must cast at least one vote in order to participate in the takeoff application";
      case "You cannot vote for yourself.":
        return "We only accept votes for other candidates. Support others in their journey and they will support you as well!";
      case "Unsupported chain.":
        return "We currently only allow you to use Celo & Polygon to vote. Please choose one of these chains before voting.";
      case "You cannot vote for someone who is not a candidate.":
        return `This member is not yet a candidate to the ${election.name} campaign.`;
      case "Insufficient virtual TAL balance. Try a different chain.":
        return "Your TAL balance is not sufficient for the vote you are trying to cast. Perhaps you meant to use a different chain to vote? We support Celo & Polygon.";
      default:
        return "Something went wrong. Try again later or reach out to us on Discord if it persists.";
    }
  };

  const networkChange = async chainName => {
    const chainAPI = new OnChain(railsContext.contractsEnv);
    const chainId = chainNameToId(chainName, railsContext.contractsEnv);
    await chainAPI.switchChain(chainId);
    window.location.reload();
  };

  const showSwitchChain = () => {
    return ["Unsupported chain.", "Insufficient virtual TAL balance. Try a different chain."].includes(error);
  };

  return (
    <Container>
      <Icon name="help" size={64} />
      <InfoContainer>
        <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
          {error}
        </Typography>
        <Typography specs={{ variant: "p2", type: "regular" }} color="primary03">
          {titleToText()}
        </Typography>
      </InfoContainer>
      {showSwitchChain() && (
        <ChangeNetworkContainer>
          <Button hierarchy="primary" size="medium" onClick={() => networkChange("Celo")} text="Switch to Celo" />
          <Button hierarchy="primary" size="medium" onClick={() => networkChange("Polygon")} text="Switch to Polygon" />
        </ChangeNetworkContainer>
      )}
      <Button hierarchy="secondary" size="medium" onClick={onCancel} text="Return" />
    </Container>
  );
};

const STEPS = {
  1: TransactionStep,
  2: SuccessStep,
  3: ErrorStep
};

export const VotingModal = ({ modalState, member, updateMember, election, railsContext }) => {
  const [error, setError] = useState(null);
  const stepsState = useStepExperience(Object.keys(STEPS).length);
  const StepScreen = useMemo(() => STEPS[stepsState.currentStep], [stepsState.currentStep]);

  const closeModal = useCallback(() => {
    modalState.closeModal();
    stepsState.jumpToStep(1);
  }, [modalState.closeModal, stepsState.jumpToStep]);

  const jumpToError = useCallback(() => {
    stepsState.jumpToStep(3);
  }, [stepsState.jumpToStep]);

  const jumpToSuccess = useCallback(() => {
    stepsState.jumpToStep(2);
  }, [stepsState.jumpToStep]);

  return (
    <Modal
      title={stepsState.currentStep === 2 ? "" : "Confirm your vote"}
      isOpen={modalState.isOpen}
      closeModal={closeModal}
    >
      <StepScreen
        onSuccess={jumpToSuccess}
        onError={jumpToError}
        onCancel={closeModal}
        member={member}
        updateMember={updateMember}
        error={error}
        setError={setError}
        railsContext={railsContext}
        election={election}
      />
    </Modal>
  );
};
