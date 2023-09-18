import React, { useEffect } from "react";
import { TextLink } from "@talentprotocol/design-system";
import { HeaderContainer, InnerHeaderContainer } from "./styled";
import { useProfileFetcher } from "src/hooks/use-profile-fetcher";

export const LocalHeader = ({ username }) => {
  const { profile, fetchProfile } = useProfileFetcher();
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
      </InnerHeaderContainer>
    </HeaderContainer>
  );
};
