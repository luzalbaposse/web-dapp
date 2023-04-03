import { Spinner, Typography } from "@talentprotocol/design-system";
import React, { useEffect, useMemo, useState } from "react";
import { useTalentCareerUpdatesFetcher } from "../../../../hooks/use-talent-career-updates-fetcher";
import { CareerUpdateEmptyState } from "./empty-state";
import { Container, TitleContainer } from "./styled";
import { Update } from "./update";
import { CareerUpdateLockedState } from "./locked-state";

export const CareerUpdates = ({ profile, isCurrentUserProfile }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const { careerUpdates, fetchCareerUpdates } = useTalentCareerUpdatesFetcher();
  useEffect(() => {
    fetchCareerUpdates(profile.user.username)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLocked(true);
        setIsLoading(false);
      });
  }, [fetchCareerUpdates, profile]);
  const RenderedContent = useMemo(() => {
    if (isLocked) {
      return <CareerUpdateLockedState profile={profile} />;
    }
    if (!careerUpdates.length) {
      return <CareerUpdateEmptyState profile={profile} />;
    }
    return (
      <>
        <TitleContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            {profile.user.legal_first_name}'s career updates
          </Typography>
        </TitleContainer>
        {careerUpdates.map(update => (
          <Update key={update.created_at} data={update} profile={profile} isCurrentUserProfile={isCurrentUserProfile} />
        ))}
      </>
    );
  }, [careerUpdates, profile, isLocked]);
  return <Container>{isLoading ? <Spinner /> : RenderedContent}</Container>;
};
