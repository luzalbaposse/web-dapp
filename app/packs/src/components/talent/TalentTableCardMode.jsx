import React from "react";
import styled, { css } from "styled-components";
import { Button, TalentCard, mobileStyles } from "@talentprotocol/design-system";

const TableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  ${mobileStyles(css`
    grid-template-columns: 1fr;
  `)}
`;

export const EntryContainer = styled.div`
  margin: auto;
`;

const TalentTableCardMode = ({ talents }) => {
  return (
    <TableContainer>
      {talents.map(talent => (
        <EntryContainer key={talent.id}>
          <TalentCard 
            name={talent.user.name}
            profileImage={talent.profilePictureUrl}
            bannerImage={talent.bannerUrl}
            ticker={talent.talentToken.ticker}
            occupation={talent.occupation}
            isVerified={talent.verified}
            to={`/u/${talent.user.username}`}
          >
            <Button size="small" hierarchy="primary" text="Support" href={`/u/${talent.user.username}/support`}/>
          </TalentCard>
        </EntryContainer>
      ))}
    </TableContainer>
  );
};

export default TalentTableCardMode;
