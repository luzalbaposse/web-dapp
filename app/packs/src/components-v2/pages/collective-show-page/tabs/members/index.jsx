import { Button, TalentCard, Typography, useModal } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { CardContainer, Container, VoteTextContainer, VoteDiv } from "./styled";
import { VotingModal } from "../../voting-modal";

export const Members = ({ currentUser, members, activeElection, railsContext, keyword }) => {
  const modalState = useModal();
  const [activeMember, setActiveMember] = useState(null);

  const enableVoting = activeElection && activeElection.status === "voting_active";

  const modal = () => {
    if (enableVoting) {
      return (
        <VotingModal
          member={activeMember}
          election={activeElection}
          modalState={modalState}
          railsContext={railsContext}
        />
      );
    } else {
      return <></>;
    }
  };

  const voteOnMember = (e, member) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMember(member);
    modalState.openModal();
  };

  return (
    <>
      {modal()}
      <Container>
        {members
          .filter(m => m.name.toLowerCase().includes(keyword.toLowerCase()))
          .map(member => (
            <CardContainer key={member.id}>
              <TalentCard
                isVerified={member.verified}
                name={member.name}
                occupation={member.occupation}
                profileImage={member.profilePictureUrl}
                ticker={member.ticker}
                to={`/u/${member.username}`}
              >
                {!!activeElection && (
                  <Button
                    size="small"
                    hierarchy="secondary"
                    isDisabled={!enableVoting || !currentUser}
                    onClick={e => voteOnMember(e, member)}
                  >
                    <VoteTextContainer>
                      <Typography
                        specs={{
                          variant: "label2",
                          type: "medium"
                        }}
                        color={enableVoting ? "primary01" : "primaryDisable"}
                      >
                        Vote
                      </Typography>
                      <VoteDiv />
                      <Typography
                        specs={{
                          variant: "label2",
                          type: "medium"
                        }}
                        color={enableVoting ? "primary01" : "primaryDisable"}
                      >
                        {member.voteCount}
                      </Typography>
                    </VoteTextContainer>
                  </Button>
                )}
                {!activeElection && (
                  <Button
                    size="small"
                    hierarchy="primary"
                    text="Subscribe"
                    href={`/u/${member.username}`}
                    isDisabled={!currentUser}
                  />
                )}
              </TalentCard>
            </CardContainer>
          ))}
      </Container>
      <div className="mt-6 text-center">
        <Typography color="primary03" specs={{ variant: "p3" }}>
          You've reached the end of the list
        </Typography>
      </div>
    </>
  );
};
