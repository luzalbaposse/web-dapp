import React, { useEffect } from "react";
import { noop } from "lodash";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";
import { Models } from "../../../talent-models-profile/models";
import Token from "../../../../../components/profile/Token";

export const Support = ({ currentUser, railsContext, urlData }) => {
  const { profile, fetchProfile } = useProfileFetcher();

  useEffect(() => {
    fetchProfile(urlData.profileUsername);
  }, []);

  // todo: add spinner
  return (
    !!profile && (
      <>
        <Models
          profile={profile}
          setProfile={noop}
          currentUserId={currentUser?.id}
          isCurrentUserProfile={profile.user.username === currentUser?.username}
          railsContext={railsContext}
        />
        {/* ask this out */}
        <Token profile={profile} talentTokenPrice={0.1} railsContext={railsContext} />
      </>
    )
  );
};
