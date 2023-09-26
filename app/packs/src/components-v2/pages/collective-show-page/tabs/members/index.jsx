import { Button, Typography, useModal, Avatar } from "@talentprotocol/design-system";
import React, { useState } from "react";
import { VoteTextContainer, VoteDiv, VoteContainer } from "./styled";
import { VotingModal } from "../../voting-modal";
import { Spinner } from "src/components/icons";
import Table from "src/components/design_system/table";

export const Members = ({
  currentUser,
  members,
  activeElection,
  railsContext,
  loadMoreUsers,
  showLoadMoreTalents,
  loading
}) => {
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
      <Table className="table-mobile-full-width">
        <Table.Body>
          {members.map(member => (
            <Table.Tr key={member.id} className="border-bottom-black" style={{ cursor: "default" }}>
              <Table.Td className="px-4 lg-pl-0 py-3">
                <div className="d-flex align-items-center">
                  <Avatar
                    size="md"
                    name={member.name}
                    occupation={
                      member.headline?.length > 30 ? `${member?.headline.substring(0, 70)}...` : member.headline
                    }
                    url={member.profilePictureUrl}
                    isVerified={member.verified}
                    profileURL={`/u/${member.username}`}
                  />
                </div>
              </Table.Td>
              <Table.Td className="px-4 lg-pl-0 py-3">
                <VoteContainer>
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
                </VoteContainer>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Body>
      </Table>
      <div className="mt-6 d-flex justify-content-center">
        {loading ? (
          <div className="w-100 d-flex flex-row my-2 justify-content-center">
            <Spinner />
          </div>
        ) : showLoadMoreTalents ? (
          <Button onClick={() => loadMoreUsers()} hierarchy="primary" size="medium" text="Load More" />
        ) : (
          <Typography color="primary03" specs={{ variant: "p3" }}>
            You've reached the end of the list
          </Typography>
        )}
      </div>
    </>
  );
};
