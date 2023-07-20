import React, { useEffect } from "react";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";
import { Models } from "../../../talent-models-profile/models";

export const Support = ({ currentUser, railsContext }) => {
  const { profile, fetchProfile } = useProfileFetcher();

  useEffect(() => {
    fetchProfile("bguedes")
  }, []);

  // add spinner
  return !!profile && (
    <>
      <Models
        profile={profile}
        setProfile={() => { }}
        currentUserId={currentUser?.id}
        isCurrentUserProfile={profile.user.username === currentUser?.username}
        railsContext={railsContext}
      />
    </>
  )
};
