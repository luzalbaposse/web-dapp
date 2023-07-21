import React, { useEffect } from "react";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";
import OldAbout from "../../../../../components/profile/About";
import OldJourney from "../../../../../components/profile/Journey";

export const About = ({ currentUser, urlData }) => {
  const { profile, fetchProfile } = useProfileFetcher();
  useEffect(() => {
    fetchProfile(urlData.profileUsername);
  }, []);


  // todo: add spinner
  return (
    !!profile && (
      <>
        <OldAbout profile={profile} />
        <OldJourney talent={profile} canUpdate={profile.user.username === currentUser.username} />
      </>
    )
  );
};
