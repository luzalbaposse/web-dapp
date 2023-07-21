import React, { useEffect } from "react";
import { noop } from "lodash";
import { Spinner } from "@talentprotocol/design-system";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";
import { Models } from "../../../talent-models-profile/models";
import Token from "../../../../../components/profile/Token";
import { SpinnerContainer } from "./styled";

export const Support = ({ currentUser, railsContext, urlData }) => {
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
      <Models
        profile={profile}
        setProfile={noop}
        currentUserId={currentUser?.id}
        isCurrentUserProfile={profile.user.username === currentUser?.username}
        railsContext={railsContext}
      />
      {profile.talent_token.deployed && <Token profile={profile} talentTokenPrice={0.1} railsContext={railsContext} />}
    </>
  );
};
