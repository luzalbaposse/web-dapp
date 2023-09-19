import { Button, TalentCard, Typography } from "@talentprotocol/design-system";
import React from "react";
import { CardContainer, Container, VoteTextContainer, VoteDiv } from "./styled";

export const Members = ({ members, activeElection }) => {
  return (
    <>
      <Container>
        {members.map(member => (
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
                <Button size="small" hierarchy="secondary" isDisabled={true}>
                  <VoteTextContainer>
                    <Typography
                      specs={{
                        variant: "label2",
                        type: "medium"
                      }}
                      color={"primaryDisable"}
                    >
                      Vote
                    </Typography>
                    <VoteDiv />
                    <Typography
                      specs={{
                        variant: "label2",
                        type: "medium"
                      }}
                      color={"primaryDisable"}
                    >
                      {0}
                    </Typography>
                  </VoteTextContainer>
                </Button>
              )}
              {!activeElection && (
                <Button size="small" hierarchy="primary" text="Subscribe" href={`/u/${member.username}`} />
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
