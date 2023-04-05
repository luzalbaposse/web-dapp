import { Spinner, Typography } from "@talentprotocol/design-system";
import React, { useEffect, useMemo, useState } from "react";
import { useTalentCareerUpdatesFetcher } from "../../../../hooks/use-talent-career-updates-fetcher";
import { CareerUpdateEmptyState } from "./empty-state";
import { Container, InputContainer, TitleContainer } from "./styled";
import { CareerUpdate } from "../../../career-update";
import { CareerUpdateLockedState } from "./locked-state";
import SendCareerUpdateModal from "../../../../components/profile/SendCareerUpdateModal";
import TextInput from "src/components/design_system/fields/textinput";

export const CareerUpdates = ({ profile, isCurrentUserProfile, railsContext }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isSendCareerUpdateModalOpen, setShowCareerUpdateModal] = useState(false);
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
      return (
        <CareerUpdateEmptyState
          profile={profile}
          isCurrentUserProfile={isCurrentUserProfile}
          contractsEnv={railsContext}
        />
      );
    }
    return (
      <>
        <TitleContainer>
          <Typography specs={{ variant: "h5", type: "bold" }} color="primary01">
            {profile.user.legal_first_name}'s career updates
          </Typography>
        </TitleContainer>

        {isCurrentUserProfile && (
          <SendCareerUpdateModal
            show={isSendCareerUpdateModalOpen}
            hide={() => setShowCareerUpdateModal(false)}
            placeholder={`What's new in your career ${profile.user.name}?`}
            contractsEnv={railsContext.contractsEnv}
          />
        )}
        <InputContainer>
          {isCurrentUserProfile && (
            <TextInput
              placeholder={`What's new in your career ${profile.user.name}?`}
              onClick={() => setShowCareerUpdateModal(true)}
              className="w-100 mt-3"
            />
          )}
        </InputContainer>
        {careerUpdates.map(update => (
          <CareerUpdate key={update.created_at} data={update} profile={profile} isCurrentUserProfile={isCurrentUserProfile} />
        ))}
      </>
    );
  }, [
    careerUpdates,
    profile,
    isLocked,
    isSendCareerUpdateModalOpen,
    setShowCareerUpdateModal,
    railsContext,
    isCurrentUserProfile
  ]);
  return <Container>{isLoading ? <Spinner /> : RenderedContent}</Container>;
};
