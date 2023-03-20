import { Spinner, Typography } from "@talentprotocol/design-system";
import React, { useEffect, useState } from "react";
import { useTalentCareerUpdatesFetcher } from "../../../../hooks/use-talent-career-updates-fetcher";
import { Container, TitleContainer } from "./styled";
import { Update } from "./update";

export const CareerUpdates = ({ profile, isCurrentUserProfile }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { careerUpdates, fetchCareerUpdates } = useTalentCareerUpdatesFetcher();
  useEffect(() => {
    fetchCareerUpdates(profile.user.username).then(() => setIsLoading(false));
  }, [fetchCareerUpdates, profile]);
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TitleContainer>
            <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
              {profile.user.legal_first_name}'s career updates
            </Typography>
          </TitleContainer>
          {careerUpdates.map(update => (
            <Update
              key={update.created_at}
              data={update}
              profile={profile}
              isCurrentUserProfile={isCurrentUserProfile}
            />
          ))}
        </>
      )}
    </Container>
  );
};
