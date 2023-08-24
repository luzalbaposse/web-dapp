import React, { useEffect, useState } from "react";
import { Button, TextLink } from "@talentprotocol/design-system";
import { HeaderContainer, InnerHeaderContainer } from "./styled";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";
import EditJourneyModal from "src/components/profile/edit/EditJourneyModal";
import { noop } from "lodash";

export const LocalHeader = ({ isOwner, username }) => {
  const { profile, fetchProfile } = useProfileFetcher();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!!profile || !username) return;
    fetchProfile(username);
  }, [username, profile]);

  return (
    <HeaderContainer>
      <InnerHeaderContainer>
        <TextLink
          color="primary01"
          href={`/u/${username}?tab=about`}
          text="Experience"
          leftIcon="back-arrow"
          size="small"
        />
        {isOwner && (
          <Button text="Add Experience" size="small" hierarchy="primary" onClick={() => setIsModalOpen(true)} />
        )}
      </InnerHeaderContainer>
      {isOwner && !!profile && (
        <EditJourneyModal
          show={isModalOpen}
          hide={() => setIsModalOpen(false)}
          talent={profile}
          setTalent={() => window.location.reload()}
          editType="Add"
          setJourneyItem={noop}
        />
      )}
    </HeaderContainer>
  );
};
