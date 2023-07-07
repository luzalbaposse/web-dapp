import { Button, TalentCard, Typography } from "@talentprotocol/design-system";
import React from "react";
import { CardContainer, Container } from "./styled";

export const Members = ({ members }) => {
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
              <Button size="small" hierarchy="primary" text="Subscribe" href={`/u/${member.username}`} />
            </TalentCard>
          </CardContainer>
        ))}
      </Container>
      <div className="mt-6 text-center">
        <Typography color="primary03" specs={{ variant: "p3" }}>
          You’ve reached the end of the list
        </Typography>
      </div>
    </>
  );
};
