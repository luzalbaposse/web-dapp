import React, { useEffect } from "react";
import { Spinner } from "@talentprotocol/design-system";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";
import OldAbout from "../../../../../components/profile/About";
import OldJourney from "../../../../../components/profile/Journey";
import { SpinnerContainer } from "./styled";

export const About = ({ currentUser, urlData }) => {
  const { profile, fetchProfile } = useProfileFetcher();
  useEffect(() => {
    fetchProfile(urlData.profileUsername);
  }, []);

  return !profile ? (
    <SpinnerContainer>
      <Spinner color="primary" size={48} />
    </SpinnerContainer>
  ) : (
    <>
      <OldAbout profile={profile} />
      <OldJourney talent={profile} canUpdate={profile.user.username === currentUser.username} />
    </>
  );
};
