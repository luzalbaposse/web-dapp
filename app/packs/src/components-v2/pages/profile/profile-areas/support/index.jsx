import React, { useEffect, useState } from "react";
import { noop } from "lodash";
import { Spinner } from "@talentprotocol/design-system";
import { talentsService } from "src/api";
import { Models } from "../../../talent-models-profile/models";
import Token from "../../../../../components/profile/Token";
import { SpinnerContainer, TokenComponentContainer } from "./styled";

export const Support = ({ currentUser, railsContext, urlData }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!urlData.profileUsername) return;
    talentsService.getSupportData(urlData.profileUsername).then(({ data }) => {
      setProfile(data.talent);
    });
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
        isCurrentUserProfile={urlData.profileUsername === currentUser?.username}
        railsContext={railsContext}
      />

      {profile.talent_token.deployed && (
        <TokenComponentContainer>
          <Token profile={profile} talentTokenPrice={0.1} railsContext={railsContext} />
        </TokenComponentContainer>
      )}
    </>
  );
};
